import { times } from '@/data/times'
import { computed } from 'vue'
import { cod_torneioAtual } from './cod_torneioUtils'

const timesFiltradosPorTorneio = computed(() => {
  const torneioId = cod_torneioAtual.value
  return times.filter((time) => time.cod_torneio == torneioId)
})

const timesOrdenados = computed(() =>
  [...timesFiltradosPorTorneio.value].sort(
    (timeA, timeB) => timeB.pontuacaogeral_time - timeA.pontuacaogeral_time,
  ),
)

function definirposicao(id) {
  return timesOrdenados.value.findIndex((time) => time.cod_time == id) + 1
}

function adicionarTime(nome, pontuacao, cor, escudo, torneio) {
  const timesDoTorneio = times.filter((time) => time.cod_torneio === torneio)

  if (timesDoTorneio.length >= 8) {
    alert('O torneio pode ter no máximo 8 times.')
    return false
  }
  if (
    timesDoTorneio.some(
      (time) => time.nome_time.trim().toLowerCase() === nome.trim().toLowerCase(),
    )
  ) {
    alert('Já existe um time com este nome neste torneio!')
    return false
  }

  const maiorId = times.length ? Math.max(...times.map((time) => time.cod_time)) : 0
  times.push({
    cod_time: maiorId + 1,
    cod_torneio: torneio,
    cor_time: cor,
    pontuacaogeral_time: Number(pontuacao) || 0,
    escudo_time: escudo,
    nome_time: nome.trim(),
  })
  return true
}

function editarTime(nome, pontuacao, cor, escudo, indice) {
  if (!times[indice]) return false

  times[indice].cor_time = cor
  times[indice].pontuacaogeral_time = Number(pontuacao) || 0
  times[indice].escudo_time = escudo
  times[indice].nome_time = nome.trim()
  return true
}

export { timesOrdenados, definirposicao, adicionarTime, editarTime }
