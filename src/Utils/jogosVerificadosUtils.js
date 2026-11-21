
function separarDataHorario(horario_jogo) {
  const [data, horario] = horario_jogo.split(' ')
  return { data, horario }
}
function detalharJogo(jogo,modalidades,participa,times) {
  const { data, horario } = separarDataHorario(jogo.horario_jogo)
  const modalidade = modalidades.value.find((m) => m.cod_modalidade === jogo.id_modalidade)
  const participantes = participa.value.filter((p) => p.cod_jogo === jogo.id_jogo)
  const [participante1, participante2] = participantes
  const timeA = times.value.find((t) => t.cod_time === participante1?.cod_time)
  const timeB = times.value.find((t) => t.cod_time === participante2?.cod_time)

  return {
    cod_jogo: jogo.id,
    data,
    horario,
    modalidade: modalidade?.nome_modalidade,
    status: jogo.status_jogo,
    time1: timeA?.nome_time,
    time2: timeB?.nome_time,
    escudo1: timeA?.escudo_time,
    escudo2: timeB?.escudo_time,
    pontuacao1: participante1?.pontuacao_time,
    pontuacao2: participante2?.pontuacao_time,
  }
}
export { detalharJogo }
