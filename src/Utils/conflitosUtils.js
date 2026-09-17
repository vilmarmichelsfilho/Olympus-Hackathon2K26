import { computed } from 'vue'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import { jogosDoTorneio } from './cod_torneioAdmUtils'

function normalizarLocal(local) {
  return local.trim().toLocaleLowerCase('pt-BR')
}
function obterConfronto(codJogo) {
  const nomes = participa
    .filter((participante) => participante.cod_jogo === codJogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)
    .map((participante) => {
      const time = times.find((item) => item.cod_time === participante.cod_time)
      return time?.nome_time ?? 'A definir'
    })
  return `${nomes[0] ?? 'A definir'} x ${nomes[1] ?? 'A definir'}`
}
function formatarData(dataISO) {
  const [, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}`
}

function horarioEmMinutos(horario) {
  const [hora, minuto] = horario.split(':').map(Number)
  return hora * 60 + minuto
}

function formatarHorario(minutos) {
  const hora = String(Math.floor(minutos / 60)).padStart(2, '0')
  const minuto = String(minutos % 60).padStart(2, '0')
  return `${hora}:${minuto}`
}

const conflitosDoTorneio = computed(() => {
  const jogosDetalhados = jogosDoTorneio.value.map((jogo) => {
    const modalidade = modalidades.find((item) => item.cod_modalidade === jogo.cod_modalidade)
    const local = modalidade?.localdojogo_modalidade?.trim()
    const [data, horario = ''] = jogo.horario_jogo.split(' ')
    const hora = horario.slice(0, 5)
    const inicio = horarioEmMinutos(hora)
    const duracao = Math.max(Number(modalidade?.tempojogemminutos_modalidade) || 60, 15)

    if (!local || !data || !hora || Number.isNaN(inicio)) return null

    return {
      codJogo: jogo.cod_jogo,
      confronto: obterConfronto(jogo.cod_jogo),
      modalidade: modalidade?.nome_modalidade ?? 'Modalidade',
      local,
      localNormalizado: normalizarLocal(local),
      data,
      inicio,
      fim: inicio + duracao,
      jogoOriginal: jogo,
    }
  }).filter(Boolean)

  const visitados = new Set()
  const conflitos = []

  jogosDetalhados.forEach((jogoInicial) => {
    if (visitados.has(jogoInicial.codJogo)) return

    const grupo = []
    const fila = [jogoInicial]
    visitados.add(jogoInicial.codJogo)

    while (fila.length) {
      const jogoAtual = fila.shift()
      grupo.push(jogoAtual)

      jogosDetalhados.forEach((candidato) => {
        if (visitados.has(candidato.codJogo)) return

        const mesmoLocal = candidato.localNormalizado === jogoAtual.localNormalizado
        const mesmaData = candidato.data === jogoAtual.data
        const horariosSobrepostos =
          candidato.inicio < jogoAtual.fim && jogoAtual.inicio < candidato.fim

        if (mesmoLocal && mesmaData && horariosSobrepostos) {
          visitados.add(candidato.codJogo)
          fila.push(candidato)
        }
      })
    }

    if (grupo.length < 2) return

    const inicio = Math.min(...grupo.map((jogo) => jogo.inicio))
    const fim = Math.max(...grupo.map((jogo) => jogo.fim))
    const codigos = grupo.map((jogo) => jogo.codJogo).sort((a, b) => a - b)

    conflitos.push({
      chave: `${jogoInicial.localNormalizado}|${jogoInicial.data}|${inicio}-${fim}|${codigos.join('-')}`,
      data: jogoInicial.data,
      dataFormatada: formatarData(jogoInicial.data),
      hora: formatarHorario(inicio),
      horaFim: formatarHorario(fim),
      local: jogoInicial.local,
      jogos: grupo.sort((a, b) => a.inicio - b.inicio),
    })
  })

  return conflitos.sort((grupoA, grupoB) =>
    `${grupoA.data} ${grupoA.hora}`.localeCompare(`${grupoB.data} ${grupoB.hora}`),
  )
})
export { conflitosDoTorneio }
