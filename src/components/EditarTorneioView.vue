<script setup>
import { ref } from 'vue'
import popUpEditarTorneio from './pop-upEditarTorneio.vue';
import { editarTorneio } from '@/Utils/editarUtils.js';
const emit = defineEmits(['fecha'])
const props = defineProps(['torneio'])
const mostrarEditarTorneio = ref(false)
function abrirEditarTorneio() {
  mostrarEditarTorneio.value = true
}
function atualizarTorneio(novoTorneio) {
  editarTorneio(props.torneio.cod_torneio, novoTorneio);
  mostrarEditarTorneio.value = false;
}
function Fechar(){
  emit('fecha')
}
</script>
<template>
  <section class="Dashboard">
<div class="content">
     <p></p>
  <div class="conteiner">
    <p></p>
    <p></p>
  </div>
</div>
<div class="content-embaixo">
  <h3>Gerenciar Torneio</h3>
  <button @click="abrirEditarTorneio()">Editar dados gerais</button>
</div>
<ul>
  <li>
    <p>J</p>
    <h4>Jogos</h4>
    <p>Partidas e Resultados</p>
  </li>
  <li>
    <p>T</p>
    <h4>Times</h4>
    <p>Equipes participantes</p>
  </li>
  <li>
    <p>M</p>
    <h4>Modalidades</h4>
    <p>Esportes e locais</p>
  </li>
  <li>
    <p>T</p>
    <h4>Turmas</h4>
    <p>Vinculo com os times</p>
  </li>
  <li>
    <p>A</p>
    <h4>Arbitros</h4>
    <p>Responsáveis pela arbitragem</p>
  </li>
  <li>
    <p>H</p>
    <h4>Horários</h4>
    <p>Horários dos jogos</p>
  </li>
</ul>
<button @click="Fechar()">Retornar</button>
<popUpEditarTorneio
      :torneio="props.torneio"
      @atualizar="atualizarTorneio($event)"
      @fecharEditarTorneio="mostrarEditarTorneio = false"
      class="popup"
      :class="{ aberto: mostrarEditarTorneio }"
>
</popUpEditarTorneio>
  </section>
</template>
<style scoped>
.popup {
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.popup.aberto {
  opacity: 1;
  visibility: visible;
}
.Dashboard {
  background-color: #0B1739;
  font-family: "Krona One", sans-serif;
  font-weight: 400;
  font-style: normal;
  margin: 2vw 3vw;
  display: flex;
  flex-direction: column;
  gap: 2vw;
}
</style>
