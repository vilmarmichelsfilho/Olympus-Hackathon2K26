<script setup>
import { timesDoMaiorAoMenor } from '@/Utils/timesUtils';
import timeCard from './timeCard.vue';
</script>
<template>
  <section class="ranking">
<img src="/images/coroa.png" alt="coroa">
<h2>RANKING DOS TIMES</h2>
<table>
  <thead>
        <tr>
          <th>Pos</th>
          <th>Time</th>
          <th>Pontos</th>
        </tr>
      </thead>
      <tbody>
        <timeCard v-for="time in timesDoMaiorAoMenor" :key="time.id" :id="time.id" :pontuacao="time.pontuacao_geral" :cor="time.cor">
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
img{
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: white;
  padding: 3vw 10vw;
}
h2 {
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  font-family: "Anton SC", sans-serif;
  margin: 15vw 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  border-bottom: 1.5px solid #E85002;
}

th {
  font-family: "Krona One", sans-serif;
  font-size: 2.5rem;
  padding-bottom: 10px;
}
</style>
