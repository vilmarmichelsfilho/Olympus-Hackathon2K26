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
const conflitosDoTorneio = computed(() => {
  const grupos = new Map()
  jogosDoTorneio.value.forEach((jogo) => {
    const modalidade = modalidades.find((item) => item.cod_modalidade === jogo.cod_modalidade)
    const local = modalidade?.localdojogo_modalidade?.trim()
    const [data, horario = ''] = jogo.horario_jogo.split(' ')
    const hora = horario.slice(0, 5)
    if (!local || !data || !hora) return
    const chave = `${normalizarLocal(local)}|${data}|${hora}`
    const grupo = grupos.get(chave) ?? { chave, data, hora, local, jogos: [] }
    grupo.jogos.push({
      codJogo: jogo.cod_jogo,
      confronto: obterConfronto(jogo.cod_jogo),
      modalidade: modalidade.nome_modalidade,
      jogoOriginal: jogo,
    })
    grupos.set(chave, grupo)
  })
  return [...grupos.values()]
    .filter((grupo) => grupo.jogos.length > 1)
    .map((grupo) => ({ ...grupo, dataFormatada: formatarData(grupo.data) }))
    .sort((grupoA, grupoB) =>
      `${grupoA.data} ${grupoA.hora}`.localeCompare(`${grupoB.data} ${grupoB.hora}`),
    )
})
export { conflitosDoTorneio }
