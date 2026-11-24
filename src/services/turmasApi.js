import { API_URL } from './api'

export async function listarTurmas() {
  const resposta = await fetch(`${API_URL}/turmas`)
  if (!resposta.ok) throw new Error('Não foi possível carregar as turmas.')
  const turmas = await resposta.json()
  return turmas.map((turma) => ({
    ...turma,
    cod_turma: Number.isNaN(Number(turma.cod_turma ?? turma.id)) ? (turma.cod_turma ?? turma.id) : Number(turma.cod_turma ?? turma.id),
    cod_torneio: Number.isNaN(Number(turma.cod_torneio ?? turma.id_torneio)) ? (turma.cod_torneio ?? turma.id_torneio) : Number(turma.cod_torneio ?? turma.id_torneio),
    cod_time: Number.isNaN(Number(turma.cod_time ?? turma.id_time)) ? (turma.cod_time ?? turma.id_time) : Number(turma.cod_time ?? turma.id_time),
  }))
}

export async function criarTurma(turma) {
  const turmasExistentes = await listarTurmas()
  const maiorId = turmasExistentes.reduce((maior, item) => Math.max(maior, Number(item.id) || 0), 0)
  const id = String(Math.max(Number(turma.id) || 0, maiorId + 1))
  const payload = {
    id,
    id_torneio: String(turma.cod_torneio ?? turma.id_torneio),
    id_time: String(turma.cod_time ?? turma.id_time),
    tecnico_turma: turma.tecnico_turma,
    ano_turma: Number(turma.ano_turma),
    numero_turma: Number(turma.numero_turma),
    nome_turma: turma.nome_turma,
  }
  const resposta = await fetch(`${API_URL}/turmas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!resposta.ok) throw new Error('Não foi possível salvar a turma.')
  return { ...await resposta.json(), cod_turma: Number(id) }
}

export async function atualizarTurma(id, turma) {
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
  const resposta = await fetch(`${API_URL}/turmas/${encodeURIComponent(id)}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error('Não foi possível excluir a turma.')
}

export async function excluirTurmasDoTorneio(codTorneio) {
  const turmas = await listarTurmas()
  await Promise.all(turmas
    .filter((turma) => Number(turma.cod_torneio) === Number(codTorneio))
    .map((turma) => excluirTurma(turma.id ?? turma.cod_turma)))
}

export async function excluirTurmasDoTime(codTime) {
  const turmas = await listarTurmas()
  await Promise.all(turmas
    .filter((turma) => Number(turma.cod_time) === Number(codTime))
    .map((turma) => excluirTurma(turma.id ?? turma.cod_turma)))
}
