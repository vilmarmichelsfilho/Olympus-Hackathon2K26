<script setup>
const emit = defineEmits(['cancelar','excluir']);

</script>

<template>
    <div class="container">
        <div class="display">
            <h2>Tem certeza que deseja excluir?</h2>
            <div>
                <button class="e" v-on:click.prevent="emit('excluir')">Excluir</button>
                <button class="c" v-on:click.prevent="emit('cancelar')">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.e {
    color: #FF6961;
    border: solid 0.1vw #FF6961;
}
.c {
    color: #aeaeae;
    border: solid 0.1vw #aeaeae;
}
.display div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vw;
}

.display button {
    padding: 0.3vw 1vw;
    border-radius: 0.7vw;
    background: white;
    transition: 0.3s;
}

.display button:hover {
    transform: scale(1.1);
}

.display {
    display: flex;
    flex-direction: column;
    gap: 1.5vw;
    color: black;
    background: white;
    border: solid rgb(185, 184, 184) 0.15vw;
    padding: 4vw 3vw;
    border-radius: 1vw;
}

.container {
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