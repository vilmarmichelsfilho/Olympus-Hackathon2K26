import { noticias } from '@/data/noticias.js'
import { torneios } from '@/data/torneios.js'
import { obterSessao } from '@/Utils/loginUtils.js'
import { criarNoticiasStore } from './noticiasService.js'

export const noticiasStore = criarNoticiasStore({
  noticias,
  obterSessao,
  obterTorneios: () => torneios,
})

export function nomeTorneioNoticia(codigo) {
  return (
    torneios.find((torneio) => torneio.cod_torneio === codigo)?.nome_torneio ??
    'Torneio indisponível'
  )
}
