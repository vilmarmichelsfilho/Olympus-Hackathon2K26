<script setup>
import EditarTorneioView from '@/components/EditarTorneioView.vue';
import { torneios } from '@/data/torneios.js';
import { ref } from 'vue';
import DashboardTorneio from '@/components/DashboardTorneio.vue';
import { AlterarCodTorneio } from '@/Utils/cod_torneioAdmUtils';
const mostrarFluxo = ref(false)
const mostrarEditarTorneio = ref(false)
const torneioEditarId = ref(null)
function editarTorneio(id) {
  torneioEditarId.value = id;
  AlterarCodTorneio(id)
  mostrarEditarTorneio.value = true;
}
</script>
<template>
  <div class="topo">
    <div class="titulo">
 <h1>Torneio Olimpiadas</h1>
 <h3>Gerencie e crie as olimpíadas da sua instituição</h3>
 </div>
 </div>
   <div v-show="!mostrarFluxo && !mostrarEditarTorneio">
     <DashboardTorneio  @editar="editarTorneio($event)"/>
   </div>
   <div class="editar-torneio" v-if="mostrarEditarTorneio">
<EditarTorneioView @fecha="mostrarEditarTorneio = false"
:torneio="torneios.find((t) => t.cod_torneio == torneioEditarId)"></EditarTorneioView>
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
  background-color: transparent;
  color: white;
font-weight: bold;
  border: 1px solid white;
}
</style>
