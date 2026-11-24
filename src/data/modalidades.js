import { normalizarId } from '@/services/api'
import { reactive } from 'vue'
import { carregarColecao, normalizarRegistro } from '@/services/api'
export const modalidades = reactive([])
export const carregarModalidades = () => carregarColecao('modalidades', modalidades, (item) => ({
  ...normalizarRegistro(item, 'id_modalidade'), id_torneio: normalizarId(item.id_torneio ?? item.id_torneio),
}))
