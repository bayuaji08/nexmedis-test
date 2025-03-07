import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as yup from 'yup'
import { loginUser } from '@/services/apiService'
import type { Login } from '@/models/login'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useAuthStore } from './auth'

export const useLoginStore = defineStore('login', () => {
  const toast = useToast()
  const loading = ref(false)
  const router = useRouter()

  const { setToken } = useAuthStore()

  const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  const onSubmit = async (values: Login) => {
    if (loading.value) return
    loading.value = true

    try {
      const response = await loginUser(values)

      await setToken(response.data.token)

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Login successful',
        life: 3000,
      })

      router.push('/')
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Email or password is incorrect',
          life: 3000,
        })
      }

      if (error?.response?.status === 500) {
        toast.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Internal server error',
          life: 3000,
        })
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, schema, onSubmit }
})
