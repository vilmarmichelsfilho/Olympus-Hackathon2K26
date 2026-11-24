
import { mesmoId } from '@/services/api'

function separarDataHorario(horario_jogo) {
  const [data, horario] = horario_jogo.split(' ')
  return { data, horario }
}
function detalharJogo(jogo,modalidades,participa,times) {
  const { data, horario } = separarDataHorario(jogo.horario_jogo)
  const listaModalidades = modalidades?.value ?? modalidades ?? []
  const listaParticipa = participa?.value ?? participa ?? []
  const listaTimes = times?.value ?? times ?? []
  const modalidade = listaModalidades.find(
    (m) => Number(m.cod_modalidade) === Number(jogo.id_modalidade),
  )
  const participantes = listaParticipa.filter(
    (p) => mesmoId(p.id_jogo, jogo.id),
  )
  const [participante1, participante2] = participantes
  const timeA = listaTimes.find(
    (t) => Number(t.cod_time) === Number(participante1?.id_time),
  )
  const timeB = listaTimes.find(
    (t) => Number(t.cod_time) === Number(participante2?.id_time),
  )

  return {
    id: jogo.id,
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
