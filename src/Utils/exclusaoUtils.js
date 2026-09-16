import { arbitros } from '@/data/arbitros'
import { jogos } from '@/data/jogos'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import { torneios } from '@/data/torneios'
import { turmas } from '@/data/turmas'

function removerOnde(lista, condicao) {
  for (let indice = lista.length - 1; indice >= 0; indice -= 1) {
    if (condicao(lista[indice])) lista.splice(indice, 1)
  }
}

function excluirModalidadeCompleta(codModalidade) {
  const codigosJogos = new Set(
    jogos.filter((jogo) => jogo.cod_modalidade === codModalidade).map((jogo) => jogo.cod_jogo),
  )
  removerOnde(participa, (participante) => codigosJogos.has(participante.cod_jogo))
  removerOnde(jogos, (jogo) => jogo.cod_modalidade === codModalidade)
  removerOnde(modalidades, (modalidade) => modalidade.cod_modalidade === codModalidade)
}

function excluirTorneioCompleto(codTorneio) {
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

  removerOnde(participa, (participante) => codigosJogos.has(participante.cod_jogo))
  removerOnde(jogos, (jogo) => codigosModalidades.has(jogo.cod_modalidade))
  removerOnde(modalidades, (modalidade) => modalidade.cod_torneio === codTorneio)
  removerOnde(turmas, (turma) => turma.cod_torneio === codTorneio)
  removerOnde(times, (time) => time.cod_torneio === codTorneio)
  removerOnde(arbitros, (arbitro) => arbitro.cod_torneio === codTorneio)
  removerOnde(torneios, (torneio) => torneio.cod_torneio === codTorneio)
}

function excluirArbitroSeguro(codArbitro) {
  if (jogos.some((jogo) => jogo.cod_arbitro === codArbitro)) {
    return {
      sucesso: false,
      mensagem: 'Este árbitro possui jogos atribuídos. Troque o árbitro dos jogos antes de excluir.',
    }
  }

  removerOnde(arbitros, (arbitro) => arbitro.cod_arbitro === codArbitro)
  return { sucesso: true }
}

export { excluirArbitroSeguro, excluirModalidadeCompleta, excluirTorneioCompleto }
