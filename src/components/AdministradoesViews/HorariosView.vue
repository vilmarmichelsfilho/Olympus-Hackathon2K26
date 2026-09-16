<script setup>
import { computed, ref, watch } from 'vue'
import { codTorneioSelecionadoAdm, jogosDoTorneio } from '@/Utils/cod_torneioAdmUtils'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import { torneios } from '@/data/torneios'
import DiaTorneioButton from './DiaTorneioButton.vue'
import HorarioJogoItem from '../HorarioJogoItem.vue'
const UM_DIA_EM_MS = 24 * 60 * 60 * 1000
const dataSelecionada = ref(null)
const torneioSelecionado = computed(() =>
  torneios.find(
    (torneio) => Number(torneio.cod_torneio) === Number(codTorneioSelecionadoAdm.value),
  ),
)
function criarDataUTC(dataISO) {
  const [ano, mes, dia] = dataISO.split('-').map(Number)
  return new Date(Date.UTC(ano, mes - 1, dia))
}
function formatarDataISO(data) {
  const ano = data.getUTCFullYear()
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0')
  const dia = String(data.getUTCDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}
const diasDoTorneio = computed(() => {
  const torneio = torneioSelecionado.value
  if (!torneio?.data_inicio_torneio || !torneio?.data_fim_torneio) return []
  const inicio = criarDataUTC(torneio.data_inicio_torneio)
  const fim = criarDataUTC(torneio.data_fim_torneio)
  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fim.getTime()) || fim < inicio) return []
  const quantidadeDeDias = Math.floor((fim.getTime() - inicio.getTime()) / UM_DIA_EM_MS)
  return Array.from({ length: quantidadeDeDias + 1 }, (_, indice) => {
    const data = new Date(inicio)
    data.setUTCDate(inicio.getUTCDate() + indice)
    return formatarDataISO(data)
  })
})
watch(
  diasDoTorneio,
  (dias) => {
    if (!dias.includes(dataSelecionada.value)) {
      dataSelecionada.value = dias[0] ?? null
    }
  },
  { immediate: true },
)
function detalharJogo(jogo) {
  const modalidade = modalidades.find((item) => item.cod_modalidade === jogo.cod_modalidade)
  const participantes = participa
    .filter((item) => item.cod_jogo === jogo.cod_jogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)
  const nomesDosTimes = participantes.map((participante) => {
    const time = times.find((item) => item.cod_time === participante.cod_time)
    return time?.nome_time ?? 'A definir'
  })
  const [, horario = ''] = jogo.horario_jogo.split(' ')
  return {
    codJogo: jogo.cod_jogo,
    horario: horario.slice(0, 5),
    local: modalidade?.localdojogo_modalidade ?? 'Local a definir',
    modalidade: modalidade?.nome_modalidade ?? 'Modalidade',
    status: jogo.status_jogo,
    timeA: nomesDosTimes[0] ?? 'A definir',
    timeB: nomesDosTimes[1] ?? 'A definir',
  }
}
const jogosDoDia = computed(() =>
  jogosDoTorneio.value
    .filter((jogo) => jogo.horario_jogo.split(' ')[0] === dataSelecionada.value)
    .sort((jogoA, jogoB) => jogoA.horario_jogo.localeCompare(jogoB.horario_jogo))
    .map(detalharJogo),
)
</script>

<template>
  <section class="horarios-view" aria-labelledby="titulo-horarios">
    <header class="cabecalho">
      <h1 id="titulo-horarios">Horários Olimpíadas</h1>
      <h2>Visão diária dos jogos</h2>
    </header>

    <div v-if="torneioSelecionado" class="painel-horarios">
      <img class="coroa" src="@/assets/coroa.png" alt="" />

      <nav v-if="diasDoTorneio.length" class="seletor-dias" aria-label="Dias do torneio">
        <DiaTorneioButton
          v-for="dia in diasDoTorneio"
          :key="dia"
          :dia="dia"
          :ativo="dia === dataSelecionada"
          @selecionar="dataSelecionada = $event"
        />
      </nav>
      <ul v-if="jogosDoDia.length" class="lista-jogos">
        <HorarioJogoItem
          v-for="jogo in jogosDoDia"
          :key="jogo.codJogo"
          :data="dataSelecionada"
          :jogo="jogo"
        />
      </ul>
      <p v-else-if="diasDoTorneio.length" class="estado-vazio">
        Nenhum jogo agendado para este dia.
      </p>
      <p v-else class="estado-vazio">O período deste torneio não está disponível.</p>
    </div>
    <div v-else class="painel-horarios sem-torneio">
      <p>Selecione um torneio para visualizar os horários.</p>
    </div>
  </section>
</template>
<style scoped>
.horarios-view {
  width: 80vw;
  max-width: 1120px;
  min-height: 100vh;
  padding: 28px 32px 40px;
  color: #17171a;
}
.cabecalho {
  margin-bottom: 28px;
  color: #fff;
}
.cabecalho h1 {
  margin: 0;
  font-size: 3vw;
  font-weight: 700;
  line-height: 1.25;
}

.cabecalho h2 {
  margin: 2px 0 0;
  color: #a9a9ac;
  font-size: 2cw;
}

.painel-horarios {
  width: 100%;
  min-height: 560px;
  padding: 18px 7% 48px;
  border-radius: 3px;
  background: #fff;
}

.coroa {
  display: block;
  width: 32px;
  height: 27px;
  margin: 0 auto 20px;
  object-fit: contain;
}
.seletor-dias {
  display: grid;
  grid-auto-columns: minmax(150px, 1fr);
  grid-auto-flow: column;
  gap: 28px;
  margin-bottom: 34px;
  overflow-x: auto;
  padding: 0 0 8px;
  scrollbar-color: #e85002 transparent;
  scrollbar-width: thin;
}
.lista-jogos {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.estado-vazio,
.sem-torneio {
  color: #777;
  text-align: center;
}

.estado-vazio {
  margin: 70px 0;
}

.sem-torneio {
  display: grid;
  place-items: center;
}

@media (max-width: 768px) {
  .horarios-view {
    width: 100vw;
    min-height: 100vh;
    padding: 18px 17px 36px;
    background: #fff;
  }

  .cabecalho {
    margin-bottom: 20px;
    color: #17171a;
  }

  .cabecalho h1 {
    font-size: 5vw;
  }

  .cabecalho h2 {
    color: #a9a9ac;
    font-size: 4vw;
  }

  .painel-horarios {
    min-height: 0;
    padding: 0;
  }

  .coroa {
    display: none;
  }

  .seletor-dias {
    grid-auto-columns: minmax(62px, 1fr);
    gap: 7px;
    margin-bottom: 34px;
    padding-bottom: 7px;
  }

  .lista-jogos {
    gap: 0;
    overflow: hidden;
    border-radius: 0 15px 15px 0;
    box-shadow: 8px 9px 7px rgb(0 0 0 / 13%);
  }
}
</style>
