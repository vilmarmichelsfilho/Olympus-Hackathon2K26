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

function adicionarTime(nome, pontuacao, cor, escudo, torneio) {
  if (times.some((item) => item.nome === nome)) {
    alert('Já existe um time com este nome!')
  } else {
    const maiorId = Math.max(...times.map((item) => item.cod_time))
    times.push({
      cod_time: maiorId+1,
      cod_torneio: torneio,
      cod_adm: 1,
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
