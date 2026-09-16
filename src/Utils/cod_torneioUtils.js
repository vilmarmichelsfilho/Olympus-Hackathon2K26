import { ref, computed } from "vue";
import { modalidades } from "@/data/modalidades";
import { jogos } from "@/data/jogos";
const cod_torneioAtual = ref(null)
function modificarCodTorneio(cod_torneio){
  cod_torneioAtual.value = cod_torneio
}
const modalidadesFiltradas = computed(() => {
  return modalidades.filter((m) => m.cod_torneio == cod_torneioAtual.value)
})
const jogosDoTorneio = computed(() => {
  return jogos.filter(jogo => {
    const modalidade = modalidades.find(
      modalidade => modalidade.cod_modalidade === jogo.cod_modalidade
    )
    return modalidade?.cod_torneio === cod_torneioAtual.value
  })
})
export {modificarCodTorneio, cod_torneioAtual, modalidadesFiltradas, jogosDoTorneio}
