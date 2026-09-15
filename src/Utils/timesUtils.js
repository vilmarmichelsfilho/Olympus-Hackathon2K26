import { times } from '@/data/times'
import { turmas } from '@/data/turmas'
import { computed } from 'vue'
const timesDoMaiorAoMenor = computed(() => {
  return [...times].sort((a, b) => b.pontuacaogeral_time - a.pontuacaogeral_time)
})
function definirposicao(id) {
  const posicao = timesDoMaiorAoMenor.value.findIndex((t) => t.cod_time == id) + 1
  return posicao
}

function adicionarTime(nome, um, dois, tres, pontuacao) {
  if (times.some((item) => item.nome === nome)) {
    alert('Já existe um time com este nome!')
  } else {
    const maiorId = Math.max(...times.map((item) => item.id))
    turmas[turmas.findIndex(item => item.cod_turma === um)].cod_time = maiorId+1
    turmas[turmas.findIndex(item => item.cod_turma === dois)].cod_time = maiorId+1
    turmas[turmas.findIndex(item => item.cod_turma === tres)].cod_time = maiorId+1
    times.push({
      cod_time: maiorId + 1,
      cod_adm: 1,
      escudo_time: 'No image',
      nome_time: nome,
      cor_time: 'Preto',
      pontuacaogeral_time: pontuacao,
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
