<script setup>
import NavegacaoAdministradores from '@/Components/NavegacaoAdministradores.vue';
import AdicionarTime from '@/Components/AdicionarTime.vue';
import TurmasView from '@/components/AdministradoesViews/TurmasView.vue';
import router from '@/router';
import { ref } from 'vue';

const telaAtual = ref('times')

if (localStorage.getItem("logado") != "true") {
    router.replace("/")
    alert("Você não tem acesso a está página")
}

function mudarTela(valor) {
    let tela = '/administradores#'+valor;
    router.replace(tela)
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
        <TurmasView class="turmas" v-show="telaAtual=='turmas'"></TurmasView>
    </div>
    <AdicionarTime @fechar="time = false" class="popup" :class="{ aberto: time }"></AdicionarTime>
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
