import { reactive } from 'vue'
import { carregarColecao, normalizarRegistro } from '@/services/api'
export const torneios = reactive([])
export const carregarTorneios = () => carregarColecao('torneios', torneios, (item) => ({
  ...normalizarRegistro(item, 'cod_torneio'), cod_adm: Number(item.id_adm ?? item.cod_adm),
}))
