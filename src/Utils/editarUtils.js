import { modalidades } from '@/data/modalidades'
import { arbitros } from '@/data/arbitros'
import { torneios } from '@/data/torneios'
import { atualizarEntidade } from '@/services/entidadesApi'

const editarModalidade = (id, dados) => atualizarEntidade('modalidades', id, dados, modalidades)
const editarArbitro = (id, dados) => atualizarEntidade('arbitros', id, dados, arbitros)
const editarTorneio = (id, dados) => atualizarEntidade('torneios', id, dados, torneios)
export { editarArbitro, editarTorneio, editarModalidade }
