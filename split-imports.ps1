<#
.SYNOPSIS
  Split mixed ES module imports (value + type in same block) into separate import and import type statements.
.DESCRIPTION
  Scans all .ts/.js files in the target folder and rewrites lines like:
    import { raw, type QueryBuilder } from 'objection'
  into:
    import { raw } from 'objection'
    import type { QueryBuilder } from 'objection'

  Also rewrites type-only inline imports like:
    import { type Paginated } from '../type/paginated.js'
  into:
    import type { Paginated } from '../type/paginated.js'

  Multi-line brace imports that contain type-qualified items are collapsed to a
  single line before the split logic runs:
    import {
      type Foo,
      Bar,
    } from './module.js'
  is treated as if it were written on one line.  Multi-line imports with no type
  items are left untouched (their formatting is preserved).

  Special case: when the same module already has a default type import in the file,
  e.g. `import type Objection from 'objection'`, the type items are dropped from the
  braces import and every occurrence of `QueryBuilder` in the file is rewritten to
  `Objection.QueryBuilder` instead of adding a redundant `import type { QueryBuilder }`.

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

# Regex: match a named-import line (single line only — braces must be on same line as 'from';
# note: import type { } is NOT matched because 'type' between 'import' and '{' is not whitespace)
$importPattern = '^(?<indent>[^\S\r\n]*)import\s*\{(?<items>[^}]*)\}\s*from\s*(?<q>[''"])(?<module>[^''"]+)\k<q>\s*;?[^\S\r\n]*$'

# Regex: match a default type import — import type Alias from 'module'
$defaultTypeImportPattern = '^(?:[^\S\r\n]*)import\s+type\s+(?<alias>\w+)\s+from\s+(?<q>[''"])(?<module>[^''"]+)\k<q>\s*;?[^\S\r\n]*$'

$changedFiles = [System.Collections.Generic.List[string]]::new()

Get-ChildItem -Path $sourceRoot -Recurse -Include *.ts, *.js -ErrorAction Stop | ForEach-Object {
    $file = $_.FullName
    $fileContent = [System.IO.File]::ReadAllText($file, $utf8NoBom)

    # Detect line ending used in this file
    $lineEnding = if ($fileContent -match '\r\n') { "`r`n" } else { "`n" }
    $lines = $fileContent -split '\r?\n'

    # --- Pre-pass: collapse multi-line brace imports that contain type items ---
    # Only imports that have at least one `type Foo` item are collapsed; pure-value
    # multi-line imports are left alone so their formatting is not disturbed.
    #
    # Detection: a line matching  ^<ws>import\s*{  with no closing }  on the same
    # line (and NOT  import type {  which is already correct form) starts a block.
    # Lines are accumulated until a line containing } is found.
    $multiLineOpenPattern  = '^(?<ind>[^\S\r\n]*)import\s*\{'
    $multiLineTypeExclPat  = '^[^\S\r\n]*import\s+type\s*\{'
    $collapsed = [System.Collections.Generic.List[string]]::new()
    $ci = 0
    while ($ci -lt $lines.Count) {
        $cl = $lines[$ci]
        if ($cl -match $multiLineOpenPattern -and
            $cl -notmatch $multiLineTypeExclPat -and
            $cl -notmatch '\}') {

            $ind   = $Matches['ind']
            $parts = [System.Collections.Generic.List[string]]::new()
            $parts.Add($cl)
            $cj = $ci + 1
            while ($cj -lt $lines.Count -and $parts[$parts.Count - 1] -notmatch '\}') {
                $parts.Add($lines[$cj])
                $cj++
            }

            if ($cj -lt $lines.Count -or $parts[$parts.Count - 1] -match '\}') {
                # Successfully reached closing brace – check for type items
                $blockText = $parts -join ' '
                if ($blockText -match '\btype\s+\w') {
                    # Collapse: join trimmed pieces, normalise whitespace, re-indent
                    $joined = ($parts | ForEach-Object { $_.Trim() }) -join ' '
                    $joined = [System.Text.RegularExpressions.Regex]::Replace($joined, '\s+', ' ')
                    $collapsed.Add($ind + $joined.TrimStart())
                    $ci = $cj + 1
                    continue
                }
            }
            # No type items or unclosed block — emit original lines unchanged
            foreach ($p in $parts) { $collapsed.Add($p) }
            $ci = $cj + 1
        } else {
            $collapsed.Add($cl)
            $ci++
        }
    }
    $lines = $collapsed.ToArray()

    # --- First pass: collect default type aliases per module ---
    # e.g.  import type Objection from 'objection'  =>  'objection' -> 'Objection'
    $defaultTypeAliases = @{}
    foreach ($line in $lines) {
        $dm = [System.Text.RegularExpressions.Regex]::Match($line, $defaultTypeImportPattern)
        if ($dm.Success) {
            $defaultTypeAliases[$dm.Groups['module'].Value] = $dm.Groups['alias'].Value
        }
    }

    $outLines = [System.Collections.Generic.List[string]]::new()
    $linesChanged = 0
    # Collect type-name replacements to apply after building outLines:
    #   @{ From = 'QueryBuilder'; To = 'Objection.QueryBuilder' }
    $typeReplacements = [System.Collections.Generic.List[hashtable]]::new()

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

        $regularItems = @($items | Where-Object { $_ -notmatch '^type\s' })
        $typeItems    = @($items | Where-Object { $_ -match '^type\s+(.+)$' } |
                            ForEach-Object { $Matches[1].Trim() })

        if ($typeItems.Count -gt 0 -and $defaultTypeAliases.ContainsKey($modulePath)) {
            # A default type alias already covers this module — use it instead of a
            # separate `import type { ... }` line.
            $alias = $defaultTypeAliases[$modulePath]

            if ($regularItems.Count -gt 0) {
                $outLines.Add("${indent}import { $($regularItems -join ', ') } from $quote$modulePath$quote;")
            }
            # else: the whole import was type-only — drop the line entirely

            foreach ($typeName in $typeItems) {
                $typeReplacements.Add(@{ From = $typeName; To = "$alias.$typeName" })
            }
            $linesChanged++

        } elseif ($typeItems.Count -gt 0 -and $regularItems.Count -eq 0) {
            # All items are inline-typed — collapse to a pure import type
            $outLines.Add("${indent}import type { $($typeItems -join ', ') } from $quote$modulePath$quote;")
            $linesChanged++

        } elseif ($regularItems.Count -gt 0 -and $typeItems.Count -gt 0) {
            # Standard split: emit a value import and a type import
            $outLines.Add("${indent}import { $($regularItems -join ', ') } from $quote$modulePath$quote;")
            $outLines.Add("${indent}import type { $($typeItems -join ', ') } from $quote$modulePath$quote;")
            $linesChanged++

        } else {
            $outLines.Add($line)
        }
    }

    if ($linesChanged -gt 0) {
        $newContent = $outLines -join $lineEnding

        # Apply word-boundary replacements collected during the default-alias pass
        foreach ($repl in $typeReplacements) {
            $escaped = [System.Text.RegularExpressions.Regex]::Escape($repl.From)
            # Lookbehind: '.' is a literal dot inside [...], so Alias.TypeName is not re-matched
            $newContent = [System.Text.RegularExpressions.Regex]::Replace(
                $newContent,
                "(?<![.\w])$escaped(?!\w)",
                $repl.To
            )
        }

        $label = if ($DryRun) { '[DRY RUN] ' } else { '' }
        Write-Host "${label}$file  ($linesChanged line(s) split)"
        if (-not $DryRun) {
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
