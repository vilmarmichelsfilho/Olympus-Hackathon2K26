import { normalizarId } from '@/services/api'
import { reactive } from 'vue'
import { carregarColecao, normalizarRegistro } from '@/services/api'
export const times = reactive([])
export const carregarTimes = () => carregarColecao('times', times, (item) => ({
  ...normalizarRegistro(item, 'id_time'), id_torneio: normalizarId(item.id_torneio ?? item.id_torneio),
  id_adm: normalizarId(item.id_adm ?? item.id_adm), pontuacaogeral_time: Number(item.pontuacaogeral_time) || 0,
}))
