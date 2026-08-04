import {reactive} from 'vue'
const desenvolvedores = reactive([
   {
    id: 1,
    nome: 'Vitor Avanzi Lipinski',
    funcao: 'Web Designer',
    foto: '',
    visivel: false
  },
  {
    id: 2,
    nome: 'Davi',
    funcao: 'Programador',
    foto: '',
    visivel: false
  },
  {
    id: 3,
    nome: 'Igor Decker',
    funcao: 'Programador',
    foto: '',
    visivel:false
  },
  {
    id: 4,
    nome: 'Vilmar Michels',
    funcao: 'Programador Principal',
    foto: '',
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

