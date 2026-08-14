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
  <div class="image">
    <AppHeader class="header" v-if="$route.path !== '/administradores'"></AppHeader>
    <div class="texto" v-if="$route.path !== '/administradores'">
      <h2>Olimpíadas ifc</h2>
      <h3>Unindo talentos, inspirando <span>conquistas</span>.</h3>
    </div>
    <div app-conteiner>
      <RouterView></RouterView>
    </div>
    <FooterApp></FooterApp>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Krona+One&display=swap');
.header {
  margin-bottom: 50vw;
}
.texto {
  position: absolute;
  top: 17vw;
  left: 56vw;
  color: black;
}
.texto h2 {
  font-family: "Anton SC", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 5vw;
}
.texto h3 {
  font-family: "Krona One", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 2vw;
}
.texto span {
  text-decoration: underline #E85002 0.3vw;
}
.image {
  position: relative;
  width: 100%;
  max-height: 100vh;

  background-image: url('@/assets/normalBackground.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.app-conteiner {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
