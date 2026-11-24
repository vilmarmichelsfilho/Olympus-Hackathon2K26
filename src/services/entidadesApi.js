import { normalizarId } from '@/services/api'
import { atualizar, criar, excluir } from './api'
import { adicionarAoRascunho, pertenceAoRascunho, atualizarNoRascunho, excluirDoRascunho } from './torneioDraft'

const specs = {
  times: ['times', 'id_time', 'id_torneio'],
  modalidades: ['modalidades', 'id_modalidade', 'id_torneio'],
  arbitros: ['arbitros', 'id_arbitro', 'id_torneio'],
  torneios: ['torneios', 'id_torneio', 'id_adm'],
}

export async function criarEntidade(tipo, registro, lista) {
  const [resource, codigo, fk] = specs[tipo]
  const payload = { ...registro }
  delete payload[codigo]
  const idsNumericos = lista.map((item) => Number(item.id ?? item[codigo])).filter(Number.isFinite)
  payload.id = String(Math.max(0, ...idsNumericos) + 1)
  if (tipo === 'torneios' || pertenceAoRascunho(payload.id_torneio)) {
    // A tournament is staged only when its wizard has started a draft.
    if (!adicionarAoRascunho(resource, payload)) throw new Error('Rascunho indisponível.')
    const salvo = { ...payload }
    const resultado = { ...salvo, [codigo]: Number(salvo.id) || salvo.id }
    if (fk === 'id_torneio') resultado.id_torneio = normalizarId(salvo.id_torneio)
    else if (fk === 'id_adm') resultado.id_adm = normalizarId(salvo.id_adm)
    lista.push(resultado)
    return resultado
  }
  const salvo = await criar(resource, payload)
  const resultado = { ...salvo, [codigo]: Number(salvo.id) || salvo.id }
  if (fk === 'id_torneio') resultado.id_torneio = normalizarId(salvo.id_torneio)
  else if (fk === 'id_adm') resultado.id_adm = normalizarId(salvo.id_adm)
  lista.push(resultado)
  return resultado
}

export async function atualizarEntidade(tipo, codigoValor, alteracoes, lista) {
  const [resource, codigo] = specs[tipo]
  const registro = lista.find((item) => String(item[codigo] ?? item.id) === String(codigoValor))
  if (!registro) return null
  const payload = { ...alteracoes }
  delete payload[codigo]
  const salvo = atualizarNoRascunho(resource, registro.id ?? codigoValor, payload)
    ?? await atualizar(resource, registro.id ?? codigoValor, payload)
  Object.assign(registro, salvo, alteracoes)
  return registro
}

export async function excluirEntidade(tipo, codigoValor, lista) {
  const [resource, codigo] = specs[tipo]
  const registro = lista.find((item) => String(item[codigo] ?? item.id) === String(codigoValor))
  if (!registro) return false
  if (!excluirDoRascunho(resource, registro.id ?? codigoValor)) await excluir(resource, registro.id ?? codigoValor)
  const index = lista.indexOf(registro)
  if (index >= 0) lista.splice(index, 1)
  return true
}
