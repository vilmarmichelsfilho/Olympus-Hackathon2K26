<script setup>
import {desenvolvedores, mostrar} from '@/Utils/sobrenosUtils.js'
import DesenvolvedoresCard from '@/Components/desenvolvedoresCard.vue'
</script>
<template>
  <main>
    <section class="sobrenos">
<img src="/images/coroa.png" alt="coroa">
     <h2>SOBRE NÓS</h2>
  <p>Agradecemos nosso professor Kennedy por nos mentorar nesse projeto ambicioso de criar um site capaz de suportar as informações das olimpíadas escolares IFC.</p>
  <ul>
<DesenvolvedoresCard v-for="desenvolvedor in desenvolvedores" :key="desenvolvedor.id" :nome="desenvolvedor.nome" :funcao="desenvolvedor.funcao" :imagem="desenvolvedor.foto" :id="desenvolvedor.id" :visivel="desenvolvedor.visivel" @mostrar="mostrar"/>
  </ul>
  <p>
    Queremos também agradecer a chapa Kairos por contribuir conosco para a realização desse projeto.
  </p>
  </section>
  </main>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Krona+One&family=Poller+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Krona+One&family=Poller+One&display=swap');
main{
  display: flex;
  justify-content: center;
}
img{
  margin: 0 0 0 6vw;
}
h2{
  font-family: 'Anton SC', sans-serif;
  font-size: 5.5rem;
  margin: 5vw 0 0 3vw;
}
p{
  font-family: 'Krona One', sans-serif;
  font-size: 1.8rem;
  color: #00000040;
  font-weight:bold;
  margin: 0 auto 0 3vw;
}
ul{
 padding: 0;
 align-items: center;
}
</style>
