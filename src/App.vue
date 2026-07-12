<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-conteiner">
    <RouterView></RouterView>
  </div>

</template>

<style scoped>
div.app-conteiner{
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
