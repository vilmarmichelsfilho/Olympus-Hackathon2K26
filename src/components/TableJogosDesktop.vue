<script setup>
defineProps(['horario','data','modalidade','time1','time2','pontuacao1','pontuacao2','status','escudo1','escudo2'])
</script>

<template>
<li class="card-jogo">
  <div class="ao-vivo">
    <p>Ao Vivo</p>
  </div>

  <img :src="escudo1" alt="" class="thumb" />

  <div class="conteudo">
    <div class="linha-time">
      <p class="nome">{{ time1 }}</p>
      <p class="placar">{{ pontuacao1 }}</p>
    </div>
    <div class="linha-time">
      <p class="nome">{{ time2 }}</p>
      <p class="placar">{{ pontuacao2 }}</p>
    </div>

    <p class="modalidade">{{ modalidade }}</p>
    <p class="horario">{{ horario }}</p>
  </div>
</li>
</template>

<style scoped>
.card-jogo {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: transparent;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 14px;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;
  border: 1px solid rgb(255, 255, 255);
}

.thumb {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}

.conteudo {
  flex: 1;
  min-width: 0;
}

.linha-time {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 0.3rem;
}

.nome {
  margin: 0;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.placar {
  margin: 0;
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  flex-shrink: 0;
}

.modalidade,
.horario {
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.75rem;
  line-height: 1.4;
}

.ao-vivo {
  position: absolute;
  top: 0.9rem;
  right: 1rem;
}

.ao-vivo p {
  background-color: #e63946;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  margin: 0;
  white-space: nowrap;
}

@media (min-width: 1024px) {
  .card-jogo {
    max-width: 360px;
    padding: 1.2rem 1.5rem;
  }
}
</style>
