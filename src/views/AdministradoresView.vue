<script setup>
import NavegacaoAdministradores from '@/components/NavegacaoAdministradores.vue';
import HamburgerMenuIcon from '@iconify-vue/mdi/hamburger-menu';
import AdicionarModalidade from '@/components/AdicionarModalidade.vue';
import EditarModalidade from '@/components/EditarModalidade.vue';
import { editarModalidade } from '@/Utils/editarUtils.js';
import { modalidades } from '@/data/modalidades';
import DashboardModalidades from '@/components/DashboardModalidades.vue';
import AdicionarTime from '@/components/AdicionarTime.vue';
import TurmasView from '@/components/AdministradoesViews/TurmasView.vue';
import TimesView from '@/components/AdministradoesViews/TimesView.vue';
import router from '@/router';
import { ref } from 'vue';
import DashboardControlView from './DashboardControlView.vue';

const telaAtual = ref('dashboard')
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
    let tela = '/administradores#' + valor;
    router.replace(tela)
    telaAtual.value = valor;
}
const menuAberto = ref(false)
function toggleMenu() {
    menuAberto.value = !menuAberto.value;
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
        <button class="btn-hamburger" @click="toggleMenu"><HamburgerMenuIcon width="10vw" style="position: fixed; right: 5vw; opacity: 0.9; color: white; background: black; padding: 0.5vw; border-radius: 100vw;"></HamburgerMenuIcon></button>

        <NavegacaoAdministradores @tela="mudarTela" class="nav-lateral" :class="{ 'nav-aberto': menuAberto }">
        </NavegacaoAdministradores>

        <div class="times" v-show="telaAtual == 'times'">
            <TimesView></TimesView>
        </div>
        <div v-if="telaAtual === 'dashboard'" class="dashboard">
            <DashboardControlView @editar2="mudarTela('times')" />
        </div>
        <div class="turmas" v-show="telaAtual == 'turmas'">
            <TurmasView></TurmasView>
        </div>
        <DashboardModalidades v-show="telaAtual == 'modalidades'" @adicionar-modalidade="modalidadeAdicionar = true"
            @editar-modalidade="abrirEditar($event)" @excluir-modalidade="exluirModalidade($event)">
        </DashboardModalidades>
        <AdicionarTime @fechar="time = false" class="popup" :class="{ aberto: time }"></AdicionarTime>
        <AdicionarModalidade @fecharAdicionarModalidade="modalidadeAdicionar = false" class="popup"
            :class="{ aberto: modalidadeAdicionar }"></AdicionarModalidade>
        <EditarModalidade :modalidade="modalidades.find(m => m.id === modalidadeEditarId)"
            @atualizar="editarModalidade($event.id, $event)" @fechar="modalidadeEditar = false" class="popup"
            :class="{ aberto: modalidadeEditar }">
        </EditarModalidade>
    </div>
    <AdicionarTime @fechar="time = false" class="popup" :class="{ aberto: time }"></AdicionarTime>

    <div class="controle">

    </div>
</template>

<style scoped>
.dashboard {
    margin: 1vw 2vw;
}

.display {
    background: #15161A;
    width: 100%;
    min-height: 100vh;
    height: auto;
    display: flex;
    min-width: 0;
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

.btn-hamburger {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 100;
    background: transparent;
    color: white;
    border: none;
    font-size: 1.5rem;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .btn-hamburger {
        display: block;
    }

    .nav-lateral {
        position: fixed;
        top: 0;
        left: -100%;
        height: 100vh;
        z-index: 99;
        transition: left 0.3s ease;
    }

    .nav-aberto {
        left: 0;
    }
}

@media (max-width: 750px) {
    .display {
        background-color: white;
    }
}
</style>
