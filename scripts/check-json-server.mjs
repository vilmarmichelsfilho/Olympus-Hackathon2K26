import { mkdtemp, writeFile, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { once } from 'node:events'

for (const mode of ['development', 'production']) {
  const dir = await mkdtemp(join(tmpdir(), 'olympus-api-check-'))
  const file = join(dir, 'db.json')
  await writeFile(file, JSON.stringify({ jogos: [] }))
  const port = mode === 'development' ? 3197 : 3198
  const child = spawn(process.execPath, [resolve('node_modules/json-server/lib/bin.js'), file, '--port', String(port)], {
    env: { ...process.env, NODE_ENV: mode }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  })
  try {
    for (let attempt = 0; ; attempt++) {
      try { await fetch(`http://localhost:${port}/jogos`); break } catch {
        if (attempt > 100) throw new Error('API não iniciou')
        await new Promise(r => setTimeout(r, 50))
      }
    }
    for (let i = 0; i < 150; i++) {
      const response = await fetch(`http://localhost:${port}/jogos`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ indice: i }),
      })
      if (!response.ok) throw new Error(String(response.status))
    }
    await new Promise(r => setTimeout(r, 100))
    const api = await (await fetch(`http://localhost:${port}/jogos`)).json()
    const disk = JSON.parse(await readFile(file, 'utf8'))
    console.log(JSON.stringify({ mode, expected: 150, api: api.length, disk: disk.jogos.length }))
  } finally {
    child.kill()
    await once(child, 'exit')
  }
}
