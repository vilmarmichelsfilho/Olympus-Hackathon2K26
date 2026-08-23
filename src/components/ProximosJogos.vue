<!-- src/components/ProximosJogos.vue -->
<script setup>
import { computed } from 'vue'
import { jogos } from '@/data/jogos'


const proximosJogos = computed(() => {
  return jogos.filter((jogo) => jogo.status === 'pendente').slice(0, 5)
})

function formatarDataBR(dataISO) {
  const [ , mes, dia] = dataISO.split('-')
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

    <table>
      <thead>
        <tr>
          <th> Data</th>
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

    <button class="editar">Editar ↗</button>
  </div>
  </div>
</template>

<style scoped>
.tudo{
  height: 10rem;
  width: 30rem;
}
.proximos-jogos {
  background-color: #10101a;
  border-radius: 12px;
  padding: 20px;
  color: white;
  min-width: 320px;
}

.cabecalho h2 {
  color: white;
  font-size: 1.4rem;
  margin: 0 0 0.3rem;
}
.cabecalho {
  display: flex;
  gap: 12rem;
  margin: 0 0 1rem;
}
table {
  width: 100%;
}

thead  th {
  text-align: left;
  color: #999;
  font-size: 0.75rem;
  font-weight: 500;
  padding-bottom: 8px;
  border-bottom: 1px solid #2a2a3a;
}

tbody td {
  padding: 10px 4px;
  font-size: 0.85rem;
  border-bottom: 1px solid #1e1e2a;
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
</style>
