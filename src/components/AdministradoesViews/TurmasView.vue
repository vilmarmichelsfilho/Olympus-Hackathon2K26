<script setup>
import AdicionarOuEditar from '../AdicionarOuEditar.vue';
import TurmasCard from '../TurmasCard.vue';
import { turmas } from '@/data/turmas';
</script>

<template>
    <div class="template">
        <div>
            <h2>Turmas</h2>
            <p>Informações de ano, técnico e sala</p>
        </div>
        <div class="sla">
            <div class="turmasContainer">
                <div>
                    <p>a</p>
                    <img src="/public/images/coroa.png" alt="logo">
                    <button>Adicionar</button>
                </div>
                <ul>
                    <TurmasCard v-for="turma in turmas" :key="turma.id" :nome="turma.nome" :id="turma.id"></TurmasCard>
                </ul>
            </div>
        </div>
    </div>
    <AdicionarOuEditar></AdicionarOuEditar>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

.template {
    font-family: "Krona One", sans-serif;
    font-weight: 400;
    font-style: normal;
    margin: 2vw 3vw;
    display: flex;
    flex-direction: column;
    gap: 2vw;
}

h2 {
    font-size: 1.5vw;
}

p {
    color: #AEB9E1;
}

.sla {
    padding: 3vw 0 0 3vw;
    background: white;
}

.turmasContainer {
    background-color: white;
    width: 73vw;
    padding: 1vw 0 0 0;
    border-top: solid 0.15vw #E85002;
    border-left: solid 0.15vw #E85002;
}

.turmasContainer div {
    padding: 0 1vw 0 1vw;
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.turmasContainer p {
    opacity: 0;
}

.turmasContainer button {
    color: black;
    background: white;
    border: solid 0.13vw;
    padding: 0.3vw 1vw;
    border-radius: 1.5vw;
    transition: 0.3s;
}

.turmasContainer button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px 5px #E85002;
}
</style>