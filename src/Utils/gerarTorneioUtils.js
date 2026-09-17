import { arbitros } from '@/data/arbitros'
import { jogos } from '@/data/jogos'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import { torneios } from '@/data/torneios'
import { turmas } from '@/data/turmas'

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

function proximoDia(data) {
  do {
    data.setDate(data.getDate() + 1)
  } while (data.getDay() === 0 || data.getDay() === 6)
}

function pularFimDeSemana(data) {
  while (data.getDay() === 0 || data.getDay() === 6) {
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

function pegarDuracao(jogo) {
  const modalidade = modalidades.find((item) => item.cod_modalidade === jogo.cod_modalidade)
  return Math.max(Number(modalidade?.tempojogemminutos_modalidade) || 60, 15)
}

function anosDaTurma(turmasDoTime) {
  return new Set(turmasDoTime.map((turma) => Number(turma.ano_turma)))
}

function validarTorneio(codTorneio) {
  const torneio = torneios.find((item) => item.cod_torneio === codTorneio)
  const timesDoTorneio = times.filter((item) => item.cod_torneio === codTorneio)
  const turmasDoTorneio = turmas.filter((item) => item.cod_torneio === codTorneio)
  const modalidadesDoTorneio = modalidades.filter((item) => item.cod_torneio === codTorneio)
  const arbitrosDoTorneio = arbitros.filter((item) => item.cod_torneio === codTorneio)

  if (!torneio) return { valido: false, mensagem: 'Torneio não encontrado.' }
  if (timesDoTorneio.length !== 8) {
    return { valido: false, mensagem: 'Cadastre exatamente 8 times para finalizar o torneio.' }
  }
  if (turmasDoTorneio.length < 23 || turmasDoTorneio.length > 24) {
    return { valido: false, mensagem: 'O torneio deve possuir entre 23 e 24 turmas.' }
  }
  if (turmasDoTorneio.some((turma) => !timesDoTorneio.some((time) => time.cod_time === turma.cod_time))) {
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
    const turmasDoTime = turmasDoTorneio.filter((turma) => turma.cod_time === time.cod_time)
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

function gerarJogos(codTorneio) {
  const validacao = validarTorneio(codTorneio)
  if (!validacao.valido) return validacao

  const jogosExistentes = jogos.filter((jogo) =>
    validacao.modalidades.some((modalidade) => modalidade.cod_modalidade === jogo.cod_modalidade),
  )
  if (jogosExistentes.length) {
    return { valido: false, mensagem: 'Os jogos deste torneio já foram gerados.' }
  }

  const inicio = dataLocal(validacao.torneio.data_inicio_torneio)
  const fim = dataLocal(validacao.torneio.data_fim_torneio)
  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fim.getTime()) || inicio > fim) {
    return { valido: false, mensagem: 'O período do torneio é inválido.' }
  }

  let proximoCodigo = jogos.length ? Math.max(...jogos.map((jogo) => jogo.cod_jogo)) + 1 : 1
  let dataAtual = new Date(inicio)
  pularFimDeSemana(dataAtual)
  let minutosAtuais = horarioInicial
  let indiceArbitro = 0
  const novosJogos = []
  const novosParticipantes = []

  function reservarHorario(duracao) {
    const duracaoEmMinutos = Math.max(Number(duracao) || 60, 15)

    if (minutosAtuais + duracaoEmMinutos > horarioLimite) {
      proximoDia(dataAtual)
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
      cod_jogo: proximoCodigo++,
      cod_modalidade: modalidade.cod_modalidade,
      cod_arbitro: validacao.arbitros[indiceArbitro % validacao.arbitros.length].cod_arbitro,
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
          cod_jogo: jogo.cod_jogo,
          posicao_participante: posicao + 1,
          cod_time: validacao.times[indice * 2 + posicao].cod_time,
          forma_de_ingresso: 'Inscrito',
          resultado_time: null,
          pontuacao_time: null,
        })
      }
    }

    const semifinais = [
      criarJogo(modalidade, 'Semifinal', quartas[0].cod_jogo, quartas[1].cod_jogo),
      criarJogo(modalidade, 'Semifinal', quartas[2].cod_jogo, quartas[3].cod_jogo),
    ]
    if (semifinais.some((jogo) => !jogo)) {
      return { valido: false, mensagem: 'O período informado não possui dias suficientes para todos os jogos.' }
    }

    const final = criarJogo(modalidade, 'Final', semifinais[0].cod_jogo, semifinais[1].cod_jogo)
    if (!final) {
      return { valido: false, mensagem: 'O período informado não possui dias suficientes para todos os jogos.' }
    }

    for (const jogo of [...semifinais, final]) {
      for (let posicao = 1; posicao <= 2; posicao += 1) {
        novosParticipantes.push({
          cod_jogo: jogo.cod_jogo,
          posicao_participante: posicao,
          cod_time: null,
          forma_de_ingresso: 'Vencedor',
          resultado_time: null,
          pontuacao_time: null,
        })
      }
    }
  }

  jogos.push(...novosJogos)
  participa.push(...novosParticipantes)

  return {
    valido: true,
    quantidadeJogos: novosJogos.length,
    quantidadeParticipantes: novosParticipantes.length,
  }
}

function gerarJogosModalidade(codModalidade) {
  const modalidade = modalidades.find((item) => item.cod_modalidade === codModalidade)
  if (!modalidade) return { valido: false, mensagem: 'Modalidade não encontrada.' }

  const validacao = validarTorneio(modalidade.cod_torneio)
  if (!validacao.valido) return validacao

  if (jogos.some((jogo) => jogo.cod_modalidade === codModalidade)) {
    return { valido: false, mensagem: 'Os jogos desta modalidade já foram gerados.' }
  }

  const inicio = dataLocal(validacao.torneio.data_inicio_torneio)
  const fim = dataLocal(validacao.torneio.data_fim_torneio)
  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fim.getTime()) || inicio > fim) {
    return { valido: false, mensagem: 'O período do torneio é inválido.' }
  }

  const codigosModalidadesDoTorneio = new Set(
    validacao.modalidades.map((item) => item.cod_modalidade),
  )
  const jogosDoTorneio = jogos.filter((jogo) => codigosModalidadesDoTorneio.has(jogo.cod_modalidade))
  const duracao = Math.max(Number(modalidade.tempojogemminutos_modalidade) || 60, 15)
  let proximoCodigo = jogos.length ? Math.max(...jogos.map((jogo) => jogo.cod_jogo)) + 1 : 1
  let indiceArbitro = 0
  let dataAtual = new Date(inicio)
  pularFimDeSemana(dataAtual)
  let minutosAtuais = horarioInicial
  const novosJogos = []
  const novosParticipantes = []

  function reservarHorario() {
    while (dataAtual <= fim) {
      if (minutosAtuais + duracao > horarioLimite) {
        proximoDia(dataAtual)
        minutosAtuais = horarioInicial
        continue
      }

      const horario = `${formatarData(dataAtual)} ${formatarHorario(minutosAtuais)}`
      const inicioCandidato = transformarEmData(horario)
      const localOcupado = [...jogosDoTorneio, ...novosJogos].some((jogo) => {
        const modalidadeDoJogo = modalidades.find(
          (item) => item.cod_modalidade === jogo.cod_modalidade,
        )
        if (modalidadeDoJogo?.localdojogo_modalidade !== modalidade.localdojogo_modalidade) {
          return false
        }
        return temChoqueHorario(
          inicioCandidato,
          duracao,
          transformarEmData(jogo.horario_jogo),
          pegarDuracao(jogo),
        )
      })

      let arbitro = null
      for (let i = 0; i < validacao.arbitros.length; i += 1) {
        const candidato = validacao.arbitros[(indiceArbitro + i) % validacao.arbitros.length]
        const ocupado = [...jogosDoTorneio, ...novosJogos].some((jogo) => {
          if (jogo.cod_arbitro !== candidato.cod_arbitro) return false
          return temChoqueHorario(
            inicioCandidato,
            duracao,
            transformarEmData(jogo.horario_jogo),
            pegarDuracao(jogo),
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
      return { horario, codArbitro: arbitro.cod_arbitro }
    }
    return null
  }

  function criarJogo(fase, origemA = null, origemB = null) {
    const reserva = reservarHorario()
    if (!reserva) return null

    const jogo = {
      cod_jogo: proximoCodigo++,
      cod_modalidade: modalidade.cod_modalidade,
      cod_arbitro: reserva.codArbitro,
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
        cod_jogo: jogo.cod_jogo,
        posicao_participante: posicao + 1,
        cod_time: validacao.times[indice * 2 + posicao].cod_time,
        forma_de_ingresso: 'Inscrito',
        resultado_time: null,
        pontuacao_time: null,
      })
    }
  }

  const semifinais = [
    criarJogo('Semifinal', quartas[0].cod_jogo, quartas[1].cod_jogo),
    criarJogo('Semifinal', quartas[2].cod_jogo, quartas[3].cod_jogo),
  ]
  if (semifinais.some((jogo) => !jogo)) {
    return { valido: false, mensagem: 'O período informado não possui horários para todos os jogos.' }
  }

  const final = criarJogo('Final', semifinais[0].cod_jogo, semifinais[1].cod_jogo)
  if (!final) {
    return { valido: false, mensagem: 'O período informado não possui horários para todos os jogos.' }
  }

  for (const jogo of [...semifinais, final]) {
    for (let posicao = 1; posicao <= 2; posicao += 1) {
      novosParticipantes.push({
        cod_jogo: jogo.cod_jogo,
        posicao_participante: posicao,
        cod_time: null,
        forma_de_ingresso: 'Vencedor',
        resultado_time: null,
        pontuacao_time: null,
      })
    }
  }

  jogos.push(...novosJogos)
  participa.push(...novosParticipantes)

  return {
    valido: true,
    quantidadeJogos: novosJogos.length,
    quantidadeParticipantes: novosParticipantes.length,
  }
}

export { gerarJogos, gerarJogosModalidade, validarTorneio }
