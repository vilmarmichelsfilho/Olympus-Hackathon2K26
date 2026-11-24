import { ref } from 'vue'

const API_URL = 'http://localhost:3000'
const jogos = ref([])
const carregando = ref(false)
let requisicaoAtual = null

async function carregarJogos({ forcar = false } = {}) {
  if (requisicaoAtual && !forcar) return requisicaoAtual

  requisicaoAtual = fetch(`${API_URL}/jogos`)
    .then((resposta) => {
      if (!resposta.ok) throw new Error('Não foi possível carregar os jogos.')
      return resposta.json()
    })
    .then((dados) => {
      jogos.value = dados
      return dados
    })
    .finally(() => {
      carregando.value = false
      requisicaoAtual = null
    })

  carregando.value = true
  return requisicaoAtual
}

function atualizarJogoLocal(jogoAtualizado) {
  const indice = jogos.value.findIndex((jogo) => Number(jogo.id) === Number(jogoAtualizado.id))
  if (indice === -1) return
  jogos.value[indice] = { ...jogos.value[indice], ...jogoAtualizado }
}

function removerJogoLocal(id) {
  jogos.value = jogos.value.filter((jogo) => Number(jogo.id) !== Number(id))
}

export function useJogos() {
  return { jogos, carregando, carregarJogos, atualizarJogoLocal, removerJogoLocal }
}
