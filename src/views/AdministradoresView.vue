<script setup>
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
    <button v-on:click="time=true">Adicionar Time</button>
    <AdicionarTime @fechar="time=false" class="popup" :class="{ aberto: time }"></AdicionarTime>
</template>

<style scoped>
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