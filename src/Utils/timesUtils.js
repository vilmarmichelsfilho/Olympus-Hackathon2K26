import { times } from '@/data/times'
import { computed } from 'vue'
import { id_torneioAtual } from './cod_torneioUtils'
import { criarEntidade, atualizarEntidade } from '@/services/entidadesApi'

const timesFiltradosPorTorneio = computed(() => {
  const torneioId = id_torneioAtual.value
  return times.filter((time) => time.id_torneio == torneioId)
})

const timesOrdenados = computed(() =>
  [...timesFiltradosPorTorneio.value].sort(
    (timeA, timeB) => timeB.pontuacaogeral_time - timeA.pontuacaogeral_time,
  ),
)

function definirposicao(id) {
  return timesOrdenados.value.findIndex((time) => time.id_time == id) + 1
}

async function adicionarTime(nome, pontuacao, cor, escudo, torneio) {
  const timesDoTorneio = times.filter((time) => time.id_torneio === torneio)

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

  await criarEntidade('times', {
    id_torneio: torneio,
    id_adm: 1,
    cor_time: cor,
    pontuacaogeral_time: Number(pontuacao) || 0,
    escudo_time: escudo,
    nome_time: nome.trim(),
  }, times)
  return true
}

async function editarTime(nome, pontuacao, cor, escudo, id) {
  return Boolean(await atualizarEntidade('times', id, {
    cor_time: cor, pontuacaogeral_time: Number(pontuacao) || 0,
    escudo_time: escudo, nome_time: nome.trim(),
  }, times))
}

export { timesOrdenados, definirposicao, adicionarTime, editarTime }
