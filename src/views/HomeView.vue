<script setup>
import { RouterLink } from 'vue-router'
import ArrowTopRightIcon from '@iconify-vue/mdi/arrow-top-right';
import { timesDoMaiorAoMenor } from '@/Utils/timesUtils';
import timeCard from '@/Components/timeCard.vue';
import { jogos } from '@/data/jogos';
import { ref, computed } from 'vue';
const quantidadedejogos = ref(jogos.length)
const totalJogosConcluidos = computed(() => {
  return jogos.filter(jogo => jogo.status === 'concluido').length
})
</script>
<template>
  <section class="rankingtimes">
    <div class="conteiner">
      <div class="conteiner-esquerdo">
       <h3>Ranking Dos <span>Times</span></h3>
       <div class="contentlink"><RouterLink to="/times" class="link-times">Times <ArrowTopRightIcon height="2em"></ArrowTopRightIcon>
        </RouterLink></div>
      </div>
      <div class="jogosrestantes">
        <p class="numero"><span>{{ totalJogosConcluidos }}</span>/{{ quantidadedejogos }}</p>
        <p>Jogos Restantes</p>
      </div>
    </div>
    <div class="tabela-container">
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
    </div>

  </section>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Krona+One&family=Poller+One&display=swap');

section.rankingtimes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50vh 0 0 0;
}

section.rankingtimes h3 {
  display: none;
}

section.rankingtimes div.jogosrestantes {
  display: none;
}

div.tabela-container {
  background-color: white;
  width: 90vw;
  height: auto;
  border-radius: 2vw;
  padding: 8vw 3vw 15vw 3vw;
}

table {
  border-collapse: collapse;
}

thead {
  border-bottom: 1.5px solid #E85002;
}

th {
  color: black;
  font-size: 5vw;
  text-align: center;
  font-family: "Krona One", sans-serif;
  padding: 2vw 0;
}

tbody {
  padding: 0 0 10vh 0;
}

.link-times {
  display: flex;
  align-items: center;
  gap: 3vw;
  text-decoration: none;
  font-size: 5vw;
  margin: 0 55vw 4vw 0;
  color: white;
  border: 1px solid white;
  border-radius: 6vw;
  padding: 0.5vw 4vw;
}

@media (min-width: 1200px) {
  section.rankingtimes div.conteiner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
section.rankingtimes div.conteiner-esquerdo{
  display: flex;
  gap: 2vw;
}
  section.rankingtimes h3 {
    display: block;
    font-size: 6vw;
    margin: 0 0 0 4vw;
    font-weight: 600;
  }
  section.rankingtimes h3 span{
    color: #E85002;
  }
  section.rankingtimes div.jogosrestantes {
    display: block;
    margin: 1vw 5vw 0 0;
  }
  div.jogosrestantes p{
    color: #948989;
    font-size: 1.5vw;
  }
  div.jogosrestantes p.numero{
    font-size: 3vw;
    line-height: 1;
    color: white;
  }
  div.jogosrestantes p span{
    color: #E85002;
  }
  div.tabela-container {
    width: 100vw;
    height: auto;
    border-radius: 0;
    padding: 0;
  }
 div.contentlink{
  align-items: center;
  display: flex;
 }
  thead {
    border: none;
  }
  table {
    width: 100%;
  }

  th {
    font-size: 2.5vw;
    padding: 1vw;
  }

  .link-times {
    font-size: 1.5vw;
    margin: 0;
    padding: 0 2vw;
    margin: 1.5vw 0 0 0;
    gap: 1vw;
  }
}
</style>
