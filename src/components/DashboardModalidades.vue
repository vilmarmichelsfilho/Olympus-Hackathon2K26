<script setup>
import modalidadesDashboardChild from '@/components/modalidadeDashboardChild.vue';
import { modalidades } from '@/data/modalidades';
import { modalidadesFiltradasAdm } from '@/Utils/cod_torneioAdmUtils';
import AdicionarModalidade from '@/components/AdicionarModalidade.vue'
import EditarModalidade from '@/components/EditarModalidade.vue'
import { editarModalidade } from '@/Utils/editarUtils.js'
import { ref } from 'vue';
import { excluirModalidadeCompleta } from '@/Utils/exclusaoUtils'
const modalidadeEditar = ref(false)
const modalidadeEditarId = ref(null)
function abrirEditar(id) {
  modalidadeEditarId.value = id
  modalidadeEditar.value = true
}
const modalidadeAdicionar = ref(false)
function exluirModalidade(id) {
  excluirModalidadeCompleta(id)
}
</script>
<template>
  <section class="dashboard">
    <h3>modalidades</h3>
    <p>Informações sobre as modalidades, descrição,
      nome, tempo, local e foto</p>
    <div class="conteiner">
      <div class="content"><img src="/images/coroa.png" alt="coroa">
        <button @click="modalidadeAdicionar = true">Adicionar</button>
      </div>
    <div class="tabelaModalidades">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Local</th>
            <th>Foto</th>
            <th>Tempo</th>
          </tr>
        </thead>
        <tbody>
          <modalidadesDashboardChild
            v-for="modalidade in modalidadesFiltradasAdm"
            :key="modalidade.cod_modalidade"
            :id="modalidade.cod_modalidade"
            :local="modalidade.localdojogo_modalidade"
            :imagem="modalidade.foto_modalidade"
            :nome="modalidade.nome_modalidade"
            :desc="modalidade.desc_modalidade"
            :tempo="modalidade.tempojogemminutos_modalidade"
            @editar-modalidade="abrirEditar($event)"
            @excluir-modalidade="exluirModalidade($event)"
          />
        </tbody>
      </table>
    </div>
    </div>
    <AdicionarModalidade
      @fecharAdicionarModalidade="modalidadeAdicionar = false"
      class="popup"
      :class="{ aberto: modalidadeAdicionar }"
    ></AdicionarModalidade>
    <EditarModalidade
      :modalidade="modalidades.find((m) => m.cod_modalidade === modalidadeEditarId)"
      @atualizar="editarModalidade($event.cod_modalidade, $event)"
      @fechar="modalidadeEditar = false"
      class="popup"
      :class="{ aberto: modalidadeEditar }"
    >
    </EditarModalidade>
  </section>
</template>
<style scoped>
.popup {
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.popup.aberto {
  opacity: 1;
  visibility: visible;
}
section.dashboard {
  background-color: transparent;
  margin: 0;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

section.dashboard h3 {
  color: white;
  text-transform: capitalize;
  font-size: 2.5vw;
  margin: 0 0 0 5vw;
}

section.dashboard  p {
  color: #8A99AD;
  font-size: 1.2vw;
  margin: 0 0 0 7vw;
}

div.conteiner {
  margin: 2vw auto;
  width: 80%;
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
  font-size: 1.3vw;
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5vw 1.5vw;
  border-radius: 20px;
  cursor: pointer;
}

.tabelaModalidades {
  max-width: 100%;
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
th:nth-child(2), td:nth-child(2) { width: 30%; }
th:nth-child(3), td:nth-child(3) { width: 20%;  }
th:nth-child(4), td:nth-child(4) { width: 25%; text-align: center; }
th:nth-child(5), td:nth-child(5) { width: 20%; text-align: center; }
@media (max-width: 750px){
th:nth-child(1), td:nth-child(1) { width: 20%; }
th:nth-child(2), td:nth-child(2) { width: 40%; }
th:nth-child(3), td:nth-child(3) { width: 20%;  }
th:nth-child(4), td:nth-child(4) { width: 25%; text-align: center; }
th:nth-child(5), td:nth-child(5) { width: 20%; text-align: center; }
  section.dashboard{
    padding: 20px 0;
  }
 section.dashboard h3{
    color: black;
    font-weight: bold;
    font-size: 8vw
  }
  div.conteiner{
    border-radius: 0;
  }
  section.dashboard p{
    font-size: 4vw;
  }
  div.conteiner{
    width: 100vw;
    min-height: 70vw;
    background: transparent;
  }
  div.content img{
    display: none;
  }
  div.content button {
  font-size: 4vw;
  padding: 0.5vw 3vw;
  color: black;
  border: 1px solid black;
}
thead{
  border-bottom: 2px solid #E85002;
}
th{
  color: black;
  font-size: 3.6vw
}
}
</style>
