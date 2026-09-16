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

function avancar() {
    if (turmasTorneio.value.length < 23 || turmasTorneio.value.length > 24) {
        alert('O torneio deve ter entre 23 e 24 turmas.')
        return
    }

    let timesComDuasTurmas = 0
    for (const time of timesTorneio.value) {
        const turmasDoTime = turmasTorneio.value.filter(turma => turma.cod_time === time.cod_time)
        const anos = new Set(turmasDoTime.map(turma => Number(turma.ano_turma)))

        if (turmasDoTime.length < 2 || turmasDoTime.length > 3 || anos.size !== turmasDoTime.length) {
            alert(`O time ${time.nome_time} deve ter 2 ou 3 turmas, sem repetir o ano.`)
            return
        }
        if (turmasDoTime.length === 2) timesComDuasTurmas += 1
        if (turmasDoTime.length === 3 && ![1, 2, 3].every(ano => anos.has(ano))) {
            alert(`O time ${time.nome_time} deve ter uma turma do 1º, 2º e 3º ano.`)
            return
        }
    }

    if (timesComDuasTurmas > 1) {
        alert('Somente um time pode ficar com duas turmas.')
        return
    }

    emits('salvar')
}
</script>

<template>
    <div class="sla">
        <div class="header">
            <h3>Turmas</h3>
            <button @click="add = true" class="adicionar" :disabled="turmasTorneio.length >= 24">Adicionar</button>
        </div>
        <p class="regra">{{ turmasTorneio.length }}/24 turmas cadastradas · mínimo 23</p>
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

button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
}

.regra {
    margin: 0.4rem 0 0.8rem;
    color: #666;
    font-size: 0.8rem;
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
