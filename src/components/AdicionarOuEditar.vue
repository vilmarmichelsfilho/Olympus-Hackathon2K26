<script setup>
import { ref } from 'vue';
import { times } from '@/data/times';
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';
import { computed } from 'vue';
import { adicionar, editar } from '@/Utils/turmasUtils';
import { codTorneioSelecionadoAdm } from '@/Utils/cod_torneioAdmUtils';
const emit = defineEmits(['fechar','adicionar']);
const props = defineProps(['torneio','tipo']);
const codTorneio = ref(codTorneioSelecionadoAdm)
if (props.torneio != undefined){
  codTorneio.value = props.torneio
}
const timesTorneio = computed(() => {
    return times.filter(item => item.cod_torneio === codTorneio.value);
});

const tecnico = ref('Informática');
const ano = ref(1);
const serie = ref(1);
const time = ref();

function add() {
    if (props.tipo === 'adicionar') {
        adicionar(tecnico.value,ano.value,serie.value,time.value,codTorneio.value)
        emit('fechar')
    } else if (props.tipo === 'editar') {
        editar()
    }
}
</script>

<template>
    <div class="display">
        <div class="dialog">
            <h2>Adicionar/Editar Turma</h2>
            <form action="">
                <div class="input">
                    <h3>Técnico</h3>
                    <select name="tecnico" id="tecnico" placeholder="Técnico" v-model="tecnico">
                        <option value="Informática">INFO</option>
                        <option value="Agropecuária">AGRO</option>
                        <option value="Química">QUIMI</option>
                    </select>
                </div>
                <div class="sla">
                    <div class="input">
                        <h3>Ano</h3>
                        <select name="ano" id="ano" placeholder="Ano" v-model="ano">
                            <option value=1>1</option>
                            <option value=2>2</option>
                            <option value=3>3</option>
                        </select>
                    </div>
                    <div class="input">
                        <h3>Serie</h3>
                        <select name="serie" id="serie" placeholder="Serie" v-model="serie">
                            <option value=1>1</option>
                            <option value=2>2</option>
                            <option value=3>3</option>
                        </select>
                    </div>
                    <div class="input">
                        <h3>Time</h3>
                        <select name="serie" id="serie" placeholder="Serie" v-model="time">
                            <option :value="time.cod_time" v-for="time in timesTorneio" :key="time.cod_time">{{ time.nome_time }}</option>
                        </select>
                    </div>
                </div>
                <div class="pre">
                    <h4>Pré-Vizualização <span>Turma</span></h4>
                    <p>{{ ano }}{{ tecnico }}{{ serie }}</p>
                </div>
                <div class="botoes">
                    <button type="submit" class="salvar" v-on:click.prevent="add" :disabled="tecnico==''||serie==''||ano==''||time==''"><ContentSaveOutlineIcon width="1.5vw"></ContentSaveOutlineIcon>Salvar Alterações</button>
                    <button type="reset" class="limpar" v-on:click.prevent="emit('fechar')">Cancelar/Limpar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

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
