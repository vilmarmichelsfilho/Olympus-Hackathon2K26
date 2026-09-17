import { jogos } from '@/data/jogos'
import { participa } from '@/data/participa'

function pegarParticipantes(codJogo) {
  return participa
    .filter((participante) => participante.cod_jogo === codJogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)
}

function passarVencedor(codJogo, codTimeVencedor) {
  jogos.forEach((proximoJogo) => {
    let posicao = null
    if (proximoJogo.origem_jogo_a === codJogo) posicao = 1
    if (proximoJogo.origem_jogo_b === codJogo) posicao = 2
    if (posicao === null) return

    const participante = participa.find(
      (item) =>
        item.cod_jogo === proximoJogo.cod_jogo && item.posicao_participante === posicao,
    )
    if (!participante) return

    participante.cod_time = codTimeVencedor
    participante.pontuacao_time = null
    participante.resultado_time = null
  })
}

function salvarPlacar(codJogo, pontuacaoA, pontuacaoB) {
  const jogo = jogos.find((item) => item.cod_jogo === codJogo)
  const participantes = pegarParticipantes(codJogo)

  if (!jogo || participantes.length < 2) {
    return { sucesso: false, mensagem: 'Os participantes deste jogo não estão completos.' }
  }
  if (participantes.some((participante) => participante.cod_time == null)) {
    return { sucesso: false, mensagem: 'Os dois times precisam estar definidos.' }
  }

  const placarA = Number(pontuacaoA)
  const placarB = Number(pontuacaoB)
  if (!Number.isFinite(placarA) || !Number.isFinite(placarB) || placarA < 0 || placarB < 0) {
    return { sucesso: false, mensagem: 'Informe um placar válido.' }
  }

  participantes[0].pontuacao_time = placarA
  participantes[1].pontuacao_time = placarB

  return { sucesso: true, placarA, placarB, participantes }
}

function finalizarJogo(codJogo, pontuacaoA, pontuacaoB) {
  const jogo = jogos.find((item) => item.cod_jogo === codJogo)
  const participantes = pegarParticipantes(codJogo)

  if (!jogo || participantes.length < 2) {
    return { sucesso: false, mensagem: 'Os participantes deste jogo não estão completos.' }
  }
  if (participantes.some((participante) => participante.cod_time == null)) {
    return { sucesso: false, mensagem: 'Os dois times precisam estar definidos.' }
  }

  const placarA = Number(pontuacaoA)
  const placarB = Number(pontuacaoB)
  if (!Number.isFinite(placarA) || !Number.isFinite(placarB) || placarA < 0 || placarB < 0) {
    return { sucesso: false, mensagem: 'Informe um placar válido.' }
  }
  if (placarA === placarB) {
    return { sucesso: false, mensagem: 'Jogos eliminatórios não podem terminar empatados.' }
  }

  participantes[0].pontuacao_time = placarA
  participantes[1].pontuacao_time = placarB
  participantes[0].resultado_time = placarA > placarB ? 'Vitória' : 'Derrota'
  participantes[1].resultado_time = placarB > placarA ? 'Vitória' : 'Derrota'
  jogo.status_jogo = 'Finalizado'

  const vencedor = placarA > placarB ? participantes[0] : participantes[1]
  passarVencedor(codJogo, vencedor.cod_time)

  return { sucesso: true, codTimeVencedor: vencedor.cod_time }
}

export { finalizarJogo, salvarPlacar }
