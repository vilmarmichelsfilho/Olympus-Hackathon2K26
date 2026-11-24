import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'vite'

const original = await readFile('db.json', 'utf8')
const dir = await mkdtemp(join(tmpdir(), 'olympus-flow-'))
const file = join(dir, 'db.json')
await writeFile(file, original)
const base = 'http://localhost:3196'
const child = spawn(process.execPath, ['scripts/start-api.mjs', file, '--port', '3196'], {
  stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
})
let logs = ''
child.stderr.on('data', chunk => { logs += chunk })
let vite
const realFetch = globalThis.fetch
try {
  for (let i = 0; ; i++) {
    try { await realFetch(`${base}/torneios`); break } catch {
      if (i > 100) throw new Error(`API não iniciou: ${logs}`)
      await new Promise(r => setTimeout(r, 50))
    }
  }
  vite = await createServer({
    configFile: false, server: { middlewareMode: true, watch: null },
    resolve: { alias: { '@': resolve('src') } },
    define: { 'import.meta.env.VITE_API_URL': JSON.stringify(base) },
  })
  const load = path => vite.ssrLoadModule(`/src/${path}.js`)
  const api = await load('services/api')
  assert.equal(api.API_URL, base)
  const draft = await load('services/torneioDraft')
  const utils = await load('Utils/adicionarUtils')
  const entidades = await load('services/entidadesApi')
  const turmasApi = await load('services/turmasApi')
  const gerador = await load('Utils/gerarTorneioUtils')
  const arbitrosApi = (await load('composables/useArbitros')).useArbitros()
  const stores = {}
  const carregadores = []
  for (const [resource, fn] of Object.entries({ torneios: 'carregarTorneios', modalidades: 'carregarModalidades', times: 'carregarTimes', arbitros: 'carregarArbitrosDados' })) {
    const mod = await load(`data/${resource}`)
    stores[resource] = mod[resource]
    carregadores.push(mod[fn])
  }
  async function recarregar() { await Promise.all(carregadores.map(fn => fn())) }
  async function snapshot() { return JSON.parse(await readFile(file, 'utf8')) }
  function descartar(id) {
    draft.descartarRascunho()
    draft.removerRascunhoDasListas(id, Object.values(stores))
  }
  async function preparar(nome) {
    await recarregar()
    const id = await utils.salvarTorneio({ nome, dataInicio: '2026-09-21', dataFim: '2026-09-25', status: 'Planejado' })
    await utils.adicionarDadosApresentacao(id)
    await arbitrosApi.carregarArbitros()
    assert.equal(arbitrosApi.arbitros.value.filter(a => a.id_torneio === id).length, 4)
    return id
  }
  async function gerar(id) {
    const jogos = await api.listar('jogos')
    return gerador.gerarJogos(id, { ...stores, jogos })
  }

  // Draft create/edit/delete/cancel must not send mutations to the API.
  const baseline = await snapshot()
  const cancelId = await preparar('Cancelar')
  assert.equal(draft.listarRascunho('times').length, 8)
  assert.equal(draft.listarRascunho('turmas').length, 24)
  const m = draft.listarRascunho('modalidades')[0]
  await entidades.atualizarEntidade('modalidades', m.id, { nome_modalidade: 'Futsal editado' }, stores.modalidades)
  assert.equal(draft.listarRascunho('modalidades')[0].nome_modalidade, 'Futsal editado')
  const turma = draft.listarRascunho('turmas')[0]
  await turmasApi.atualizarTurma(turma.id, { nome_turma: 'Turma editada' })
  assert.equal(draft.listarRascunho('turmas')[0].nome_turma, 'Turma editada')
  await turmasApi.excluirTurma(turma.id)
  assert.equal(draft.listarRascunho('turmas').length, 23)
  const a = draft.listarRascunho('arbitros')[0]
  await arbitrosApi.atualizarArbitro(a.id, { nome_arbitro: 'Árbitro editado' })
  assert.equal(stores.arbitros.find(item => String(item.id) === a.id).nome_arbitro, 'Árbitro editado')
  await arbitrosApi.excluirArbitro(a.id)
  assert.equal(draft.listarRascunho('arbitros').length, 3)
  await entidades.excluirEntidade('modalidades', m.id, stores.modalidades)
  assert.equal(draft.listarRascunho('modalidades').length, 5)
  assert.deepEqual(await snapshot(), baseline)
  descartar(cancelId)
  console.log('PASS: rascunho, edições, exclusões, árbitros e cancelamento sem gravações')

  // Full creation, then a second creation using stores reloaded with random IDs.
  for (let rodada = 0; rodada < 2; rodada++) {
    const antes = await snapshot()
    const id = await preparar(`Integração ${rodada}`)
    const resultado = await gerar(id)
    assert.equal(resultado.valido, true, resultado.mensagem)
    assert.equal(resultado.novosJogos.length, 42)
    assert.equal(resultado.novosParticipantes.length, 84)
    const ids = await draft.confirmarRascunho(resultado.novosJogos, resultado.novosParticipantes)
    const realId = ids.get(`torneios:${id}`)
    const depois = await snapshot()
    for (const [resource, delta] of Object.entries({ torneios: 1, modalidades: 6, arbitros: 4, times: 8, turmas: 24, jogos: 42, participa: 84 })) {
      assert.equal(depois[resource].length - antes[resource].length, delta, resource)
    }
    const modalidades = depois.modalidades.filter(x => x.id_torneio === realId)
    const modIds = new Set(modalidades.map(x => x.id))
    const jogos = depois.jogos.filter(x => modIds.has(x.id_modalidade))
    const gameIds = new Set(jogos.map(x => x.id))
    const arbIds = new Set(depois.arbitros.filter(x => x.id_torneio === realId).map(x => x.id))
    const timeIds = new Set(depois.times.filter(x => x.id_torneio === realId).map(x => x.id))
    for (const mod of modalidades) assert.equal(jogos.filter(x => x.id_modalidade === mod.id).length, 7)
    for (const jogo of jogos) {
      assert.ok(jogo.horario_jogo >= '2026-09-21' && jogo.horario_jogo.slice(0, 10) <= '2026-09-25')
      const hora = jogo.horario_jogo.slice(11, 16)
      assert.ok(hora >= '08:00' && hora < '17:00')
      assert.ok(arbIds.has(jogo.id_arbitro))
      for (const campo of ['origem_jogo_a', 'origem_jogo_b']) if (jogo[campo] != null) assert.ok(gameIds.has(jogo[campo]))
      const participantes = depois.participa.filter(x => x.id_jogo === jogo.id)
      assert.equal(participantes.length, 2)
      for (const p of participantes) if (p.id_time != null) assert.ok(timeIds.has(p.id_time))
    }
    for (const turma of depois.turmas.filter(x => x.id_torneio === realId)) assert.ok(timeIds.has(turma.id_time))
    await recarregar()
    assert.ok(stores.torneios.some(t => t.id_torneio === realId))
    assert.equal(stores.modalidades.filter(m => m.id_torneio === realId).length, 6)
    console.log(`PASS: criação ${rodada + 1}, 6 modalidades/42 jogos/84 participantes, datas, vínculos e recarga`)
  }

  // Fail midway through participants, verify complete rollback and successful retry.
  const antesFalha = await snapshot()
  const idFalha = await preparar('Falha simulada')
  const resultado = await gerar(idFalha)
  let posts = 0
  globalThis.fetch = (url, options) => {
    if (String(url).endsWith('/participa') && options?.method === 'POST' && ++posts === 5) {
      return Promise.resolve(new Response('{}', { status: 500 }))
    }
    return realFetch(url, options)
  }
  await assert.rejects(draft.confirmarRascunho(resultado.novosJogos, resultado.novosParticipantes), /participa/)
  globalThis.fetch = realFetch
  assert.deepEqual(await snapshot(), antesFalha)
  assert.equal(draft.rascunhoAtivo(), true)
  await draft.confirmarRascunho(resultado.novosJogos, resultado.novosParticipantes)
  assert.equal((await snapshot()).jogos.length, antesFalha.jogos.length + 42)
  console.log('PASS: falha parcial, rollback completo e nova tentativa')

  // Returning success from POST must not hide a missing persisted modality.
  const antesPerda = await snapshot()
  const idPerda = await preparar('Perda simulada')
  const jogosPerda = await gerar(idPerda)
  let escondido = false
  globalThis.fetch = async (url, options) => {
    const response = await realFetch(url, options)
    if (!escondido && String(url).endsWith('/modalidades') && !options?.method) {
      escondido = true
      const items = await response.json()
      return Response.json(items.slice(0, -1))
    }
    return response
  }
  await assert.rejects(draft.confirmarRascunho(jogosPerda.novosJogos, jogosPerda.novosParticipantes), /Gravação incompleta em modalidades/)
  globalThis.fetch = realFetch
  assert.deepEqual(await snapshot(), antesPerda)
  descartar(idPerda)
  console.log('PASS: modalidade ausente detectada, sem falso sucesso e com rollback')
  assert.equal(await readFile('db.json', 'utf8'), original)
  console.log('PASS: db.json original preservado')
} finally {
  globalThis.fetch = realFetch
  await vite?.close()
  child.kill()
  await once(child, 'exit')
}
