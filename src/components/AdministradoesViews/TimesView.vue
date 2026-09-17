<script setup>
import timesCard from '@/components/timesCard.vue'
import { timesFiltradosAdm } from '@/Utils/cod_torneioAdmUtils.js'
</script>

<template>
  <section class="dashboard-times">
    <header class="cabecalho-pagina">
      <h2>Times</h2>
      <p>Informações dos times, turmas, resultados e pontos</p>
    </header>

    <div class="painel">
      <div class="acoes-painel">
        <img src="/images/coroa.png" alt="" />
      </div>

      <div class="tabela-times">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Turmas</th>
              <th>V/E/D</th>
              <th>PTS</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <timesCard
              v-for="time in timesFiltradosAdm"
              :key="time.cod_time"
              :id="time.cod_time"
            />
          </tbody>
        </table>

        <p v-if="!timesFiltradosAdm.length" class="estado-vazio">
          Nenhum time cadastrado neste torneio.
        </p>
      </div>
    </div>

  </section>
</template>

<style scoped>
.dashboard-times {
  width: 100%;
  min-width: 0;
  padding: 2vw 3vw;
  color: white;
  font-family: sans-serif;
}

.cabecalho-pagina h2 {
  margin: 0;
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 700;
}

.cabecalho-pagina p {
  margin: 0.2rem 0 0;
  color: #8a99ad;
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
}

.painel {
  width: 100%;
  max-width: 1100px;
  margin-top: 2vw;
  padding: clamp(1rem, 1.6vw, 1.5rem);
  border-radius: 12px;
  background: #0b1739;
}

.acoes-painel {
  position: relative;
  display: flex;
  min-height: 2.7rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.acoes-painel img {
  width: clamp(2rem, 2.5vw, 2.75rem);
}

.tabela-times {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  table-layout: fixed;
}

thead {
  border-bottom: 2px solid #e85002;
}

th {
  padding: 0.8rem;
  color: white;
  font-size: clamp(0.85rem, 1vw, 1rem);
  font-weight: 600;
  text-align: left;
}

th:nth-child(1) { width: 23%; }
th:nth-child(2) { width: 35%; }
th:nth-child(3) { width: 14%; text-align: center; }
th:nth-child(4) { width: 10%; text-align: center; }
th:nth-child(5) { width: 18%; text-align: center; }

.estado-vazio {
  margin: 0;
  padding: 3rem 1rem;
  color: #8a99ad;
  text-align: center;
}

@media (max-width: 768px) {
  .dashboard-times {
    padding: 5rem 4vw 8vw;
    color: #17171b;
  }

  .cabecalho-pagina h2 {
    font-size: clamp(1.8rem, 8vw, 2.4rem);
  }

  .cabecalho-pagina p {
    font-size: clamp(0.9rem, 3.7vw, 1rem);
  }

  .painel {
    margin-top: 6vw;
    padding: 3vw;
    border: 1px solid #e1e1e1;
    border-radius: 12px;
    background: white;
  }

  .acoes-painel {
    display: none;
  }

  th {
    color: #17171b;
    font-size: 0.85rem;
  }

  .estado-vazio {
    color: #666;
  }
}
</style>
