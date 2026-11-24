import { reactive } from 'vue'
import { carregarColecao, normalizarRegistro } from '@/services/api'
export const modalidades = reactive([])
export const carregarModalidades = () => carregarColecao('modalidades', modalidades, (item) => ({
  ...normalizarRegistro(item, 'cod_modalidade'), cod_torneio: Number(item.id_torneio ?? item.cod_torneio),
}))
