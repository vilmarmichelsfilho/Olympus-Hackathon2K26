import { normalizarId } from '@/services/api'
import { ref, computed } from "vue";
import { listarTurmas } from '@/services/turmasApi'
import { modalidades} from "@/data/modalidades";
import { arbitros } from "@/data/arbitros";
import { times } from "@/data/times";
const CHAVE_TORNEIO_ADM = 'torneioSelecionadoAdm'
const torneioSalvo = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(CHAVE_TORNEIO_ADM) : null
const codTorneioSelecionadoAdm = ref(torneioSalvo ? normalizarId(torneioSalvo) : null)
function AlterarCodTorneio(novoCod){
  codTorneioSelecionadoAdm.value = novoCod == null ? null : normalizarId(novoCod)
  if (typeof sessionStorage === 'undefined') return
  if (novoCod == null) sessionStorage.removeItem(CHAVE_TORNEIO_ADM)
  else sessionStorage.setItem(CHAVE_TORNEIO_ADM, String(novoCod))
}
const modalidadesFiltradasAdm = computed(() => {
  return modalidades.filter((m) => m.id_torneio == codTorneioSelecionadoAdm.value)
})
const timesFiltradosAdm = computed(() => {
  return times.filter((t) => t.id_torneio == codTorneioSelecionadoAdm.value)
})
const turmasFiltradasAdm = ref([])
async function carregarTurmasAdm() {
  const turmas = await listarTurmas()
  turmasFiltradasAdm.value = turmas.filter((t) => normalizarId(t.id_torneio) === normalizarId(codTorneioSelecionadoAdm.value))
}
const arbitrosFiltradosAdm = computed(() => {
  return arbitros.filter((a) => a.id_torneio == codTorneioSelecionadoAdm.value)
})
export {
  codTorneioSelecionadoAdm,
  AlterarCodTorneio,
  modalidadesFiltradasAdm,
  timesFiltradosAdm,
  turmasFiltradasAdm,
  carregarTurmasAdm,
  arbitrosFiltradosAdm,
}
