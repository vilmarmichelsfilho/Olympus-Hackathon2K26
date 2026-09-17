<script setup>
import { RouterView } from 'vue-router'
import loginView from './components/loginView.vue'
import AppHeader from './components/AppHeader.vue'
import FooterApp from './components/FooterApp.vue'
import { ref } from 'vue'
if (localStorage.getItem('primeiraVisita') === null) {
  localStorage.setItem('logado', 'false')
  localStorage.setItem('primeiraVisita', 'true')
}
const loginPop = ref(false)

function abrirLogin() {
  loginPop.value = true
}

function fecharLogin() {
  loginPop.value = false
}
</script>
<template>
  <div class="image">
    <div
      class="hero"
      v-if="!['administradores', 'arbitro', 'login', 'jogos', 'torneio'].includes($route.name)"
    >
      <AppHeader class="header" @login-pop="abrirLogin"></AppHeader>
      <div class="texto">
        <h2>Olimpíadas ifc</h2>
        <h3>Unindo talentos, inspirando <span>conquistas</span>.</h3>
      </div>
    </div>
    <div class="app-conteiner">
      <RouterView @login-pop="abrirLogin"></RouterView>
    </div>
    <FooterApp v-if="!['administradores', 'arbitro', 'login', 'jogos', 'torneio'].includes($route.name)"></FooterApp>
  </div>
  <loginView v-if="loginPop" @fechar-pop="fecharLogin"></loginView>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Krona+One&display=swap');
.hero {
  position: relative;
  min-height: 100vh;
  background-image: url('@/assets/normalBackground.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.texto {
  position: absolute;
  top: 17vw;
  left: 56vw;
  color: black;
}
.texto h2 {
  font-family: 'Anton SC', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 5vw;
}
.texto h3 {
  font-family: 'Krona One', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 2vw;
}
.texto span {
  text-decoration: underline #e85002 0.3vw;
}
.image {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to left, #151313 0%, #3d0f0f 100%);
}
.app-conteiner {
  display: flex;
  flex-direction: column;
  width: 100%;
}
@media (max-width: 1000px) {
  .hero {
    min-height: auto;
  }

  .texto {
    display: none;
  }
}
</style>
