import { times } from '@/data/times'
import { computed } from 'vue'
import { cod_torneioAtual } from './cod_torneioUtils'
const timesFiltradosPorTorneio = computed(() => {
  const torneioId = cod_torneioAtual.value
  return times.filter((t) => {
    return t.cod_torneio == torneioId
  })
})
const timesDoMaiorAoMenor = computed(
  () => {
    if (timesFiltradosPorTorneio.value.length > 0) {
      return [...timesFiltradosPorTorneio.value].sort(
        (a, b) => b.pontuacaogeral_time - a.pontuacaogeral_time,
      )
    }
    return []
  },
)
function definirposicao(id) {
  const posicao = timesDoMaiorAoMenor.value.findIndex((t) => t.cod_time == id) + 1
  return posicao
}

function adicionarTime(nome, pontuacao, cor, escudo, torneio) {
  if (times.some((item) => item.nome === nome)) {
    alert('Já existe um time com este nome!')
  } else {
    const maiorId = Math.max(...times.map((item) => item.cod_time))
    times.push({
      cod_time: maiorId+1,
      cod_torneio: torneio,
      cor_time: cor,
      pontuacaogeral_time: pontuacao,
      escudo_time: escudo,
      nome_time: nome
    })
  }
}

function editarTime(nome, pontuacao, cor, escudo, id) {
  const index = times.findIndex((item) => item.id === id)
  times[id].cor_time = cor;
  times[id].pontuacaogeral_time = pontuacao;
  times[id].escudo_time = escudo;
  times[id].nome_time = nome;
}

export { timesDoMaiorAoMenor, definirposicao, adicionarTime, editarTime }
