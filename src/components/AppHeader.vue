<script setup>
import { computed } from 'vue';
import { jogos } from '@/data/jogos';
 import { ref } from 'vue';
 import MenuAlt4Icon from '@iconify-vue/heroicons-solid/menu-alt-4';
import TableJogos from './TableJogos.vue';
 const menuAberto = ref(false)
 function abrirMenu() {
  menuAberto.value = !menuAberto.value
 }
 const jogosVerificados = computed (() =>
 jogos.filter(jogo => jogo.status === 'AoVivo')
 )

</script>

<template>
    <div class="olympus-screen">
    <header class="barra-mobile">
      <button class="menu-hamburguer" @click="abrirMenu">
        <MenuAlt4Icon height="3rem" />
      </button>
    </header>

    <nav class="menu-mobile" v-if="menuAberto">
  <a href="#" @click="abrirMenu">Home</a>
  <a href="#" @click="abrirMenu">Sobre Nós</a>
  <a href="#" @click="abrirMenu">Pontuação</a>
</nav>
    <header class="barra-desktop">
  <nav class="nav-links">
    <a href="#">Home</a>
    <a href="#">Sobre Nós</a>
    <a href="#">Pontuação</a>
  </nav>
   <div class="logotipo">
    <img src="@/assets/logodesktop.png" alt="" class="logo-desktop" />
  </div>
</header>
    <div class="logo-todo">
      <img src="@/assets/logo.png" alt="Olympos" class="logo" />
      <h1 class="nome-site">Olympos</h1>
    </div>
      </div>
  <div class="placares">
    <ul>
    <TableJogos v-for="jogo in jogosVerificados" :key="jogo.id"
    :data="jogo.data"
    :horario="jogo.horario"
    :modalidade="jogo.modalidade"
    :time1="jogo.time1"
    :time2="jogo.time2"
    :pontuacao1="jogo.pontuacao1"
    :pontuacao2="jogo.pontuacao2"
    :status="jogo.status"
    :escudo1="jogo.escudo1"
    :escudo2="jogo.escudo2"
    >
    </TableJogos>
    </ul>
  </div>

</template>

<style scoped>
.olympos-screen{
  position:relative;
  max-width: 100%;
   min-height: 100vh;
   background: #0a0a0a;
   color: #fff;
   font-family: 'Georgia', serif;
   overflow: hidden;
}
.barra{
  display: flex;
  justify-content: flex-end;
  padding: 5vw 3vw 0;
  background-color: transparent;
}
.menu-hamburguer {
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

}
.logo {
  width: 23rem;
  height: auto;
  margin-bottom: 2rem;
}
.nome-site {
font-size: 1.9rem;
letter-spacing: 0.12em;
text-transform: uppercase;
font-weight: 400;
 margin: 0;
}
.logo-todo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.olympus-screen{
   position: relative;
  min-height: 100vh;
  background-color: #0a0a0a;
  background-image: url("@/assets/fundo.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  font-family: 'Georgia', serif;
  overflow: hidden;
}
.placares ul {
  position: relative;
  margin-top: -20vw;
  background-color: transparent;
  color: white;
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 10;
}

.barra-desktop {
  display: none;
}

.barra-mobile {
  display: flex;
}

@media (min-width: 1024px) {
  .barra-mobile {
    display: none;
  }

  .barra-desktop {
    display: flex;
    align-items: center;
    padding: 1rem 2.5rem;
    margin: 0rem 0rem 0 60rem;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }

  .nav-links a {
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .logotipo-texto {
    font-family: 'Georgia', serif;
    font-size: 1.3rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .logo-todo {
    display: none;
  }
}
.menu-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem 0;
  background-color: rgba(10, 10, 10, 0.95);
}

.menu-mobile a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (min-width: 1024px) {
  .menu-mobile {
    display: none;
  }
@media (min-width: 1024px) {
  .olympus-screen {
    min-height: auto;
    height: auto;
    padding-bottom: 1rem;
    background-image: url("@/assets/fundodesktop.png");
  }
   .placares ul {
    margin-top: 2rem;
  }
}
}
.logotipo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo-desktop {
  width: 15rem;
  height: auto;
}

</style>
