import { normalizarId } from '@/services/api'
import { reactive } from 'vue'
import { carregarColecao, normalizarRegistro } from '@/services/api'
export const torneios = reactive([])
export const carregarTorneios = () => carregarColecao('torneios', torneios, (item) => ({
  ...normalizarRegistro(item, 'id_torneio'), id_adm: normalizarId(item.id_adm ?? item.id_adm),
}))
