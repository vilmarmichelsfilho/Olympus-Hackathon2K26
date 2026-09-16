<script setup>
import { times } from '@/data/times.js';
import { turmas } from '@/data/turmas.js';
import { computed, ref } from 'vue';
const props = defineProps(['torneio'])
import TurmaNewCard from '../Cards/TurmaNewCard.vue';
const timesTorneio = computed(() => {
    return times.filter(item => item.cod_torneio === props.torneio);
});
const turmasTorneio = computed(() => {
    return turmas.filter(item => item.cod_torneio === props.torneio);
});
import AdicionarOuEditar from '../AdicionarOuEditar.vue';
const add = ref(false)
const emits = defineEmits(['salvar','voltar']);

const timesComTurma = computed(() => {
    // Filtra as turmas do torneio atual e extrai os cod_time
    const codigosTimesComTurma = turmasTorneio.value.map(turma => turma.cod_time);
    // Retorna um Set para remover duplicados e otimizar a busca
    return new Set(codigosTimesComTurma);
});

function avancar() {
    // 2. Verifica se TODOS os times do torneio estão dentro do Set de times com turma
    const todosOsTimesPossuemTurma = timesTorneio.value.every(time => 
        timesComTurma.value.has(time.cod_time)
    );

    if (todosOsTimesPossuemTurma) {
        emits('salvar');
    } else {
        alert('Todos os times do torneio precisam ter pelo menos uma turma cadastrada.');
    }
}
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
        <button class="salvar" v-on:click.prevent="avancar">Salvar Alterações</button>
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