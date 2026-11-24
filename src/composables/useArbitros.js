import { ref } from 'vue'
import { API_URL } from '@/services/api'

const ARBITROS_URL = `${API_URL}/arbitros`

const arbitros = ref([])
let requisicaoAtual = null
const normalizar = item => ({ ...item, cod_arbitro: item.id, cod_torneio: Number(item.id_torneio) })

async function requisitar(caminho = '', opcoes = {}) {
  const resposta = await fetch(`${ARBITROS_URL}${caminho}`, opcoes)

  if (!resposta.ok) {
    throw new Error(`Erro ao acessar árbitros: ${resposta.status}`)
  }

  return resposta
}

async function carregarArbitros() {
  if (requisicaoAtual) return requisicaoAtual
  requisicaoAtual = requisitar().then(resposta => resposta.json()).then(dados => {
    arbitros.value = dados.map(normalizar)
    return arbitros.value
  }).finally(() => { requisicaoAtual = null })
  return requisicaoAtual
}

async function adicionarArbitro(dados) {
  const resposta = await requisitar('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id_torneio: String(dados.id_torneio),
      nome_arbitro: dados.nome_arbitro,
      login_arbitro: dados.login_arbitro,
      senha_arbitro: dados.senha_arbitro,
    }),
  })

  const novo = normalizar(await resposta.json())
  arbitros.value.push(novo)
  return novo
}

async function atualizarArbitro(id, dados) {
  const resposta = await requisitar(`/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome_arbitro: dados.nome_arbitro,
      login_arbitro: dados.login_arbitro,
      senha_arbitro: dados.senha_arbitro,
    }),
  })

  const atualizado = normalizar(await resposta.json())

  const indice = arbitros.value.findIndex(
    (arbitro) => String(arbitro.id) === String(id),
  )

  if (indice !== -1) {
    arbitros.value[indice] = atualizado
  }

  return atualizado
}

async function excluirArbitro(id) {
  await requisitar(`/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })

  arbitros.value = arbitros.value.filter(
    (arbitro) => String(arbitro.id) !== String(id),
  )
}

export function useArbitros() {
  return {
    arbitros,
    carregarArbitros,
    adicionarArbitro,
    atualizarArbitro,
    excluirArbitro,
  }
}
