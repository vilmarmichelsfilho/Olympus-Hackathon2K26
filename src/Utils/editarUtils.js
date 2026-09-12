import {modalidades} from '@/data/modalidades';
import { arbitros } from '@/data/arbitros';
function editarModalidade(id, novaModalidade) {
  const index = modalidades.findIndex(modalidade => modalidade.cod_modalidade === id);
  if (index !== -1) {
    modalidades[index] = { ...modalidades[index], ...novaModalidade };
  }
}
function editarArbitro(id, novoArbitro) {
  const index = arbitros.findIndex(arbitro => arbitro.cod_arbitro === id);
  if (index !== -1) {
    arbitros[index] = { ...arbitros[index], ...novoArbitro };
  }
}
export { editarArbitro };
export { editarModalidade };
