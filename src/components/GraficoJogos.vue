<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { jogosDoTorneio } from '@/Utils/cod_torneioAdmUtils'
import { jogosPorDia } from '@/Utils/DashboardUtils'


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = computed(() => {
  const contagem = jogosPorDia(jogosDoTorneio.value)

  return {
    labels: Object.keys(contagem),
    datasets: [
      {
        label: 'Jogos Dessa semana',
        backgroundColor: '#f97316',
        data: Object.values(contagem),

      },
    ],
  }
})
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: 'black' } },

  },
  scales: {
    x: {
      ticks: { color: 'black' }
    },
    y: {
      ticks: {
        color: 'black',
        stepSize: 1,
        precision: 0,
      },
      beginAtZero: true,
    },
  },
}
</script>

<template>
  <div class="grafico-jogos">
    <Bar :data="data" :options="options" />
  </div>
</template>

<style scoped>
.grafico-jogos {
  width: 100%;
  height: 25rem;
}

@media (max-width: 768px) {
  .grafico-jogos {
    height: 18rem;
  }
}
</style>
