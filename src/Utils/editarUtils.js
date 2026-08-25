import {modalidades} from '@/data/modalidades';
function editarModalidade(id, novaModalidade) {
  const index = modalidades.findIndex(modalidade => modalidade.id === id);
  if (index !== -1) {
    modalidades[index] = { ...modalidades[index], ...novaModalidade };
  }
}
export { editarModalidade };
