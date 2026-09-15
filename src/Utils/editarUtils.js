import {modalidades} from '@/data/modalidades';
import { arbitros } from '@/data/arbitros';
import {torneios} from '@/data/torneios';
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
function editarTorneio(id, novoTorneio) {
  const index = torneios.findIndex(torneio => torneio.cod_torneio === id);
  if (index !== -1) {
    torneios[index] = { ...torneios[index], ...novoTorneio };
  }
}
export { editarArbitro, editarTorneio, editarModalidade };
