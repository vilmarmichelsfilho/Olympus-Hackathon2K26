<script setup>
import timesCard from '../timesCard.vue';
import { timesFiltradosAdm } from '@/Utils/cod_torneioAdmUtils.js';
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
                <timesCard v-for="time in timesFiltradosAdm" :key="time.cod_time" :nome="time.nome_time" :id="time.cod_time" :pontuacao="time.pontuacaogeral_time" :cor="time.cor_time" :escudo="time.escudo_time" :pontuacao_geral="time.pontuacaogeral_time"></timesCard>
            </ul>
        </div>
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');


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
