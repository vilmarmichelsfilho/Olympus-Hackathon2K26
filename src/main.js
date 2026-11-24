import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { carregarTorneios } from './data/torneios'
import { carregarTimes } from './data/times'
import { carregarModalidades } from './data/modalidades'
import { carregarArbitrosDados } from './data/arbitros'
import { carregarAdministradores } from './data/administradores'

await Promise.all([
  carregarTorneios(), carregarTimes(), carregarModalidades(),
  carregarArbitrosDados(), carregarAdministradores(),
])

const app = createApp(App)

app.use(router)

app.mount('#app')
