<script setup>
import { computed } from 'vue'
import { jogos } from '@/data/jogos'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import PencilOutlineIcon from '@iconify-vue/mdi/pencil-outline'
import TrashCanOutlineIcon from '@iconify-vue/mdi/trash-can-outline'
import CalendarIcon from '@iconify-vue/mdi/calendar-outline'

const emit = defineEmits(['editar'])

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
  const participantes = participa.filter((p) => p.cod_jogo === jogo.cod_jogo)
  const [pA, pB] = participantes
  const timeA = times.find((t) => t.cod_time === pA?.cod_time)
  const timeB = times.find((t) => t.cod_time === pB?.cod_time)

  return {
    cod_jogo: jogo.cod_jogo,
    dataFormatada: formatarDataBR(data),
    horario,
    modalidade: modalidade?.nome_modalidade,
    local: modalidade?.localdojogo_modalidade,
    status: jogo.status_jogo,
    time1: timeA?.nome_time,
    time2: timeB?.nome_time,
    pontuacao1: pA?.pontuacao_time,
    pontuacao2: pB?.pontuacao_time,
  }
}

const jogosDetalhados = computed(() => jogos.map(detalharJogo))

function classeStatus(status) {
  if (status === 'Finalizado') return 'status-finalizado'
  if (status === 'AoVivo') return 'status-aovivo'
  return 'status-agendado'
}

function excluirJogo(cod_jogo) {
  const indice = jogos.findIndex(j => j.cod_jogo === cod_jogo)
  if (indice !== -1) jogos.splice(indice, 1)
}
</script>

<template>
  <div class="card-jogos">
    <img src="@/assets/coroa.png" alt="" class="coroa" />

    <div class="linha-jogo" v-for="jogo in jogosDetalhados" :key="jogo.cod_jogo">
      <div class="celula-confronto">
        <p class="modalidade">{{ jogo.modalidade }}</p>
        <p class="confronto">
          {{ jogo.time1 }} x {{ jogo.time2 }}
          <span v-if="jogo.pontuacao1 !== null && jogo.pontuacao1 !== undefined">
            {{ jogo.pontuacao1 }}x{{ jogo.pontuacao2 }}
          </span>
          <span v-else>-</span>
        </p>
        <p class="local">{{ jogo.local }}</p>
      </div>

      <div class="celula-data">
        <p class="label-data">Data e Horário</p>
        <p class="valor-data">
          <CalendarIcon width="0.9vw" /> {{ jogo.dataFormatada }} - {{ jogo.horario }}
        </p>
      </div>

      <span class="status-pill" :class="classeStatus(jogo.status)">{{ jogo.status }}</span>

      <button class="btn-editar" @click="emit('editar', jogo.cod_jogo)">
        <PencilOutlineIcon width="1vw" />
        Editar
      </button>
      <button class="btn-excluir" @click="excluirJogo(jogo.cod_jogo)">
        <TrashCanOutlineIcon width="1vw" /> Excluir
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-jogos {
  background: white;
  border-radius: 1vw;
  padding: 1.5vw 2vw;
}

.card-jogos img {
  align-items: center;
  margin: 0vw 20vw;
}

.linha-jogo {
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1fr 1fr 1fr;
  align-items: center;
  gap: 1vw;
  padding: 1vw 0;
  border-bottom: 0.05vw solid #eee;
}

.modalidade {
  color: #DE6D1C;
  font-size: 0.75vw;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
}

.confronto {
  font-weight: bold;
  margin: 0.2vw 0;
}

.local {
  color: #999;
  font-size: 0.75vw;
  margin: 0;
}

.label-data {
  color: #999;
  font-size: 0.7vw;
  margin: 0;
}

.valor-data {
  display: flex;
  align-items: center;
  gap: 0.3vw;
  margin: 0;
  font-size: 0.85vw;
}

.status-pill {
  width: fit-content;
  padding: 0.2vw 0.8vw;
  border-radius: 999px;
  font-size: 0.75vw;
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
  background: #FDE8E8;
  color: #E53935;
}

.btn-editar,
.btn-excluir {
  display: flex;
  align-items: center;
  gap: 0.3vw;
  padding: 0.4vw 0.8vw;
  border-radius: 0.4vw;
  font-size: 0.8vw;
  cursor: pointer;
  background: white;
}

.btn-editar {
  border: 0.1vw solid #ccc;
  color: #333;
}

.btn-excluir {
  border: 0.1vw solid #E53935;
  color: #E53935;
}
</style>
