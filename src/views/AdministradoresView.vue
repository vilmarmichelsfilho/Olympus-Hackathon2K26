<script setup>
import AdicionarTime from '@/components/AdicionarTime.vue';
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
    <AdicionarTime v-if="time" @fechar="time=false"></AdicionarTime>
</template>

<style scoped>
</style>