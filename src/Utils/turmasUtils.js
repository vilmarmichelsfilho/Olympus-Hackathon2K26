import { turmas } from '@/data/turmas'
import { codTorneioSelecionadoAdm } from './cod_torneioAdmUtils'

function excluir(id) {
  const index = turmas.findIndex((turma) => turma.cod_turma === id)
  if (index !== -1) turmas.splice(index, 1)
}

function adicionar(tecnico, ano, serie, time, torneio) {
  const turmasDoTorneio = turmas.filter((turma) => turma.cod_torneio == torneio)
  const turmasDoTime = turmasDoTorneio.filter((turma) => turma.cod_time == time)
  const turmaJaExiste = turmasDoTorneio.some(
    (turma) =>
      Number(turma.ano_turma) === Number(ano) &&
      turma.tecnico_turma.trim().toLowerCase() === String(tecnico).trim().toLowerCase() &&
      Number(turma.numero_turma) === Number(serie),
  )

  if (!time) {
    alert('Selecione um time.')
    return false
  }
  if (turmaJaExiste) {
    alert('Já existe uma turma igual esta adicionada')
    return false
  }
  if (turmasDoTorneio.length >= 24) {
    alert('O torneio pode ter no máximo 24 turmas.')
    return false
  }
  if (turmasDoTime.length >= 3) {
    alert('Cada time pode ter no máximo 3 turmas.')
    return false
  }
  if (turmasDoTime.some((turma) => Number(turma.ano_turma) === Number(ano))) {
    alert('Este time já possui uma turma deste ano.')
    return false
  }

  const maiorId = turmas.length ? Math.max(...turmas.map((turma) => turma.cod_turma)) : 0
  turmas.push({
    cod_turma: maiorId + 1,
    cod_time: time,
    cod_torneio: torneio,
    tecnico_turma: tecnico,
    ano_turma: Number(ano),
    numero_turma: Number(serie),
    nome_turma: `${ano}${tecnico}${serie}`,
  })
  return true
}

function editar(id, tecnico, ano, serie) {
  const duplicada = turmas.some(
    (turma) =>
      turma.cod_turma !== id &&
      turma.tecnico_turma == tecnico &&
      turma.ano_turma == ano &&
      turma.numero_turma == serie &&
      turma.cod_torneio == codTorneioSelecionadoAdm.value,
  )

  if (duplicada) {
    alert('Esta turma já existe!')
    return false
  }

  const index = turmas.findIndex((turma) => turma.cod_turma === id)
  if (index === -1) return false

  turmas[index].tecnico_turma = tecnico
  turmas[index].ano_turma = Number(ano)
  turmas[index].numero_turma = Number(serie)
  return true
}

export { excluir, adicionar, editar }
