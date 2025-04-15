# $arg0 = $args[0]

# if ($args.Length -ne 1) {
#   Write-Output "Usage: make.ps1 <targetList>"
#   Write-Output "  targetList: all,esm,cjs"
#   exit 1
# }

# $arg0List = $arg0.Split(',')

# $bAll = $arg0List.contains('all')
# $bEsm = $arg0List.contains('esm')
# $bCjs = $arg0List.contains('cjs')

# if ($bAll -or $bEsm) {
#   # default build to esm
  rm esm
  npm run build
# }

# if ($bAll -or $bCjs) {
#   # for retro-compatibility, also build to cjs
#   rm cjs
#   npm run build:cjs
# }
