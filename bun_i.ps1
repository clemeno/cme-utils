rm .\package-lock.json
rm .\pnpm-lock.yaml
rm .\bun.lock
rm .\node_modules
$envNoColor = $env:NO_COLOR
$env:NO_COLOR=1; bun i > bun_i_out.txt; $env:NO_COLOR=$envNoColor
cat bun_i_out.txt
