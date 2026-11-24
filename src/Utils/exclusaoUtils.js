import { normalizarId } from '@/services/api'
import { arbitros } from '@/data/arbitros'
import { modalidades } from '@/data/modalidades'
import { times } from '@/data/times'
import { torneios } from '@/data/torneios'
import { excluirTurmasDoTorneio } from '@/services/turmasApi'
import { useJogos } from '@/composables/useJogos'
import { useParticipa } from '@/composables/useParticipa'
import { excluirEntidade } from '@/services/entidadesApi'
import { API_URL } from '@/services/api'
import { mesmoId } from '@/services/api'

function tirarDaLista(lista, condicao) {
  for (let indice = lista.length - 1; indice >= 0; indice -= 1) {
    if (condicao(lista[indice])) lista.splice(indice, 1)
  }
}

async function apagarModalidade(codModalidade, { participa = [], modalidades: listaModalidades = [], codigosJogos = [] } = {}) {
  const idsJogos = new Set(codigosJogos.map(String))
  tirarDaLista(participa, (item) => idsJogos.has(String(item.id_jogo)))
  const lista = listaModalidades.length ? listaModalidades : modalidades
  await excluirEntidade('modalidades', codModalidade, lista)
}

async function apagarTorneio(codTorneio) {
  const { jogos, carregarJogos, removerJogoLocal } = useJogos()
  const { participa, carregarParticipa, excluirParticipantes } = useParticipa()
  await Promise.all([carregarJogos(), carregarParticipa()])

  const idsModalidades = new Set(modalidades
    .filter((item) => normalizarId(item.id_torneio) === normalizarId(codTorneio))
    .map((item) => normalizarId(item.id_modalidade)))
  const jogosDoTorneio = jogos.value.filter((item) => idsModalidades.has(normalizarId(item.id_modalidade)))
  const idsJogos = new Set(jogosDoTorneio.map((item) => String(item.id)))
  const participantesDoTorneio = participa.value.filter((item) => idsJogos.has(String(item.id_jogo)))

  await excluirParticipantes(participantesDoTorneio)
  for (const jogo of jogosDoTorneio) {
    const resposta = await fetch(`${API_URL}/jogos/${jogo.id}`, { method: 'DELETE' })
    if (!resposta.ok) throw new Error(`Não foi possível excluir o jogo ${jogo.id}.`)
    removerJogoLocal(jogo.id)
  }

  await excluirTurmasDoTorneio(codTorneio)
  for (const lista of [modalidades, times, arbitros]) {
    const tipo = lista === modalidades ? 'modalidades' : lista === times ? 'times' : 'arbitros'
    for (const registro of [...lista].filter((item) => normalizarId(item.id_torneio) === normalizarId(codTorneio))) {
      await excluirEntidade(tipo, registro.id_modalidade ?? registro.id_time ?? registro.id_arbitro, lista)
    }
  }
  await excluirEntidade('torneios', codTorneio, torneios)
}

async function apagarArbitro(codArbitro, { jogos = [], arbitros: listaArbitros = [] } = {}) {
  if (jogos.some((jogo) => mesmoId(jogo.id_arbitro, codArbitro))) {
    return {
      sucesso: false,
      mensagem: 'Este árbitro possui jogos atribuídos. Troque o árbitro dos jogos antes de excluir.',
    }
  }
  await excluirEntidade('arbitros', codArbitro, listaArbitros.length ? listaArbitros : arbitros)
  return { sucesso: true }
}

export { apagarArbitro, apagarModalidade, apagarTorneio }
