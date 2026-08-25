<script setup>
import { RouterLink } from 'vue-router'
import ArrowTopRightIcon from '@iconify-vue/mdi/arrow-top-right';
import CloseIcon from '@iconify-vue/mdi/close';
import { timesDoMaiorAoMenor } from '@/Utils/timesUtils';
import timeCard from '@/components/timeCard.vue';
import { jogos } from '@/data/jogos';
import { ref, computed } from 'vue';
import modalidadesCard from '@/components/modalidadesCard.vue';
import ArrowRightIcon from '@iconify-vue/mdi/arrow-right';
import { modalidades } from '@/data/modalidades';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/carousel.css';
import TableJogosDesktop from '@/components/TableJogosDesktop.vue';

const modalAberto = ref(0);
const modalidadeSelecionadaId = ref(null);
const modalidadeSelecionada = computed(() => {
  const resultado = modalidades.find((m) => m.id === modalidadeSelecionadaId.value)
  if (resultado) {
    return resultado
  } else {
    return null
  }
})

const imagem = computed(() => {
  if (modalidadeSelecionada.value) {
    return modalidadeSelecionada.value.image
  } else {
    return ''
  }
})

const nome = computed(() => {
  if (modalidadeSelecionada.value) {
    return modalidadeSelecionada.value.nome
  } else {
    return ''
  }
})

const desc = computed(() => {
  if (modalidadeSelecionada.value) {
    return modalidadeSelecionada.value.desc
  } else {
    return ''
  }
})

function mostrarModal(id) {
  modalidadeSelecionadaId.value = id
  modalAberto.value = 1
}

function fecharModal() {
  modalAberto.value = 0
  modalidadeSelecionadaId.value = null
}
const quantidadedejogos = computed(() => {
  return jogos.length
})
const totalJogosConcluidos = computed(() => {
  return jogos.filter((jogo) => jogo.status === 'concluido').length
})
const currentSlide = ref(0)
function aoMudarSlide(data) {
  const total = modalidades.length
  if (!total) return
  let rawIndex = data.currentSlideIndex
  if (data.slidingToIndex !== undefined) {
    rawIndex = data.slidingToIndex
  }
  const indexReal = ((rawIndex % total) + total) % total
  currentSlide.value = indexReal
}
const progressoPorcentagem = computed(() => {
  const total = modalidades.length
  if (!total) return 0
  return ((currentSlide.value + 1) / total) * 100
})
const jogosVerificados = computed(() => jogos.filter((jogo) => jogo.status === 'AoVivo'))
</script>
<template>
  <main>
    <div class="texto-acontece">
      <h3>Acontecendo Agora</h3>
      <p>Jogos por todo o Campus do IFC Araquari</p>
    </div>

    <div class="acontecendo">
      <TableJogosDesktop
        v-for="jogo in jogosVerificados"
        :key="jogo.id"
        :data="jogo.data"
        :horario="jogo.horario"
        :modalidade="jogo.modalidade"
        :time1="jogo.time1"
        :time2="jogo.time2"
        :pontuacao1="jogo.pontuacao1"
        :pontuacao2="jogo.pontuacao2"
        :status="jogo.status"
        :escudo1="jogo.escudo1"
        :escudo2="jogo.escudo2"
      >
      </TableJogosDesktop>
    </div>
    <section class="selecao-modalidades">
      <div class="container">
        <div class="conteiner-modalidades"><img src="/images/coroa.png" alt="coroa" /></div>
        <div class="log-in-mobile">
          <RouterLink to="/login" class="link">
            Log-in
            <ArrowRightIcon height="2.5em" class="flecha-icon"></ArrowRightIcon>
          </RouterLink>
        </div>
      </div>

      <h2>Olimpíadas ifc</h2>
      <p>
        Bem Vindos, ao Olympos um site criado para informar os alunos do IFC, sobre os jogos
        acontecendo no campus
      </p>
      <div class="log-in-desktop">
        <RouterLink to="/login" class="link-desktop">
          <h3>Log-in</h3>
          <ArrowRightIcon height="2.5em" class="flecha-icon"></ArrowRightIcon>
        </RouterLink>
      </div>
      <div class="modalidades-mobile">
        <ul class="modalidades-">
          <modalidadesCard
            v-for="modalidade in modalidades"
            :key="modalidade.id"
            :imagem="modalidade.image"
            :nome="modalidade.nome"
            :id="modalidade.id"
            @mostrar="mostrarModal"
          >
          </modalidadesCard>
        </ul>
      </div>
      <div class="carrossel-modalidades">
        <Carousel
          :items-to-show="3"
          :wrap-around="true"
          :snap-align="'center'"
          @slide-start="aoMudarSlide"
          v-model="currentSlide"
        >
          <Slide v-for="modalidade in modalidades" :key="modalidade.id">
            <modalidadesCard
              :nome="modalidade.nome"
              :imagem="modalidade.image"
              :id="modalidade.id"
              @mostrar="mostrarModal"
            />
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
        <div class="barra-progresso-container">
          <div
            class="barra-progresso-preenchimento"
            :style="{ width: progressoPorcentagem + '%' }"
          ></div>
        </div>
      </div>
      <Transition name="modal">
        <div v-if="modalAberto" class="pop-up-overlay">
          <div class="popup-box" :style="{ backgroundImage: `url(${imagem})` }">
            <CloseIcon height="3em" class="botao-fechar" @click.prevent="fecharModal"></CloseIcon>
            <h3 class="pop-up-titulo">{{ nome }}</h3>
            <p class="descricao">{{ desc }}</p>
            <RouterLink :to="`/chaveamento/${modalidadeSelecionadaId}`" class="btn-entrar"
              >Entrar</RouterLink
            >
          </div>
        </div>
      </Transition>
    </section>
    <section class="rankingtimes">
      <div class="conteiner">
        <div class="conteiner-esquerdo">
          <h3>Ranking Dos <span>Times</span></h3>
          <div class="contentlink">
            <RouterLink to="/times" class="link-times"
              >Times <ArrowTopRightIcon height="2em"></ArrowTopRightIcon>
            </RouterLink>
          </div>
        </div>
        <div class="jogosrestantes">
          <p class="numero">
            <span>{{ totalJogosConcluidos }}</span
            >/{{ quantidadedejogos }}
          </p>
          <p>Jogos Concluídos</p>
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
            <timeCard
              v-for="time in timesDoMaiorAoMenor"
              :key="time.id"
              :id="time.id"
              :pontuacao="time.pontuacao_geral"
              :cor="time.cor"
            >
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
  padding: 0 0 20vw 0;
}

section.selecao-modalidades {
  padding: 0 0 10vw 0;
  background-color: #fff;
  border-radius: 20px;
  margin: 10vh 0;
}

div.carrossel-modalidades {
  display: none;
}
.acontecendo {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin: 0vw 20vw;
}
.texto-acontece{
  text-align: center;
  margin: 0vw 0vw 3vw;
}
.texto-acontece h3{
  font-size: 3vw;
}
.texto-acontece p{
  font-size: 1.5vw;
}
section.selecao-modalidades div.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
}

section.selecao-modalidades div.container > * {
  width: 50%;
  height: 20vw;
}

section.selecao-modalidades div.container div.conteiner-modalidades {
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

section.selecao-modalidades .container .log-in-desktop {
  display: none;
}

section.selecao-modalidades .container .log-in-mobile {
  width: 40vw;
  margin: 0 3vw 0 0;
  height: 15vw;
  background-color: #e85002;
  border-radius: 30px;
}

.link-desktop {
  display: none;
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
  color: #e85002;
  padding: 0.5vw;
}

section.selecao-modalidades h2 {
  font-family: 'Anton SC', sans-serif;
  font-size: 12vw;
  color: black;
  margin: 0 5vw;
  margin-top: 15vw;
}

section.selecao-modalidades p {
  font-family: 'Krona One', sans-serif;
  font-size: 6vw;
  color: #00000040;
  margin: 1vw 5vw;
}
section.selecao-modalidades h3{
  font-family: 'Krona One', sans-serif;
  font-size: 1.5vw;
}

div.modalidades-mobile {
  margin-top: 25vw;
}

section.selecao-modalidades ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6vw;
  list-style: none;
  margin: 2vw 4vw;
}

.pop-up-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.28s ease;
}

.modal-enter-active .popup-box,
.modal-leave-active .popup-box {
  transition:
    opacity 0.4s ease,
    transform 0.35s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .popup-box,
.modal-leave-to .popup-box {
  opacity: 0;
  transform: translateY(2rem) scale(0.94);
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .popup-box,
  .modal-leave-active .popup-box {
    transition-duration: 0.01ms;
  }
}

.popup-box {
  position: relative;
  width: 90%;
  height: 70%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5vw;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  overflow: hidden;
}

.popup-box::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 45%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.35) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1;
}

div.popup-box h3,
div.popup-box p,
.popup-box .btn-entrar {
  position: relative;
  z-index: 2;
}

div.popup-box h3 {
  font-size: 10vw;
  margin: 0 5vw 1vw;
  color: rgb(250, 245, 245);
  font-weight: bold;
}

div.popup-box p {
  font-size: 4vw;
  line-height: 1.4;
  margin: 0 5vw 5vw;
  color: white;
  padding-bottom: 4vw;
}

.botao-fechar {
  position: absolute;
  top: 2vw;
  right: 2vw;
  cursor: pointer;
  color: white;
}

.btn-entrar {
  font-family: 'Krona One', sans-serif;
  position: absolute;
  bottom: 3vw;
  right: 2vw;
  background-color: #e85002;
  color: white;
  padding: 2vw 12vw;
  border-radius: 8vw;
  text-decoration: none;
  font-size: 5vw;
  margin-left: 43vw;
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
  border-bottom: 1.5px solid #e85002;
}

th {
  color: black;
  font-size: 5vw;
  text-align: center;
  font-family: 'Krona One', sans-serif;
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
@media(max-width: 1020px) {
  .texto-acontece{
    display: none;
  }
  .acontecendo{
    display: none;
  }
}
@media (min-width: 1000px) {
  main {
    background-image: linear-gradient(to left, #151313 0%, #3d0f0f 100%);
    padding: 2vw 0;
  }

  section.selecao-modalidades {
    position: relative;
    margin: 3vw 5vw;
    padding: 5vw;
    border-radius: 1vw;
    background-color: #ffffff;
  }

  section.selecao-modalidades div.container {
    background-color: transparent;
    display: block;
    position: static;
  }

  section.selecao-modalidades div.container > * {
    width: auto;
    height: auto;
  }

  section.selecao-modalidades div.container div.conteiner-modalidades {
    position: absolute;
    top: -2vw;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    border-radius: 3vw;
    padding: 1vw 5vw;
    width: auto;
    height: auto;
    z-index: 10;
  }

  section.selecao-modalidades div.conteiner-modalidades img {
    width: 4vw;
    height: auto;
    background-color: transparent;
    border-radius: 0;
    padding: 0;
  }

  section.selecao-modalidades h2 {
    font-size: 4vw;
    margin: 3vw 2vw 2vw 0;
    color: #000000;
  }

  section.selecao-modalidades p {
    font-size: 1.5vw;
    margin: 0;
    max-width: 50vw;
    color: #888888;
  }

  section.selecao-modalidades .container .log-in-mobile {
    display: none;
  }

  .link-desktop {
    border-radius: 2vw;
    background-color: #e85002;
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 1vw;
    max-width: fit-content;
    margin: 2vw 0;
    padding: 0 2vw;
    text-decoration: none;
    color: white;
    font-size: 1.5vw;
  }

  section .flecha-icon {
    border-radius: 100vw;
    background-color: white;
    padding: 0.5vw;
    font-size: 1vw;
  }

  div.modalidades-mobile {
    display: none;
  }

  div.carrossel-modalidades {
    display: block;
    width: 100%;
    margin-top: 20px;
  }

  :deep(.carousel__slide) {
    transform: scale(0.8);
    transition:
      transform 0.4s ease,
      opacity 0.4s ease;
  }

  :deep(.carousel__slide--active) {
    transform: scale(1.05);
    z-index: 2;
  }

  .barra-progresso-container {
    width: 60%;
    height: 0.6vw;
    background-color: rgb(172, 170, 170);
    border-radius: 2vw;
    margin: 2vw auto 0 auto;
    overflow: hidden;
  }

  .barra-progresso-preenchimento {
    height: 100%;
    background-color: #e85002;
    border-radius: 2vw;
    transition: width 0.3s ease;
  }

  .carousel__slide {
    padding: 2vw;
    display: flex;
    justify-content: center;
  }

  :deep(.carousel__prev),
  :deep(.carousel__next) {
    color: #e85002;
    width: 5vw;
    height: 5vw;
  }

  :deep(.carousel__icon) {
    width: 4vw;
    height: 4vw;
  }

  .popup-box {
    width: 60vw;
    height: 40vw;
    border-radius: 2vw;
  }

  div.popup-box .btn-entrar {
    padding: 1vw 4vw;
    font-size: 2.5vw;
  }

  div.popup-box .botao-fechar {
    top: 1vw;
    right: 1vw;
  }

  div.popup-box h3 {
    font-size: 4vw;
    margin: 1vw 2vw;
  }

  div.popup-box p {
    font-size: 1.5vw;
    margin: 1vw 2vw;
    color: white;
  }

  section.rankingtimes {
    margin: 7vw 0 10vw 0;
  }

  section.rankingtimes div.conteiner-esquerdo {
    display: flex;
    gap: 2vw;
  }

  section.rankingtimes h3 {
    display: block;
    font-size: 6vw;
    margin: 0 0 0 4vw;
    font-weight: 600;
  }

  section.rankingtimes h3 span {
    color: #e85002;
  }

  div.conteiner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  section.rankingtimes div.jogosrestantes {
    display: block;
    margin: 1vw 5vw 0 0;
  }

  div.jogosrestantes p {
    color: #948989;
    font-size: 1.5vw;
  }

  div.jogosrestantes p.numero {
    font-size: 3vw;
    line-height: 1;
    color: white;
  }

  div.jogosrestantes p span {
    color: #e85002;
  }

  div.tabela-container {
    width: 100vw;
    height: auto;
    border-radius: 0;
    padding: 0;
  }

  div.contentlink {
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
