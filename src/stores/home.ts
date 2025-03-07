import { getAllUser } from '@/services/apiService'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/models/user'

export const useHomeStore = defineStore('home', () => {
  const users = ref<User[]>([])
  const resetData = ref(false)
  let page = 1
  const per_page = 6

  const fetchUsers = async ($state: any) => {
    try {
      const response = await getAllUser({ per_page, page })

      const data = response.data.data

      if (data.length < per_page) $state.complete()
      else {
        users.value.push(...data)
        $state.loaded()
      }

      page++
    } catch (error) {
      console.log(error)
      $state.error()
    }
  }

  return { users, fetchUsers, resetData }
})
