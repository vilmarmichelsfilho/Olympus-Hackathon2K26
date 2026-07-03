<script setup>
const props = defineProps(['nome','tipo']);
import UserIcon from '@iconify-vue/mdi/user';
import KeyIcon from '@iconify-vue/mdi/key';
</script>

<template>
    <p></p>
    <div class="botao">
        <KeyIcon v-show="props.nome=='Senha'" style="width: 8vw;"></KeyIcon>
        <UserIcon v-show="props.nome=='Login'" style="width: 8vw;"></UserIcon>
        <input :type="props.tipo" :placeholder="props.nome">
    </div>
</template>

<style scoped>
</style>