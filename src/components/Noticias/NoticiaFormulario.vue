<script setup>
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { noticiasStore } from '@/Utils/noticiasUtils.js'
import { validarCamposNoticia } from '@/Utils/noticiasSchema.js'
import { prepararImagemNoticia } from '@/Utils/noticiasImagemUtils.js'
const props = defineProps({
  torneios: { type: Array, required: true },
  torneioInicial: { type: Number, default: null },
  autor: { type: String, required: true },
})
const emit = defineEmits(['publicada'])
const formulario = ref(null)
const arquivoInput = ref(null)
const sucessoElemento = ref(null)
const campos = reactive({
  titulo: '',
  resumo: '',
  conteudo: '',
  cod_torneio: null,
  imagem: null,
  imagemAlt: '',
})
const erros = ref({})
const erroEnvio = ref('')
const sucesso = ref('')
const enviando = ref(false)
const processandoImagem = ref(false)
let versaoImagem = 0
watch(
  () => props.torneios,
  (opcoes) => {
    if (!opcoes.some((item) => item.cod_torneio === campos.cod_torneio)) {
      campos.cod_torneio =
        opcoes.find((item) => item.cod_torneio === props.torneioInicial)?.cod_torneio ??
        opcoes[0]?.cod_torneio ??
        null
    }
  },
  { immediate: true, deep: true },
)
onBeforeUnmount(() => {
  versaoImagem++
})

function removerImagem() {
  versaoImagem++
  processandoImagem.value = false
  campos.imagem = null
  campos.imagemAlt = ''
  delete erros.value.imagem
  delete erros.value.imagemAlt
  if (arquivoInput.value) arquivoInput.value.value = ''
}

async function selecionarImagem(evento) {
  const arquivo = evento.target.files?.[0]
  removerImagem()
  if (!arquivo) return
  const versao = versaoImagem
  processandoImagem.value = true
  sucesso.value = ''
  try {
    const imagem = await prepararImagemNoticia(arquivo)
    if (versao === versaoImagem) campos.imagem = imagem
  } catch (erro) {
    if (versao === versaoImagem) erros.value.imagem = erro.message
  } finally {
    if (versao === versaoImagem) processandoImagem.value = false
  }
}

function limparFormulario() {
  campos.titulo = ''
  campos.resumo = ''
  campos.conteudo = ''
  removerImagem()
  erros.value = {}
  erroEnvio.value = ''
}

async function publicar() {
  if (enviando.value || processandoImagem.value) return
  sucesso.value = ''
  erroEnvio.value = ''
  erros.value = {
    ...validarCamposNoticia(campos),
    ...(erros.value.imagem ? { imagem: erros.value.imagem } : {}),
  }
  if (!props.torneios.some((item) => item.cod_torneio === campos.cod_torneio)) {
    erros.value.cod_torneio = 'Selecione um dos seus torneios disponíveis.'
  }
  if (Object.keys(erros.value).length) {
    await nextTick()
    formulario.value?.querySelector('[aria-invalid="true"]')?.focus()
    return
  }
  enviando.value = true
  try {
    const noticia = noticiasStore.cadastrar(campos)
    limparFormulario()
    sucesso.value = 'Notícia publicada! Ela já está disponível na área pública.'
    emit('publicada', noticia)
    await nextTick()
    sucessoElemento.value?.focus()
  } catch (erro) {
    erroEnvio.value = erro.message
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <form
    ref="formulario"
    class="noticias-form"
    novalidate
    :aria-busy="enviando || processandoImagem"
    @submit.prevent="publicar"
  >
    <div class="noticias-form-row">
      <div class="noticias-campo">
        <label for="noticia-cadastro-torneio">Torneio *</label>
        <select
          id="noticia-cadastro-torneio"
          v-model="campos.cod_torneio"
          required
          :aria-invalid="Boolean(erros.cod_torneio)"
          aria-describedby="noticia-torneio-erro"
        >
          <option :value="null" disabled>Selecione o torneio</option>
          <option
            v-for="torneio in torneios"
            :key="torneio.cod_torneio"
            :value="torneio.cod_torneio"
          >
            {{ torneio.nome_torneio }}
          </option>
        </select>
        <p v-if="erros.cod_torneio" id="noticia-torneio-erro" class="noticias-erro">
          {{ erros.cod_torneio }}
        </p>
      </div>
      <div class="noticias-campo">
        <label for="noticia-cadastro-autor">Autor</label>
        <input id="noticia-cadastro-autor" :value="autor" readonly />
        <small>A data de publicação é registrada ao publicar.</small>
      </div>
    </div>
    <div class="noticias-campo">
      <label for="noticia-cadastro-titulo">Título *</label>
      <input
        id="noticia-cadastro-titulo"
        v-model="campos.titulo"
        required
        minlength="5"
        maxlength="120"
        :aria-invalid="Boolean(erros.titulo)"
        aria-describedby="noticia-titulo-ajuda noticia-titulo-erro"
        placeholder="Um título para a sua notícia"
      />
      <small id="noticia-titulo-ajuda"
        >De 5 a 120 caracteres · {{ campos.titulo.length }}/120</small
      >
      <p v-if="erros.titulo" id="noticia-titulo-erro" class="noticias-erro">{{ erros.titulo }}</p>
    </div>
    <div class="noticias-campo">
      <label for="noticia-cadastro-resumo">Resumo *</label>
      <textarea
        id="noticia-cadastro-resumo"
        v-model="campos.resumo"
        rows="3"
        required
        minlength="10"
        maxlength="300"
        :aria-invalid="Boolean(erros.resumo)"
        aria-describedby="noticia-resumo-ajuda noticia-resumo-erro"
        placeholder="Apresente os principais pontos da notícia."
      />
      <small id="noticia-resumo-ajuda"
        >De 10 a 300 caracteres · {{ campos.resumo.length }}/300</small
      >
      <p v-if="erros.resumo" id="noticia-resumo-erro" class="noticias-erro">{{ erros.resumo }}</p>
    </div>
    <div class="noticias-campo">
      <label for="noticia-cadastro-conteudo">Conteúdo *</label>
      <textarea
        id="noticia-cadastro-conteudo"
        v-model="campos.conteudo"
        rows="8"
        required
        minlength="30"
        maxlength="20000"
        :aria-invalid="Boolean(erros.conteudo)"
        aria-describedby="noticia-conteudo-ajuda noticia-conteudo-erro"
        placeholder="Escreva o conteúdo completo. Separe os parágrafos com uma linha em branco."
      />
      <small id="noticia-conteudo-ajuda"
        >De 30 a 20.000 caracteres ·
        {{ campos.conteudo.length.toLocaleString('pt-BR') }}/20.000</small
      >
      <p v-if="erros.conteudo" id="noticia-conteudo-erro" class="noticias-erro">
        {{ erros.conteudo }}
      </p>
    </div>
    <div class="noticias-campo">
      <label for="noticia-cadastro-imagem">Imagem (opcional)</label>
      <input
        id="noticia-cadastro-imagem"
        ref="arquivoInput"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        :aria-invalid="Boolean(erros.imagem)"
        aria-describedby="noticia-imagem-ajuda noticia-imagem-erro"
        @change="selecionarImagem"
      />
      <small id="noticia-imagem-ajuda">JPEG, PNG ou WebP, até 1 MiB.</small>
      <p v-if="processandoImagem" role="status" class="noticias-ajuda">Preparando a imagem…</p>
      <p v-if="erros.imagem" id="noticia-imagem-erro" class="noticias-erro" role="alert">
        {{ erros.imagem }}
      </p>
      <div v-if="campos.imagem" class="noticias-preview">
        <img
          :src="campos.imagem"
          :alt="campos.imagemAlt || 'Pré-visualização da imagem selecionada'"
        />
        <div class="noticias-campo">
          <label for="noticia-cadastro-alt">Descrição da imagem *</label>
          <input
            id="noticia-cadastro-alt"
            v-model="campos.imagemAlt"
            maxlength="200"
            required
            :aria-invalid="Boolean(erros.imagemAlt)"
            aria-describedby="noticia-alt-ajuda noticia-alt-erro"
            placeholder="Descreva o que aparece na imagem."
          />
          <small id="noticia-alt-ajuda">Até 200 caracteres, para quem usa leitor de tela.</small>
          <p v-if="erros.imagemAlt" id="noticia-alt-erro" class="noticias-erro">
            {{ erros.imagemAlt }}
          </p>
        </div>
      </div>
      <button
        v-if="campos.imagem || erros.imagem || processandoImagem"
        class="noticias-btn noticias-btn-secundario"
        style="margin-top: 12px"
        type="button"
        @click="removerImagem"
      >
        Remover imagem
      </button>
    </div>
    <p v-if="erroEnvio" class="noticias-form-erro" role="alert">{{ erroEnvio }}</p>
    <p v-if="sucesso" ref="sucessoElemento" class="noticias-sucesso" tabindex="-1" role="status">
      {{ sucesso }}
    </p>
    <p class="noticias-ajuda">* Campos obrigatórios.</p>
    <div class="noticias-form-acoes">
      <button
        class="noticias-btn"
        type="submit"
        :disabled="enviando || processandoImagem || !torneios.length"
      >
        {{ enviando ? 'Publicando…' : 'Publicar notícia' }}
      </button>
    </div>
  </form>
</template>
