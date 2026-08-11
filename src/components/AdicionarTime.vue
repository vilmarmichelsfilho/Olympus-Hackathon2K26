<script setup>
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';
const emit = defineEmits(['fechar']);
</script>

<template>
    <div class="overlay">
        <div class="dialog">
            <h2>Adicionar Time</h2>
            <div class="nome">
                <h3>Nome do Time</h3>
                <input type="text" placeholder="Digite">
            </div>
            <div class="cor">
                <h3>Cor do Time</h3>
                <input type="text" placeholder="Digite">
            </div>
            <div class="imagem">
                <h3>Imagem de Escudo Time</h3>
                <input type="file" accept="/image" >
            </div>
            <div class="botoes">
                <button style="align-items: center; display: flex; justify-content: center;" class="save"><ContentSaveOutlineIcon width="1.5vw"/>Salvar</button>
                <button class="cancel" v-on:click="emit('fechar')">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    transform: scale(1.1);
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
    color: grey;
    background: #E2E2E2;
    border: solid #bdbdbd 0.1vw;
    border-radius: 0.2vw;
    transition: 0.3s;
}
input:focus {
    outline: none;
    transform: scale(1.1);
    color: black;
}
.dialog {
    display: flex;
    flex-direction: column;
    gap: 0.8vw;
    color: black;
    background: #FFFFFF;
    padding: 4vw 3vw;
    border-radius: 1vw;
}
.overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
</style>