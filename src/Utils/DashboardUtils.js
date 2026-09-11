
 import { jogos } from '@/data/jogos';
import { computed } from 'vue';
const totalJogosHoje = computed(() => {
  const hoje = new Date().toISOString().split('T')[0]
  return jogos.filter((jogo) => jogo.data === hoje).length
})
function separarDataHorario(horario_jogo) {
  const [data, horario] = horario_jogo.split(' ')
  return { data, horario }
}
const conflitos = computed(() => {
  const encontrados = []

  jogos.forEach((jogoA, i) => {
    jogos.forEach((jogoB, j) => {
      if (i < j) {
        const { data: dataA, horario: horarioA } = separarDataHorario(jogoA.horario_jogo)
        const { data: dataB, horario: horarioB } = separarDataHorario(jogoB.horario_jogo)

        const mesmaData = dataA === dataB
        const mesmoHorario = horarioA === horarioB
        if (mesmaData && mesmoHorario) {
          encontrados.push({ jogoA, jogoB })
        }
      }
    })
  })

  return encontrados
})
const totalConflitos = computed(() => conflitos.value.length)

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
export{totalJogosHoje, totalConflitos, jogosPorDia}

