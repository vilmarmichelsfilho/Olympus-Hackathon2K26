import { ref, computed } from "vue";
import { modalidades } from "@/data/modalidades";
const id_torneioAtual = ref(null)
function modificarCodTorneio(id_torneio){
  id_torneioAtual.value = id_torneio
}
const modalidadesFiltradas = computed(() => {
  return modalidades.filter((m) => m.id_torneio == id_torneioAtual.value)
})

export {modificarCodTorneio, id_torneioAtual, modalidadesFiltradas}
