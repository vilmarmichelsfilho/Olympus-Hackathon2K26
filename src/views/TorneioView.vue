<script setup>
import OrganizadorPoupUp from '@/components/OrganizadorPoupUp.vue';
import { ref } from 'vue';
const mostrarFluxo = ref(false)
</script>

<template>
  <div class="topo">
    <div class="titulo">
 <h1>Torneio Olimpiadas</h1>
 <h3>Gerencie e crie as olimpíadas da sua instituição</h3>
 </div>
 <div class="botao">
   <button @click="mostrarFluxo = true">Cadastrar Torneio</button>
 </div>
 </div>
  <div class="fluxo">
    <OrganizadorPoupUp v-if="mostrarFluxo" @fechar="mostrarFluxo = false">   </OrganizadorPoupUp>
  </div>

</template>

<style scoped>
.topo h1 {
  font-size: 2rem;
  color:  white;
}
.topo h3 {
  color: white;
}
.topo {
  display: flex;
  justify-content: space-between;
  margin: 1vw 4vw;
  gap: 30vw;
  align-items: center;
}
.topo button {
  border-radius: 8px;
  padding: 0.5vw;
}
</style>
