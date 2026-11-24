import { normalizarId } from '@/services/api'
import { listarTurmas } from '@/services/turmasApi'
import { criar, excluir, listar } from '@/services/api'
import { mesmoId } from '@/services/api'

const horarioInicial = 8 * 60
const horarioLimite = 17 * 60
const intervalo = 15

function dataLocal(dataISO) {
  const [ano, mes, dia] = dataISO.split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

function formatarData(data) {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

function formatarHorario(minutos) {
  const hora = String(Math.floor(minutos / 60)).padStart(2, '0')
  const minuto = String(minutos % 60).padStart(2, '0')
  return `${hora}:${minuto}:00`
}

function periodoPassaDeUmaSemana(inicio, fim) {
  const inicioUTC = Date.UTC(inicio.getFullYear(), inicio.getMonth(), inicio.getDate())
  const fimUTC = Date.UTC(fim.getFullYear(), fim.getMonth(), fim.getDate())
  const duracaoEmDias = Math.floor((fimUTC - inicioUTC) / 86_400_000) + 1
  return duracaoEmDias > 7
}

function proximoDia(data, permitirFimDeSemana) {
  do {
    data.setDate(data.getDate() + 1)
  } while (!permitirFimDeSemana && (data.getDay() === 0 || data.getDay() === 6))
}

function ajustarDataInicial(data, permitirFimDeSemana) {
  while (!permitirFimDeSemana && (data.getDay() === 0 || data.getDay() === 6)) {
    data.setDate(data.getDate() + 1)
  }
}

function transformarEmData(horario) {
  const [data, hora] = horario.split(' ')
  const [ano, mes, dia] = data.split('-').map(Number)
  const [horas, minutos, segundos = 0] = hora.split(':').map(Number)
  return new Date(ano, mes - 1, dia, horas, minutos, segundos)
}

function temChoqueHorario(inicioA, duracaoA, inicioB, duracaoB) {
  const fimA = inicioA.getTime() + duracaoA * 60_000
  const fimB = inicioB.getTime() + duracaoB * 60_000
  return inicioA.getTime() < fimB && inicioB.getTime() < fimA
}

function pegarDuracao(jogo, modalidades) {
  const modalidade = modalidades.find(
    (item) => normalizarId(item.id_modalidade) === normalizarId(jogo.id_modalidade),
  )
  return Math.max(Number(modalidade?.tempojogemminutos_modalidade) || 60, 15)
}

function anosDaTurma(turmasDoTime) {
  return new Set(turmasDoTime.map((turma) => Number(turma.ano_turma)))
}

async function validarTorneio(codTorneio, listas) {
  const { torneios, times, modalidades, arbitros } = listas
  const torneio = torneios.find((item) => item.id_torneio === codTorneio)
  const timesDoTorneio = times.filter((item) => item.id_torneio === codTorneio)
  const turmas = await listarTurmas()
  const turmasDoTorneio = turmas.filter((item) => normalizarId(item.id_torneio) === normalizarId(codTorneio))
  const modalidadesDoTorneio = modalidades.filter((item) => item.id_torneio === codTorneio)
  const arbitrosDoTorneio = arbitros.filter((item) => item.id_torneio === codTorneio)

  if (!torneio) return { valido: false, mensagem: 'Torneio não encontrado.' }
  if (timesDoTorneio.length !== 8) {
    return { valido: false, mensagem: 'Cadastre exatamente 8 times para finalizar o torneio.' }
  }
  if (turmasDoTorneio.length < 23 || turmasDoTorneio.length > 24) {
    return { valido: false, mensagem: 'O torneio deve possuir entre 23 e 24 turmas.' }
  }
  if (turmasDoTorneio.some((turma) => !timesDoTorneio.some((time) => normalizarId(time.id_time) === normalizarId(turma.id_time)))) {
    return { valido: false, mensagem: 'Existem turmas vinculadas a um time que não pertence mais ao torneio.' }
  }
  if (!modalidadesDoTorneio.length) {
    return { valido: false, mensagem: 'Cadastre pelo menos uma modalidade.' }
  }
  if (!arbitrosDoTorneio.length) {
    return { valido: false, mensagem: 'Cadastre pelo menos um árbitro.' }
  }

  let timesComDuasTurmas = 0

  for (const time of timesDoTorneio) {
    const turmasDoTime = turmasDoTorneio.filter((turma) => normalizarId(turma.id_time) === normalizarId(time.id_time))
    const anos = anosDaTurma(turmasDoTime)

    if (turmasDoTime.length < 2 || turmasDoTime.length > 3 || anos.size !== turmasDoTime.length) {
      return {
        valido: false,
        mensagem: `O time ${time.nome_time} deve ter 2 ou 3 turmas, sem repetir o ano.`,
      }
    }

    if ([...anos].some((ano) => ![1, 2, 3].includes(ano))) {
      return { valido: false, mensagem: `As turmas do time ${time.nome_time} devem ser do 1º, 2º ou 3º ano.` }
    }

    if (turmasDoTime.length === 2) timesComDuasTurmas += 1
    if (turmasDoTime.length === 3 && ![1, 2, 3].every((ano) => anos.has(ano))) {
      return { valido: false, mensagem: `O time ${time.nome_time} precisa ter uma turma de cada ano.` }
    }
  }

  if (timesComDuasTurmas > 1) {
    return { valido: false, mensagem: 'Somente um time pode ficar com duas turmas.' }
  }

  return {
    valido: true,
    torneio,
    times: timesDoTorneio,
    modalidades: modalidadesDoTorneio,
    arbitros: arbitrosDoTorneio,
  }
}

async function gerarJogos(codTorneio, listas) {
  const { jogos } = listas
  const validacao = await validarTorneio(codTorneio, listas)
  if (!validacao.valido) return validacao

  const jogosExistentes = jogos.filter((jogo) =>
    validacao.modalidades.some(
      (modalidade) => normalizarId(modalidade.id_modalidade) === normalizarId(jogo.id_modalidade),
    ),
  )
  if (jogosExistentes.length) {
    return { valido: false, mensagem: 'Os jogos deste torneio já foram gerados.' }
  }

  const inicio = dataLocal(validacao.torneio.data_inicio_torneio)
  const fim = dataLocal(validacao.torneio.data_fim_torneio)
  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fim.getTime()) || inicio > fim) {
    return { valido: false, mensagem: 'O período do torneio é inválido.' }
  }

  const idsNumericos = jogos.map((jogo) => Number(jogo.id)).filter(Number.isFinite)
  let proximoCodigo = idsNumericos.length
    ? Math.max(...idsNumericos) + 1
    : 1
  let dataAtual = new Date(inicio)
  const permitirFimDeSemana = periodoPassaDeUmaSemana(inicio, fim)
  ajustarDataInicial(dataAtual, permitirFimDeSemana)
  let minutosAtuais = horarioInicial
  let indiceArbitro = 0
  const novosJogos = []
  const novosParticipantes = []

  function reservarHorario(duracao) {
    const duracaoEmMinutos = Math.max(Number(duracao) || 60, 15)

    if (minutosAtuais + duracaoEmMinutos > horarioLimite) {
      proximoDia(dataAtual, permitirFimDeSemana)
      minutosAtuais = horarioInicial
    }

    if (dataAtual > fim) return null

    const horario = `${formatarData(dataAtual)} ${formatarHorario(minutosAtuais)}`
    minutosAtuais += duracaoEmMinutos + intervalo
    return horario
  }

  function criarJogo(modalidade, fase, origemA = null, origemB = null) {
    const horario = reservarHorario(modalidade.tempojogemminutos_modalidade)
    if (!horario) return null

    const jogo = {
      id: proximoCodigo++,
      id_modalidade: modalidade.id_modalidade,
      id_arbitro: validacao.arbitros[indiceArbitro % validacao.arbitros.length].id_arbitro,
      status_jogo: 'Agendado',
      horario_jogo: horario,
      fase_jogo: fase,
      origem_jogo_a: origemA,
      origem_jogo_b: origemB,
    }
    indiceArbitro += 1
    novosJogos.push(jogo)
    return jogo
  }

  for (const modalidade of validacao.modalidades) {
    const quartas = []
    for (let indice = 0; indice < 4; indice += 1) {
      const jogo = criarJogo(modalidade, 'Quartas de Final')
      if (!jogo) {
        return { valido: false, mensagem: 'O período informado não possui dias suficientes para todos os jogos.' }
      }
      quartas.push(jogo)
      for (let posicao = 0; posicao < 2; posicao += 1) {
        novosParticipantes.push({
          id_jogo: jogo.id,
          posicao_participante: posicao + 1,
          id_time: validacao.times[indice * 2 + posicao].id_time,
          forma_de_ingresso: 'Inscrito',
          resultado_time: null,
          pontuacao_time: null,
        })
      }
    }

    const semifinais = [
      criarJogo(modalidade, 'Semifinal', quartas[0].id, quartas[1].id),
      criarJogo(modalidade, 'Semifinal', quartas[2].id, quartas[3].id),
    ]
    if (semifinais.some((jogo) => !jogo)) {
      return { valido: false, mensagem: 'O período informado não possui dias suficientes para todos os jogos.' }
    }

    const final = criarJogo(modalidade, 'Final', semifinais[0].id, semifinais[1].id)
    if (!final) {
      return { valido: false, mensagem: 'O período informado não possui dias suficientes para todos os jogos.' }
    }

    for (const jogo of [...semifinais, final]) {
      for (let posicao = 1; posicao <= 2; posicao += 1) {
        novosParticipantes.push({
          id_jogo: jogo.id,
          posicao_participante: posicao,
          id_time: null,
          forma_de_ingresso: 'Vencedor',
          resultado_time: null,
          pontuacao_time: null,
        })
      }
    }
  }

  return {
    valido: true,
    novosJogos,
    novosParticipantes,
    quantidadeJogos: novosJogos.length,
    quantidadeParticipantes: novosParticipantes.length,
  }
}

async function gerarJogosModalidade(codModalidade, listas) {
  const { jogos, modalidades } = listas
  const modalidade = modalidades.find((item) => item.id_modalidade === codModalidade)
  if (!modalidade) return { valido: false, mensagem: 'Modalidade não encontrada.' }

  const validacao = await validarTorneio(modalidade.id_torneio, listas)
  if (!validacao.valido) return validacao

  if (jogos.some((jogo) => normalizarId(jogo.id_modalidade) === normalizarId(codModalidade))) {
    return { valido: false, mensagem: 'Os jogos desta modalidade já foram gerados.' }
  }

  const inicio = dataLocal(validacao.torneio.data_inicio_torneio)
  const fim = dataLocal(validacao.torneio.data_fim_torneio)
  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fim.getTime()) || inicio > fim) {
    return { valido: false, mensagem: 'O período do torneio é inválido.' }
  }

  const codigosModalidadesDoTorneio = new Set(
    validacao.modalidades.map((item) => item.id_modalidade),
  )
  const jogosDoTorneio = jogos.filter((jogo) =>
    codigosModalidadesDoTorneio.has(normalizarId(jogo.id_modalidade)),
  )
  const duracao = Math.max(Number(modalidade.tempojogemminutos_modalidade) || 60, 15)
  const idsNumericos = jogos.map((jogo) => Number(jogo.id)).filter(Number.isFinite)
  let proximoCodigo = idsNumericos.length
    ? Math.max(...idsNumericos) + 1
    : 1
  let indiceArbitro = 0
  let dataAtual = new Date(inicio)
  const permitirFimDeSemana = periodoPassaDeUmaSemana(inicio, fim)
  ajustarDataInicial(dataAtual, permitirFimDeSemana)
  let minutosAtuais = horarioInicial
  const novosJogos = []
  const novosParticipantes = []

  function reservarHorario() {
    while (dataAtual <= fim) {
      if (minutosAtuais + duracao > horarioLimite) {
        proximoDia(dataAtual, permitirFimDeSemana)
        minutosAtuais = horarioInicial
        continue
      }

      const horario = `${formatarData(dataAtual)} ${formatarHorario(minutosAtuais)}`
      const inicioCandidato = transformarEmData(horario)
      const localOcupado = [...jogosDoTorneio, ...novosJogos].some((jogo) => {
        const modalidadeDoJogo = modalidades.find(
          (item) => normalizarId(item.id_modalidade) === normalizarId(jogo.id_modalidade),
        )
        if (modalidadeDoJogo?.localdojogo_modalidade !== modalidade.localdojogo_modalidade) {
          return false
        }
        return temChoqueHorario(
          inicioCandidato,
          duracao,
          transformarEmData(jogo.horario_jogo),
          pegarDuracao(jogo, modalidades),
        )
      })

      let arbitro = null
      for (let i = 0; i < validacao.arbitros.length; i += 1) {
        const candidato = validacao.arbitros[(indiceArbitro + i) % validacao.arbitros.length]
        const ocupado = [...jogosDoTorneio, ...novosJogos].some((jogo) => {
          if (!mesmoId(jogo.id_arbitro, candidato.id_arbitro)) return false
          return temChoqueHorario(
            inicioCandidato,
            duracao,
            transformarEmData(jogo.horario_jogo),
            pegarDuracao(jogo, modalidades),
          )
        })

        if (!ocupado) {
          arbitro = candidato
          break
        }
      }

      if (localOcupado || !arbitro) {
        minutosAtuais += intervalo
        continue
      }

      minutosAtuais += duracao + intervalo
      indiceArbitro = (validacao.arbitros.indexOf(arbitro) + 1) % validacao.arbitros.length
      return { horario, codArbitro: arbitro.id_arbitro }
    }
    return null
  }

  function criarJogo(fase, origemA = null, origemB = null) {
    const reserva = reservarHorario()
    if (!reserva) return null

    const jogo = {
      id: proximoCodigo++,
      id_modalidade: modalidade.id_modalidade,
      id_arbitro: reserva.codArbitro,
      status_jogo: 'Agendado',
      horario_jogo: reserva.horario,
      fase_jogo: fase,
      origem_jogo_a: origemA,
      origem_jogo_b: origemB,
    }
    novosJogos.push(jogo)
    return jogo
  }

  const quartas = []
  for (let indice = 0; indice < 4; indice += 1) {
    const jogo = criarJogo('Quartas de Final')
    if (!jogo) {
      return { valido: false, mensagem: 'O período informado não possui horários para todos os jogos.' }
    }
    quartas.push(jogo)

    for (let posicao = 0; posicao < 2; posicao += 1) {
      novosParticipantes.push({
        id_jogo: jogo.id,
        posicao_participante: posicao + 1,
        id_time: validacao.times[indice * 2 + posicao].id_time,
        forma_de_ingresso: 'Inscrito',
        resultado_time: null,
        pontuacao_time: null,
      })
    }
  }

  const semifinais = [
    criarJogo('Semifinal', quartas[0].id, quartas[1].id),
    criarJogo('Semifinal', quartas[2].id, quartas[3].id),
  ]
  if (semifinais.some((jogo) => !jogo)) {
    return { valido: false, mensagem: 'O período informado não possui horários para todos os jogos.' }
  }

  const final = criarJogo('Final', semifinais[0].id, semifinais[1].id)
  if (!final) {
    return { valido: false, mensagem: 'O período informado não possui horários para todos os jogos.' }
  }

  for (const jogo of [...semifinais, final]) {
    for (let posicao = 1; posicao <= 2; posicao += 1) {
      novosParticipantes.push({
        id_jogo: jogo.id,
        posicao_participante: posicao,
        id_time: null,
        forma_de_ingresso: 'Vencedor',
        resultado_time: null,
        pontuacao_time: null,
      })
    }
  }

  return {
    valido: true,
    novosJogos,
    novosParticipantes,
    quantidadeJogos: novosJogos.length,
    quantidadeParticipantes: novosParticipantes.length,
  }
}

async function salvarJogosGerados(novosJogos, novosParticipantes) {
  const idsPorCodigo = new Map()
  const criados = []
  try {
    for (const jogo of novosJogos) {
      const payload = { ...jogo }
      delete payload.id
      for (const campo of ['origem_jogo_a', 'origem_jogo_b']) {
        if (payload[campo] == null) continue
        const origem = idsPorCodigo.get(payload[campo])
        if (origem == null) throw new Error(`Origem do jogo ${jogo.id} não encontrada.`)
        payload[campo] = origem
      }
      const salvo = await criar('jogos', payload)
      if (salvo?.id == null) throw new Error('A API não retornou o ID do jogo.')
      criados.push({ resource: 'jogos', registro: salvo })
      idsPorCodigo.set(jogo.id, salvo.id)
    }
    for (const participante of novosParticipantes) {
      const idJogo = idsPorCodigo.get(participante.id_jogo)
      if (idJogo == null) throw new Error('Jogo do participante não encontrado.')
      const payload = { ...participante, id_jogo: idJogo }
      delete payload.id
      const salvo = await criar('participa', payload)
      criados.push({ resource: 'participa', registro: salvo })
    }
    for (const resource of ['jogos', 'participa']) {
      const dados = new Map((await listar(resource)).map(item => [String(item.id), item]))
      for (const item of criados.filter(item => item.resource === resource)) {
        if (!dados.has(String(item.registro.id))) throw new Error(`Gravação incompleta em ${resource}.`)
      }
    }
    return { idsPorCodigo, quantidadeJogos: novosJogos.length }
  } catch (erro) {
    const falhas = []
    for (const item of criados.reverse()) {
      try { await excluir(item.resource, item.registro.id) } catch (falha) { falhas.push(falha.message) }
    }
    if (falhas.length) throw new Error(`${erro.message} Falha ao desfazer: ${falhas.join('; ')}`, { cause: erro })
    throw erro
  }
}

export { gerarJogos, gerarJogosModalidade, validarTorneio, salvarJogosGerados }

