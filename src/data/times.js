import { reactive } from 'vue'
import { carregarColecao, normalizarRegistro } from '@/services/api'
export const times = reactive([])
export const carregarTimes = () => carregarColecao('times', times, (item) => ({
  ...normalizarRegistro(item, 'cod_time'), cod_torneio: Number(item.id_torneio ?? item.cod_torneio),
  cod_adm: Number(item.id_adm ?? item.cod_adm), pontuacaogeral_time: Number(item.pontuacaogeral_time) || 0,
}))
