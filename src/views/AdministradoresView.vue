<script setup>
import NavegacaoAdministradores from '@/components/NavegacaoAdministradores.vue'
import HamburgerMenuIcon from '@iconify-vue/mdi/hamburger-menu'
import UserIcon from '@iconify-vue/mdi/user'
import DashboardModalidades from '@/components/DashboardModalidades.vue'
import AdicionarTime from '@/components/AdicionarTime.vue'
import TurmasView from '@/components/AdministradoesViews/TurmasView.vue'
import TimesView from '@/components/AdministradoesViews/TimesView.vue'
import router from '@/router'
import { ref } from 'vue'
import DashboardControlView from './DashboardControlView.vue'
import arbitrosView from '@/components/AdministradoesViews/ArbitroView.vue'
import TorneioView from './TorneioView.vue'
import JogosView from './JogosView.vue'
import HorariosView from '@/components/AdministradoesViews/HorariosView.vue'
import ConflitosView from '@/components/AdministradoesViews/ConflitosView.vue'
import { obterSessao } from '@/Utils/loginUtils'
const telaAtual = ref('torneio')
if (obterSessao()?.tipo !== 'administrador') router.replace('/login')

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
  <div class="display" :class="{ 'display-torneio': telaAtual === 'torneio' }">
    <header v-if="telaAtual === 'torneio'" class="cabecalho-torneio">
      <div class="admin-mobile">
        <UserIcon class="avatar-mobile" aria-hidden="true" />
        <div>
          <strong>Admin</strong>
          <p>Painel de Controle</p>
        </div>
      </div>
      <button
        type="button"
        class="menu-torneio"
        :aria-expanded="menuAberto"
        aria-controls="navegacao-admin"
        :aria-label="menuAberto ? 'Fechar menu' : 'Abrir menu'"
        @click="toggleMenu"
      >
        <span></span><span></span><span></span>
      </button>
    </header>
    <button
      v-if="telaAtual === 'torneio' && menuAberto"
      type="button"
      class="fundo-menu"
      aria-label="Fechar menu"
      @click="menuAberto = false"
    ></button>
    <button v-if="telaAtual !== 'torneio'" class="btn-hamburger" @click="toggleMenu">
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
      id="navegacao-admin"
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
    <AdicionarTime @fechar="time = false" class="popup" :class="{ aberto: time }"></AdicionarTime>
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
.cabecalho-torneio,
.fundo-menu {
  display: none;
}

@media (max-width: 768px) {
  .display-torneio {
    flex-direction: column;
    background: #f8f9fa;
  }
  .display-torneio .torneios {
    width: 100%;
    min-width: 0;
  }
  .cabecalho-torneio {
    position: relative;
    z-index: 101;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 90px;
    padding: 20px 17px 18px 32px;
    border-bottom: 2px solid #e1e2e3;
    background: #f8f9fa;
  }
  .admin-mobile {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #080808;
    line-height: 1.2;
  }
  .admin-mobile strong {
    font-size: 16px;
    font-weight: 600;
  }
  .admin-mobile p {
    color: #b3b3b3;
    font-size: 16px;
  }
  .avatar-mobile {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 5px;
    border-radius: 50%;
    background: #bebebe;
    color: white;
  }
  .menu-torneio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 50px;
    height: 44px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }
  .menu-torneio span {
    width: 100%;
    height: 5px;
    border-radius: 4px;
    background: #d8d8d8;
  }
  .fundo-menu {
    position: fixed;
    inset: 90px 0 0;
    z-index: 98;
    display: block;
    border: 0;
    background: rgb(0 0 0 / 30%);
  }
  .display-torneio .nav-lateral {
    top: 90px;
    width: min(300px, 85vw);
    min-width: 0;
    max-width: none;
    min-height: 0;
    height: calc(100dvh - 90px);
    padding: 24px;
    gap: 24px;
    overflow-y: auto;
    visibility: hidden;
  }
  .display-torneio .nav-aberto {
    visibility: visible;
  }
  .display-torneio .nav-lateral :deep(.usuario) {
    display: none;
  }
  .display-torneio .nav-lateral :deep(.pesquisar) {
    padding: 8px;
  }
  .display-torneio .nav-lateral :deep(input) {
    width: 100%;
    min-width: 0;
  }
  .display-torneio .nav-lateral :deep(svg) {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }
  .display-torneio .nav-lateral :deep(.logo) {
    gap: 8px;
    font-size: 14px;
  }
  .display-torneio .nav-lateral :deep(ul) {
    padding: 0;
    gap: 8px;
  }
  .display-torneio .nav-lateral :deep(li) {
    padding: 8px;
    font-size: 14px;
  }
}
</style>
