
 import { jogos } from '@/data/jogos';
import { computed } from 'vue';
const totalJogosHoje = computed(() => {
  const hoje = new Date().toISOString().split('T')[0]
  return jogos.filter((jogo) => jogo.data === hoje).length
})
const conflitos = computed(() => {
  const encontrados = []

  jogos.forEach((jogoA, i) => {
    jogos.forEach((jogoB, j) => {
      if (i < j) {
        const mesmaData = jogoA.data === jogoB.data
        const mesmoLocal = jogoA.local === jogoB.local
        const mesmoHorario = jogoA.horario === jogoB.horario

        if (mesmaData && mesmoLocal && mesmoHorario) {
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
    const [ano, mes, dia] = jogo.data.split('-').map(Number)
    const data = new Date(ano, mes - 1, dia)
    const nomeDia = dias[data.getDay()]
    contagem[nomeDia]++
  })

  return contagem
}
export{totalJogosHoje, totalConflitos, jogosPorDia}

