import { computed } from 'vue'
import { arbitros as dadosArbitros } from '@/data/arbitros'
import { listar, normalizarRegistro } from '@/services/api'
import { listarRascunho } from '@/services/torneioDraft'
import { criarEntidade, atualizarEntidade, excluirEntidade } from '@/services/entidadesApi'

const arbitros = computed(() => dadosArbitros)
let requisicaoAtual = null

async function carregarArbitros() {
  if (requisicaoAtual) return requisicaoAtual
  requisicaoAtual = listar('arbitros').then(dados => {
    const todos = [...dados, ...listarRascunho('arbitros')].map(item => normalizarRegistro(item, 'id_arbitro'))
    dadosArbitros.splice(0, dadosArbitros.length, ...todos)
    return dadosArbitros
  }).finally(() => { requisicaoAtual = null })
  return requisicaoAtual
}

export function useArbitros() {
  return {
    arbitros,
    carregarArbitros,
    adicionarArbitro: dados => criarEntidade('arbitros', dados, dadosArbitros),
    atualizarArbitro: (id, dados) => atualizarEntidade('arbitros', id, dados, dadosArbitros),
    excluirArbitro: id => excluirEntidade('arbitros', id, dadosArbitros),
  }
}
