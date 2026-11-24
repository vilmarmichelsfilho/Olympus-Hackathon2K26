import { atualizar, criar, excluir } from './api'

const specs = {
  times: ['times', 'cod_time', 'id_torneio', 'cod_torneio'],
  modalidades: ['modalidades', 'cod_modalidade', 'id_torneio', 'cod_torneio'],
  arbitros: ['arbitros', 'cod_arbitro', 'id_torneio', 'cod_torneio'],
  torneios: ['torneios', 'cod_torneio', 'id_adm', 'cod_adm'],
}

export async function criarEntidade(tipo, registro, lista) {
  const [resource, codigo, fk, legacyFk] = specs[tipo]
  const payload = { ...registro }
  delete payload[codigo]
  const idsNumericos = lista.map((item) => Number(item.id ?? item[codigo])).filter(Number.isFinite)
  payload.id = String(Math.max(0, ...idsNumericos) + 1)
  if (legacyFk in payload) { payload[fk] = String(payload[legacyFk]); delete payload[legacyFk] }
  const salvo = await criar(resource, payload)
  const resultado = { ...salvo, [codigo]: Number(salvo.id) || salvo.id }
  if (fk === 'id_torneio') resultado.cod_torneio = Number(salvo.id_torneio)
  else if (fk === 'id_adm') resultado.cod_adm = Number(salvo.id_adm)
  lista.push(resultado)
  return resultado
}

export async function atualizarEntidade(tipo, codigoValor, alteracoes, lista) {
  const [resource, codigo, fk, legacyFk] = specs[tipo]
  const registro = lista.find((item) => String(item[codigo] ?? item.id) === String(codigoValor))
  if (!registro) return null
  const payload = { ...alteracoes }
  delete payload[codigo]
  if (legacyFk in payload) { payload[fk] = String(payload[legacyFk]); delete payload[legacyFk] }
  const salvo = await atualizar(resource, registro.id ?? codigoValor, payload)
  Object.assign(registro, salvo, alteracoes)
  return registro
}

export async function excluirEntidade(tipo, codigoValor, lista) {
  const [resource, codigo] = specs[tipo]
  const registro = lista.find((item) => String(item[codigo] ?? item.id) === String(codigoValor))
  if (!registro) return false
  await excluir(resource, registro.id ?? codigoValor)
  const index = lista.indexOf(registro)
  if (index >= 0) lista.splice(index, 1)
  return true
}
