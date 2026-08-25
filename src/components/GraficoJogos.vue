<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { jogos } from '@/data/jogos'
import { jogosPorDia } from '@/Utils/DashboardUtils'


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = computed(() => {
  const contagem = jogosPorDia(jogos)

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
  <div style="height: 25rem; width: 100%; max-width: 30rem;">
  <Bar :data="data" :options="options" />
</div>
</template>




