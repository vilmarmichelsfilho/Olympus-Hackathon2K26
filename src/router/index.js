import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SobreNosView from '@/views/SobreNosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sobrenos',
      name: 'sobrenos',
      component: SobreNosView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
  }
)
export default router
