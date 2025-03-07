import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (credentials: string) => {
    token.value = credentials
    localStorage.setItem('token', credentials)

    setTimeout(() => {}, 500)
  }

  const logout = () => {
    setToken('')
    router.push('/login')
  }

  return { token, isAuthenticated, setToken, logout }
})
