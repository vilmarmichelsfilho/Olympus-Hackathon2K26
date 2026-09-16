import { jogosDoTorneio } from './cod_torneioAdmUtils'
import { conflitosDoTorneio } from './conflitosUtils'
import { computed } from 'vue'
const totalJogosHoje = computed(() => {
  const hoje = new Date().toISOString().split('T')[0]
  return jogosDoTorneio.value.filter((jogo) => jogo.data === hoje).length
})
function separarDataHorario(horario_jogo) {
  const [data, horario] = horario_jogo.split(' ')
  return { data, horario }
}
const totalConflitos = computed(() => conflitosDoTorneio.value.length)

function jogosPorDia(jogos) {
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  const contagem = {
    Segunda: 0,
    Terça: 0,
    Quarta: 0,
    Quinta: 0,
    Sexta: 0,
    Sábado: 0,
    Domingo: 0,
  }

  jogos.forEach((jogo) => {
    const { data } = separarDataHorario(jogo.horario_jogo)
    const [ano, mes, dia] = data.split('-').map(Number)
    const dataObj = new Date(ano, mes - 1, dia)
    const nomeDia = dias[dataObj.getDay()]
    contagem[nomeDia]++
  })

  return contagem
}
export { totalJogosHoje, totalConflitos, jogosPorDia }
