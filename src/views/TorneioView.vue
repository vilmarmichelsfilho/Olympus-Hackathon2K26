<script setup>
import { ref } from 'vue'
import EditarTorneioView from '@/components/EditarTorneioView.vue'
import DashboardTorneio from '@/components/DashboardTorneio.vue'
import AdicionarOuEditarTornei from '@/components/AdicionarOuEditarTornei.vue'
import { torneios } from '@/data/torneios.js'
import { AlterarCodTorneio } from '@/Utils/cod_torneioAdmUtils'

const mostrarAdicionarTorneio = ref(false)
const mostrarEditarTorneio = ref(false)
const torneioEditarId = ref(null)

function editarTorneio(id) {
  torneioEditarId.value = id
  AlterarCodTorneio(id)
  mostrarEditarTorneio.value = true
}
</script>

<template>
  <section class="pagina-torneio">
    <div class="topo">
      <div class="titulo">
        <h1>Torneio Olimpíadas</h1>
        <h3>Gerencie e crie as olimpíadas da sua instituição</h3>
      </div>
      <button
        v-if="!mostrarEditarTorneio"
        type="button"
        class="adicionar-mobile"
        @click="mostrarAdicionarTorneio = true"
      >
        <span aria-hidden="true">+</span> Adicionar Jogo
      </button>
    </div>
    <DashboardTorneio
      v-show="!mostrarEditarTorneio"
      @editar="editarTorneio"
      @adicionar="mostrarAdicionarTorneio = true"
    />
    <div v-if="mostrarEditarTorneio" class="editar-torneio">
      <EditarTorneioView
        :torneio="torneios.find((t) => t.cod_torneio == torneioEditarId)"
        @fecha="mostrarEditarTorneio = false"
      />
    </div>
    <AdicionarOuEditarTornei
      v-if="mostrarAdicionarTorneio"
      @fechar="mostrarAdicionarTorneio = false"
    />
  </section>
</template>

<style scoped>
.topo h1 {
  font-size: 2rem;
  color: white;
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
.adicionar-mobile {
  display: none;
}

@media (max-width: 768px) {
  .pagina-torneio {
    width: 100%;
    min-width: 0;
    padding: 24px 27px 40px;
    color: #080808;
    background: #f8f9fa;
  }
  .topo {
    position: relative;
    display: block;
    margin: 0 3px 22px;
  }
  .titulo h1 {
    max-width: calc(100% - 142px);
    color: #080808;
    font-family: 'Krona One', sans-serif;
    font-size: 25px;
    line-height: 1.25;
    overflow-wrap: normal;
  }
  .titulo h3 {
    margin-top: 5px;
    color: #aaa;
    font-family: 'Krona One', sans-serif;
    font-size: 13px;
    line-height: 1.3;
  }
  .adicionar-mobile {
    position: absolute;
    top: 2px;
    right: -7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 38px;
    padding: 6px 10px;
    border: 0;
    border-radius: 4px;
    background: linear-gradient(100deg, #87ab60, #b3d496);
    color: white;
    font-family: 'Krona One', sans-serif;
    font-size: 11px;
    white-space: nowrap;
    cursor: pointer;
  }
  .adicionar-mobile span {
    font-family: Arial, sans-serif;
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
  }
}

@media (max-width: 359px) {
  .pagina-torneio {
    padding-inline: 16px;
  }
  .titulo h1 {
    font-size: 20px;
    max-width: calc(100% - 132px);
  }
  .adicionar-mobile {
    right: 0;
    padding-inline: 7px;
    font-size: 10px;
  }
}
</style>