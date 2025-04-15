rm .\package-lock.json
rm .\pnpm-lock.yaml
rm .\bun.lock
rm .\node_modules
npm i > npm_i_out.txt
cat npm_i_out.txt
