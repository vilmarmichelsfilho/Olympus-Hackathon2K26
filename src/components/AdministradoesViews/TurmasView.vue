<script setup>
import TurmasCard from '../TurmasCard.vue';
import { turmasFiltradasAdm } from '@/Utils/cod_torneioAdmUtils.js';
</script>
<template>
    <div class="template">
        <div>
            <h2>Turmas</h2>
            <p>Informações de ano, técnico e sala</p>
        </div>

        <div class="sla">
          <div class="tabelaTurmas">
      <table>
        <thead>
          <tr>
            <th>Ano</th>
            <th>Técnico</th>
            <th>Série</th>
          </tr>
        </thead>
        <tbody>
          <TurmasCard
            v-for="turma in turmasFiltradasAdm"
            :key="turma.cod_turma"
            :id="turma.cod_turma"
            :tecnico="turma.tecnico_turma"
            :ano="turma.ano_turma"
            :serie="turma.numero_turma"
          />
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
.template {
    font-family: "Krona One", sans-serif;
    font-weight: 400;
    font-style: normal;
    margin: 2vw 3vw;
    display: flex;
    flex-direction: column;
    gap: 2vw;
}

h2 {
    font-size: 1.5vw;
    color: white;
}

p {
    color: #AEB9E1;
}

.sla {
    padding: 3vw 0 0 3vw;
    background: #0B1739;
    color: white;
    border-radius: 1vw;
}

.tabelaTurmas {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

thead {
  border-bottom: 1px solid #af4423;
}

th {
  color: white;
  font-size: 1.2vw;
  font-weight: 600;
  padding: 1vw 0;
  text-align: left;
}
th:nth-child(1), td:nth-child(1) { width: 33%; }
th:nth-child(2), td:nth-child(2) { width: 33%; }
th:nth-child(3), td:nth-child(3) { width: 33%; }
@media (max-width: 750px){
  h2{
    font-size: 4vw;
    margin: 2vw 0 1vw 3vw;
    color: black;
  }
  p{
    font-size: 3vw;
    margin: 0 0 4vw 3vw;
  }
thead{
  border-bottom: 2px solid #E85002;
}
th{
  color: black;
  font-size: 2.5vw
}
  .sla {
    padding: 3vw 0 0 3vw;
    border-radius: 2vw;
    background: white;
    color: black;
  }
}
</style>
