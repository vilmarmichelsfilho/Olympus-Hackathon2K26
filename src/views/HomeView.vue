<script setup>
import { RouterLink } from 'vue-router'
import ArrowTopRightIcon from '@iconify-vue/mdi/arrow-top-right';
import { timesDoMaiorAoMenor } from '@/Utils/timesUtils';
import timeCard from '@/Components/timeCard.vue';
</script>
<template>
  <section class="rankingtimes">
    <RouterLink to="/times" class="link-times">Times <ArrowTopRightIcon height="2em"></ArrowTopRightIcon>
    </RouterLink>
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
div.tabela-container{
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
  padding: 2vw;
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
</style>
