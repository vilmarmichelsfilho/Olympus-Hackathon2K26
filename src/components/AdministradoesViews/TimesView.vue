<script setup>
import { times } from '@/data/times';
import timesCard from '../timesCard.vue';
import AdicionarOuEditarTime from '../AdicionarOuEditarTime.vue';
import { ref } from 'vue';

const add = ref(false)

</script>

<template>
    <div class="container">
        <div class="texto">
            <h2>Times Olimpiadas</h2>
            <p>Informações de time, turma, jogos e pontos</p>
        </div>
        <div class="times">
            <div class="cima">
                <p>a</p>
                <img src="/public/images/coroa.png" alt="" style="width: 3vw;">
                <button v-on:click.prevent="add=true">Adicionar</button>
            </div>
            <div class="desc">
                <ul>
                    <li>Time</li>
                    <li>Turma</li>
                    <li>V/E/D</li>
                    <li>PTS</li>
                    <li><span>f</span></li>
                </ul>
            </div>
            <ul>
                <timesCard v-for="time in times" :key="time.id" :nome="time.nome" :vitorias="time.vitorias" :empates="time.empates" :derrotas="time.derrotas" :pontuacao="time.pontuacao_geral" :turma1="time.time1" :turma2="time.time2" :turma3="time.time3" :id="time.id"></timesCard>
            </ul>
        </div>
    </div>
    <AdicionarOuEditarTime v-if="add" @fechar="add=false" :nome1="''" :um1="''" :dois1="''" :tres1="''" :vitorias1="0" :empates1="0" :derrotas1="0" :tipo="'adicionar'"></AdicionarOuEditarTime>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

button {
    font-size: 1vw;
}

.cima button {
    background: none;
    padding: 0.3vw 1vw;
    border: solid white 0.15vw;
    font-size: 0.75vw;
    border-radius: 3vw;
    transition: 0.3s;
}
.cima button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0.5vw 0.1vw white;
}

.cima {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1vw;
    margin: 1vw 2vw 0 2vw;
}
.cima p {
    opacity: 0;
}

.desc span {
    opacity: 0;
}

.desc {
    border-bottom: solid 0.2vw #E85002;
}

.desc ul {
    font-size: 1.1vw;
    margin: 0 1vw;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.times {
    background: #0B1739;
    border-radius: 1vw;
    width: 70vw;
}

.container {
    margin: 2vw 3vw;
    display: flex;
    flex-direction: column;
    gap: 2vw;

    color: white;

    font-family: "Krona One", sans-serif;
    font-weight: 400;
    font-style: normal;
}
</style>