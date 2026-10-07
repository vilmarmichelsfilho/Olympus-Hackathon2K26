<script setup>
import { computed, ref } from 'vue'
import NoticiaCard from '@/components/NoticiaCard.vue'
import { noticiasStore } from '@/Utils/noticiasUtils.js'
import { torneios } from '@/data/torneios.js'
import '@/assets/noticias.css'
const filtro = ref('')
const { ordenadas } = noticiasStore
const filtradas = computed(() =>
  ordenadas.value.filter(
    (noticia) => filtro.value === '' || noticia.cod_torneio === Number(filtro.value),
  ),
)
</script>

<template>
  <main class="noticias-modulo noticias-publico">
    <div class="noticias-intro">
      <div>
        <p class="noticias-eyebrow">Por dentro das Olimpíadas</p>
        <h1>Notícias das <span>Olimpíadas</span></h1>
        <p>Acompanhe os destaques e as novidades de cada torneio.</p>
      </div>
      <div class="noticias-filtro">
        <label for="noticias-torneio-filtro">Torneio</label>
        <select id="noticias-torneio-filtro" v-model="filtro">
          <option value="">Todos os torneios</option>
          <option
            v-for="torneio in torneios"
            :key="torneio.cod_torneio"
            :value="torneio.cod_torneio"
          >
            {{ torneio.nome_torneio }}
          </option>
        </select>
      </div>
    </div>
    <p class="noticias-contagem" aria-live="polite">
      {{ filtradas.length }} {{ filtradas.length === 1 ? 'notícia' : 'notícias' }}
    </p>
    <div v-if="filtradas.length" class="noticias-grid">
      <NoticiaCard v-for="noticia in filtradas" :key="noticia.id" :noticia="noticia" />
    </div>
    <div v-else class="noticias-vazio">
      <h2>Nenhuma notícia por enquanto</h2>
      <p>
        {{
          filtro
            ? 'Este torneio ainda não tem publicações. Você pode consultar os outros torneios.'
            : 'As novas publicações aparecerão aqui.'
        }}
      </p>
      <button
        v-if="filtro"
        class="noticias-btn noticias-btn-secundario"
        type="button"
        @click="filtro = ''"
      >
        Ver todos os torneios
      </button>
    </div>
  </main>
</template>
