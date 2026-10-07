<script setup>
import { RouterLink } from 'vue-router'
import NoticiaImagem from '@/components/Noticias/NoticiaImagem.vue'
import { formatarDataNoticia } from '@/Utils/noticiasSchema.js'
import { nomeTorneioNoticia } from '@/Utils/noticiasUtils.js'
defineProps({ noticia: { type: Object, required: true } })
</script>

<template>
  <article class="noticias-card">
    <NoticiaImagem
      :imagem="noticia.imagem"
      :alt="noticia.imagemAlt"
      :ilustrativa="noticia.demonstrativa"
    />
    <div class="noticias-card-texto">
      <div class="noticias-metadados">
        <span class="noticias-torneio">{{ nomeTorneioNoticia(noticia.cod_torneio) }}</span>
        <time :datetime="noticia.data_publicacao">{{
          formatarDataNoticia(noticia.data_publicacao)
        }}</time>
      </div>
      <span v-if="noticia.demonstrativa" class="noticias-selo">Dados demonstrativos</span>
      <h2>
        <RouterLink :to="{ name: 'noticia-detalhe', params: { id: noticia.id } }">{{
          noticia.titulo
        }}</RouterLink>
      </h2>
      <p>{{ noticia.resumo }}</p>
      <RouterLink
        class="noticias-ler"
        :to="{ name: 'noticia-detalhe', params: { id: noticia.id } }"
        :aria-label="`Ler notícia: ${noticia.titulo}`"
      >
        Ler notícia <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </article>
</template>
