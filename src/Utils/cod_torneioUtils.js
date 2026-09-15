import { ref, computed } from "vue";
import { modalidades } from "@/data/modalidades";
const cod_torneioAtual = ref(null)
function modificarCodTorneio(cod_torneio){
  cod_torneioAtual.value = cod_torneio
}
const modalidadesFiltradas = computed(() => {
  return modalidades.filter((m) => m.cod_torneio == cod_torneioAtual.value)
})
export {modificarCodTorneio, cod_torneioAtual, modalidadesFiltradas}
