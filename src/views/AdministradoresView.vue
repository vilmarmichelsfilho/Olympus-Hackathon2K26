<script setup>
import router from '@/router';

if (localStorage.getItem("logado") != "true") {
    router.replace("/")
    alert("Você não tem acesso a está página")
}
</script>

<template>

</template>

<style scoped>
</style>