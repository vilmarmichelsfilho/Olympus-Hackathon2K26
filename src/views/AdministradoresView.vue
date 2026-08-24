<script setup>
import NavegacaoAdministradores from '@/components/NavegacaoAdministradores.vue';
import AdicionarTime from '@/components/AdicionarTime.vue';
import { times } from '@/data/times';
import router from '@/router';
import { ref } from 'vue';
import DashboardControlView from './DashboardControlView.vue';

const telaAtual = ref('dashboard')

if (localStorage.getItem("logado") != "true") {
    router.replace("/")
    alert("Você não tem acesso a está página")
}

function mudarTela(valor) {
    telaAtual.value = valor;
}
const menuAberto = ref(false)
function toggleMenu() {
    menuAberto.value = !menuAberto.value;
}
const time = ref(false);
</script>

<template>
    <div class="display">
      <button class="btn-hamburger" @click="toggleMenu">☰</button>

        <NavegacaoAdministradores
          @tela="mudarTela"
          class="nav-lateral"
          :class="{ 'nav-aberto': menuAberto }"
        ></NavegacaoAdministradores>

        <div class="times" v-show="telaAtual=='times'">
            <button v-on:click="time=true">Adicionar Time</button>
        </div>
        <div v-if="telaAtual === 'dashboard'" class="dashboard">
                <DashboardControlView />
        </div>
    </div>
    <AdicionarTime @fechar="time = false" class="popup" :class="{ aberto: time }"></AdicionarTime>

    <div class="controle">

    </div>
</template>

<style scoped>
.dashboard {
    margin: 1vw 2vw;
}

.display {
    background: #15161A;
    width: 100%;
    height: 100vh;
    display: flex;
    min-width: 0;
}

.popup {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
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
</style>
