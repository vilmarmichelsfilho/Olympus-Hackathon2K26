<script setup>
defineProps(['jogo'])

defineEmits(['alterarPlacar'])

function classeStatus(status) {
  if (status === 'AoVivo') return 'ao-vivo'
  if (status === 'Finalizado') return 'finalizado'
  return 'agendado'
}

function rotuloStatus(status) {
  return status === 'AoVivo' ? 'Ao Vivo' : status
}
</script>

<template>
  <li class="jogo-card">
    <div class="informacoes">
      <p class="modalidade">{{ jogo.modalidade }}</p>
      <h2>{{ jogo.timeA }} x {{ jogo.timeB }}</h2>
      <p class="local">{{ jogo.local }}</p>
    </div>

    <div class="resumo">
      <span class="status" :class="classeStatus(jogo.status)">
        {{ rotuloStatus(jogo.status) }}
      </span>
      <strong v-if="jogo.temPlacar">Placar: {{ jogo.pontuacaoA }} × {{ jogo.pontuacaoB }}</strong>
      <strong v-else>–</strong>
      <time :datetime="jogo.dataHoraISO">{{ jogo.dataFormatada }} - {{ jogo.hora }}</time>
    </div>

    <button
      v-if="jogo.confrontoDefinido"
      type="button"
      @click="$emit('alterarPlacar', jogo.codJogo)"
    >
      Editar placar <span aria-hidden="true">››</span>
    </button>
  </li>
</template>

<style scoped>
.jogo-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.2vw;
  padding: 1.5vw 1.6vw 2.8vw;
  border-bottom: 0.08vw solid #e5e5e5;
  background: #fff;
}

.jogo-card:last-child {
  border-bottom: 0;
}

.informacoes,
.informacoes p,
.informacoes h2,
.resumo {
  margin: 0;
}

.modalidade {
  color: #e85002;
  font-size: 0.85vw;
  font-weight: 700;
  text-transform: uppercase;
}

.informacoes h2 {
  overflow: hidden;
  color: #15151a;
  font-size: 1.2vw;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.local,
.resumo time {
  color: #aaa;
  font-size: 0.78vw;
}

.resumo {
  display: flex;
  min-width: 9vw;
  flex-direction: column;
  align-items: flex-end;
}

.status {
  min-width: 7vw;
  padding: 0.2vw 0.7vw;
  border-radius: 999px;
  font-size: 0.72vw;
  line-height: 1.2;
  text-align: center;
}

.status.agendado,
.status.finalizado {
  background: #e6e6e6;
  color: #626262;
}

.status.ao-vivo {
  background: #fde6e7;
  color: #ef5350;
}

.resumo strong {
  margin-top: 0.35vw;
  color: #16161a;
  font-size: 1.05vw;
  font-weight: 700;
}

.jogo-card button {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.45vw 0.9vw;
  border: 0;
  border-radius: 0.7vw 0 0 0;
  background: #ff6467;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.76vw;
  font-weight: 650;
}

.jogo-card button span {
  font-size: 1vw;
}

@media (max-width: 768px) {
  .jogo-card {
    gap: 3vw;
    padding: 5.5vw 5vw 11vw;
    border-bottom-width: 0.3vw;
  }

  .modalidade {
    font-size: 3.3vw;
  }

  .informacoes h2 {
    max-width: 48vw;
    font-size: 4.4vw;
  }

  .local,
  .resumo time {
    font-size: 3vw;
  }

  .resumo {
    min-width: 24vw;
  }

  .status {
    min-width: 23vw;
    padding: 1vw 2vw;
    font-size: 2.9vw;
  }

  .resumo strong {
    margin-top: 1vw;
    font-size: 4vw;
  }

  .jogo-card button {
    padding: 2vw 3vw;
    border-radius: 3vw 0 0 0;
    font-size: 3.2vw;
  }

  .jogo-card button span {
    font-size: 4vw;
  }
}
</style>
