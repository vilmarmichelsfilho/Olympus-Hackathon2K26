
<script setup>
import { computed } from 'vue'
import { jogosDoTorneio } from '@/Utils/cod_torneioAdmUtils'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'

import { obterProximosJogos } from '@/Utils/agendaUtils'

const proximosJogos = computed(() =>
  obterProximosJogos(jogosDoTorneio.value, modalidades, participa, times)
    .slice(0, 5)
    .map((jogo) => {
      const [, mes, dia] = jogo.data.split('-')
      return {
        ...jogo,
        dataFormatada: dia + '/' + mes,
        nomeModalidade: jogo.modalidade,
        times: jogo.participantes.map((time) => time.nome_time).join(' X '),
      }
    }),
)

defineEmits(['editar'])
</script>


<template>
  <section class="proximos-jogos" aria-labelledby="titulo-proximos-jogos">
      <div class="cabecalho">
        <h2 id="titulo-proximos-jogos">Próximos jogos</h2>
        <img src="@/assets/coroa.png" alt="" />
      </div>
      <div v-if="proximosJogos.length" class="tabela-scroll">
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
              <td>{{ jogo.dataFormatada }} às {{ jogo.horario }}</td>
              <td>{{ jogo.local }}</td>
              <td>{{ jogo.times }}</td>
              <td>{{ jogo.nomeModalidade }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="estado-vazio">Não há partidas futuras agendadas neste torneio.</p>
      <button class="editar" type="button" @click="$emit('editar')">Ver todos os jogos</button>
  </section>
</template>

<style scoped>
.proximos-jogos {
  width: 100%;
  min-width: 0;
  min-height: 25rem;
  box-sizing: border-box;
  padding: 1.4rem;
  border-radius: 0.75rem;
  background: #0b1739;
  color: #fff;
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
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e85002;
}

.cabecalho h2 {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
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
  color: #aeb9d0;
  font-size: 0.75rem;
  font-weight: 500;
  padding-bottom: 8px;
  border-bottom: 1px solid #1e293b;
  white-space: nowrap;
}

tbody td {
  padding: 10px 4px;
  font-size: 0.85rem;
  border-bottom: 1px solid #1e293b;
  color: #fff;
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
  border-radius: 4px;
  background: transparent;
  border: 1px solid #aeb9d0;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
}

.editar:hover {
  background: rgb(255 255 255 / 6%);
}

.estado-vazio {
  display: grid;
  min-height: 12rem;
  place-items: center;
  margin: 0;
  color: #aeb9d0;
  font-size: 0.9rem;
  text-align: center;
}

@media (max-width: 768px) {
  .proximos-jogos {
    min-height: 0;
    padding: 12px;
    border-left: 0;
    border-radius: 10px;
    background-color: white;
    color: black;
  }

  .cabecalho {
    border-bottom-color: #e85002;
  }

  .cabecalho h2 {
    color: #17171a;
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
    color: #17171a;
    max-width: 100px;
  }

  .editar {
    font-size: 0.8rem;
    padding: 8px;
    border: 1px solid #ccc;
    color: black;
  }

  .estado-vazio {
    color: #777;
  }
}
</style>
