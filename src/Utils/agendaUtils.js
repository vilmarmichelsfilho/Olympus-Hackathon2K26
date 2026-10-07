// Os horários cadastrados são locais do campus IFC Araquari (UTC-3).
export function obterProximosJogos(jogos, modalidades, participa, times, agora = new Date()) {
  return jogos
    .filter((jogo) => jogo.status_jogo === 'Agendado')
    .map((jogo) => {
      const [data = '', horario = ''] = (jogo.horario_jogo ?? '').split(' ')
      const dataHora = `${data}T${horario}-03:00`
      const instante = new Date(dataHora).getTime()
      const modalidade = modalidades.find((item) => item.cod_modalidade === jogo.cod_modalidade)
      const participantes = participa
        .filter((item) => item.cod_jogo === jogo.cod_jogo)
        .sort((a, b) => a.posicao_participante - b.posicao_participante)

      return {
        ...jogo,
        data,
        horario: horario.slice(0, 5),
        dataHora,
        instante,
        modalidade: modalidade?.nome_modalidade ?? 'Modalidade a definir',
        local: jogo.local_jogo || modalidade?.localdojogo_modalidade || 'Local a definir',
        participantes: [1, 2].map((posicao) => {
          const participante = participantes.find((item) => item.posicao_participante === posicao)
          const time = times.find((item) => item.cod_time === participante?.cod_time)
          return {
            cod_time: time?.cod_time ?? null,
            nome_time: time?.nome_time ?? 'A definir',
          }
        }),
      }
    })
    .filter((jogo) => Number.isFinite(jogo.instante) && jogo.instante >= agora.getTime())
    .sort((a, b) => a.instante - b.instante || a.cod_jogo - b.cod_jogo)
}

export function obterAgendaPorTime(times, jogos, codModalidade = null, codTime = null) {
  return times
    .filter((time) => codTime === null || time.cod_time === codTime)
    .map((time) => ({
      ...time,
      jogos: jogos.filter(
        (jogo) =>
          (codModalidade === null || jogo.cod_modalidade === codModalidade) &&
          jogo.participantes.some((participante) => participante.cod_time === time.cod_time),
      ),
    }))
}
