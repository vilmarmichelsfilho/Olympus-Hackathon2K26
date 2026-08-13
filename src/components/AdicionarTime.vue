<script setup>
import { adicionarTimes } from '@/Utils/adicionarUtils';
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';
import { ref } from 'vue';
const emit = defineEmits(['fechar']);

const nome = ref('');
const cor = ref('');
let imagem = null;

function checarDados() {
    if (nome.value !== '') {
        if (cor.value !== '') {
            if (imagem !== null) {
                adicionarTimes(nome, cor, imagem);
                emit('fechar');
                nome.value = '';
                cor.value = '';
                imagem.value = null;
            } else {
                alert('Adicione um escudo/imagem ao time')
            }
        } else {
            alert('Preencha a cor do time')
        }
    } else {
        alert('Preencha o nome do time')
    }
}

function fechar() {
    emit('fechar');
    nome.value = '';
    cor.value = '';
    imagem.value = null;
}

function pegarImagem(event) {
    const arquivo = event.target.files[0]
    if (!arquivo) return
    const reader = new FileReader()
    reader.onload = () => {
        const imagemTexto = reader.result
        imagem = imagemTexto;
    }
    reader.readAsDataURL(arquivo)
}
</script>

<template>
    <div class="overlay">
        <div class="dialog">
            <div class="titulos">
                <h2>Adicionar Time</h2>
                <h4 style="color: grey; font-size: 1vw; font-weight: bolder;">Controle dos times</h4>
            </div>
            <div class="inputs">
                <div class="nome">
                    <h3>Nome do Time</h3>
                    <input type="text" placeholder="Digite" class="inputAnim" v-model="nome">
                </div>
                <div class="cor">
                    <h3>Cor do Time</h3>
                    <input type="text" placeholder="Digite" class="inputAnim" v-model="cor">
                </div>
            </div>
            <div class="imagem">
                <h3>Imagem de Escudo Time</h3>
                <input type="file" accept="image/png, image/jpeg, .jpg" @change="pegarImagem">
            </div>
            <div class="botoes">
                <button style="align-items: center; display: flex; justify-content: center;" class="save"
                    v-on:click.prevent="checarDados()">
                    <ContentSaveOutlineIcon width="1.5vw" />Salvar
                </button>
                <button class="cancel" v-on:click="fechar()">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.inputs {
    display: flex;
    gap: 3vw;
}

.botoes {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

button.cancel {
    background: none;
    border: none;
    font-weight: bolder;
}

button.cancel:hover {
    text-decoration: underline;
}

button.save {
    background: #6EAC31;
    border: none;
    color: white;
    font-weight: bolder;
    font-size: 1.1vw;
    padding: 0.1vw 2vw;
    border-radius: 0.2vw;
    transition: 0.3s;
    margin-bottom: 0.5vw;
}

button.save:hover {
    transform: scale(1.05);
    background: #507c23;
}

h2 {
    font-size: 2vw;
    font-weight: bolder;
}

h3 {
    font-weight: bolder;
    margin-bottom: 0.2vw;
}

input {
    color: black;
    background: #E2E2E2;
    border: solid #bdbdbd 0.1vw;
    border-radius: 0.2vw;
    transition: 0.3s;
}

input.inputAnim:focus {
    outline: none;
    transform: scale(1.05);
    color: #DE6D1C;
    font-weight: bolder;
    border: solid #DE6D1C 0.1vw;
}

.dialog {
    display: flex;
    flex-direction: column;
    gap: 1.5vw;
    color: black;
    background: white;
    border: solid rgb(185, 184, 184) 0.15vw;
    padding: 4vw 3vw;
    border-radius: 1vw;
}

.overlay {
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