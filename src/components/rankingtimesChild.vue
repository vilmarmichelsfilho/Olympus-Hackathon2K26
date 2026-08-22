<script setup>
import { timesDoMaiorAoMenor } from '@/Utils/timesUtils';
import timeCard from '@/Components/timeCard.vue';
import { jogos } from '@/data/jogos.js';
import { computed } from 'vue';
import ArrowTopRightIcon from '@iconify-vue/mdi/arrow-top-right';
const quantidadedejogos = computed(() => { return jogos.length })
const totalJogosConcluidos = computed(() => {
  return jogos.filter(jogo => jogo.status === 'concluido').length
})
</script>
<template>
  <section class="ranking">
    <img src="/images/coroa.png" alt="coroa">
    <div class="conteiner">
      <div class="conteiner-esquerda">
        <h2>Ranking Dos <span>Times</span></h2>
        <div class="contentlink">
          <RouterLink to="/times" class="link-times">Times <ArrowTopRightIcon height="2em"></ArrowTopRightIcon>
          </RouterLink>
        </div>
      </div>
      <div class="conteiner-direita">
        <p><span>{{ totalJogosConcluidos }}</span>/ {{ quantidadedejogos }}</p>
        <p class="concluido">Jogos concluídos</p>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Pos</th>
          <th>Time</th>
          <th>Pontos</th>
        </tr>
      </thead>
      <tbody>
        <timeCard v-for="time in timesDoMaiorAoMenor" :key="time.id" :id="time.id" :pontuacao="time.pontuacao_geral"
          :cor="time.cor">
        </timeCard>
      </tbody>
    </table>
  </section>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Krona+One&family=Poller+One&display=swap');

section.ranking {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background-color: white;
  margin: 20px 15px;
  padding: 20px 10px;
  border-radius: 12px;
  position: relative;
}

div.conteiner-direita {
  display: none;
}

div.contentlink {
  display: none;
}

img {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: white;
  padding: 3vw 10vw;
}

h2 {
  text-transform: uppercase;
  color: black;
  font-size: 15vw;
  font-weight: 600;
  text-align: center;
  font-family: "Anton SC", sans-serif;
  margin: 15vw 0 5vw 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  border-bottom: 1.5px solid #E85002;
}

th {
  color: black;
  font-family: "Krona One", sans-serif;
  font-size: 5vw;
  padding-bottom: 10px;
}

@media (min-width: 1200px) {
  section.ranking {
    width: 100vw;
    margin: 0;
    padding: 0;
    background: none;
  }

  div.conteiner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 5vw;
    margin: 0 0 2vw 0;
  }

  div.conteiner-esquerda {
    display: flex;
    align-items: center;
    gap: 2vw;
  }

  div.contentlink {
    align-items: center;
    display: flex;
  }

  .link-times {
    display: flex;
    align-items: center;
    gap: 1vw;
    text-decoration: none;
    font-size: 1.5vw;
    margin: 4vw 0 3vw 0;
    color: white;
    border: 1px solid white;
    border-radius: 6vw;
    padding: 0 2vw;
  }

  h2 {
    text-transform: none;
    color: white;
    font-size: 6vw;
    margin: 0;
    font-weight: lighter;
  }

  h2 span {
    color: #E85002;
  }

  div.conteiner-direita {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
div.conteiner-direita p span{
  color: #E85002;
}
div.conteiner-direita p.concluido{
  color: #948989;
    font-size: 1.5vw;
}
  div.conteiner-direita p{
    font-size: 3vw;
    line-height: 1;
    color: white;
  }
  div.conteiner-direita p span{
    color: #E85002;
  }
  thead {
    background-color: white;
    border: none;
  }

  th {
    font-size: 2.5vw;
    color: black;
  }

  img {
    display: none;
  }
}
</style>
