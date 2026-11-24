import { reactive } from 'vue'
import { carregarColecao, normalizarRegistro } from '@/services/api'
export const arbitros = reactive([])
export const carregarArbitrosDados = () => carregarColecao('arbitros', arbitros, (item) => ({
  ...normalizarRegistro(item, 'cod_arbitro'), cod_torneio: Number(item.id_torneio ?? item.cod_torneio),
}))
