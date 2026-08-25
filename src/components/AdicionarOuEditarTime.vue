<script setup>
import { ref } from 'vue';
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';
import { turmas } from '@/data/turmas';
import { adicionarTime, editarTime } from '@/Utils/timesUtils';

const emit = defineEmits(['fechar', 'adicionar'])
const props = defineProps(['nome1','um1','dois1','tres1','vitorias1','empates1','derrotas1','tipo','id'])

const nome = ref(props.nome1)
const um = ref(props.um1)
const dois = ref(props.dois1)
const tres = ref(props.tres1)
const vitorias = ref(props.vitorias1)
const empates = ref(props.empates1)
const derrotas = ref(props.derrotas1)

function apagar() {
    nome.value = props.nome1;
    um.value = props.um1;
    dois.value = props.dois1;
    tres.value = props.tres1;
    vitorias.value = props.vitoria1;
    empates.value = props.empates1;
    derrotas.value = props.derrotas1;
}

function adicionar() {
    if (props.tipo == 'adicionar') {
        adicionarTime(nome.value, um.value, dois.value, tres.value, vitorias.value, empates.value, derrotas.value);
        apagar();
        emit('fechar');
    } else if (props.tipo == 'editar') {
        editarTime(nome.value, um.value, dois.value, tres.value, vitorias.value, empates.value, derrotas.value, props.id);
        apagar();
        emit('fechar');
    }
}

</script>

<template>
    <div class="display">
        <div class="dialog">
            <h2>Adicionar/Editar Turma</h2>
            <form action="">
                <div class="input">
                    <h3>Nome</h3>
                    <input type="text" v-model="nome">
                </div>
                <div class="sla">
                    <div class="input">
                        <h3>Turma 1º</h3>
                        <select name="ano" id="ano" placeholder="Ano" v-model="um">
                            <option v-for="turma in turmas.filter(item => item.ano == 1)" :key="turma.id">{{ turma.nome }}</option>
                        </select>
                    </div>
                    <div class="input">
                        <h3>Turma 2º</h3>
                        <select name="serie" id="serie" placeholder="Serie" v-model="dois">
                            <option v-for="turma in turmas.filter(item => item.ano == 2)" :key="turma.id">{{ turma.nome }}</option>
                        </select>
                    </div>
                    <div class="input">
                        <h3>Turma 3º</h3>
                        <select name="serie" id="serie" placeholder="Serie" v-model="tres">
                            <option v-for="turma in turmas.filter(item => item.ano == 3)" :key="turma.id">{{ turma.nome }}</option>
                        </select>
                    </div>
                </div>
                <div class="separa"></div>
                <div class="sla">
                    <div class="input">
                        <h3>Vitórias</h3>
                        <input type="number" v-model="vitorias">
                    </div>
                    <div class="input">
                        <h3>Empates</h3>
                        <input type="number" v-model="empates">
                    </div>
                    <div class="input">
                        <h3>Derrotas</h3>
                        <input type="number" v-model="derrotas">
                    </div>
                </div>
                <div class="separa"></div>
                <div class="pre">
                    <h4>Pré-Vizualização <span>Time</span></h4>
                    <p>{{ um }} - {{ dois }} - {{ tres }}</p>
                    <div>
                        <p>V/E/D  <span>{{ vitorias }}/{{ empates }}/{{ derrotas }}</span></p>
                        <p>Pontos <span>{{ (vitorias*3+empates) }}</span></p>
                    </div>
                </div>
                <div class="botoes">
                    <button type="submit" class="salvar" v-on:click.prevent="adicionar()"
                        :disabled="nome == '' || um == '' || dois == '' || tres == ''">
                        <ContentSaveOutlineIcon width="1.5vw"></ContentSaveOutlineIcon>Salvar Alterações
                    </button>
                    <button type="reset" class="limpar" v-on:click.prevent="emit('fechar'),apagar">Cancelar/Limpar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

.pre div {
    margin-top: 0.5vw;
    display: flex;
    align-items: center;
    gap: 6vw;
    justify-content: center;
}

.pre div p {
    display: flex;
    color: rgba(0, 0, 0, 0.405);
    gap: 1vw;
}
.pre div p span {
    color: black;
    font-weight: bolder;
}

.separa {
    height: 0.1vw;
    width: 100%;
    display: flex;
    background: rgba(0, 0, 0, 0.378);
}

.botoes {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1vw;
}

button:disabled {
    background: grey;
}

button:disabled:hover {
    transform: scale(1);
    text-decoration: none;
}

button {
    border: none;
    background: none;
    display: flex;
    align-items: center;
    transition: 0.3s;
}

button:hover {
    text-decoration: underline;
    transform: scale(1.1);
}

.salvar {
    background: #6EAC31;
    padding: 0.5vw 2vw;
    border-radius: 0.7vw;
    color: white;
}

h4 {
    font-size: 1vw;
}

h4 span {
    font-size: 0.6vw;
    color: #DE6D1C;
}

.pre {
    display: flex;
    flex-direction: column;
}

.pre p {
    text-align: center;
}

.sla {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1vw;
}

h2 {
    font-size: 1.5vw;
    margin-right: 10vw;
}

form {
    display: flex;
    flex-direction: column;
    gap: 2vw;
}

.input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    gap: 0.1vw;
}

.input select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    background: #E2E2E2;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.75);
    border: none;
    border-radius: 0.2vw;
    padding: 0.3vw 0.5vw;
    color: #959595;
    transition: 0.3s;
}

input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    background: #E2E2E2;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.75);
    border: none;
    border-radius: 0.2vw;
    padding: 0.3vw 0.5vw;
    color: #959595;
    transition: 0.3s;
}

input:focus {
    outline: none;
    box-shadow: 0 0 10px 1px #DE6D1C;
}

.input select:focus {
    outline: none;
    box-shadow: 0 0 10px 1px #DE6D1C;
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