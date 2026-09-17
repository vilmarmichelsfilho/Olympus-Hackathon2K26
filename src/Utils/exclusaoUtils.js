import { arbitros } from '@/data/arbitros'
import { jogos } from '@/data/jogos'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import { torneios } from '@/data/torneios'
import { turmas } from '@/data/turmas'

function tirarDaLista(lista, condicao) {
  for (let indice = lista.length - 1; indice >= 0; indice -= 1) {
    if (condicao(lista[indice])) lista.splice(indice, 1)
  }
}

function apagarModalidade(codModalidade) {
  const codigosJogos = new Set(
    jogos.filter((jogo) => jogo.cod_modalidade === codModalidade).map((jogo) => jogo.cod_jogo),
  )
  tirarDaLista(participa, (participante) => codigosJogos.has(participante.cod_jogo))
  tirarDaLista(jogos, (jogo) => jogo.cod_modalidade === codModalidade)
  tirarDaLista(modalidades, (modalidade) => modalidade.cod_modalidade === codModalidade)
}

function apagarTorneio(codTorneio) {
  const codigosModalidades = new Set(
    modalidades
      .filter((modalidade) => modalidade.cod_torneio === codTorneio)
      .map((modalidade) => modalidade.cod_modalidade),
  )
  const codigosJogos = new Set(
    jogos
      .filter((jogo) => codigosModalidades.has(jogo.cod_modalidade))
      .map((jogo) => jogo.cod_jogo),
  )

  tirarDaLista(participa, (participante) => codigosJogos.has(participante.cod_jogo))
  tirarDaLista(jogos, (jogo) => codigosModalidades.has(jogo.cod_modalidade))
  tirarDaLista(modalidades, (modalidade) => modalidade.cod_torneio === codTorneio)
  tirarDaLista(turmas, (turma) => turma.cod_torneio === codTorneio)
  tirarDaLista(times, (time) => time.cod_torneio === codTorneio)
  tirarDaLista(arbitros, (arbitro) => arbitro.cod_torneio === codTorneio)
  tirarDaLista(torneios, (torneio) => torneio.cod_torneio === codTorneio)
}

function apagarArbitro(codArbitro) {
  if (jogos.some((jogo) => jogo.cod_arbitro === codArbitro)) {
    return {
      sucesso: false,
      mensagem: 'Este árbitro possui jogos atribuídos. Troque o árbitro dos jogos antes de excluir.',
    }
  }

  tirarDaLista(arbitros, (arbitro) => arbitro.cod_arbitro === codArbitro)
  return { sucesso: true }
}

export { apagarArbitro, apagarModalidade, apagarTorneio }
