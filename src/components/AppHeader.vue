<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { jogos } from '@/data/jogos.js';
import { ref } from 'vue';
import MenuAlt4Icon from '@iconify-vue/heroicons-solid/menu-alt-4';
import SearchIcon from '@iconify-vue/heroicons-solid/search';
import TableJogos from './TableJogos.vue';
import router from '@/router/index.js';
const menuAberto = ref(false)
function abrirMenu() {
  menuAberto.value = !menuAberto.value
}
const jogosVerificados = computed(() =>
  jogos.filter(jogo => jogo.status === 'AoVivo')
)
function login() {
  router.replace("/login")
}
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
      <div class="logotipo">
        <RouterLink to="/">
          <img src="@/assets/logodesktop.png" alt="" class="logo-desktop" />
        </RouterLink>
      </div>

      <div class="busca">
        <input type="text" placeholder="Search in site" class="input-busca" />
        <SearchIcon class="icone-busca" />
      </div>

      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/">Times</RouterLink>
        <RouterLink to="/sobrenos">Sobre Nós</RouterLink>
      </nav>

      <button class="btn-login" v-on:click="login()">
        Log-in <span class="seta">→</span>
      </button>
    </header>

    <div class="logo-todo">
      <img src="@/assets/logo.png" alt="Olympos" class="logo" />
      <h1 class="nome-site">Olympos</h1>
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
  </div>
</template>

<style scoped>
.olympus-screen {
  position: relative;
  min-height: 100vh;
  background-image: url("@/assets/fundo.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  font-family: 'Georgia', serif;
  overflow: hidden;
  background-color: black;
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

.placares ul {
  position: relative;
  margin-top: 10rem;
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
  .barra-mobile {
    display: none;
  }

  .olympus-screen{
 background-color: transparent;
 background-image: none;
  }

  .menu-mobile {
    display: none;
  }

  .logo-todo {
    display: none;
  }

  .olympus-screen {
    min-height: auto;
    height: auto;
    padding-bottom: 1rem;

    }

  .placares ul {
    position: relative;
    margin-top: 2rem;
  }
  .placares{
    display: none;
  }
  .barra-desktop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 1rem 2.5rem;
    margin: 0;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);

  }
  .logotipo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
  }

  .logo-desktop {
    width: 15rem;
    height: auto;
  }

  .busca {
    flex: 1;
    max-width: 30rem;
    display: flex;
    align-items: center;
    border: 1px solid rgba(255, 0, 0, 0.6);
    border-radius: 0.5rem;
    padding: 0.4rem 1rem;
  }

  .input-busca {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    width: 100%;
    font-size: 0.9rem;
  }

  .input-busca::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  .icone-busca {
    color: #fff;
    height: 1.2rem;
    flex-shrink: 0;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    flex-shrink: 0;
  }

  .nav-links a {
    color: black;
    text-decoration: none;
    font-size: 1rem;
    letter-spacing: 0.05em;
  }

  .btn-login {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #f26522;
    color: #fff;
    border: none;
    padding: 0.6rem 1.4rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    cursor: pointer;
    flex-shrink: 0;
  }

}
</style>
