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
            $outLines.Add("${indent}import { $($regularItems -join ', ') } from $quote$modulePath$quote;")
            $outLines.Add("${indent}import type { $($typeItems -join ', ') } from $quote$modulePath$quote;")
            $linesChanged++
        } else {
            $outLines.Add($line)
        }
    }

    if ($linesChanged -gt 0) {
        $label = if ($DryRun) { '[DRY RUN] ' } else { '' }
        Write-Host "${label}$file  ($linesChanged line(s) split)"
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
