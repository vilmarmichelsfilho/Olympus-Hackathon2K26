<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './Components/AppHeader.vue';
</script>

<template>
  <AppHeader></AppHeader>
  <div app-conteiner>
    <RouterView></RouterView>

  </div>

</template>

<style scoped>
div.app-conteiner{
  display: flex;
  flex-direction: column;
  width: 100vw;
}
</style>
