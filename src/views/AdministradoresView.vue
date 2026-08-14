<script setup>
import NavegacaoAdministradores from '@/components/NavegacaoAdministradores.vue';
import AdicionarTime from '@/components/AdicionarTime.vue';
import { times } from '@/data/times';
import router from '@/router';
import { ref } from 'vue';

if (localStorage.getItem("logado") != "true") {
    router.replace("/")
    alert("Você não tem acesso a está página")
}

const time = ref(false);
</script>

<template>
    <div class="display">
        <NavegacaoAdministradores></NavegacaoAdministradores>
    </div>
    <AdicionarTime @fechar="time=false" class="popup" :class="{ aberto: time }"></AdicionarTime>
</template>

<style scoped>
.display {
    background: #15161A;
    width: 100%;
    height: 100vh;
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