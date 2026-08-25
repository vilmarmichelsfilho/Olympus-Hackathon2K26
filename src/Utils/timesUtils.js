import { times } from '@/data/times'
import { computed } from 'vue'
const timesDoMaiorAoMenor = computed(() => {
  return [...times].sort((a, b) => b.pontuacao_geral - a.pontuacao_geral)
})
function definirposicao(id) {
  const posicao = timesDoMaiorAoMenor.value.findIndex((t) => t.id == id) + 1
  return posicao
}

function adicionarTime(nome, um, dois, tres, vitorias, empates, derrotas) {
  if (times.some((item) => item.nome === nome)) {
    alert('Já existe um time com este nome!')
  } else {
    const maiorId = Math.max(...times.map((item) => item.id))
    times.push({
      id: maiorId + 1,
      escudo: 'No image',
      nome: nome,
      cor: 'Preto',
      time1: um,
      time2: dois,
      time3: tres,
      vitorias: vitorias,
      empates: empates,
      derrotas: derrotas,
      pontuacao_geral: vitorias * 3 + empates,
    })
  }
}

function editarTime(nome, um, dois, tres, vitorias, empates, derrotas, id) {
  const index = times.findIndex((item) => item.id === id)
  times[index].nome = nome;
  times[index].time1 = um;
  times[index].time2 = dois;
  times[index].time3 = tres;;
  times[index].vitorias = vitorias;
  times[index].empates = empates;
  times[index].derrotas = derrotas;
  times[index].pontuacao_geral = vitorias * 3 + empates;
}

export { timesDoMaiorAoMenor, definirposicao, adicionarTime, editarTime }
