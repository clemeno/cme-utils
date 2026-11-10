// bun run check loads the build in Node: every util runs in a browser, on Node and on bun (AGENTS.md)
if (process.versions.bun != null) {
  throw new Error('`node` is bun\'s stand-in here: put Node on PATH, so the check loads the build in Node')
}

const lib = await import('../m/index.js')

console.log(`m/index.js loads in Node ${process.version}: ${Object.keys(lib).length} exports`)
