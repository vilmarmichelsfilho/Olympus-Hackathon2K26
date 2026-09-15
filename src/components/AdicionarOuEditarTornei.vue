<script setup>
import { ref } from 'vue';
import TorneioPopUp from './TorneioComponentes/TorneioPopUp.vue';
import ModalidadesPart from './TorneioComponentes/ModalidadesPart.vue';
import { salvarTorneio } from '@/Utils/adicionarUtils.js';
import { torneios } from '@/data/torneios.js';

const emit = defineEmits(['fechar']);

const torneio = ref(0);

const etapa = ref(20);

function aoAdicionarTorneio(dados) {
  salvarTorneio(dados);
  etapa.value=etapa.value+20;
  torneio.value = Math.max(...torneios.map(item => item.cod_torneio ));
}
</script>

<template>
    <div class="display">
        <div class="dialog">
            <div class="texto">
                <h2 v-show="etapa===20">Criar Torneio</h2>
                <h2 v-show="etapa===40">Cadastrar Modalidades</h2>
                <h2 v-show="etapa===60">Cadastrar Times</h2>
                <h2 v-show="etapa===80">Cadastrar Turmas</h2>
                <h2 v-show="etapa===100">Cadastrar Árbitros</h2>  
                <p>Etapa {{ etapa/20 }} de 5 · Dados gerais</p>
            </div>
            <div class="barra">
                <div class="progresso" :style="{ width: etapa+'%', transition: 'width 0.5s' }"></div>
                <ol>
                    <li :style="{color: etapa === 20 ? '#E85002' : ''}">Dados</li>
                    <li :style="{color: etapa === 40 ? '#E85002' : ''}">Modalides</li>
                    <li :style="{color: etapa === 60 ? '#E85002' : ''}">Times</li>
                    <li :style="{color: etapa === 80 ? '#E85002' : ''}">Turmas</li>
                    <li :style="{color: etapa === 100 ? '#E85002' : ''}">Árbitros</li>
                </ol>
            </div>
            <TorneioPopUp v-show="etapa===20" @fechar="emit('fechar')" @adicionar="aoAdicionarTorneio"></TorneioPopUp>
            <ModalidadesPart v-show="etapa===40" :torneio="torneio" @salvar="etapa=etapa+20" />
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

.progresso {
    margin-bottom: 0.4vw;
    height: 0.5vw;
    width: 0%;
    border-radius: 1vw;
    background: #E85002;
    transition: width 0.5s ease;
}

ol {
    display: flex;
    justify-content: space-between;
}

ol li {
    color: black;
    transition: 0.3s;
}

h2 {
    font-size: 1.5vw;
    margin-right: 30vw;
}

.dialog {
    font-family: "Krona One", sans-serif;
    font-weight: normal;
    font-style: normal;
    display: flex;
    flex-direction: column;
    gap: 1.5vw;
    color: black;
    background: white;
    border: solid rgb(185, 184, 184) 0.15vw;
    padding: 4vw 3vw;
    border-radius: 1vw;
}

.display {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
</style>
