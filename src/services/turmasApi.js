import { normalizarId } from '@/services/api'
import { API_URL } from './api'
import { adicionarAoRascunho, listarRascunho, rascunhoAtivo, pertenceAoRascunho, atualizarNoRascunho, excluirDoRascunho } from './torneioDraft'

export async function listarTurmas() {
  const resposta = await fetch(`${API_URL}/turmas`)
  if (!resposta.ok) throw new Error('Não foi possível carregar as turmas.')
  const turmas = await resposta.json()
  const dados = rascunhoAtivo() ? [...turmas, ...listarRascunho('turmas')] : turmas
  return dados.map((turma) => ({
    ...turma,
    id_turma: Number.isNaN(Number(turma.id_turma ?? turma.id)) ? (turma.id_turma ?? turma.id) : Number(turma.id_turma ?? turma.id),
    id_torneio: Number.isNaN(Number(turma.id_torneio)) ? turma.id_torneio : Number(turma.id_torneio),
    id_time: Number.isNaN(Number(turma.id_time)) ? turma.id_time : Number(turma.id_time),
  }))
}

export async function criarTurma(turma) {
  const turmasExistentes = await listarTurmas()
  const maiorId = turmasExistentes.reduce((maior, item) => Math.max(maior, Number(item.id) || 0), 0)
  const id = String(Math.max(Number(turma.id) || 0, maiorId + 1))
  const payload = {
    id,
    id_torneio: String(turma.id_torneio),
    id_time: String(turma.id_time),
    tecnico_turma: turma.tecnico_turma,
    ano_turma: Number(turma.ano_turma),
    numero_turma: Number(turma.numero_turma),
    nome_turma: turma.nome_turma,
  }
  if (pertenceAoRascunho(turma.id_torneio)) {
    adicionarAoRascunho('turmas', payload)
    return { ...payload, id_turma: normalizarId(id) }
  }
  const resposta = await fetch(`${API_URL}/turmas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!resposta.ok) throw new Error('Não foi possível salvar a turma.')
  const salvo = await resposta.json()
  return { ...salvo, id_turma: normalizarId(salvo.id) }
}

export async function atualizarTurma(id, turma) {
  const local = atualizarNoRascunho('turmas', id, turma)
  if (local) return local
  const resposta = await fetch(`${API_URL}/turmas/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tecnico_turma: turma.tecnico_turma,
      ano_turma: Number(turma.ano_turma),
      numero_turma: Number(turma.numero_turma),
      nome_turma: turma.nome_turma,
    }),
  })
  if (!resposta.ok) throw new Error('Não foi possível atualizar a turma.')
  return resposta.json()
}

export async function excluirTurma(id) {
  if (excluirDoRascunho('turmas', id)) return
  const resposta = await fetch(`${API_URL}/turmas/${encodeURIComponent(id)}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error('Não foi possível excluir a turma.')
}

export async function excluirTurmasDoTorneio(idTorneio) {
  const turmas = await listarTurmas()
  await Promise.all(turmas
    .filter((turma) => normalizarId(turma.id_torneio) === normalizarId(idTorneio))
    .map((turma) => excluirTurma(turma.id ?? turma.id_turma)))
}

export async function excluirTurmasDoTime(codTime) {
  const turmas = await listarTurmas()
  await Promise.all(turmas
    .filter((turma) => normalizarId(turma.id_time) === normalizarId(codTime))
    .map((turma) => excluirTurma(turma.id ?? turma.id_turma)))
}
