import type { User } from '@/models/user'
import { getAllUser, getUser } from '@/services/apiService'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<User>()
  const authStore = useAuthStore()
  const { email } = storeToRefs(authStore)

  const getProfile = async () => {
    try {
      const response = await getAllUser({ per_page: 12 })

      profile.value = response.data.data.find((item: User) => item.email === email.value)
    } catch (error) {
      console.log(error)
    }
  }

  return { profile, getProfile }
})
