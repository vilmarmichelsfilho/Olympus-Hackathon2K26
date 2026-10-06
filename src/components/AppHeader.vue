<script setup>
import { jogosVerificados } from '@/data/jogosverificados';
import { RouterLink, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import MenuAlt4Icon from '@iconify-vue/heroicons-solid/menu-alt-4';
import TableJogos from '@/components/TableJogos.vue';
const menuAberto = ref(false)
const emit = defineEmits(['loginPop'])
const route = useRoute()

function abrirMenu() {
  menuAberto.value = !menuAberto.value
}

function fecharMenu() {
  menuAberto.value = false
}

function abrirLogin() {
  fecharMenu()
  emit('loginPop')
}

watch(() => route.fullPath, fecharMenu)
</script>

<template>
  <div class="olympus-screen">
    <header class="barra-mobile">
      <RouterLink class="logo-mobile-link" to="/" aria-label="Página inicial" @click="fecharMenu">
        <img src="@/assets/logodesktop.png" alt="Olympos" class="logo-mobile" />
      </RouterLink>
      <button
        class="menu-hamburguer"
        type="button"
        :aria-label="menuAberto ? 'Fechar menu' : 'Abrir menu'"
        aria-controls="menu-publico-mobile"
        :aria-expanded="menuAberto"
        @click="abrirMenu"
      >
        <MenuAlt4Icon :class="{ aberto: menuAberto }" />
      </button>
    </header>

    <Transition name="menu">
      <div v-if="menuAberto" class="camada-menu" @click.self="fecharMenu">
        <nav id="menu-publico-mobile" class="menu-mobile" aria-label="Navegação principal">
          <RouterLink to="/" @click="fecharMenu">Home</RouterLink>
          <RouterLink to="/sobrenos" @click="fecharMenu">Sobre Nós</RouterLink>
          <RouterLink to="/proximos-jogos" @click="fecharMenu">Próximos jogos</RouterLink>
          <button type="button" class="login-mobile" @click="abrirLogin">Entrar</button>
        </nav>
      </div>
    </Transition>

    <header class="barra-desktop">
      <div class="logotipo">
        <RouterLink to="/">
          <img src="@/assets/logodesktop.png" alt="" class="logo-desktop" />
        </RouterLink>
      </div>

      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/sobrenos">Sobre Nós</RouterLink>
        <RouterLink to="/proximos-jogos">Próximos jogos</RouterLink>
      </nav>

      <button class="btn-login" v-on:click.prevent="emit('loginPop')">
        Log-in <span class="seta">→</span>
      </button>
    </header>

    <div class="logo-todo">
      <img src="@/assets/logo.png" alt="Olympos" class="logo" />
      <h1 class="nome-site">Olympos</h1>
    </div>

    <div class="placares">
      <ul>
        <TableJogos v-for="jogo in jogosVerificados" :key="jogo.cod_jogo"
          :data="jogo.data"
          :horario="jogo.horario_jogo"
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
  max-height: fit-content;
  background-image: url("@/assets/fundo.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  font-family: 'Georgia', serif;
  overflow: hidden;
  background-color: black;
}
.nav-links a.router-link-exact-active {
  text-decoration: underline;
  text-decoration-color: #e85002;
  text-underline-offset: 8px;
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

.menu-hamburguer svg {
  width: 2rem;
  height: 2rem;
  transition: transform 0.2s ease;
}

.menu-hamburguer svg.aberto {
  transform: rotate(90deg);
}

.logo-mobile-link {
  display: flex;
  align-items: center;
}

.logo-mobile {
  width: min(42vw, 10rem);
  height: auto;
}

.logo {
  width: min(68vw, 18rem);
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
  padding-top: 2.5rem;
}

.placares {
  width: 100%;
}

.placares ul {
  position: relative;
  margin: 7rem 0 0;
  padding: 0 1rem 1.5rem;
  background-color: transparent;
  color: white;
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 10;
  overflow-x: auto;
  list-style: none;
  scroll-snap-type: x proximity;
}

.barra-desktop {
  display: none;
}

.barra-mobile {
  display: flex;
  min-height: 4.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgb(255 255 255 / 18%);
  background: rgb(10 10 10 / 72%);
  position: relative;
  z-index: 40;
}

.camada-menu {
  position: fixed;
  inset: 0;
  z-index: 30;
  padding: 5.25rem 1rem 1rem;
  background: rgb(0 0 0 / 58%);
}

.menu-mobile {
  display: flex;
  width: min(100%, 24rem);
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  margin-left: auto;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 0.75rem;
  background-color: rgb(10 10 10 / 98%);
  box-shadow: 0 1rem 2.5rem rgb(0 0 0 / 40%);
}

.menu-mobile a,
.login-mobile {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 0;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  background: transparent;
  color: #fff;
  text-decoration: none;
  font: inherit;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-align: left;
  text-transform: uppercase;
}

.menu-mobile a.router-link-exact-active {
  border-left: 3px solid #e85002;
  background: rgb(232 80 2 / 10%);
}

.login-mobile {
  border-bottom: 0;
  color: #f47535;
  cursor: pointer;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease;
}

.menu-enter-active .menu-mobile,
.menu-leave-active .menu-mobile {
  transition: transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-from .menu-mobile,
.menu-leave-to .menu-mobile {
  transform: translateY(-0.75rem);
}

@media (min-width: 1024px) {
  .barra-mobile {
    display: none;
  }

  .olympus-screen{
 background-color: transparent;
 background-image: none;
  }

  .camada-menu {
    display: none;
  }

  .logo-todo {
    display: none;
    padding-top: 0;
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
    gap: clamp(1rem, 2vw, 2rem);
    padding: 1rem clamp(1.5rem, 3vw, 3rem);
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
    width: clamp(10rem, 15vw, 15rem);
    height: auto;
  }

  .nav-links {
    display: flex;
    gap: clamp(1rem, 2vw, 2rem);
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
