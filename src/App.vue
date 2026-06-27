<script setup>
import { RouterView } from 'vue-router';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
    <div class="app-container">
        <RouterView class="content-wrap"/>
        <AppFooter></AppFooter>
    </div>
</template>

<style scoped>
div.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
}
.content-wrap {
    flex-wrap: 1;
}
</style>
