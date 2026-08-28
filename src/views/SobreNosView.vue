<script setup>
import { desenvolvedores, mostrar } from '@/Utils/sobrenosUtils.js'
import desenvolvedoresCard from '@/components/desenvolvedoresCard.vue';
</script>
<template>
  <main>
    <section class="sobrenos" id="sobrenos">
      <div>
        <img src="/images/coroa.png" alt="coroa" />
        <h2>SOBRE NÓS</h2>
        <div>
          <p class="maisescuro">
            Agradecemos nosso professor Kennedy por nos mentorar nesse projeto ambicioso de criar um
            site capaz de suportar as informações das olimpíadas escolares IFC.
          </p>
          <p>
            Queremos também agradecer a chapa Kairos por contribuir conosco para a realização desse
            projeto.
          </p>
        </div>
      </div>
      <div>
        <ul>
          <desenvolvedoresCard
            v-for="desenvolvedor in desenvolvedores"
            :key="desenvolvedor.id"
            :nome="desenvolvedor.nome"
            :funcao="desenvolvedor.funcao"
            :imagem="desenvolvedor.foto"
            :id="desenvolvedor.id"
            :visivel="desenvolvedor.visivel"
            @mostrar="mostrar"
          />
        </ul>
      </div>
    </section>
  </main>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Krona+One&family=Poller+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Krona+One&family=Poller+One&display=swap');
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 15vw 0;
  
}
section.sobrenos {
  position: relative;
  background-color: #fff;
  border-radius: 20px;
  margin: 8vw 0;
}
img {
  position: absolute;
  left: 20%;
  top: -0.3vw;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20vw;
  padding: 0.6vw 6vw 0.6vw 6vw;
}
h2 {
  font-family: 'Anton SC', sans-serif;
  font-size: 5rem;
  margin: 5vw 0 0 3vw;
  color: #000000;
}
p {
  font-family: 'Krona One', sans-serif;
  font-size: 4vw;
  color: #00000040;
  font-weight: bold;
  margin: 5vw 0 5vw 3vw;
}
p.maisescuro {
  color: #666060;
}
ul {
  margin: 1vw 2vw;
}
@media (min-width: 1200px) {
  section.sobrenos {
    margin: 5vw 0;
    display: flex;
    justify-content: space-between;
    gap: 10vw;
    padding: 2vw 5vw;
    align-items: start;
    border-radius: 20px;
  }
  img {
    left: 90vw;
    top: -0.3vw;
  }
  ul {
    width: 100%;
  }
  h2 {
    font-size: 5.5rem;
    margin: 0 0 15px 0;
  }
  p {
    font-size: 1.5vw;
    min-width: 550px;
    margin: 2vw 0;
  }
}
</style>
