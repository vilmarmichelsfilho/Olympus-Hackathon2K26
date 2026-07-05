<script setup>
 import { ref } from 'vue';
 import MenuAlt4Icon from '@iconify-vue/heroicons-solid/menu-alt-4';
 const menuAberto = ref(false)
 function abrirMenu() {
  menuAberto.value = !menuAberto.value
 }
</script>

<template>
  <div class="olympos-screen">
    <div class="gradiente"></div>
    <header class="barra">
      <button class="menu-hamburguer" @click="abrirMenu">
        <MenuAlt4Icon height="3rem" />
      </button>
    </header>

    <div class="logo-todo">
      <img src="@/assets/logo.png" alt="Olympos" class="logo" />
      <h1 class="nome-site">Olympos</h1>
    </div>
  </div>
</template>

<style scoped>
.olympos-screen{
  position:relative;
  max-width: 100%;
   min-height: 100vh;
   background: #0a0a0a;
   color: #fff;
   font-family: 'Georgia', serif;
   overflow: hidden;
}
.barra{
  display: flex;
  justify-content: flex-end;
  padding: 5vw 3vw 0;
  background-color: transparent;
}
.menu-hamburguer {
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

}
.logo {
  width: 23rem;
  height: auto;
  margin-bottom: 2rem;
}
.nome-site {
font-size: 1.9rem;
letter-spacing: 0.12em;
text-transform: uppercase;
font-weight: 400;
 margin: 0;
}
.logo-todo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.olympos-screen{
    background:#0a0a0a;
    background-image:url("@/assets/fundo.png");
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
}
</style>
