<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue';
import FooterApp from './components/FooterApp.vue';

if (localStorage.getItem("primeiraVisita") === null) {
    localStorage.setItem("logado", "false");
    localStorage.setItem("primeiraVisita", "true");
}
</script>

<template>
  <AppHeader></AppHeader>
  <div app-conteiner>
    <RouterView></RouterView>
  </div>
  <FooterApp></FooterApp>
</template>

<style scoped>
div.app-conteiner{
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
