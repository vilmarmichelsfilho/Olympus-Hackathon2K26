<script setup>
import selecionarTorneioCard from './selecionarTorneioCard.vue'
import { torneios } from '@/data/torneios'
import { modificarCodTorneio } from '@/Utils/cod_torneioUtils.js';
function modifyCodtorneio(id){
  modificarCodTorneio(id)
}
</script>
<template>
  <div class="popup-boxx">
    <div class="conteiner">
      <img src="/public/images/coroa.png" alt="coroa" />
      <div class="content">
        <h2>TORNEIOS</h2>
        <h3>Escolha um torneio para acesar</h3>
      </div>
    </div>
    <ul>
      <selecionarTorneioCard
        v-for="torneio in torneios"
        :key="torneio.cod_torneio"
        :torneio="torneio"
        @mandar-codtorneio="modifyCodtorneio($event)"
      ></selecionarTorneioCard>
    </ul>
  </div>
</template>
<style scoped>
.popup-boxx {
  position: relative;
  background-color: white;
  width: 50vw;
  height: 60vh;
  border-radius: 1vw;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  padding: 2vw;
  align-items: flex-start;
  overflow: hidden;
}
.conteiner{
  display: flex;
  align-items: center;
  margin: 0 0 0 2vw;
}
.content{
  margin: 0 0 0 2vw;
}
h2 {
  color: black;
  font-size: 2vw;
  font-weight: bold;
  margin: 2vw 0 0 0;
  line-height: normal;
}
h3 {
  color: #5c5959;
  font-size: 1.2vw;
  margin: 0 0 2vw 0;
  line-height: normal;
}
ul {
  min-width: 90%;
  padding: 0;
  margin: 0 2vw;
}
</style>
