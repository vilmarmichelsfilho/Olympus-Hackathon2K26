<script setup>
import { times } from '@/data/times.js';
import { computed, ref } from 'vue';
const props = defineProps(['torneio'])
import TurmaNewCard from '../Cards/TurmaNewCard.vue';
const timesTorneio = computed(() => {
    return times.filter(item => item.cod_torneio === props.torneio);
});
import AdicionarOuEditar from '../AdicionarOuEditar.vue';
const add = ref(false)
const emits = defineEmits(['salvar','voltar']);
</script>

<template>
    <div class="sla">
        <div class="header">
            <h3>Turmas</h3>
            <button @click="add = true" class="adicionar">Adicionar</button>
        </div>
        <div class="cards">
            <ul>
                <li>Time Vinculado</li>
                <li>Turmas</li>
                <li>Ações</li>
            </ul>
            <ul class="cardss">
                <TurmaNewCard v-for="(time, index) in timesTorneio" :key="time.cod_time" :id="time.cod_time"
                    :class="index % 2 === 0 ? 'item-branco' : 'item-preto'">
                </TurmaNewCard>
            </ul>
        </div>
    </div>
    <div class="nav">
        <button class="voltar" v-on:click.prevent="emits('voltar')">Voltar</button>
        <button class="salvar" v-on:click.prevent="emits('salvar')">Salvar Alterações</button>
    </div>
    <AdicionarOuEditar v-if="add===true" @fechar="add=false" :torneio="torneio" :tipo="'adicionar'"></AdicionarOuEditar>
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