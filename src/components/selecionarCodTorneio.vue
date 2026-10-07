<script setup>
import selecionarTorneioCard from './selecionarTorneioCard.vue'
import { torneios } from '@/data/torneios'
import { modificarCodTorneio } from '@/Utils/cod_torneioUtils.js'
function modifyCodtorneio(id) {
  modificarCodTorneio(id)
}
</script>
<template>
  <div class="popup-boxx">
    <div class="conteiner">
      <img src="/images/coroa.png" alt="coroa" />
      <div class="content">
        <h2>TORNEIOS</h2>
        <h3>Escolha um torneio para acessar</h3>
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
.conteiner {
  display: flex;
  align-items: center;
  margin: 0 0 0 2vw;
}
.content {
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
@media (max-width: 1000px) {
  .popup-boxx {
    width: min(100% - 32px, 560px);
    height: auto;
    margin: 24px 0;
    padding: 24px 20px;
    border-radius: 20px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
    overflow: visible;
    gap: 24px;
  }

  .conteiner {
    width: 100%;
    gap: 14px;
    margin: 0;
  }

  .conteiner img {
    width: 56px;
    height: 56px;
    padding: 8px;
    object-fit: contain;
    background: #fff2e9;
    border-radius: 14px;
    flex-shrink: 0;
  }

  .content {
    min-width: 0;
    margin: 0;
  }

  h2 {
    margin: 0 0 4px;
    font-size: 22px;
    line-height: 1.2;
  }

  h3 {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    min-width: 0;
    margin: 0;
    list-style: none;
  }
}

@media (max-width: 360px) {
  .popup-boxx {
    padding: 20px 16px;
  }

  .conteiner {
    gap: 10px;
  }

  .conteiner img {
    width: 48px;
    height: 48px;
  }
}
</style>
