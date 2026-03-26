<#
.SYNOPSIS
  Split mixed ES module imports (value + type in same block) into separate import and import type statements.
.DESCRIPTION
  Scans all .ts/.js files in the target folder and rewrites lines like:
    import { raw, type QueryBuilder } from 'objection'
  into:
    import { raw } from 'objection'
    import type { QueryBuilder } from 'objection'

  Files that have no mixed imports are left untouched.
  Encoding (UTF-8 no BOM) and original line endings (\r\n or \n) are preserved.
.PARAMETER Path
  Root folder to scan. Defaults to the src\ folder next to this script.
.PARAMETER DryRun
  Report what would be changed without writing any files.
#>
param(
    [string]$Path = '',
    [switch]$DryRun
)

Set-StrictMode -Version Latest

# Resolve source root
if ($Path -ne '') {
    $sourceRoot = $Path
} else {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $sourceRoot = Join-Path $scriptDir 'ts'
}

if (-not (Test-Path $sourceRoot)) {
    throw "Source folder not found at '$sourceRoot'. Use -Path to specify the correct root."
}

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

# Regex: match a named-import line (single line only, braces must be on same line as from)
$importPattern = '(?m)^(?<indent>[^\S\r\n]*)import\s*\{(?<items>[^}]*)\}\s*from\s*(?<q>[''"])(?<module>[^''"]+)\k<q>\s*;?[^\S\r\n]*$'

$changedFiles = [System.Collections.Generic.List[string]]::new()

Get-ChildItem -Path $sourceRoot -Recurse -Include *.ts, *.js -ErrorAction Stop | ForEach-Object {
    $file = $_.FullName
    $raw = [System.IO.File]::ReadAllText($file, $utf8NoBom)

    # Detect line ending used in this file
    $lineEnding = if ($raw -match '\r\n') { "`r`n" } else { "`n" }
    $lines = $raw -split '\r?\n'

    $outLines = [System.Collections.Generic.List[string]]::new()
    $linesChanged = 0

    foreach ($line in $lines) {
        $m = [System.Text.RegularExpressions.Regex]::Match($line, $importPattern)
        if (-not $m.Success) {
            $outLines.Add($line)
            continue
        }

        $indent     = $m.Groups['indent'].Value
        $modulePath = $m.Groups['module'].Value
        $quote      = $m.Groups['q'].Value
        $itemsRaw   = $m.Groups['items'].Value

        $items = $itemsRaw -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }

        $regularItems = [System.Collections.Generic.List[string]]::new()
        $typeItems    = [System.Collections.Generic.List[string]]::new()

        foreach ($item in $items) {
            if ($item -match '^type\s+(.+)$') {
                $typeItems.Add($Matches[1].Trim())
            } else {
                $regularItems.Add($item)
            }
        }

        if ($regularItems.Count -gt 0 -and $typeItems.Count -gt 0) {
            # Mixed import: split into a value line + a type line
            $outLines.Add("${indent}import { $($regularItems -join ', ') } from $quote$modulePath$quote;")
            $outLines.Add("${indent}import type { $($typeItems -join ', ') } from $quote$modulePath$quote;")
            $linesChanged++
        } elseif ($regularItems.Count -eq 0 -and $typeItems.Count -gt 0) {
            # All items carry inline `type` — normalise to a proper import type { }
            $outLines.Add("${indent}import type { $($typeItems -join ', ') } from $quote$modulePath$quote;")
            $linesChanged++
        } else {
            $outLines.Add($line)
        }
    }

    # ── Phase 2: merge sibling 'import type' statements for the same module ───
    # Recognise three single-line import-type shapes:
    #   (c) import type Default, { A, B } from 'mod'
    #   (a) import type Default from 'mod'
    #   (b) import type { A, B } from 'mod'
    $pTDN = '^(?<ind>[^\S\r\n]*)import\s+type\s+(?<def>\w+)\s*,\s*\{(?<items>[^}]*)\}\s*from\s*(?<q>[''"])(?<mod>[^''"]+)\k<q>\s*;?[^\S\r\n]*$'
    $pTD  = '^(?<ind>[^\S\r\n]*)import\s+type\s+(?<def>\w+)\s+from\s*(?<q>[''"])(?<mod>[^''"]+)\k<q>\s*;?[^\S\r\n]*$'
    $pTN  = '^(?<ind>[^\S\r\n]*)import\s+type\s+\{(?<items>[^}]*)\}\s*from\s*(?<q>[''"])(?<mod>[^''"]+)\k<q>\s*;?[^\S\r\n]*$'

    $typeInfos = [System.Collections.Generic.List[hashtable]]::new()
    for ($i = 0; $i -lt $outLines.Count; $i++) {
        $l = $outLines[$i]
        $mDN = [regex]::Match($l, $pTDN)
        $mDO = [regex]::Match($l, $pTD)
        $mNO = [regex]::Match($l, $pTN)
        if ($mDN.Success) {
            $named = @($mDN.Groups['items'].Value -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })
            $typeInfos.Add(@{ Idx = $i; Mod = $mDN.Groups['mod'].Value; Q = $mDN.Groups['q'].Value; Ind = $mDN.Groups['ind'].Value; Def = $mDN.Groups['def'].Value; Named = $named })
        } elseif ($mDO.Success) {
            $typeInfos.Add(@{ Idx = $i; Mod = $mDO.Groups['mod'].Value; Q = $mDO.Groups['q'].Value; Ind = $mDO.Groups['ind'].Value; Def = $mDO.Groups['def'].Value; Named = @() })
        } elseif ($mNO.Success) {
            $named = @($mNO.Groups['items'].Value -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })
            $typeInfos.Add(@{ Idx = $i; Mod = $mNO.Groups['mod'].Value; Q = $mNO.Groups['q'].Value; Ind = $mNO.Groups['ind'].Value; Def = $null; Named = $named })
        }
    }

    $typeByMod = @{}
    foreach ($info in $typeInfos) {
        if (-not $typeByMod.ContainsKey($info.Mod)) { $typeByMod[$info.Mod] = [System.Collections.Generic.List[hashtable]]::new() }
        $typeByMod[$info.Mod].Add($info)
    }

    $toRemove = [System.Collections.Generic.HashSet[int]]::new()
    foreach ($grp in $typeByMod.Values) {
        if ($grp.Count -lt 2) { continue }

        $mergedDef   = $null
        $mergedNamed = [System.Collections.Generic.List[string]]::new()
        foreach ($info in $grp) {
            if ($null -ne $info.Def -and $null -eq $mergedDef) { $mergedDef = $info.Def }
            foreach ($n in $info.Named) { if (-not $mergedNamed.Contains($n)) { $mergedNamed.Add($n) } }
        }

        $namedPart = if ($mergedNamed.Count -gt 0) { "{ $($mergedNamed -join ', ') }" } else { $null }
        $binding   = if ($null -ne $mergedDef -and $null -ne $namedPart) { "$mergedDef, $namedPart" }
                     elseif ($null -ne $mergedDef) { $mergedDef }
                     else { $namedPart }
        $outLines[$grp[0].Idx] = "$($grp[0].Ind)import type $binding from $($grp[0].Q)$($grp[0].Mod)$($grp[0].Q);"

        for ($j = 1; $j -lt $grp.Count; $j++) { [void]$toRemove.Add($grp[$j].Idx) }
        $linesChanged++
    }

    if ($toRemove.Count -gt 0) {
        $tmp = [System.Collections.Generic.List[string]]::new()
        for ($i = 0; $i -lt $outLines.Count; $i++) {
            if (-not $toRemove.Contains($i)) { $tmp.Add($outLines[$i]) }
        }
        $outLines = $tmp
    }

    # ── Phase 3: hoist all import lines to the top, compact (no blank lines between) ──
    # Matches any single-line top-level ESM import/import-type statement
    $importLinePattern = '^import\b[^\r\n]*from\s+[''"][^''"\r\n]+[''"]\s*;?\s*$'

    $collectedImports = [System.Collections.Generic.List[string]]::new()
    $nonImportLines   = [System.Collections.Generic.List[string]]::new()

    foreach ($l in $outLines) {
        if ([regex]::IsMatch($l, $importLinePattern)) {
            $collectedImports.Add($l)
        } else {
            $nonImportLines.Add($l)
        }
    }

    # Strip leading blank lines from the non-import body
    while ($nonImportLines.Count -gt 0 -and $nonImportLines[0] -match '^\s*$') {
        $nonImportLines.RemoveAt(0)
    }

    $reorganized = [System.Collections.Generic.List[string]]::new()
    foreach ($il in $collectedImports) { $reorganized.Add($il) }
    if ($nonImportLines.Count -gt 0) { $reorganized.Add('') }  # one blank separator
    foreach ($rl in $nonImportLines)  { $reorganized.Add($rl) }

    $p3Changed = $reorganized.Count -ne $outLines.Count
    if (-not $p3Changed) {
        for ($i = 0; $i -lt $reorganized.Count; $i++) {
            if ($reorganized[$i] -ne $outLines[$i]) { $p3Changed = $true; break }
        }
    }
    if ($p3Changed) {
        $outLines = $reorganized
        $linesChanged++
    }

    if ($linesChanged -gt 0) {
        $label = if ($DryRun) { '[DRY RUN] ' } else { '' }
        Write-Host "${label}$file  ($linesChanged line(s) split/merged)"
        if (-not $DryRun) {
            $newContent = $outLines -join $lineEnding
            [System.IO.File]::WriteAllText($file, $newContent, $utf8NoBom)
        }
        $changedFiles.Add($file)
    }
}

Write-Host ''
if ($changedFiles.Count -eq 0) {
    Write-Host 'No mixed imports found.'
} elseif ($DryRun) {
    Write-Host "$($changedFiles.Count) file(s) would be updated (dry run, nothing written)."
} else {
    Write-Host "$($changedFiles.Count) file(s) updated."
}
