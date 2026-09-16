<script setup>
import NavegacaoAdministradores from '@/components/NavegacaoAdministradores.vue'
import HamburgerMenuIcon from '@iconify-vue/mdi/hamburger-menu'
import DashboardModalidades from '@/components/DashboardModalidades.vue'
import AdicionarTime from '@/components/AdicionarTime.vue'
import TurmasView from '@/components/AdministradoesViews/TurmasView.vue'
import TimesView from '@/components/AdministradoesViews/TimesView.vue'
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DashboardControlView from './DashboardControlView.vue'
import arbitrosView from '@/components/AdministradoesViews/ArbitroView.vue'
import TorneioView from './TorneioView.vue'
import JogosView from './JogosView.vue'
import HorariosView from '@/components/AdministradoesViews/HorariosView.vue'
import ConflitosView from '@/components/AdministradoesViews/ConflitosView.vue'
import { obterSessao } from '@/Utils/loginUtils'
const route = useRoute()
const telasValidas = new Set(['torneio', 'dashboard', 'jogos', 'times', 'horarios', 'conflitos', 'turmas', 'arbitros', 'modalidades'])
function telaDoHash(hash) {
  const tela = hash.replace('#', '')
  return telasValidas.has(tela) ? tela : 'torneio'
}
const telaAtual = ref(telaDoHash(route.hash))
if (obterSessao()?.tipo !== 'administrador') router.replace('/login')

watch(
  () => route.hash,
  (hash) => {
    telaAtual.value = telaDoHash(hash)
  },
)

function mudarTela(valor) {
  let tela = '/administradores#' + valor
  router.replace(tela)
  telaAtual.value = valor
  menuAberto.value = false
}
const menuAberto = ref(false)
function toggleMenu() {
  menuAberto.value = !menuAberto.value
}
const time = ref(false)
</script>

<template>
  <div class="display">
    <button class="btn-hamburger" @click="toggleMenu">
      <HamburgerMenuIcon
        width="10vw"
        style="
          position: fixed;
          right: 5vw;
          opacity: 0.9;
          color: white;
          background: black;
          padding: 0.5vw;
          border-radius: 100vw;
        "
      ></HamburgerMenuIcon>
    </button>

    <NavegacaoAdministradores
      @tela="mudarTela"
      class="nav-lateral"
      :class="{ 'nav-aberto': menuAberto }"
    >
    </NavegacaoAdministradores>

    <div class="times" v-show="telaAtual == 'times'">
      <TimesView></TimesView>
    </div>
    <div v-if="telaAtual === 'dashboard'" class="dashboard">
      <DashboardControlView @editar2="mudarTela('jogos')" />
    </div>
    <div class="turmas" v-show="telaAtual == 'turmas'">
      <TurmasView></TurmasView>
    </div>
    <div class="horarios" v-show="telaAtual == 'horarios'">
      <HorariosView></HorariosView>
    </div>
    <div class="conflitos" v-show="telaAtual == 'conflitos'">
      <ConflitosView />
    </div>
    <div class="arbitros" v-show="telaAtual == 'arbitros'">
      <arbitrosView></arbitrosView>
    </div>
    <div class="torneios" v-show="telaAtual == 'torneio'">
      <TorneioView> </TorneioView>
    </div>
    <div class="jogos" v-show="telaAtual == 'jogos'">
      <JogosView> </JogosView>
    </div>
    <DashboardModalidades v-show="telaAtual == 'modalidades'"> </DashboardModalidades>
  </div>
  <AdicionarTime @fechar="time = false" class="popup" :class="{ aberto: time }"></AdicionarTime>
  <div class="controle"></div>
</template>

<style scoped>
.dashboard {
  margin: 1vw 2vw;
}

.display {
  background: #15161a;
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  min-width: 0;
}

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

.btn-hamburger {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  background: transparent;
  color: white;
  border: none;
  font-size: 1.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .btn-hamburger {
    display: block;
  }

  .nav-lateral {
    position: fixed;
    top: 0;
    left: -100%;
    height: 100vh;
    z-index: 99;
    transition: left 0.3s ease;
  }

  .nav-aberto {
    left: 0;
  }
}

@media (max-width: 750px) {
  .display {
    background-color: white;
  }
}
</style>
