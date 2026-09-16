<script setup>
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';
import { ref, watch } from 'vue';
const emit = defineEmits(['fechar', 'adicionar','proximo'])
const props = defineProps(['dadosIniciais'])
const nome = ref('');
const dataInicio = ref('');
const dataFim = ref('');
const status = ref('Planejado')

watch(
    () => props.dadosIniciais,
    (dados) => {
        if (!dados) return
        nome.value = dados.nome
        dataInicio.value = dados.dataInicio
        dataFim.value = dados.dataFim
        status.value = dados.status
    },
    { immediate: true },
)

function salvar() {
    if (!nome.value.trim() || !dataInicio.value || !dataFim.value) return
    if (dataFim.value < dataInicio.value) {
        alert('A data final não pode ser anterior à data inicial.')
        return
    }

    emit('adicionar', {
        nome: nome.value.trim(),
        dataInicio: dataInicio.value,
        dataFim: dataFim.value,
        status: status.value,
    })
}
</script>

<template>
<form action="">
                <div class="input">
                    <h3>Nome do Torneio*</h3>
                    <input type="text" placeholder="Nome do Torneio" v-model="nome">
                </div>
                <div class="sla">
                    <div class="input">
                        <h3>Data Inicio*</h3>
                        <input type="date" v-model="dataInicio">
                    </div>
                    <div class="input">
                        <h3>Data Fim*</h3>
                        <input type="date" v-model="dataFim">
                    </div>
                </div>
                <div class="status">
                    <select v-model="status">
                        <option value="Planejado">Planejado</option>
                        <option value="Ativo">Ativo</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </div>
                <div class="botoes">
                    <div class="nav">
                        <button class="voltar"
                        type="none">Voltar</button>
                        <button
                        type="submit"
                        class="salvar"
                        v-on:click.prevent="salvar"
                        :disabled="nome === '' || dataInicio === '' || dataFim === ''"
                    >
                        <ContentSaveOutlineIcon width="1.5vw"></ContentSaveOutlineIcon>Salvar Alterações
                    </button>
                    </div>
                    <button type="reset" class="limpar" v-on:click.prevent="emit('fechar')">Cancelar</button>
                </div>
            </form>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

button {
    cursor: pointer;
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

input, select {
    background: #E2E2E2;
    border: solid #b9b9b9 0.1vw;
    padding: 0.6vw;
    font-size: 1rem;
    font-weight: bolder;
    border-radius: 0.3vw;
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

select {
    width: 100%;
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
    transition: 0.3s;
}

input:focus, select:focus {
    transition: 0.3s;
    outline: none;
    border: #DE6D1C solid 0.1vw;
    transform: scale(1.02);
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
