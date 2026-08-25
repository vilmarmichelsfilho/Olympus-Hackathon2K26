<script setup>
import { times } from '@/data/times';
import timesCard from '../timesCard.vue';
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
                <button>Adicionar</button>
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
                <timesCard v-for="time in times" :key="time.id" :nome="time.nome" :vitorias="time.vitorias" :empates="time.empates" :derrotas="time.vitorias" :pontuacao="time.pontuacao_geral" :turma1="time.time1" :turma2="time.time2" :turma3="time.time3" ></timesCard>
            </ul>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

button {
    font-size: 1vw;
}

.cima {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1vw;
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