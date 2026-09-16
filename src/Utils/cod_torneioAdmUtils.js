import { ref, computed } from "vue";
import { modalidades} from "@/data/modalidades";
import { jogos } from "@/data/jogos";
import { arbitros } from "@/data/arbitros";
import { turmas } from "@/data/turmas";
import { times } from "@/data/times";
const codTorneioSelecionadoAdm = ref(null)
function AlterarCodTorneio(novoCod){
  codTorneioSelecionadoAdm.value = novoCod
}
const modalidadesFiltradasAdm = computed(() => {
  return modalidades.filter((m) => m.cod_torneio == codTorneioSelecionadoAdm.value)
})
const jogosDoTorneio = computed(() => {
  return jogos.filter(jogo => {
    const modalidade = modalidades.find(
      modalidade => modalidade.cod_modalidade === jogo.cod_modalidade
    )
    return modalidade?.cod_torneio === codTorneioSelecionadoAdm.value
  })
})
const timesFiltradosAdm = computed(() => {
  return times.filter((t) => t.cod_torneio == codTorneioSelecionadoAdm.value)
})
const turmasFiltradasAdm = computed(() => {
  return turmas.filter((t) => t.cod_torneio == codTorneioSelecionadoAdm.value)
})
const arbitrosFiltradosAdm = computed(() => {
  return arbitros.filter((a) => a.cod_torneio == codTorneioSelecionadoAdm.value)
})
export {codTorneioSelecionadoAdm, AlterarCodTorneio, jogosDoTorneio, modalidadesFiltradasAdm, timesFiltradosAdm, turmasFiltradasAdm, arbitrosFiltradosAdm}
