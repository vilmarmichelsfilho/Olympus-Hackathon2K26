<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NoticiaFormulario from '@/components/Noticias/NoticiaFormulario.vue'
import { torneios } from '@/data/torneios.js'
import { obterSessao } from '@/Utils/loginUtils.js'
import { codTorneioSelecionadoAdm } from '@/Utils/cod_torneioAdmUtils.js'
import { noticiasStore, nomeTorneioNoticia } from '@/Utils/noticiasUtils.js'
import { formatarDataNoticia } from '@/Utils/noticiasSchema.js'
import '@/assets/noticias.css'
const sessao = ref(null)
function atualizarSessao() {
  try {
    sessao.value = obterSessao()
  } catch {
    sessao.value = null
  }
}
atualizarSessao()
onMounted(() => {
  window.addEventListener('focus', atualizarSessao)
  window.addEventListener('storage', atualizarSessao)
})
onBeforeUnmount(() => {
  window.removeEventListener('focus', atualizarSessao)
  window.removeEventListener('storage', atualizarSessao)
})
const autorizado = computed(() => sessao.value?.tipo === 'administrador')
const meusTorneios = computed(() =>
  autorizado.value ? torneios.filter((torneio) => torneio.cod_adm === sessao.value.codigo) : [],
)
const minhasNoticias = computed(() =>
  noticiasStore.ordenadas.value.filter((noticia) =>
    meusTorneios.value.some((torneio) => torneio.cod_torneio === noticia.cod_torneio),
  ),
)
</script>

<template>
  <main class="noticias-modulo noticias-admin">
    <header class="noticias-admin-intro">
      <h1>Notícias das Olimpíadas</h1>
      <p>Publique novidades e mantenha os participantes informados.</p>
    </header>
    <div v-if="!autorizado" class="noticias-vazio" role="alert">
      <h2>Sessão encerrada</h2>
      <p>Entre como administrador para cadastrar notícias.</p>
      <RouterLink class="noticias-btn noticias-admin-link" to="/login">Entrar</RouterLink>
    </div>
    <template v-else>
      <div class="noticias-admin-layout">
        <section class="noticias-painel" aria-labelledby="noticias-nova-titulo">
          <h2 id="noticias-nova-titulo">Cadastrar notícia</h2>
          <NoticiaFormulario
            v-if="meusTorneios.length"
            :torneios="meusTorneios"
            :torneio-inicial="codTorneioSelecionadoAdm"
            :autor="sessao.nome"
          />
          <div v-else class="noticias-vazio">
            <h3>Nenhum torneio disponível</h3>
            <p>Você precisa ter um torneio cadastrado para publicar notícias.</p>
            <RouterLink class="noticias-btn noticias-admin-link" to="/administradores#torneio"
              >Gerenciar torneios</RouterLink
            >
          </div>
        </section>
        <section class="noticias-painel" aria-labelledby="noticias-publicadas-titulo">
          <h2 id="noticias-publicadas-titulo">Publicações dos seus torneios</h2>
          <ul v-if="minhasNoticias.length" class="noticias-recentes">
            <li v-for="noticia in minhasNoticias" :key="noticia.id">
              <RouterLink :to="{ name: 'noticia-detalhe', params: { id: noticia.id } }">{{
                noticia.titulo
              }}</RouterLink>
              <div class="noticias-metadados">
                <span>{{ nomeTorneioNoticia(noticia.cod_torneio) }}</span>
                <time :datetime="noticia.data_publicacao">{{
                  formatarDataNoticia(noticia.data_publicacao)
                }}</time>
              </div>
              <span v-if="noticia.demonstrativa" class="noticias-selo">Dados demonstrativos</span>
            </li>
          </ul>
          <p v-else class="noticias-ajuda">Suas novas publicações aparecerão aqui.</p>
          <RouterLink
            class="noticias-btn noticias-btn-secundario noticias-admin-link"
            to="/noticias"
            >Ver área pública</RouterLink
          >
        </section>
      </div>
    </template>
  </main>
</template>
