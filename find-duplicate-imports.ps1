[CmdletBinding()]
param(
    [string]$SrcPath = '.\ts'
)

$ErrorActionPreference = 'Stop'

# Resolve to absolute path
$resolvedSrc = (Resolve-Path $SrcPath).Path

# ─── Helper: determine import kind (type vs value) ───────────────────────────
function Get-ImportKind ([string]$stmt) {
    if ($stmt -match '^\s*import\s+type\b') { return 'type' }
    return 'value'
}

# ─── Helper: extract local binding names — outputs individual strings to the pipeline ────────────
function Get-ImportBindings ([string]$stmt) {
    # Namespace import: * as NS
    if ($stmt -match '\*\s+as\s+(\w+)') {
        $Matches[1]
    }

    # Default import: import [type] DefaultName [, ...] from
    # Only matches a word token right after 'import [type]', not when next char is '{' or '*'
    if ($stmt -match '^\s*import\s+(?:type\s+)?(\w+)\s*(?:,|\s+from\b)') {
        $Matches[1]
    }

    # Named imports: { A, B as C, type D, type E as F }
    if ($stmt -match '\{([^}]+)\}') {
        $inner = $Matches[1]
        foreach ($item in ($inner -split ',')) {
            $item = $item.Trim()
            # Strip inline 'type' modifier (e.g. "type Foo" inside braces)
            $item = [regex]::Replace($item, '^\s*type\s+', '')
            $item = $item.Trim()
            if ($item -eq '') { continue }
            # Resolve alias: 'Foo as Bar' → local binding is 'Bar'
            if ($item -match '\bas\s+(\w+)\s*$') {
                $Matches[1]
            } elseif ($item -match '^(\w+)$') {
                $Matches[1]
            }
        }
    }
}

# ─── Main ────────────────────────────────────────────────────────────────────
$files = Get-ChildItem -Path $resolvedSrc -Recurse -Include '*.ts', '*.js' -File
$filesScanned  = 0
$filesWithDups = 0

foreach ($file in $files) {
    $filesScanned++
    $lines = Get-Content -Path $file.FullName -Encoding UTF8

    # ── Parse import statements (multi-line aware) ──────────────────────────
    # Each entry: { StartLine, Kind, ModulePath, Bindings (string[]) }
    $imports      = [System.Collections.Generic.List[hashtable]]::new()
    $accumulating = $false
    $stmtStart    = 0
    $stmtLines    = [System.Collections.Generic.List[string]]::new()

    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line    = $lines[$i]
        $lineNum = $i + 1   # 1-based

        if (-not $accumulating) {
            if ($line -match '^\s*import\b') {
                $accumulating = $true
                $stmtStart    = $lineNum
                $stmtLines.Clear()
                $stmtLines.Add($line)
            }
        } else {
            $stmtLines.Add($line)
        }

        if ($accumulating) {
            $stmt = $stmtLines -join ' '
            # Statement is complete when it contains:  from 'module'  or  from "module"
            if ($stmt -match "from\s+['""]([^'""]+)['""]") {
                $imports.Add(@{
                    StartLine  = $lineNum - $stmtLines.Count + 1  # = $stmtStart
                    Kind       = Get-ImportKind $stmt
                    ModulePath = $Matches[1]
                    Bindings   = [string[]]@(Get-ImportBindings $stmt)
                })
                $accumulating = $false
                $stmtLines.Clear()
            }
        }
    }

    # ── Detect duplicate module paths (per kind: 'type' and 'value' are independent) ──
    # Key: "$kind|$modulePath"  →  list of line numbers
    $moduleMap = [System.Collections.Generic.Dictionary[string, System.Collections.Generic.List[int]]]::new([System.StringComparer]::Ordinal)
    foreach ($imp in $imports) {
        $key = "$($imp.Kind)|$($imp.ModulePath)"
        if (-not $moduleMap.ContainsKey($key)) { $moduleMap[$key] = [System.Collections.Generic.List[int]]::new() }
        $moduleMap[$key].Add($imp.StartLine)
    }

    $moduleDuplicates = @(
        foreach ($kvp in $moduleMap.GetEnumerator()) {
            if ($kvp.Value.Count -gt 1) {
                $parts     = $kvp.Key -split '\|', 2
                $kindLabel = if ($parts[0] -eq 'type') { 'import type' } else { 'import' }
                "  [DUPLICATE MODULE] '$($parts[1])' ($kindLabel)  —  lines: $($kvp.Value -join ', ')"
            }
        }
    )

    # ── Detect duplicate identifiers (same binding name across any imports) ──
    # Key: binding name  →  list of line numbers (case-sensitive — 'Knex' ≠ 'knex')
    $identMap = [System.Collections.Generic.Dictionary[string, System.Collections.Generic.List[int]]]::new([System.StringComparer]::Ordinal)
    foreach ($imp in $imports) {
        foreach ($b in $imp.Bindings) {
            if (-not $identMap.ContainsKey($b)) { $identMap[$b] = [System.Collections.Generic.List[int]]::new() }
            $identMap[$b].Add($imp.StartLine)
        }
    }

    $identDuplicates = @(
        foreach ($kvp in $identMap.GetEnumerator()) {
            if ($kvp.Value.Count -gt 1) {
                "  [DUPLICATE IDENTIFIER] '$($kvp.Key)'  —  lines: $($kvp.Value -join ', ')"
            }
        }
    )

    # ── Output ──────────────────────────────────────────────────────────────
    if ($moduleDuplicates.Count -gt 0 -or $identDuplicates.Count -gt 0) {
        $filesWithDups++
        $relPath = [System.IO.Path]::GetRelativePath($resolvedSrc, $file.FullName)
        Write-Host ""
        Write-Host $relPath -ForegroundColor Yellow
        foreach ($line in $moduleDuplicates) { Write-Host $line -ForegroundColor Red     }
        foreach ($line in $identDuplicates)  { Write-Host $line -ForegroundColor Magenta }
    }
}

# ── Summary ──────────────────────────────────────────────────────────────────
$summaryColor = if ($filesWithDups -gt 0) { 'Yellow' } else { 'Green' }
Write-Host ""
Write-Host ('─' * 52) -ForegroundColor Cyan
Write-Host "  Files scanned        : $filesScanned"  -ForegroundColor Green
Write-Host "  Files with duplicates: $filesWithDups" -ForegroundColor $summaryColor
Write-Host ('─' * 52) -ForegroundColor Cyan
