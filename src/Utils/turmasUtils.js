import { listarTurmas, criarTurma, atualizarTurma, excluirTurma } from '@/services/turmasApi'
import { codTorneioSelecionadoAdm } from './cod_torneioAdmUtils'

export async function excluir(id) {
  await excluirTurma(id)
}

export async function adicionar(tecnico, ano, serie, time, torneio) {
  const turmas = await listarTurmas()
  const doTorneio = turmas.filter((turma) => Number(turma.cod_torneio) === Number(torneio))
  const doTime = doTorneio.filter((turma) => Number(turma.cod_time) === Number(time))
  const repetida = doTorneio.some((turma) => Number(turma.ano_turma) === Number(ano)
    && turma.tecnico_turma.trim().toLowerCase() === String(tecnico).trim().toLowerCase()
    && Number(turma.numero_turma) === Number(serie))

  if (!time) { alert('Selecione um time.'); return false }
  if (repetida) { alert('Já existe uma turma igual a esta.'); return false }
  if (doTorneio.length >= 24) { alert('O torneio pode ter no máximo 24 turmas.'); return false }
  if (doTime.length >= 3) { alert('Cada time pode ter no máximo 3 turmas.'); return false }
  if (doTime.some((turma) => Number(turma.ano_turma) === Number(ano))) {
    alert('Este time já possui uma turma deste ano.')
    return false
  }

  const proximoId = turmas.reduce((maior, turma) => Math.max(maior, Number(turma.id) || 0), 0) + 1
  await criarTurma({
    id: String(proximoId),
    cod_torneio: Number(torneio),
    cod_time: Number(time),
    tecnico_turma: tecnico,
    ano_turma: Number(ano),
    numero_turma: Number(serie),
    nome_turma: `${ano}${tecnico}${serie}`,
  })
  return true
}

export async function editar(id, tecnico, ano, serie) {
  const turmas = await listarTurmas()
  const turma = turmas.find((item) => Number(item.cod_turma) === Number(id) || String(item.id) === String(id))
  if (!turma) return false

  const repetida = turmas.some((item) => item !== turma
    && Number(item.cod_torneio) === Number(codTorneioSelecionadoAdm.value)
    && Number(item.ano_turma) === Number(ano)
    && Number(item.numero_turma) === Number(serie)
    && item.tecnico_turma.trim().toLowerCase() === String(tecnico).trim().toLowerCase())
  if (repetida) { alert('Esta turma já existe!'); return false }

  await atualizarTurma(turma.id ?? turma.cod_turma, {
    tecnico_turma: tecnico,
    ano_turma: Number(ano),
    numero_turma: Number(serie),
    nome_turma: `${ano}${tecnico}${serie}`,
  })
  return true
}
