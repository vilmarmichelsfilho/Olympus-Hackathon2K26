<script setup>
import { arbitros } from '@/data/arbitros.js';
import ModalidadesNewCard from '../Cards/ModalidadesNewCard.vue';
import { computed } from 'vue';

const props = defineProps(['torneio'])
const emits = defineEmits(['salvar'])

const arbitrosTorneio = computed(() => {
    return arbitros.filter(item => item.cod_torneio === props.torneio);
});
</script>

<template>
    <div class="sla">
        <div class="header">
            <h3>Árbitros</h3>
            <button @click="modalidadeAdicionar = true" class="adicionar">Adicionar</button>
        </div>
        <div class="cards">
            <ul>
                <li>Nome</li>
                <li>Login</li>
                <li>Senha</li>
                <li>Ações</li>
            </ul>
            <ul class="cardss">
                <ModalidadesNewCard v-for="(modalidade, index) in modalidadesTorneio" :key="modalidade.id"
                    :id="modalidade.cod_modalidade" :class="index % 2 === 0 ? 'item-branco' : 'item-preto'"
                    @excluir-modalidade="exluirModalidade" @editar-modalidade="abrirEditar">
                </ModalidadesNewCard>
            </ul>
        </div>
    </div>
    <div class="nav">
        <button class="voltar">Voltar</button>
        <button class="salvar" v-on:click="avancar">Salvar Alterações</button>
    </div>
</template>

<style scoped>
.adicionar {
    font-weight: bolder;
    font-size: 1.2rem;
    border: black solid 0.2vw;
    border-radius: 0.7vw;
    padding: 0.2vw 0.6vw;
}
button {
    border: none;
    background: none;
    display: flex;
    align-items: center;
    transition: 0.3s;
}
button {
    cursor: pointer;
}
.salvar {
    background: #6EAC31;
    padding: 0.5vw 2vw;
    border-radius: 0.7vw;
    color: white;
}
.nav {
    display: flex;
    justify-content: space-between;
    gap: 3rem;
}
.voltar {
    font-size: 1rem;
    font-weight: bolder;
    border: black solid 0.2vw;
    padding: 0 3vw;
    border-radius: 0.5vw;
}
.header {
    display: flex;
    justify-content: space-between;
}

.sla {
    background: #F8F8FA;
    padding: 1vw;
    border-radius: 0.5vw;
}

.cardss {
    flex-direction: column;
}

.cards {
    max-height: 27rem;
    overflow: auto;
}

ul {
    overflow: hidden;
    background: #F8F8FA;
    display: flex;
    list-style: none;
    justify-content: space-between;
    padding: 0;
}
</style>