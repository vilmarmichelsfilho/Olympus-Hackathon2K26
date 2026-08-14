<script setup>
import { RouterLink } from 'vue-router'
import ArrowTopRightIcon from '@iconify-vue/mdi/arrow-top-right';
import { timesDoMaiorAoMenor } from '@/Utils/timesUtils';
import timeCard from '@/Components/timeCard.vue';
import { jogos } from '@/data/jogos';
import { ref, computed } from 'vue';
import modalidadesCard from '@/Components/modalidadesCard.vue';
import ArrowRightIcon from '@iconify-vue/mdi/arrow-right';
import { modalidades } from '@/data/modalidades';
const quantidadedejogos = ref(jogos.length)
const totalJogosConcluidos = computed(() => {
  return jogos.filter(jogo => jogo.status === 'concluido').length
})
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
          <modalidadesCard v-for="modalidade in modalidades" :key="modalidade.id" :imagem="modalidade.image"
            :nome="modalidade.nome" :desc="modalidade.desc">
          </modalidadesCard>
        </ul>
      </div>
    </section>
  <section class="rankingtimes">
    <div class="conteiner">
      <div class="conteiner-esquerdo">
       <h3>Ranking Dos <span>Times</span></h3>
       <div class="contentlink"><RouterLink to="/times" class="link-times">Times <ArrowTopRightIcon height="2em"></ArrowTopRightIcon>
        </RouterLink></div>
      </div>
      <div class="jogosrestantes">
        <p class="numero"><span>{{ totalJogosConcluidos }}</span>/{{ quantidadedejogos }}</p>
        <p>Jogos Restantes</p>
      </div>
    </div>
    <div class="tabela-container">
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Time</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          <timeCard v-for="time in timesDoMaiorAoMenor" :key="time.id" :id="time.id" :pontuacao="time.pontuacao_geral"
            :cor="time.cor">
          </timeCard>
        </tbody>
      </table>
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
  padding: 0 0 10vw 0;
  background-color: #FFf;
  border-radius: 20px;
  margin: 10vh 0;
}

section.selecao-modalidades div.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
}

section.selecao-modalidades div.container>* {
  width: 50%;
  height: 20vw;
}

section.selecao-modalidades div.container div.conteiner {
  background-color: white;
  border-radius: 0 40vw 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

section.selecao-modalidades div.container img {
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
  font-size: 5vw;
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
  font-size: 12vw;
  color: black;
  margin: 0 5vw;
}

section.selecao-modalidades p {
  color: black;
  font-family: 'Krona One', sans-serif;
  font-size: 6vw;
  color: #00000040;
  margin: 1vw 5vw;
}

section.selecao-modalidades ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6vw;
  list-style: none;
  margin: 2vw 4vw;
}
section.rankingtimes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50vh 0 0 0;
}
section.rankingtimes h3 {
  display: none;
}
section.rankingtimes div.jogosrestantes {
  display: none;
}
div.tabela-container {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  height: auto;
  border-radius: 2vw;
  padding: 8vw 5vw 15vw 5vw;
}
table {
  border-collapse: collapse;
}

thead {
  border-bottom: 1.5px solid #E85002;
}

th {
  color: black;
  font-size: 5vw;
  text-align: center;
  font-family: "Krona One", sans-serif;
  padding: 2vw 0;
}

tbody {
  padding: 0 0 10vh 0;
}

.link-times {
  display: flex;
  align-items: center;
  gap: 3vw;
  text-decoration: none;
  font-size: 5vw;
  margin: 0 55vw 4vw 0;
  color: white;
  border: 1px solid white;
  border-radius: 6vw;
  padding: 0.5vw 4vw;
}

@media (min-width: 1200px) {
  section.rankingtimes div.conteiner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
section.rankingtimes div.conteiner-esquerdo{
  display: flex;
  gap: 2vw;
}
  section.rankingtimes h3 {
    display: block;
    font-size: 6vw;
    margin: 0 0 0 4vw;
    font-weight: 600;
  }
  section.rankingtimes h3 span{
    color: #E85002;
  }
  section.rankingtimes div.jogosrestantes {
    display: block;
    margin: 1vw 5vw 0 0;
  }
  div.jogosrestantes p{
    color: #948989;
    font-size: 1.5vw;
  }
  div.jogosrestantes p.numero{
    font-size: 3vw;
    line-height: 1;
    color: white;
  }
  div.jogosrestantes p span{
    color: #E85002;
  }
  div.tabela-container {
    width: 100vw;
    height: auto;
    border-radius: 0;
    padding: 0;
  }
 div.contentlink{
  align-items: center;
  display: flex;
 }
  thead {
    border: none;
  }
  table {
    width: 100%;
  }

  th {
    font-size: 2.5vw;
    padding: 1vw;
  }

  .link-times {
    font-size: 1.5vw;
    margin: 0;
    padding: 0 2vw;
    margin: 1.5vw 0 0 0;
    gap: 1vw;
  }
}
</style>
