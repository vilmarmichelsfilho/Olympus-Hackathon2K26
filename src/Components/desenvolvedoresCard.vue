<script setup>
 const props = defineProps(['nome', 'funcao', 'imagem', 'id', 'visivel'])
 defineEmits(['mostrar'])
 import ArrowDownIcon from '@iconify-vue/mdi/arrow-down';
import ArrowUpIcon from '@iconify-vue/mdi/arrow-up';
</script>
<template>
  <li>
    <div class="container">
        <div class="container-esquerda"> <h3>{{props.nome}}</h3>
    <h4>{{ props.funcao }}</h4>
    </div>
    <button @click.prevent="$emit('mostrar', props.id)"> <ArrowDownIcon height="3.5em" color="white" v-if="props.visivel == false"></ArrowDownIcon> <ArrowUpIcon height="3.5em" color="white" v-else> </ArrowUpIcon></button>
</div>
    <img src="/public/images/coroa.png" alt="Imagem do desenvolvedor" v-if="props.visivel == true">
</li>
</template>
<style scoped>
li{
  background-color: #FF9408;
  margin: 5vw 0;
  border-radius: 50px;
  align-items: center;
  padding: 2.5vw;
  box-shadow: 4px 8px 12px 0 rgba(0, 0, 0, 0.15);
  width: 95vw;
  list-style: none;
}
li div.container{
  display: flex;
  justify-content: space-between;
}
button{
  background-color: transparent;
  border: none;
  padding: none;
  cursor: pointer;
}
  li h3{
    font-family: 'Poller One', sans-serif;
    color: white
  }
  li h4{
    font-family: 'Krona One', sans-serif;
    color: #00000041;
  }
  li img{
  display: block;
  margin: 2vw auto 0 auto;
  width: 20vw;
  border-radius: 10px;
}
@media (min-width: 1200px) {
  li {
    max-width: 40vw;
    margin: 2vw 0;
    padding: 1vw 2vw;
    border-radius: 40px;
  }
  li h3 {
    font-size: 2rem;
  }
  li h4 {
    font-size: 1.7rem;
  }
  li img {
    width: 100%;
    max-width: 10vw;
    margin: 20px auto 0 auto;
  }
}
</style>

