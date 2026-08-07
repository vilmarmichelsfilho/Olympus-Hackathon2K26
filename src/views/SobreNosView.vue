<script setup>
import {desenvolvedores, mostrar} from '@/Utils/sobrenosUtils.js'
import DesenvolvedoresCard from '@/Components/desenvolvedoresCard.vue'
</script>
<template>
  <main>
    <section class="sobrenos">
<img src="/images/coroa.png" alt="coroa">
    <div class="grupo1">
      <h2>SOBRE NÓS</h2>
  <p class="maisescuro">Agradecemos nosso professor Kennedy por nos mentorar nesse projeto ambicioso de criar um site capaz de suportar as informações das olimpíadas escolares IFC.</p>
    </div>
    <div class="grupo2">
      <ul>
<DesenvolvedoresCard v-for="desenvolvedor in desenvolvedores" :key="desenvolvedor.id" :nome="desenvolvedor.nome" :funcao="desenvolvedor.funcao" :imagem="desenvolvedor.foto" :id="desenvolvedor.id" :visivel="desenvolvedor.visivel" @mostrar="mostrar"/>
  </ul>
    </div>
 <div class="grupo3">
  <p>
    Queremos também agradecer a chapa Kairos por contribuir conosco para a realização desse projeto.
  </p>
 </div>
  </section>
  </main>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Krona+One&family=Poller+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Krona+One&family=Poller+One&display=swap');
main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  margin: 15vw 0;
}
section.sobrenos{
  position: relative;
  background-color: #FFf;
  border-radius: 20px;
}
img{
  position: absolute;
  left: 20%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20vw;
  padding: 0.6vw 6vw 0.6vw 6vw;
}
h2{
  font-family: 'Anton SC', sans-serif;
  font-size: 5.5rem;
  margin: 5vw 0 0 3vw;
  color: #000000;
}
p{
  font-family: 'Krona One', sans-serif;
  font-size: 1.8rem;
  color: #00000040;
  font-weight:bold;
  margin: 0 0 0 3vw;
}
ul{
 padding: 0;
 align-items: center;
 place-items: center;
}
@media (min-width: 1200px) {
  main{
    margin: 0;
    background-color: #641313;
    background-image: linear-gradient(to right,#641313, #151313);
  }
  section.sobrenos {
    margin: 5vw 0;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    justify-content: space-between;
    gap: 10vw;
    padding: 2vw 5vw;
    align-items: start;
    border-radius: 20px;
  }
  img {
    left: 90vw;
  }
  .grupo1 {
    grid-column: 1;
    grid-row: 1;
  }
  .grupo3 {
    grid-column: 1;
    grid-row: 1;
    margin-top: 20vw;
  }
  .grupo2 {
    grid-column: 2;
    grid-row: 1;
  }
  .grupo2 ul {
    width: 100%;
  }
  h2 {
    font-size: 5.5rem;
    margin: 0 0 15px 0;
  }
  p {
    font-size: 2rem;
    min-width: 550px;
    margin: 0;
  }
  p.maisescuro {
    color: #666060;
    font-size: 2.3rem;
  }
}
</style>
