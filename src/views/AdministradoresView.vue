<script setup>
import NavegacaoAdministradores from '@/components/NavegacaoAdministradores.vue';
import AdicionarModalidade from '@/components/AdicionarModalidade.vue';
import EditarModalidade from '@/components/EditarModalidade.vue';
import { editarModalidade } from '@/Utils/editarUtils.js';
import { modalidades } from '@/data/modalidades';
import DashboardModalidades from '@/components/DashboardModalidades.vue';
import AdicionarTime from '@/components/AdicionarTime.vue';
import TurmasView from '@/components/AdministradoesViews/TurmasView.vue';
import router from '@/router';
import { ref } from 'vue';
const telaAtual = ref('times')
const modalidadeEditar = ref(false);
const modalidadeEditarId = ref(null);
function abrirEditar(id) {
    modalidadeEditarId.value = id;
    modalidadeEditar.value = true;
}

if (localStorage.getItem("logado") != "true") {
    router.replace("/")
    alert("Você não tem acesso a está página")
}

function mudarTela(valor) {
    let tela = '/administradores#'+valor;
    router.replace(tela)
    telaAtual.value = valor;
}

const time = ref(false);
const modalidadeAdicionar = ref(false);
function exluirModalidade(id) {
const index = modalidades.findIndex((modalidade) => modalidade.id === id);
if (index !== -1) {
modalidades.splice(index, 1);
}
}
</script>

<template>
    <div class="display">
        <NavegacaoAdministradores @tela="mudarTela"></NavegacaoAdministradores>
        <div class="times" v-show="telaAtual=='times'">
            <button v-on:click="time=true">Adicionar Time</button>
        </div>
        <DashboardModalidades
        v-show="telaAtual == 'modalidades'"
        @adicionar-modalidade="modalidadeAdicionar = true"
        @editar-modalidade="abrirEditar($event)"
        @excluir-modalidade="exluirModalidade($event)">
    </DashboardModalidades>
        <div class="turmas" v-show="telaAtual=='turmas'">
            <TurmasView class="turmas"></TurmasView>
        </div>
    </div>
    <AdicionarTime @fechar="time = false" class="popup" :class="{ aberto: time }"></AdicionarTime>
    <AdicionarModalidade @fecharAdicionarModalidade="modalidadeAdicionar = false" class="popup" :class="{ aberto: modalidadeAdicionar }"></AdicionarModalidade>
       <EditarModalidade
        :modalidade="modalidades.find(m => m.id === modalidadeEditarId)"
        @atualizar="editarModalidade($event.id, $event)"
        @fechar="modalidadeEditar = false"
        class="popup"
        :class="{ aberto: modalidadeEditar }">
    </EditarModalidade>
</template>

<style scoped>
.display {
    background: #15161A;
    width: 100%;
    min-height: 100vh;
    height: auto;
    display: flex;
}

.popup {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.popup.aberto {
    opacity: 1;
    visibility: visible;
}
@media (max-width: 750px){
.display{
background-color: white;
}
}
</style>
