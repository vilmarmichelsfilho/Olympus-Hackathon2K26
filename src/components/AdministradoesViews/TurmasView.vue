<script setup>
import { ref } from 'vue';
import AdicionarOuEditar from '../AdicionarOuEditar.vue';
import TurmasCard from '../TurmasCard.vue';
import { adicionar, editar, excluir } from '@/Utils/turmasUtils.js';
import { turmas } from '@/data/turmas';

const add = ref(false);
const edit = ref(false);
const id = ref('');

function adicionardd(tecnico,ano, serie) {
    add.value = false;
    adicionar(tecnico, ano, serie);
}
function editardd(tecnico, ano, serie) {
    edit.value=false;
    editar(id.value,tecnico, ano, serie);
}
</script>

<template>
    <div class="template">
        <div>
            <h2>Turmas</h2>
            <p>Informações de ano, técnico e sala</p>
        </div>

        <div class="sla">
          <button v-on:click.prevent="add=true">Adicionar Turma</button>
          <div class="tabelaTurmas">
      <table>
        <thead>
          <tr>
            <th>Ano</th>
            <th>Técnico</th>
            <th>Série</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <TurmasCard
            v-for="turma in turmas"
            :key="turma.cod_turma"
            :id="turma.cod_turma"
            :tecnico="turma.tecnico_turma"
            :ano="turma.ano_turma"
            :serie="turma.numero_turma"
            @editar="edit=true; id=turma.cod_turma"
            @excluir="excluir(turma.cod_turma)"
          />
        </tbody>
      </table>
    </div>
  </div>
</div>
    <AdicionarOuEditar @fechar="edit=false" v-show="edit" @adicionar="editardd" class="edit"></AdicionarOuEditar>
    <AdicionarOuEditar @fechar="add=false" v-show="add" @adicionar="adicionardd" class="add"></AdicionarOuEditar>
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
    background: white;
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
  font-size: 1.2vw;
  font-weight: 600;
  padding: 1vw 0;
  text-align: left;
}
th:nth-child(1), td:nth-child(1) { width: 25%; }
th:nth-child(2), td:nth-child(2) { width: 15%; }
th:nth-child(3), td:nth-child(3) { width: 20%; }
th:nth-child(4), td:nth-child(4) { width: 20%; }
@media (max-width: 750px){
  h2{
    font-size: 4vw;
    margin: 2vw 0 1vw 3vw;
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
}
</style>
