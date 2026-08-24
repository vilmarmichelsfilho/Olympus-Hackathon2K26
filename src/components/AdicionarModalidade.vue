<script setup>
import { ref } from 'vue';
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';
import { adicionarModalidade } from '@/Utils/adicionarUtils';
const emit = defineEmits(['fecharAdicionarModalidade']);
const nome = ref('');
const desc = ref('');
const tempo = ref('');
let imagem = null;

function checarDados() {
    if (nome.value !== '') {
        if (desc.value !== '') {
            if (imagem !== null) {
                adicionarModalidade(nome.value, desc.value, imagem, tempo.value);
                emit('fecharAdicionarModalidade');
                nome.value = '';
                desc.value = '';
                imagem = null;
                tempo.value = '';
            } else {
                alert('Adicione uma imagem à modalidade')
            }
        } else {
            alert('Preencha a descrição da modalidade')
        }
    } else {
        alert('Preencha o nome da modalidade')
    }
}

function fechar() {
    emit('fecharAdicionarModalidade');
    nome.value = '';
    desc.value = '';
    imagem = null;
    tempo.value = '';
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
                <h2>Adicionar Modalidade</h2>
                <h4 style="color: grey; font-size: 1vw; font-weight: bolder;">Controle das modalidades</h4>
            </div>
            <div class="inputs">
                <div class="nome">
                    <h3>Nome da Modalidade</h3>
                    <input type="text" placeholder="Digite" class="inputAnim" v-model="nome">
                </div>
                <div class="desc">
                    <h3>Descrição da Modalidade</h3>
                    <input type="text" placeholder="Digite" class="inputAnim" v-model="desc">
                </div>
            </div>
            <div class="partedebaixo">
                <div class="tempo">
                    <h3>Tempo da Modalidade</h3>
                    <input type="text" placeholder="Digite" class="inputAnim" v-model="tempo">
                </div>
                <div class="imagem">
                    <h3>Imagem da Modalidade</h3>
                    <input type="file" accept="image/png, image/jpeg, .jpg" @change="pegarImagem">
                </div>
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
.partedebaixo {
    display: flex;
    gap: 3vw;
    margin-top: 1vw;
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
