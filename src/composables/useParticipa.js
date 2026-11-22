import { ref } from 'vue'

const participa = ref([])
let requisicaoAtual = null

async function carregarParticipa() {
  if (requisicaoAtual) return requisicaoAtual

  requisicaoAtual = fetch('http://localhost:3000/participa')
    .then((resposta) => {
      if (!resposta.ok) throw new Error('Não foi possível carregar os participantes.')
      return resposta.json()
    })
    .then((dados) => {
      participa.value = dados.map((item) => ({
        ...item,
        id_jogo: Number(item.id_jogo),
        id_time: item.id_time == null ? null : Number(item.id_time),
      }))
      return participa.value
    })
    .finally(() => {
      requisicaoAtual = null
    })

  return requisicaoAtual
}

export function useParticipa() {
  return { participa, carregarParticipa }
}
