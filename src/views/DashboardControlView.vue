<script setup>
 import OympusControl from '@/components/OympusControl.vue';
 import { jogos } from '@/data/jogos';
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
    <h1>Controle das Olimpiadas, IFC</h1>
    <h3>pagina destinada para visão geral dos jogos</h3>
  </div>

  <div class="controls">
    <ul>
      <li>
        <OympusControl titulo="Total de jogos" :valor="jogos.length" :icone="trophie" rota="/administradores" />
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
          <OympusControl titulo="Total de jogos" :valor="jogos.length" :icone="trophie" rota="/administradores" />
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
.titulo h3{
color: gray;
}
li {
  list-style: none;
}

.controls ul {
  display: flex;
  gap: 1rem;
}

.tudo {
  min-width: 0;
}

.parte-baixo {
  display: flex ;
  margin-top: 1vw;
  min-width: 0;
}

.grafico { flex: 3; min-width: 0; background-color: white; }
.proximos { flex: 2; min-width: 0; }

.controls-mobile {
  display: none;
}

@media (max-width: 1366px) {
  .tudo {
    flex-direction: column;
  }
  .parte-baixo {
    display: grid;
  }
  .controls ul {
    display: grid;
  }
  .titulo {
    display: none;
  }
  .controls {
    display: none;
  }
  .proximos {
    background-color: white;
  }


  .controls-mobile {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .controls-mobile ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 100%;
    justify-content: center;
  }
}
</style>
