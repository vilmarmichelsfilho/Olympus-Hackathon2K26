import { normalizarId } from '@/services/api'
import { modalidades } from '@/data/modalidades'
import { adquirirConflitos } from './conflitosUtils'

function adquirirJogosDoTorneio(jogos, codTorneio) {
  return jogos.filter((jogo) => {
    const modalidade = modalidades.find(
      (item) => normalizarId(item.id_modalidade) === normalizarId(jogo.id_modalidade),
    )
    return normalizarId(modalidade?.id_torneio) === normalizarId(codTorneio)
  })
}

function separarDataHorario(horarioJogo) {
  const [data, horario] = horarioJogo.split(' ')
  return { data, horario }
}

function calcularTotalJogosHoje(jogos) {
  const hoje = new Date().toISOString().slice(0, 10)
  return jogos.filter((jogo) => separarDataHorario(jogo.horario_jogo).data === hoje).length
}

function calcularTotalConflitos(jogos) {
  return adquirirConflitos(jogos).length
}

function jogosPorDia(jogos) {
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const contagem = Object.fromEntries(dias.map((dia) => [dia, 0]))

  jogos.forEach((jogo) => {
    const data = separarDataHorario(jogo.horario_jogo).data
    const [ano, mes, dia] = data.split('-').map(Number)
    contagem[dias[new Date(ano, mes - 1, dia).getDay()]]++
  })

  return contagem
}

export {
  adquirirJogosDoTorneio,
  calcularTotalJogosHoje,
  calcularTotalConflitos,
  jogosPorDia,
}
