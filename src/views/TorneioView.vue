<script setup>
import EditarTorneioView from '@/components/EditarTorneioView.vue';
import { torneios } from '@/data/torneios.js';
import { ref } from 'vue';
import DashboardTorneio from '@/components/DashboardTorneio.vue';
import { AlterarCodTorneio } from '@/Utils/cod_torneioAdmUtils';
const emit = defineEmits(['tela'])
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
<section class="torneio-view">
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
<EditarTorneioView @fecha="mostrarEditarTorneio = false" @tela="emit('tela', $event)"
:torneio="torneios.find((t) => t.cod_torneio == torneioEditarId)"></EditarTorneioView>
 </div>
</section>
</template>

<style scoped>
.torneio-view {
  width: 100%;
  min-width: 0;
}

.topo h1 {
  margin: 0;
  color: white;
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
}
.topo h3 {
  margin: 0.25rem 0 0;
  color: #aeb9d0;
  font-size: clamp(0.8rem, 1vw, 1rem);
}
.topo {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem clamp(1rem, 4vw, 4rem) 0;
  gap: 2rem;
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

@media (max-width: 768px) {
  .topo {
    margin: 5rem 1rem 1rem;
  }

  .topo h1 {
    color: #17171a;
    font-size: 1.8rem;
  }

  .topo h3 {
    color: #737780;
    font-size: 0.85rem;
  }
}
</style>
