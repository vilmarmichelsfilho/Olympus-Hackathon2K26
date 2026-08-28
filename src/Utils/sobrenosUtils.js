import {reactive} from 'vue'
const desenvolvedores = reactive([
   {
    id: 1,
    nome: 'Vitor Avanzi Lipinski',
    funcao: 'Web Designer',
    foto: '/images/devs/vitor.png',
    visivel: false
  },
  {
    id: 2,
    nome: 'Davi',
    funcao: 'Developer',
    foto: '/images/devs/davi.png',
    visivel: false
  },
  {
    id: 3,
    nome: 'Igor Decker',
    funcao: 'Developer',
    foto: '/images/devs/igor.png',
    visivel:false
  },
  {
    id: 4,
    nome: 'Vilmar Michels',
    funcao: 'Main Developer',
    foto: '/images/devs/vilmar.png',
    visivel: false
  }]);

  function mostrar( iddodesenvolvedor){
 const id = desenvolvedores.findIndex(d => d.id == iddodesenvolvedor);
 if(id !== -1) {
  if(desenvolvedores[id].visivel == false){
  desenvolvedores[id].visivel = true
 }
 else{
  desenvolvedores[id].visivel = false
 }
}}
  export {desenvolvedores, mostrar}

