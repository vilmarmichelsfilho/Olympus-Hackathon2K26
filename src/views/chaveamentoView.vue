<script setup>
import { computed } from 'vue'
import { modalidades } from '@/data/modalidades'
import { useRoute } from 'vue-router'
import { jogos } from '@/data/jogos'
import Bracket from 'vue-tournament-bracket'

const route = useRoute()
const modalidadeId = computed(() => Number(route.params.id))

const modalidadeSelecionada = computed(() => {
  return modalidades.find((m) => m.id === modalidadeId.value) || null
})

const nome = computed(() => {
  return modalidadeSelecionada.value ? modalidadeSelecionada.value.nome : ''
})

const jogosdamodalidade = computed(() => {
  return jogos.filter((jogo) => jogo.modalidade == modalidadeSelecionada.value.nome)
})

const formatarParaBracket = (fase) => {
  return jogosdamodalidade.value
    .filter((jogo) => jogo.fase === fase)
    .map((jogo) => ({
      id: jogo.id,
      player1: {
        id: jogo.time1,
        name: jogo.time1,
        winner: jogo.pontuacao1 !== null && jogo.pontuacao1 > jogo.pontuacao2,
        isFirst: true,
        dataHorario: `${jogo.data} ${jogo.horario}`,
      },
      player2: {
        id: jogo.time2,
        name: jogo.time2,
        winner: jogo.pontuacao2 !== null && jogo.pontuacao2 > jogo.pontuacao1,
        isFirst: false,
      },
    }))
}

const rounds = computed(() => [
  { games: formatarParaBracket('Quartas de Final') },
  { games: formatarParaBracket('Semifinal') },
  { games: formatarParaBracket('Final') },
])
</script>

<template>
  <main>
    <section class="chaveamento">
      <div class="header-chaveamento">
        <div class="coroa">
    <img src="/public/images/coroa.png" alt="coroa" />
  </div>
        <h3>{{ nome }}<br /> <span>Games</span></h3>
      </div>

      <div class="scroll-container">
        <bracket :rounds="rounds">
    <template #player="{ player }">
  <div v-if="player.isFirst" class="match-time">
    {{ player.dataHorario }}
  </div>
  <span class="team-name" :class="{ 'align-right': player.isFirst, 'align-left': !player.isFirst }">
    {{ player.name }}
  </span>
  <span v-if="!player.isFirst" class="vs">X</span>
</template>
        </bracket>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  background-color: white;
}
.chaveamento {
  position: relative;
  background-color: transparent;
  width: 100%;
  padding-bottom: 5vw;
}

.header-chaveamento {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding-top: 4vw;
}

.coroa {
  position: absolute;
  padding: 1vw 7vw;
  top: -7vw;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 2vw;
  min-width: 10vw;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.coroa img {
  width: 70%;
  height: 55%;
  object-fit: contain;
}
h3 {
  color: black;
  font-size: 15vw;
  margin-top: 6vw;
  text-align: center;
  line-height: 0.8;
}
h3 span{
  font-size: 10vw;
  color: #E85002;
}
.scroll-container {
  width: 100%;
  max-width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 2vw;
  margin-top: 2vw;
}

:deep(.vtb-wrapper) {
  min-width: 180vw;
  display: flex;
}
:deep(.player-content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
}

:deep(.vtb-item-players .vtb-player) {
  background-color: transparent !important;
  color: #000 !important;
}
:deep(.vtb-item-player) {
  border: 0.4vw solid #000;
  color: #000;
  border-radius: 2vw;
  padding: 8vw 2vw 2vw 2vw;
  justify-content: center;
  align-items: center;
  min-width: 45vw;
  position: relative;
}
:deep(.vtb-item-parent:after),
:deep(.vtb-item-child:before),
:deep(.vtb-item-child:after) {
  background-color: #ff4d6d;
}
:deep(.vtb-item-players) {
  display: grid !important;
  grid-template-columns: 1fr auto 1fr;
  column-gap: 0.8vw;
  row-gap: 1vw;
  align-items: center;
  background-color: transparent;
  border: 0.4vw solid #000;
  border-radius: 2vw;
  padding: 8vw 2vw 2vw 2vw;
  min-width: 45vw;
  position: relative;
}

:deep(.vtb-item-players > div),
:deep(.vtb-player),
:deep(.player-content) {
  display: contents;
}

.match-time {
  grid-column: 1 / -1;
  text-align: center;
  font-size: clamp(11px, 2.8vw, 16px);
  color: #000;
  font-weight: bold;
}
.team-name {
  text-align: center;
  white-space: nowrap;
  font-size: clamp(14px, 4.2vw, 20px);
}
.team-name.align-right {
  order: 1;
}
.vs {
  font-weight: bold;
  color: #000;
  font-size: clamp(14px, 4vw, 22px);
  order: 2;
  text-align: center;
}

.team-name.align-left {
  order: 3;
}
@media (min-width: 768px) {
  .chaveamento {
    margin-top: 40px;
    padding-bottom: 30px;
  }

  .coroa {
    top: -2vw;
  min-width: 15vw;
}

  h3 {
    font-size: 7.5vw;
  }
  h3 span{
    font-size: 5vw;
  }
  :deep(.vtb-wrapper) {
    min-width: 700px;
  }

  :deep(.vtb-item-players) {
    background-color: transparent;
    border: 2px solid #000;
    border-radius: 8px;
    padding: 30px 10px 10px 10px;
    min-width: 25vw;
  }

  :deep(.vtb-item-player) {
    font-size: 14px;
  }

  .match-time {
    top: 6px;
    font-size: 1.2vw;
  }
}
</style>
