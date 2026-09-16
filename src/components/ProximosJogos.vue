
<script setup>
import { computed } from 'vue'
import { jogosDoTorneio } from '@/Utils/cod_torneioAdmUtils'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'

function separarDataHorario(horario_jogo) {
  const [data, horario] = horario_jogo.split(' ')
  return { data, horario }
}

function formatarDataBR(dataISO) {
  const [, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}`
}

function buscarModalidade(cod_modalidade) {
  return modalidades.find((modalidadee) => modalidadee.cod_modalidade === cod_modalidade)
}

function buscarNomesDosTimes(cod_jogo) {
  const participantes = participa
    .filter((p) => p.cod_jogo === cod_jogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)

  return [0, 1]
    .map((indice) => {
      const participante = participantes[indice]
      return times.find((time) => time.cod_time === participante?.cod_time)?.nome_time ?? 'A definir'
    })
    .join(' X ')
}

const proximosJogos = computed(() => {
  return jogosDoTorneio.value
    .filter((jogo) => jogo.status_jogo === 'Agendado')
    .sort((jogoA, jogoB) => jogoA.horario_jogo.localeCompare(jogoB.horario_jogo))
    .slice(0, 5)
    .map((jogo) => {
      const { data, horario } = separarDataHorario(jogo.horario_jogo)
      const modalidade = buscarModalidade(jogo.cod_modalidade)
      return {
        ...jogo,
        dataFormatada: formatarDataBR(data),
        horario,
        nomeModalidade: modalidade?.nome_modalidade,
        local: modalidade?.localdojogo_modalidade,
        times: buscarNomesDosTimes(jogo.cod_jogo),
      }
    })
})

defineEmits(['editar'])
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
           <tr v-for="jogo in proximosJogos" :key="jogo.cod_jogo">
  <td>{{ jogo.dataFormatada }}/{{ jogo.horario }}</td>
  <td>{{ jogo.local }}</td>
  <td>{{ jogo.times }}</td>
  <td>{{ jogo.nomeModalidade }}</td>
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
  color: white;
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
