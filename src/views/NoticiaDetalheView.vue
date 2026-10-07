<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import NoticiaImagem from '@/components/Noticias/NoticiaImagem.vue'
import { noticiasStore, nomeTorneioNoticia } from '@/Utils/noticiasUtils.js'
import { formatarDataNoticia } from '@/Utils/noticiasSchema.js'
import '@/assets/noticias.css'
const route = useRoute()
const noticia = computed(() => noticiasStore.obterPorId(route.params.id))
const paragrafos = computed(
  () => noticia.value?.conteudo.split(/\n\s*\n/).filter((texto) => texto.trim()) ?? [],
)
</script>

<template>
  <main class="noticias-modulo noticias-publico noticias-detalhe">
    <RouterLink class="noticias-voltar" to="/noticias">← Voltar para notícias</RouterLink>
    <article v-if="noticia" class="noticias-artigo">
      <header class="noticias-artigo-header">
        <p class="noticias-eyebrow">{{ nomeTorneioNoticia(noticia.cod_torneio) }}</p>
        <span v-if="noticia.demonstrativa" class="noticias-selo"
          >Dados demonstrativos · notícia fictícia</span
        >
        <h1>{{ noticia.titulo }}</h1>
        <p class="noticias-resumo">{{ noticia.resumo }}</p>
        <div class="noticias-metadados">
          <span>Por {{ noticia.autor }}</span>
          <time :datetime="noticia.data_publicacao">{{
            formatarDataNoticia(noticia.data_publicacao)
          }}</time>
        </div>
      </header>
      <NoticiaImagem
        :imagem="noticia.imagem"
        :alt="noticia.imagemAlt"
        :ilustrativa="noticia.demonstrativa"
        destaque
      />
      <div class="noticias-conteudo">
        <p v-for="(paragrafo, indice) in paragrafos" :key="indice">{{ paragrafo }}</p>
      </div>
    </article>
    <div v-else class="noticias-vazio">
      <h1>Notícia não encontrada</h1>
      <p>Esta publicação não está disponível. Consulte as outras notícias das Olimpíadas.</p>
    </div>
  </main>
</template>
