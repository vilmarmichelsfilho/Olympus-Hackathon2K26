function tirarDaLista(lista, condicao) {
  for (let indice = lista.length - 1; indice >= 0; indice -= 1) {
    if (condicao(lista[indice])) lista.splice(indice, 1)
  }
}
function apagarModalidade(codModalidade, { participa, modalidades, codigosJogos = [] }) {
  const jogosRelacionados = new Set(codigosJogos.map(Number))
  tirarDaLista(
    participa,
    (participante) => jogosRelacionados.has(Number(participante.cod_jogo)),
  )
  tirarDaLista(modalidades, (modalidade) => modalidade.cod_modalidade === codModalidade)
}

function apagarTorneio(codTorneio, { participa, codigosJogos = [], modalidades, turmas, times, arbitros, torneios }) {
  const codigosModalidades = new Set(
    modalidades
      .filter((modalidade) => modalidade.cod_torneio === codTorneio)
      .map((modalidade) => modalidade.cod_modalidade),
  )
  const jogosRelacionados = new Set(codigosJogos.map(Number))

  tirarDaLista(participa, (participante) => jogosRelacionados.has(Number(participante.cod_jogo)))
  tirarDaLista(modalidades, (modalidade) => modalidade.cod_torneio === codTorneio)
  tirarDaLista(turmas, (turma) => turma.cod_torneio === codTorneio)
  tirarDaLista(times, (time) => time.cod_torneio === codTorneio)
  tirarDaLista(arbitros, (arbitro) => arbitro.cod_torneio === codTorneio)
  tirarDaLista(torneios, (torneio) => torneio.cod_torneio === codTorneio)
}

function apagarArbitro(codArbitro, { jogos, arbitros }) {
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
