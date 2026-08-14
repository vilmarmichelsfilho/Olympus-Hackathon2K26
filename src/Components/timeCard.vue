<script setup>
import { definirposicao } from '@/Utils/timesUtils';
 const props = defineProps(['id', 'pontuacao', 'cor'])
const posicao = definirposicao(props.id)
</script>
<template>
  <tr>
          <td>{{ posicao }}</td>
          <td>{{ props.cor }}</td>
          <td>{{ props.pontuacao }}</td>
  </tr>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Krona+One&family=Poller+One&display=swap');
tr{
  border-bottom: 3px solid #B1B1B1;
}
td{
  font-size: 5vw;
  font-weight: bold;
  padding: 3vw 2vw;
  font-family: "Krona One", sans-serif;
  color: black;
  text-align: center;
  padding: 2vw;
}
</style>
