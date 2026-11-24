<script setup>
import { normalizarId } from '@/services/api'

import { computed, onMounted} from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { jogosPorDia } from '@/Utils/DashboardUtils'
import { modalidades } from '@/data/modalidades'
import { codTorneioSelecionadoAdm } from '@/Utils/cod_torneioAdmUtils'
import { useJogos } from '@/composables/useJogos'
const { jogos, carregarJogos } = useJogos()
async function carregarDados() {
  await carregarJogos()
}
onMounted(carregarDados)
const jogosDoTorneio = computed(() => jogos.value.filter((jogo) => {
  const modalidade = modalidades.find((m) => normalizarId(m.id_modalidade) === normalizarId(jogo.id_modalidade))
  return normalizarId(modalidade?.id_torneio) === normalizarId(codTorneioSelecionadoAdm.value)
}))


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
