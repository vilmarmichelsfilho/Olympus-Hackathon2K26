<script setup>
import modalidadesCard from '@/Components/modalidadesCard.vue';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import ArrowRightIcon from '@iconify-vue/mdi/arrow-right';
import { modalidades } from '@/data/modalidades';
let modal = ref(0);
function abrirModal(){
 if(modal.value == 0){
  modal.value = 1;
 }
 else{
  modal.value = 0
 }
}
</script>
<template>
  <main>
    <section class="selecao-modalidades">
      <div class="container">
       <div class="conteiner"><img src="/images/coroa.png" alt="coroa"></div>
        <div class="log-in">
          <RouterLink to="/login" class="link">
            Log-in
            <ArrowRightIcon height="2.5em" class="flecha-icon"></ArrowRightIcon>
          </RouterLink>
        </div>
      </div>
      <h2>Olimpíadas ifc</h2>
      <p>Bem Vindos, ao Olympos um site criado para informar os alunos do IFC, sobre os jogos acontecendo no campus
      </p>
      <div class="modalidades">
        <ul class="modalidades-">
          <modalidadesCard v-for="modalidade in modalidades" :key="modalidade.id" :id="modalidade.id"
            :imagem="modalidade.image" :nome="modalidade.nome" @selecionar="abrirModal">
          </modalidadesCard>
        </ul>
      </div>
      <div class="modalidade-pop-up" v-if="modal">
      </div>
    </section>
  </main>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Krona+One&family=Poller+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Krona+One&family=Poller+One&display=swap');

main {
  background-color: black;
}

section.selecao-modalidades {
  position: relative;
  background-color: #FFf;
  border-radius: 20px;
  margin: 10vh 0;
}
section.selecao-modalidades div.container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
}
section.selecao-modalidades div.container > *{
  width: 50%;
  height: 20vw;
}
section.selecao-modalidades div.container div.conteiner{
  background-color: white;
  border-radius: 0 40vw 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
section.selecao-modalidades div.container img{
  width: 15vw;
  height: 12vw;
}
section.selecao-modalidades .container .log-in {
  width: 40vw;
  margin: 0 3vw 0 0;
  height: 15vw;
  background-color: #E85002;
  border-radius: 30px;
}
.link {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 1vw 3vw;
  padding: 0 0 0 2.5vw;
  text-decoration: none;
  color: white;
  font-size: 2rem;
}
section .flecha-icon {
  background-color: white;
  margin: 1vw 0;
  border-radius: 100vw;
  color: #E85002;
  padding: 0.5vw;
}

section.selecao-modalidades h2 {
  font-family: 'Anton SC', sans-serif;
  font-size: 5.5rem;
  color: black;
  margin: 0 5vw;
}

section.selecao-modalidades p {
  color: black;
  font-family: 'Krona One', sans-serif;
  font-size: 1.8rem;
  color: #00000040;
  margin: 1vw 5vw;
}

section.selecao-modalidades ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6vw;
  margin: 0 4vw 0 4vw;
  list-style: none;
}

@media (min-width: 1000px) {
  ul.modalidades- {
    display: none;
  }
}
</style>
