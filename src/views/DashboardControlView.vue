<script setup>
import OympusControl from '@/components/OympusControl.vue';
import { jogosDoTorneio } from '@/Utils/cod_torneioAdmUtils';
import trophie from '@/assets/trophie.png';
import { totalJogosHoje } from '@/Utils/DashboardUtils';
import { totalConflitos } from '@/Utils/DashboardUtils';
import conflito from '@/assets/conflito.png';
import calendar from '@/assets/calendar.png';
import home from '@/assets/home.png';
import GraficoJogos from '@/components/GraficoJogos.vue';
import ProximosJogos from '@/components/ProximosJogos.vue'

defineEmits(['editar2'])

</script>

<template>
<div class="tudo">
  <div class="titulo">
    <h1>Controle das Olimpíadas do IFC</h1>
    <h3>Visão geral dos jogos do torneio</h3>
  </div>

  <div class="controls">
    <ul>
      <li>
        <OympusControl titulo="Total de jogos" :valor="jogosDoTorneio.length" :icone="trophie" rota="/administradores" />
      </li>
      <li>
        <OympusControl titulo="Jogos Hoje" :valor="totalJogosHoje" :icone="calendar" rota="/administradores" />
      </li>
      <li>
        <OympusControl titulo="Conflitos" :valor="totalConflitos" :icone="conflito" rota="/administradores" />
      </li>
      <li>
        <OympusControl titulo="voltar para" :icone="home" rota="/administradores" />
      </li>
    </ul>
  </div>

  <div class="parte-baixo">
    <div class="grafico"><GraficoJogos /></div>


    <div class="controls-mobile">
      <ul>
        <li>
          <OympusControl titulo="Total de jogos" :valor="jogosDoTorneio.length" :icone="trophie" rota="/administradores" />
        </li>
        <li>
          <OympusControl titulo="Jogos Hoje" :valor="totalJogosHoje" :icone="calendar" rota="/administradores" />
        </li>
        <li>
          <OympusControl titulo="Conflitos" :valor="totalConflitos" :icone="conflito" rota="/administradores" />
        </li>
      </ul>
    </div>

    <div class="proximos">
      <ProximosJogos @editar="$emit('editar2')" />
    </div>
  </div>
</div>
</template>

<style scoped>
.titulo h1 {
  color: white;
}
.titulo h3 {
  color: #a9a9ac;
}
li {
  list-style: none;
}

.controls ul {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 0;
  padding: 0;
}

.tudo {
  width: 100%;
  min-width: 0;
}

.parte-baixo {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(340px, 2fr);
  gap: 1rem;
  margin-top: 1rem;
  min-width: 0;
  align-items: stretch;
}

.grafico {
  min-width: 0;
  overflow: hidden;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: white;
}

.proximos {
  min-width: 0;
}

.controls-mobile {
  display: none;
}

@media (max-width: 1100px) {
  .parte-baixo {
    grid-template-columns: 1fr;
  }

  .controls ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .titulo {
    display: none;
  }

  .controls {
    display: none;
  }

  .parte-baixo {
    gap: 0.75rem;
    margin-top: 4.5rem;
  }

  .grafico {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
  }

  .proximos {
    background-color: white;
  }

  .controls-mobile {
    display: flex;
    order: -1;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .controls-mobile ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    width: 100%;
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 420px) {
  .controls-mobile ul {
    grid-template-columns: 1fr;
  }
}
</style>
