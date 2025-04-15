rm .\package-lock.json
rm .\pnpm-lock.yaml
rm .\bun.lock
rm .\node_modules
corepack up > corepack_up_out.txt
cat corepack_up_out.txt
