<script setup>
 import OympusControl from '@/components/OympusControl.vue';
 import { jogos } from '@/data/jogos';
import trophie from '@/assets/trophie.png';
import { totalJogosHoje } from '@/Utils/DashboardUtils';
import { totalConflitos } from '@/Utils/DashboardUtils';
import conflito from '@/assets/conflito.png';
import calendar from '@/assets/calendar.png';
import home from '@/assets/home.png';
import GraficoJogos from '@/components/GraficoJogos.vue';
import ProximosJogos from '@/components/ProximosJogos.vue'

</script>

<template>
<div class="tudo">


  <H1>Controle das Olimpiadas, IFC</H1>
  <H3>pagina destinada para  visão geral dos jogos</H3>
  <div class="controls">
 <ul>
  <li>
   <OympusControl titulo="Total de jogos" :valor="jogos.length" :icone="trophie" :rota="administradores"> </OympusControl>
  </li>
  <li>
   <OympusControl titulo="Total de jogos" :valor="totalJogosHoje" :icone="calendar" :rota="administradores"> </OympusControl>
</li>
<li>
     <OympusControl titulo="Total de jogos" :valor="totalConflitos" :icone="conflito" :rota="administradores"> </OympusControl>
</li>
<li>
        <OympusControl titulo="voltar para" :icone="home" :rota="administradores"> </OympusControl>
</li>
 </ul>
</div>
  <div class="parte-baixo">
    <div class="grafico"><GraficoJogos /></div>
    <ProximosJogos />
  </div>
</div>
</template>


<style scoped>

li {
  list-style: none;
}
.controls ul {
  display: flex;
   gap: 1rem;
}


.parte-baixo {
  display: flex;
  gap: 1rem;
  margin-top: 1vw;

}
.grafico {
  background-color: white;

}

</style>
