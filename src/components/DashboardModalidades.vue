<script setup>
import modalidadesDashboardChild from '@/components/modalidadeDashboardChild.vue';
import { modalidades } from '@/data/modalidades';
defineEmits(['adicionarModalidade', 'editarModalidade', 'excluirModalidade']);
</script>
<template>
  <section class="dashboard">
    <h3>modalidades</h3>
    <p>Informações sobre as modalidades, descrição,
      nome, tempo e foto</p>
    <div class="conteiner">
      <div class="content"><img src="/public/images/coroa.png" alt="coroa">
        <button @click="$emit('adicionarModalidade')">Adicionar</button>
      </div>
    <div class="tabelaModalidades">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Foto</th>
            <th>Tempo</th>
          </tr>
        </thead>
        <tbody>
          <modalidadesDashboardChild
            v-for="modalidade in modalidades"
            :key="modalidade.id"
            :id="modalidade.id"
            :imagem="modalidade.image"
            :nome="modalidade.nome"
            :desc="modalidade.desc"
            :tempo="modalidade.tempo"
            @editar-modalidade="$emit('editarModalidade', $event)"
            @excluir-modalidade="$emit('excluirModalidade', $event)"
          />
        </tbody>
      </table>
    </div>
    </div>
  </section>
</template>
<style scoped>
section.dashboard {
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  font-family: sans-serif;
}

section.dashboard h3 {
  color: white;
  text-transform: capitalize;
  font-size: 2.5vw;
}

section.dashboard > p {
  color: #8A99AD;
  font-size: 1.2vw;
  margin-bottom: 1vw;
}

div.conteiner {
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background-color: #0B1739;
  box-sizing: border-box;
}

div.content {
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

div.content img {
  position: absolute;
  left: 58%;
  transform: translateX(-50%);
  width: 2.5vw;
  height: 2.5vw;
}

div.content button {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5vw 1.5vw;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

.tabelaModalidades {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

thead {
  border-bottom: 1px solid #1E293B;
}

th {
  color: white;
  font-size: 1.2vw;
  font-weight: 600;
  padding: 1vw 1.5vw;
  text-align: left;
}
th:nth-child(1), td:nth-child(1) { width: 25%; }
th:nth-child(2), td:nth-child(2) { width: 40%; }
th:nth-child(3), td:nth-child(3) { width: 15%; text-align: center; }
th:nth-child(4), td:nth-child(4) { width: 20%; text-align: center; }
</style>
