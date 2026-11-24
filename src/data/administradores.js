import { reactive } from 'vue'
import { carregarColecao } from '@/services/api'
export const administradores = reactive([])
export const carregarAdministradores = () => carregarColecao('administradores', administradores)
