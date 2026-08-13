<script setup>
import modalidadesCard from '@/Components/modalidadesCard.vue';
import { RouterLink } from 'vue-router';
import ArrowRightIcon from '@iconify-vue/mdi/arrow-right';
import { modalidades } from '@/data/modalidades';
</script>
<template>
<main>
  <section class="selecao-modalidades">
<img src="/images/coroa.png" alt="coroa">
<RouterLink to="/login" class="log-in">
  Log-in
  <ArrowRightIcon height="1em"></ArrowRightIcon>
</RouterLink>
<h2>Olimpíadas ifc</h2>
<p>Bem Vindos, ao Olympos um site criado para informar os alunos do IFC, sobre os jogos acontecendo no campus</p>
<div class="modalidades">
  <ul class="modalidades-">
<modalidadesCard v-for="modalidade in modalidades"
:key="modalidade.id"
:id="modalidade.id"
:imagem="modalidade.image"
:nome="modalidade.nome"
@selecionar="abrirModal">
</modalidadesCard>
  </ul>
</div>
  </section>
</main>
</template>
<style scoped>
 ul{
  display: flex;
  flex-wrap: wrap;
  gap: 6vw;
  margin: 0 4vw 0 4vw;
  list-style: none;
 }
 @media (min-width: 1000px){
  ul.modalidades-{
    display: none;
  }
 }
 </style>
