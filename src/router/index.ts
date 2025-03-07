import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { private: true, layout: 'AppLayoutAuth' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { private: true, layout: 'AppLayoutAuth' },
    },
  ],
})

router.beforeEach((to: any, from, next) => {
  const { isAuthenticated } = useAuthStore()
  const name = to?.name
  document.title = `NEXMEDIS TEST | ${name.charAt(0).toUpperCase() + name.slice(1)}`

  if (to?.meta?.private && !isAuthenticated) {
    next('/login')
  } else if (!to?.meta?.private && isAuthenticated) next('/')

  next()
})

export default router
