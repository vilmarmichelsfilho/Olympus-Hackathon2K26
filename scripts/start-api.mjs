// Avoid the beta file watcher reloading an older snapshot during REST writes.
process.env.NODE_ENV = 'production'
const args = process.argv.slice(2)
process.argv = [process.execPath, 'json-server', ...(args.length ? args : ['db.json', '--port', '3000'])]
await import('json-server/lib/bin.js')
