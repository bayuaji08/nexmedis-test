import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const email = ref(localStorage.getItem('email') || null)

  const isAuthenticated = computed(() => !!token.value && !!email.value)

  const setToken = (credentials: string) => {
    return new Promise((resolve, reject) => {
      token.value = credentials
      localStorage.setItem('token', credentials)

      setTimeout(() => {
        resolve(token.value)
      }, 500)
    })
  }

  const setEmail = (value: string) => {
    return new Promise((resolve, reject) => {
      email.value = value
      localStorage.setItem('email', value)

      setTimeout(() => {
        resolve(email.value)
      }, 500)
    })
  }

  const logout = async () => {
    await setToken('')
    await setEmail('')
    router.push('/login')
  }

  return { token, email, isAuthenticated, setToken, setEmail, logout }
})
