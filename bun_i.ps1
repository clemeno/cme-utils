rm .\package-lock.json
rm .\pnpm-lock.yaml
rm .\bun.lock
rm .\node_modules
bun i > bun_i_out.txt
cat bun_i_out.txt
