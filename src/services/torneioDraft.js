import { criar, excluir, listar } from './api'

let draft = null
const recursoPorCampo = {
  id_torneio: 'torneios', id_time: 'times', id_modalidade: 'modalidades',
  id_arbitro: 'arbitros', id_jogo: 'jogos', origem_jogo_a: 'jogos', origem_jogo_b: 'jogos',
}
const ordem = ['torneios', 'modalidades', 'arbitros', 'times', 'turmas', 'jogos', 'participa']

export function iniciarRascunho() {
  if (draft) throw new Error('Já existe um cadastro de torneio em andamento.')
  draft = { registros: [], salvando: false }
}

export function rascunhoAtivo() { return Boolean(draft) }

export function listarRascunho(resource) {
  return draft ? draft.registros.filter(item => item.resource === resource).map(item => ({ ...item.registro })) : []
}

export function registroDoRascunho(resource, id) {
  return draft?.registros.find(item => item.resource === resource && String(item.registro.id) === String(id))
}

export function pertenceAoRascunho(idTorneio) {
  return Boolean(registroDoRascunho('torneios', idTorneio))
}

export function adicionarAoRascunho(resource, registro) {
  if (!draft || draft.salvando) return false
  if (registroDoRascunho(resource, registro.id)) throw new Error(`ID repetido no rascunho de ${resource}: ${registro.id}`)
  draft.registros.push({ resource, registro: { ...registro } })
  return true
}

export function atualizarNoRascunho(resource, id, dados) {
  const item = registroDoRascunho(resource, id)
  if (!item || draft.salvando) return null
  Object.assign(item.registro, dados, { id: item.registro.id })
  return { ...item.registro }
}

export function excluirDoRascunho(resource, id) {
  const item = registroDoRascunho(resource, id)
  if (!item || draft.salvando) return false
  draft.registros.splice(draft.registros.indexOf(item), 1)
  return true
}

export function removerRascunhoDasListas(idTorneio, listas = []) {
  for (const lista of listas) {
    for (let i = lista.length - 1; i >= 0; i--) {
      if (String(lista[i].id_torneio) === String(idTorneio)) lista.splice(i, 1)
    }
  }
}

export async function confirmarRascunho(novosJogos = [], novosParticipantes = []) {
  if (!draft) throw new Error('Rascunho do torneio não encontrado.')
  if (draft.salvando) throw new Error('O torneio já está sendo salvo.')
  const atual = draft
  atual.salvando = true
  const registros = [
    ...atual.registros,
    ...novosJogos.map(registro => ({ resource: 'jogos', registro })),
    ...novosParticipantes.map((registro, i) => ({ resource: 'participa', registro: { ...registro, id: `participa-${i}` } })),
  ].sort((a, b) => ordem.indexOf(a.resource) - ordem.indexOf(b.resource))
  const criados = []
  const ids = new Map()
  try {
    for (const item of registros) {
      const payload = { ...item.registro }
      delete payload.id
      for (const [campo, recurso] of Object.entries(recursoPorCampo)) {
        if (payload[campo] == null) continue
        const chave = `${recurso}:${payload[campo]}`
        if (ids.has(chave)) payload[campo] = ids.get(chave)
      }
      const salvo = await criar(item.resource, payload)
      if (salvo?.id == null) throw new Error(`API sem ID ao criar ${item.resource}.`)
      criados.push({ resource: item.resource, registro: salvo })
      ids.set(`${item.resource}:${item.registro.id}`, salvo.id)
    }
    for (const resource of ordem) {
      const esperados = criados.filter(item => item.resource === resource)
      if (!esperados.length) continue
      const salvos = new Map((await listar(resource)).map(item => [String(item.id), item]))
      for (const { registro } of esperados) {
        const salvo = salvos.get(String(registro.id))
        if (!salvo || Object.entries(registro).some(([k, v]) => JSON.stringify(salvo[k]) !== JSON.stringify(v))) {
          throw new Error(`Gravação incompleta em ${resource}. Reinicie a API com npm run api.`)
        }
      }
    }
    draft = null
    return ids
  } catch (erro) {
    const falhas = []
    for (const item of criados.reverse()) {
      try { await excluir(item.resource, item.registro.id) } catch (falha) { falhas.push(falha.message) }
    }
    atual.salvando = false
    if (falhas.length) throw new Error(`${erro.message} Falha ao desfazer: ${falhas.join('; ')}`, { cause: erro })
    throw erro
  }
}

export function descartarRascunho() {
  if (draft?.salvando) return false
  draft = null
  return true
}
