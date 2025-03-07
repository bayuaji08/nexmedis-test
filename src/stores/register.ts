import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as yup from 'yup'
import { registerUser } from '@/services/apiService'
import type { Register } from '@/models/register'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useAuthStore } from './auth'

export const useRegisterStore = defineStore('register', () => {
  const toast = useToast()
  const loading = ref(false)
  const router = useRouter()
  const { setToken, setEmail } = useAuthStore()

  const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  })

  const onSubmit = async (values: Register) => {
    if (loading.value) return
    loading.value = true

    try {
      const response = await registerUser(values)
      await setToken(response.data.token)
      await setEmail(values.email)

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Registration successful',
        life: 3000,
      })

      router.push('/')
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.add({
          severity: 'error',
          summary: 'Failed',
          detail: error?.response?.data?.error,
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
