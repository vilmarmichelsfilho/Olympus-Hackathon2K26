<script setup>
import { ref } from 'vue'
import popUpEditarTorneio from './pop-upEditarTorneio.vue';
import { editarTorneio } from '@/Utils/editarUtils.js';
import { codTorneioSelecionadoAdm } from '@/Utils/cod_torneioAdmUtils.js';
const emit = defineEmits(['fecha'])
const props = defineProps(['torneio'])
const mostrarEditarTorneio = ref(false)
const anodotorneio = ref(props.torneio.data_inicio_torneio.split('-')[0].replaceAll('20', ''))
function abrirEditarTorneio() {
  mostrarEditarTorneio.value = true
}
function atualizarTorneio(novoTorneio) {
  editarTorneio(props.torneio.cod_torneio, novoTorneio);
  mostrarEditarTorneio.value = false;
}
function Fechar(){
  emit('fecha')
  codTorneioSelecionadoAdm.value = null
}
</script>
<template>
  <section class="Dashboard">
<div class="content">
     <p class="ano">{{ anodotorneio }}</p>
  <div class="conteiner">
    <h4>{{ props.torneio.nome_torneio }}</h4>
    <p>{{ props.torneio.data_inicio_torneio }} a {{ props.torneio.data_fim_torneio }} . Status: {{ props.torneio.status_torneio }}</p>
  </div>
</div>
<div class="content-embaixo">
  <h3>Gerenciar Torneio</h3>
  <button @click="abrirEditarTorneio()">Editar dados gerais</button>
</div>
<ul>
  <li>
    <p class="letra">J</p>
    <h4>Jogos</h4>
    <p>Partidas e Resultados</p>
  </li>
  <li>
    <p class="letra">T</p>
    <h4>Times</h4>
    <p>Equipes participantes</p>
  </li>
  <li>
    <p class="letra">M</p>
    <h4>Modalidades</h4>
    <p>Esportes e locais</p>
  </li>
  <li>
    <p class="letra">T</p>
    <h4>Turmas</h4>
    <p>Vinculo com os times</p>
  </li>
  <li>
    <p class="letra">A</p>
    <h4>Arbitros</h4>
    <p>Responsáveis pela arbitragem</p>
  </li>
  <li>
    <p class="letra">H</p>
    <h4>Horários</h4>
    <p>Horários dos jogos</p>
  </li>
</ul>
<div class="button">
  <button @click="Fechar()">Retornar</button>
</div>

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
  background-color: #0E1D46;
  font-family: "Krona One", sans-serif;
  font-weight: 400;
  font-style: normal;
  margin: 2vw 3vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  border-radius: 1vw;
}
.content{
  background-color: #182956;
  min-width: 90%;
  margin: 2vw 5%;
  padding: 2vw 1vw;
  border-radius: 1vw;
  display: flex;
  align-items: center;
  gap: 1vw;
}
.content p.ano{
  background-color: #E85002;
  color: white;
  font-size: 0.8vw;
  padding: 1vw;
  border-radius: 100vw;
  max-width: fit-content;
  margin: 0 0 0 1vw;
}
.content .conteiner{
  color: white
}
.content-embaixo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1vw;
  min-width: 90%;
  margin: 0 5%;
}
.content-embaixo button {
  background-color: #E85002;
  padding: 0.6vw 2vw;
  text-align: center;
  border: none;
  color: white;
  font-size: 0.75vw;
  border-radius: 0.5vw;
  transition: 0.3s;
}
h3{
  color: white;
  font-size: 1.6vw;
  margin: 0 0 1vw 0;
}
ul {
  display: flex;
  flex-direction: row;
  gap: 2vw 5%;
  min-width: 90%;
  margin: 0 5%;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}
ul li {
  background-color: #182956;
  border: solid 0.1vw #263760;
  border-radius: 1vw;
  width: 30%;
  height: 10vw;
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  padding: 1vw;
}
ul li:hover {
  transform: scale(1.05);
  transition: 0.3s;
}
h4{
 color: #FFFFFF;
}
  p{
    color: #ADB9E1;
    font-size: 0.8vw;
  }
  p.letra{
    color: #E85002;
    background-color: #263760;
    padding: 0.5vw 1vw;
    max-width: fit-content;
    border-radius: 100vw;
  }
  div.button{
    display: flex;
    max-width: 90%;
    justify-content: end;
    margin: 2vw 5%;
  }
  div.button button{
    background-color: #E85002;
    padding: 0.6vw 2vw;
    text-align: center;
    border: none;
    color: white;
    font-size: 0.75vw;
    border-radius: 0.5vw;
  }
  @media (max-width: 750px){
    .Dashboard {
  background-color: white;
  margin: 2vw 3vw;
  gap: 1vw;
  border-radius: 1vw;
}
.content{
  background-color: white;
  border: 1px solid rgb(164, 164, 164);
  box-shadow: 5px 5px 5px 0px rgba(187, 186, 186, 0.5);
}
.content p.ano{
  background-color: #E85002;
  color: white;
  font-size: 2.4vw;
  padding: 3vw;
  margin: 0 0 0 3vw;
}
.content h4{
  color: black;
  font-size: 3vw;
}
.content p{
  font-size: 2vw;
}
.content-embaixo{
  margin: 4vw 5%;
}
.content-embaixo h3 {
color: black;
font-size: 3.5vw;
}

.content-embaixo button {
  background-color: #E85002;
  padding: 1.8vw 6vw;
  color: white;
  font-size: 3vw;
  border-radius: 1.5vw;
  transition: 0.3s;
}
ul {
  display: flex;
  flex-direction: row;
  gap: 3vw 5%;
  min-width: 90%;
  margin: 0 5%;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}
ul li {
  background-color: white;
  border: 1px solid rgb(164, 164, 164);
  box-shadow: 5px 5px 5px 0px rgba(187, 186, 186, 0.5);
  border-radius: 2vw;
  width: 47%;
  height: 20vw;
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
  padding: 3vw;
}
ul li:hover {
  transform: scale(1.05);
  transition: 0.3s;
}
h4{
 color: black;
 font-size: 3vw;
 line-height: normal;
}
  p{
    color: #ADB9E1;
    font-size: 2vw;
    line-height: normal;
  }
  p.letra{
    background-color: rgb(205, 203, 203);
    padding: 1vw 2vw;
    font-size: 2vw;
  }
div.button{
  justify-content: center;
  max-width: none;
  margin: 5vw 0 0 0;
}
div.button button{
background-color: #E85002;
    padding: 1.8vw 8vw;
    text-align: center;
    border: none;
    color: white;
    font-size: 3.6vw;
    border-radius: 2vw;
}
}
</style>
