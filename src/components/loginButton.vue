<script setup>
import { logar } from '@/Utils/loginUtils';
const props = defineProps(['login','senha']);
const emit = defineEmits(['fechar'])
</script>

<template>
    <button v-on:click="logar(props.login,props.senha);emit('fechar')"><slot></slot></button>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&family=BBH+Hegarty&family=Cinzel:wght@900&family=Krona+One&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
button {
     font-family: "Krona One", sans-serif;
    background: linear-gradient(to right ,#717171, #a7a7a7, #717171);
    border: solid 0.5rem #D9D9D9;
    border-radius: 2rem;
    font-size: 1rem;
    padding: 0 1.5rem;
    color: white;
}
</style>