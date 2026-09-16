import { arbitros } from '@/data/arbitros'
import { jogos } from '@/data/jogos'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import { torneios } from '@/data/torneios'
import { turmas } from '@/data/turmas'

const HORARIO_INICIAL = 8 * 60
const HORARIO_LIMITE = 19 * 60

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

function anosDaTurma(turmasDoTime) {
  return new Set(turmasDoTime.map((turma) => Number(turma.ano_turma)))
}

function validarEstruturaTorneio(codTorneio) {
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

function gerarJogosDoTorneio(codTorneio) {
  const validacao = validarEstruturaTorneio(codTorneio)
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
  let minutosAtuais = HORARIO_INICIAL
  let indiceArbitro = 0
  const novosJogos = []
  const novosParticipantes = []

  function reservarHorario(duracao) {
    const duracaoEmMinutos = Math.max(Number(duracao) || 60, 15)

    if (minutosAtuais + duracaoEmMinutos > HORARIO_LIMITE) {
      dataAtual.setDate(dataAtual.getDate() + 1)
      minutosAtuais = HORARIO_INICIAL
    }

    if (dataAtual > fim) return null

    const horario = `${formatarData(dataAtual)} ${formatarHorario(minutosAtuais)}`
    minutosAtuais += duracaoEmMinutos + 15
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

export { gerarJogosDoTorneio, validarEstruturaTorneio }
