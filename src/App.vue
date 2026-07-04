<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div app-conteiner>
    <routerView></routerView>
  </div>

</template>

<style scoped>
div.app-conteiner{
  display: flex;
  flex-direction: column;
  width: 100vw;
}
</style>
