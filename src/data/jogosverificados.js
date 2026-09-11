import { computed } from 'vue'
import { jogos } from '@/data/jogos'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'

function separarDataHorario(horario_jogo) {
  const [data, horario] = horario_jogo.split(' ')
  return { data, horario }
}

function detalharJogo(jogo) {
  const { data, horario } = separarDataHorario(jogo.horario_jogo)
  const modalidade = modalidades.find((m) => m.cod_modalidade === jogo.cod_modalidade)
  const participantes = participa.filter((p) => p.cod_jogo === jogo.cod_jogo)

  const [participante1, participante2] = participantes
  const timeA = times.find((t) => t.cod_time === participante1?.cod_time)
  const timeB = times.find((t) => t.cod_time === participante2?.cod_time)

  return {
    cod_jogo: jogo.cod_jogo,
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

const jogosVerificados = computed(() =>
  jogos
    .filter((jogo) => jogo.status_jogo === 'AoVivo')
    .map(detalharJogo)
)
export{jogosVerificados}
