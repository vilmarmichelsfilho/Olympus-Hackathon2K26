import { ref } from 'vue'

const API_URL = 'http://localhost:3000'
const participa = ref([])
const carregando = ref(false)
let requisicaoAtual = null

function normalizarParticipante(item) {
  return {
    ...item,
    id_jogo: Number(item.id_jogo),
    id_time: item.id_time == null ? null : Number(item.id_time),
  }
}

async function carregarParticipa({ forcar = false } = {}) {
  if (requisicaoAtual && !forcar) return requisicaoAtual

  requisicaoAtual = fetch(`${API_URL}/participa`)
    .then((resposta) => {
      if (!resposta.ok) throw new Error('Não foi possível carregar os participantes.')
      return resposta.json()
    })
    .then((dados) => {
      participa.value = dados.map(normalizarParticipante)
      return participa.value
    })
    .finally(() => {
      carregando.value = false
      requisicaoAtual = null
    })

  carregando.value = true
  return requisicaoAtual
}

function atualizarParticipanteLocal(participanteAtualizado) {
  const indice = participa.value.findIndex(
    (participante) => Number(participante.id) === Number(participanteAtualizado.id),
  )
  if (indice === -1) return
  participa.value[indice] = normalizarParticipante({
    ...participa.value[indice],
    ...participanteAtualizado,
  })
}

async function atualizarParticipante(id, dados) {
  const resposta = await fetch(`${API_URL}/participa/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })

  if (!resposta.ok) {
    throw new Error(`Não foi possível atualizar o participante ${id}.`)
  }

  const atualizado = await resposta.json()
  const participanteLocal = normalizarParticipante(atualizado)
  atualizarParticipanteLocal(participanteLocal)
  return participanteLocal
}

async function atualizarParticipantes(participantes) {
  for (const participante of participantes) {
    if (participante?.id == null) {
      throw new Error('Participante sem ID da API.')
    }

    await atualizarParticipante(participante.id, {
      id_jogo: Number(participante.id_jogo),
      posicao_participante: participante.posicao_participante,
      id_time: participante.id_time == null ? null : Number(participante.id_time),
      forma_de_ingresso: participante.forma_de_ingresso,
      resultado_time: participante.resultado_time,
      pontuacao_time: participante.pontuacao_time,
    })
  }
}

async function excluirParticipante(id) {
  const resposta = await fetch(`${API_URL}/participa/${id}`, {
    method: 'DELETE',
  })

  if (!resposta.ok) {
    throw new Error(`Não foi possível excluir o participante ${id}.`)
  }

  removerParticipanteLocal(id)
}

async function excluirParticipantes(participantes) {
  for (const participante of participantes) {
    if (participante?.id == null) throw new Error('Participante sem ID da API.')
    await excluirParticipante(participante.id)
  }
}

function removerParticipanteLocal(id) {
  participa.value = participa.value.filter(
    (participante) => Number(participante.id) !== Number(id),
  )
}

export function useParticipa() {
  return {
    participa,
    carregando,
    carregarParticipa,
    atualizarParticipante,
    atualizarParticipantes,
    excluirParticipante,
    excluirParticipantes,
    removerParticipanteLocal,
  }
}
