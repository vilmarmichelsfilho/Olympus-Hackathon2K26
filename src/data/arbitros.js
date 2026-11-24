import { normalizarId } from '@/services/api'
import { reactive } from 'vue'
import { carregarColecao, normalizarRegistro } from '@/services/api'
export const arbitros = reactive([])
export const carregarArbitrosDados = () => carregarColecao('arbitros', arbitros, (item) => ({
  ...normalizarRegistro(item, 'id_arbitro'), id_torneio: normalizarId(item.id_torneio ?? item.id_torneio),
}))
