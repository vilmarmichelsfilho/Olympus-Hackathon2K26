<script setup>
import AdicionarArbitro from '../AdicionarArbitro.vue';
import EditarrArbitro from '../EditarArbitroView.vue';
import { editarArbitro } from '@/Utils/editarUtils.js'
import { ref } from 'vue';
import arbitrosDashboardChild from '@/components/arbitroDashboardChild.vue';
import { arbitros } from '@/data/arbitros';
function excluirArbitro(id) {
  const index = arbitros.findIndex((arbitro) => arbitro.cod_arbitro === id)
  if (index !== -1) {
    arbitros.splice(index, 1)
  }
}
const adicionarrArbitro = ref(false)
const arbitroEditar = ref(false)
const arbitroEditarId = ref(null)
function abrirEditarArbitro(id) {
  arbitroEditarId.value = id
  arbitroEditar.value = true
}
</script>
<template>
  <section class="dashboard">
    <h3>Arbitros</h3>
    <p>Informações sobre os arbitros sendo elas seu nome, login e senha</p>
    <div class="conteiner">
      <div class="content"><img src="/public/images/coroa.png" alt="coroa">
        <button @click="adicionarrArbitro = true">Adicionar</button>
      </div>
    <div class="tabelaArbitros">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Login</th>
            <th>Senha</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <arbitrosDashboardChild
            v-for="arbitro in arbitros"
            :key="arbitro.cod_arbitro"
            :id="arbitro.cod_arbitro"
            :nome="arbitro.nome_arbitro"
            :login="arbitro.login_arbitro"
            :senha="arbitro.senha_arbitro"
            @editar-arbitro="abrirEditarArbitro($event)"
            @excluir-arbitro="excluirArbitro($event)"
          />
        </tbody>
      </table>
    </div>
    </div>
    <AdicionarArbitro
      @fecharAdicionarArbitro="adicionarrArbitro = false"
      class="popup"
      :class="{ aberto: adicionarrArbitro }"
    ></AdicionarArbitro>
    <editarrArbitro
      :arbitro="arbitros.find((a) => a.cod_arbitro === arbitroEditarId)"
      @atualizar="editarArbitro($event.cod_arbitro, $event)"
      @fecharEditarArbitro="arbitroEditar = false"
      class="popup"
      :class="{ aberto: arbitroEditar }"
    />
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
  margin: 0;
  background-color: transparent;
  max-width: 80%;
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

section.dashboard  p {
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
  border-bottom: 1px solid #af4423;
}

th {
  color: white;
  font-size: 1.2vw;
  font-weight: 600;
  padding: 1vw 1.5vw;
  text-align: left;
}
th:nth-child(1), td:nth-child(1) { width: 40%; }
th:nth-child(2), td:nth-child(2) { width: 20%; }
th:nth-child(3), td:nth-child(3) { width: 20%; text-align: center; }
th:nth-child(4), td:nth-child(4) { width: 20%; text-align: center; }
@media (max-width: 750px){
  section.dashboard{
    padding: 20px 0;
    margin: 0;
    max-width: 100%;
  }
 section.dashboard h3{
  margin: 0 0 0 5vw;
    color: black;
    font-weight: bold;
    font-size: 8vw
  }
  div.conteiner{
    border-radius: 0;
  }
  section.dashboard p{
    font-size: 4vw;
    margin: 0 0 0 7vw;
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
