<script setup>
import NavegacaoAdministradores from '@/components/NavegacaoAdministradores.vue';
import AdicionarTime from '@/components/AdicionarTime.vue';
import { times } from '@/data/times';
import router from '@/router';
import { ref } from 'vue';
import DashboardControlView from './DashboardControlView.vue';

const telaAtual = ref('times')

if (localStorage.getItem("logado") != "true") {
    router.replace("/")
    alert("Você não tem acesso a está página")
}

function mudarTela(valor) {
    telaAtual.value = valor;
}

const time = ref(false);
</script>

<template>
    <div class="display">
        <NavegacaoAdministradores @tela="mudarTela"></NavegacaoAdministradores>
        <div class="times" v-show="telaAtual=='times'">
            <button v-on:click="time=true">Adicionar Time</button>
        </div>
        <div v-if="telaAtual === 'times'">
                <DashboardControlView />
            </div>
    </div>
    <AdicionarTime @fechar="time = false" class="popup" :class="{ aberto: time }"></AdicionarTime>

    <div class="controle">

    </div>
</template>

<style scoped>
.display {
    background: #15161A;
    width: 100%;
    height: 100vh;
    display: flex;
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
</style>
