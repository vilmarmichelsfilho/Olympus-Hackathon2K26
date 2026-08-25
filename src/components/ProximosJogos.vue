<script setup>
import { computed } from 'vue'
import { jogos } from '@/data/jogos'

const proximosJogos = computed(() => {
  return jogos.filter((jogo) => jogo.status === 'agendado').slice(0, 5)
})

defineEmits(['editar'])

function formatarDataBR(dataISO) {
  const [, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}`
}
</script>

<template>
  <div class="tudo">
    <div class="proximos-jogos">
      <div class="cabecalho">
        <h2>Próximos jogos</h2>
        <img src="@/assets/coroa.png" alt="logo-coroa" />
      </div>
      <div class="tabela-scroll">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Local</th>
              <th>Times</th>
              <th>Jogo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="jogo in proximosJogos" :key="jogo.id">
              <td>{{ formatarDataBR(jogo.data) }}, {{ jogo.horario }}</td>
              <td>{{ jogo.modalidade }}</td>
              <td>{{ jogo.time1 }} X {{ jogo.time2 }}</td>
              <td>{{ jogo.local }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="editar" v-on:click.prevent="$emit('editar')">Editar ↗</button>
    </div>
  </div>
</template>

<style scoped>
.tudo {
  min-width: 0;
}

.proximos-jogos {
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: #0B1739;
 border-radius: 0 0 0 12px;
  padding: 1rem;
  border-left: 10px solid #f97316;
}

.tabela-scroll {
  width: 100%;
  min-width: 0;
  overflow-x: auto;
}
.cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem;
}

.cabecalho h2 {
  color: white;
  font-size: 1.4rem;
  margin: 0;
}

.cabecalho img {
  width: 32px;
  height: auto;
}

.tabela-scroll {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
}

thead th {
  text-align: left;
  color: #999;
  font-size: 0.75rem;
  font-weight: 500;
  padding-bottom: 8px;
  border-bottom: 1px solid #2a2a3a;
  white-space: nowrap;
}

tbody td {
  padding: 10px 4px;
  font-size: 0.85rem;
  border-bottom: 1px solid #1e1e2a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}

tbody td:nth-child(2) {
  color: #f97316;
  font-weight: 600;
}

.editar {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid #444;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
}

.editar:hover {
  background: #1e1e2a;
}

@media (max-width: 440px) {
  .proximos-jogos {

    background-color: white;
    color: black;
    padding: 12px;
    border-radius: 10px solid white;
    border-left: white;
  }

  .cabecalho h2 {
    font-size: 1.1rem;
  }

  thead th {
    font-size: 0.65rem;
    color: #666;
    border-bottom: 1px solid #eee;
  }

  tbody td {
    font-size: 0.75rem;
    padding: 6px 4px;
    border-bottom: 1px solid #f0f0f0;
    max-width: 100px;
  }

  .editar {
    font-size: 0.8rem;
    padding: 8px;
    border: 1px solid #ccc;
    color: black;
  }
}
</style>
