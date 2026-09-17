<script setup>
import { computed } from 'vue'
import { jogosDoTorneio } from '@/Utils/cod_torneioAdmUtils'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import PencilOutlineIcon from '@iconify-vue/mdi/pencil-outline'
import CalendarIcon from '@iconify-vue/mdi/calendar-outline'

const emit = defineEmits(['editar', 'placar'])

function separarDataHorario(horario_jogo) {
  const [data, horario] = horario_jogo.split(' ')
  return { data, horario }
}

function formatarDataBR(dataISO) {
  const [, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}`
}

function detalharJogo(jogo) {
  const { data, horario } = separarDataHorario(jogo.horario_jogo)
  const modalidade = modalidades.find((m) => m.cod_modalidade === jogo.cod_modalidade)
  const participantes = participa
    .filter((p) => Number(p.cod_jogo) === Number(jogo.cod_jogo))
    .sort((a, b) => a.posicao_participante - b.posicao_participante)
  const [pA, pB] = participantes
  const timeA = times.find((t) => Number(t.cod_time) === Number(pA?.cod_time))
  const timeB = times.find((t) => Number(t.cod_time) === Number(pB?.cod_time))

  return {
    codJogo: jogo.cod_jogo,
    confrontoDefinido: Boolean(timeA && timeB),
    dataFormatada: formatarDataBR(data),
    dataHoraISO: `${data}T${horario.slice(0, 5)}`,
    hora: horario.slice(0, 5),
    modalidade: modalidade?.nome_modalidade ?? 'Modalidade',
    local: modalidade?.localdojogo_modalidade ?? 'Local a definir',
    status: jogo.status_jogo,
    temPlacar: pA?.pontuacao_time != null && pB?.pontuacao_time != null,
    timeA: timeA?.nome_time ?? 'A definir',
    timeB: timeB?.nome_time ?? 'A definir',
    pontuacaoA: pA?.pontuacao_time,
    pontuacaoB: pB?.pontuacao_time,
  }
}

const jogosDetalhados = computed(() => jogosDoTorneio.value.map(detalharJogo))

function classeStatus(status) {
  if (status === 'Finalizado') return 'status-finalizado'
  if (status === 'AoVivo') return 'status-aovivo'
  return 'status-agendado'
}

function rotuloStatus(status) {
  return status === 'AoVivo' ? 'Ao Vivo' : status
}
</script>

<template>
  <div class="card-jogos">
    <header class="cabecalho-tabela">
      <img src="@/assets/coroa.png" alt="" class="coroa" />
    </header>

    <article class="linha-jogo" v-for="jogo in jogosDetalhados" :key="jogo.codJogo">
      <div class="celula-confronto">
        <p class="modalidade">{{ jogo.modalidade }}</p>
        <div class="linha-confronto">
          <p class="confronto">{{ jogo.timeA }} x {{ jogo.timeB }}</p>
          <strong class="placar">{{
            jogo.temPlacar ? `${jogo.pontuacaoA}x${jogo.pontuacaoB}` : '–'
          }}</strong>
        </div>
        <p class="local">{{ jogo.local }}</p>
      </div>

      <div class="celula-data">
        <p class="label-data">Data e Horário</p>
        <p class="valor-data">
          <CalendarIcon width="0.9vw" /> {{ jogo.dataFormatada }} - {{ jogo.hora }}
        </p>
      </div>

      <span class="status-pill" :class="classeStatus(jogo.status)">{{
        rotuloStatus(jogo.status)
      }}</span>

      <div class="acoes-jogo">
        <button class="btn-editar" type="button" @click="emit('editar', jogo.codJogo)">
          <PencilOutlineIcon />
          Editar
        </button>
        <button
          v-if="jogo.status === 'AoVivo' && jogo.confrontoDefinido"
          class="btn-placar"
          type="button"
          @click="emit('placar', jogo)"
        >
          Pontuação <span aria-hidden="true">››</span>
        </button>
      </div>
    </article>

    <p v-if="!jogosDetalhados.length" class="estado-vazio">Nenhum jogo cadastrado neste torneio.</p>
  </div>
</template>

<style scoped>
.card-jogos {
  overflow: hidden;
  background: #0b1739;
  border-radius: 0.8vw;
}

.cabecalho-tabela {
  display: grid;
  height: 4.8vw;
  place-items: center;
  border-bottom: 2px solid #e85002;
}

.coroa {
  width: 2.2vw;
  height: 1.9vw;
  object-fit: contain;
}

.linha-jogo {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(10vw, 1.2fr) minmax(7vw, 0.75fr) auto;
  align-items: center;
  gap: 1.4vw;
  min-height: 7.1vw;
  padding: 1.15vw 2.8vw;
  border-bottom: 1px solid #1e293b;
}

.linha-jogo:hover {
  background: rgb(255 255 255 / 2%);
}

.linha-jogo:last-of-type {
  border-bottom: 0;
}

.linha-confronto {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 1vw;
}

.modalidade {
  margin: 0;
  color: #de6d1c;
  font-size: 0.82vw;
  font-weight: 700;
  text-transform: uppercase;
}

.confronto {
  overflow: hidden;
  margin: 0.1vw 0;
  color: #fff;
  font-size: 1.05vw;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.placar {
  flex: 0 0 auto;
  color: #fff;
  font-size: 1vw;
  font-weight: 700;
}

.local {
  margin: 0;
  color: #8a99ad;
  font-size: 0.7vw;
}

.label-data {
  margin: 0;
  color: #fff;
  font-size: 0.78vw;
  font-weight: 650;
}

.valor-data {
  display: flex;
  align-items: center;
  gap: 0.3vw;
  margin: 0;
  color: #8a99ad;
  font-size: 0.78vw;
}

.valor-data svg {
  width: 0.9vw;
  color: #e85002;
}

.status-pill {
  width: fit-content;
  min-width: 6.5vw;
  padding: 0.25vw 0.8vw;
  border-radius: 999px;
  font-size: 0.72vw;
  line-height: 1.2;
  text-align: center;
}

.status-agendado {
  background: #eee;
  color: #666;
}

.status-finalizado {
  background: #ddd;
  color: #444;
}

.status-aovivo {
  background: #fde8e8;
  color: #e53935;
}

.acoes-jogo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.55vw;
}

.acoes-jogo button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3vw;
  min-width: 7vw;
  padding: 0.48vw 0.9vw;
  border-radius: 0.4vw;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 0.78vw;
  font-weight: 650;
}

.btn-editar {
  border: 1px solid #aeb9d0;
  color: #fff;
}

.btn-editar svg {
  width: 1.05vw;
  height: 1.05vw;
}

.btn-placar {
  border: 0;
  background: #ff6467 !important;
  color: #fff;
}

.estado-vazio {
  margin: 0;
  padding: 7vw 2vw;
  color: #aeb9d0;
  text-align: center;
}

@media (max-width: 768px) {
  .card-jogos {
    background: #fff;
    border-radius: 5vw;
    box-shadow: 2vw 2vw 3vw rgb(0 0 0 / 12%);
  }

  .cabecalho-tabela {
    display: none;
  }

  .linha-jogo {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      'confronto resumo'
      'acoes acoes';
    gap: 3vw;
    min-height: 35vw;
    padding: 6vw 5vw 3vw;
    border-bottom-width: 0.3vw;
    border-bottom-color: #e6e6e6;
  }

  .celula-confronto {
    grid-area: confronto;
  }

  .linha-confronto {
    justify-content: flex-start;
  }

  .modalidade {
    font-size: 3.1vw;
  }

  .confronto {
    max-width: 48vw;
    color: #17171b;
    font-size: 4.25vw;
  }

  .placar {
    display: none;
  }

  .local {
    color: #999;
    font-size: 2.8vw;
  }

  .celula-data {
    grid-area: resumo;
    align-self: end;
    text-align: right;
  }

  .label-data {
    display: none;
  }

  .valor-data {
    justify-content: flex-end;
    gap: 1vw;
    color: #999;
    font-size: 2.9vw;
  }

  .valor-data svg {
    width: 3.2vw;
  }

  .status-pill {
    position: absolute;
    top: 5.5vw;
    right: 5vw;
    min-width: 25vw;
    padding: 1vw 2vw;
    font-size: 2.9vw;
  }

  .acoes-jogo {
    grid-area: acoes;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .acoes-jogo button {
    min-width: 25vw;
    padding: 2vw 3vw;
    border-radius: 3vw;
    font-size: 3.2vw;
  }

  .btn-editar svg {
    width: 4vw;
    height: 4vw;
  }

  .btn-editar {
    border-color: #ccc;
    background: #fff;
    color: #333;
  }

  .btn-placar {
    margin-left: auto;
    border-radius: 3vw 0 0 0 !important;
  }

  .estado-vazio {
    color: #888;
    padding: 20vw 5vw;
    font-size: 3.5vw;
  }
}
</style>
