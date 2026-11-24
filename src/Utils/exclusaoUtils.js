import { arbitros } from '@/data/arbitros'
import { modalidades } from '@/data/modalidades'
import { times } from '@/data/times'
import { torneios } from '@/data/torneios'
import { excluirTurmasDoTorneio } from '@/services/turmasApi'
import { useJogos } from '@/composables/useJogos'
import { useParticipa } from '@/composables/useParticipa'

function tirarDaLista(lista, condicao) {
  for (let indice = lista.length - 1; indice >= 0; indice -= 1) {
    if (condicao(lista[indice])) lista.splice(indice, 1)
  }
}

function apagarModalidade(codModalidade, { participa = [], modalidades: listaModalidades = [], codigosJogos = [] } = {}) {
  const idsJogos = new Set(codigosJogos.map(Number))
  tirarDaLista(participa, (item) => idsJogos.has(Number(item.id_jogo)))
  tirarDaLista(listaModalidades, (item) => Number(item.cod_modalidade) === Number(codModalidade))
}

async function apagarTorneio(codTorneio) {
  const { jogos, carregarJogos, removerJogoLocal } = useJogos()
  const { participa, carregarParticipa, excluirParticipantes } = useParticipa()
  await Promise.all([carregarJogos(), carregarParticipa()])

  const idsModalidades = new Set(modalidades
    .filter((item) => Number(item.cod_torneio) === Number(codTorneio))
    .map((item) => Number(item.cod_modalidade)))
  const jogosDoTorneio = jogos.value.filter((item) => idsModalidades.has(Number(item.id_modalidade)))
  const idsJogos = new Set(jogosDoTorneio.map((item) => Number(item.id)))
  const participantesDoTorneio = participa.value.filter((item) => idsJogos.has(Number(item.id_jogo)))

  await excluirParticipantes(participantesDoTorneio)
  for (const jogo of jogosDoTorneio) {
    const resposta = await fetch(`http://localhost:3000/jogos/${jogo.id}`, { method: 'DELETE' })
    if (!resposta.ok) throw new Error(`Não foi possível excluir o jogo ${jogo.id}.`)
    removerJogoLocal(jogo.id)
  }

  await excluirTurmasDoTorneio(codTorneio)
  tirarDaLista(modalidades, (item) => Number(item.cod_torneio) === Number(codTorneio))
  tirarDaLista(times, (item) => Number(item.cod_torneio) === Number(codTorneio))
  tirarDaLista(arbitros, (item) => Number(item.cod_torneio) === Number(codTorneio))
  tirarDaLista(torneios, (item) => Number(item.cod_torneio) === Number(codTorneio))
}

function apagarArbitro(codArbitro, { jogos = [], arbitros: listaArbitros = [] } = {}) {
  if (jogos.some((jogo) => Number(jogo.id_arbitro) === Number(codArbitro))) {
    return {
      sucesso: false,
      mensagem: 'Este árbitro possui jogos atribuídos. Troque o árbitro dos jogos antes de excluir.',
    }
  }
  tirarDaLista(listaArbitros, (arbitro) => Number(arbitro.cod_arbitro) === Number(codArbitro))
  return { sucesso: true }
}

export { apagarArbitro, apagarModalidade, apagarTorneio }
