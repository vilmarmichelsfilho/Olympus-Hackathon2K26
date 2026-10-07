<script setup>
import { computed } from 'vue'

const props = defineProps(['data', 'jogo'])

const aoVivo = computed(() => props.jogo.status?.replaceAll(' ', '').toLowerCase() === 'aovivo')
</script>

<template>
  <li class="card-jogo" :class="{ 'ao-vivo': aoVivo }">
    <div class="dados-jogo">
      <div class="linha-modalidade">
        <p class="modalidade">{{ jogo.modalidade }}</p>
        <span v-if="aoVivo" class="status">Ao Vivo</span>
      </div>
      <p class="confronto">{{ jogo.timeA }} x {{ jogo.timeB }}</p>
      <p class="local">{{ jogo.local }}</p>
    </div>
    <time class="horario" :datetime="`${data}T${jogo.horario}`">
      {{ jogo.horario }}
    </time>
  </li>
</template>

<style scoped>
.card-jogo {
  position: relative;
  display: flex;
  min-height: 7.4vw;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 1vw 2.9vw;
  border: 0.07vw solid #1e293b;
  border-radius: 0.85vw;
  background: rgb(255 255 255 / 3%);
}

.dados-jogo,
.dados-jogo p {
  min-width: 0;
  margin: 0;
}

.linha-modalidade {
  display: flex;
  align-items: center;
  gap: 0.7vw;
}

.modalidade {
  color: #e85002;
  font-size: 1.2vw;
  font-weight: 700;
}

.ao-vivo .modalidade {
  color: #df272e;
  text-transform: uppercase;
}

.status {
  border-radius: 0.2vw;
  background: #ed3a40;
  color: #fff;
  font-size: 0.78vw;
  font-weight: 700;
  line-height: 1;
  padding: 0.2vw 0.55vw;
}

.confronto {
  overflow: hidden;
  color: #fff;
  font-size: 1.55vw;
  font-weight: 650;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.local {
  color: #8a99ad;
  font-size: 1vw;
}

.horario {
  flex: 0 0 auto;
  margin-left: 1.4vw;
  color: #aeb9d0;
  font-size: 2.1vw;
  font-weight: 600;
}

@media (max-width: 768px) {
  .card-jogo {
    min-height: 21vw;
    padding: 2.6vw 2vw;
    border: 0;
    border-bottom: 0.3vw solid #e5e5e5;
    border-radius: 0;
    background: #fff;
    box-shadow: none;
  }

  .card-jogo:last-child {
    border-bottom: 0;
  }

  .linha-modalidade {
    gap: 1.8vw;
  }

  .modalidade {
    color: #68ad3e;
    font-size: 3.6vw;
  }

  .ao-vivo .modalidade {
    color: #df272e;
  }

  .status {
    font-size: 2.25vw;
    padding: 0.7vw 1.8vw;
  }

  .confronto {
    max-width: 45vw;
    color: #121216;
    font-size: 4.5vw;
  }

  .local {
    color: #aaa;
    font-size: 2.75vw;
  }

  .horario {
    align-self: flex-start;
    margin-left: 2vw;
    color: #aaa;
    font-size: 4.1vw;
  }
}
</style>
