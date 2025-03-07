import { getAllUser, createUser, updateUser, deleteUser } from '@/services/apiService'
import { ref, toRaw } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import * as yup from 'yup'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useRoute, useRouter } from 'vue-router'

export const useHomeStore = defineStore('home', () => {
  const users = ref<User[]>([])
  const resetData = ref(false)
  const page = ref(1)
  const per_page = ref(6)
  const submitLoading = ref(false)
  const modalInputUser = ref(false)
  const modalId = ref()
  const toast = useToast()
  const confirm = useConfirm()
  const initialValues = ref()
  const router = useRouter()
  const route = useRoute()

  const schema = yup.object({
    first_name: yup
      .string()
      .max(10, 'First name must not exceed 10 characters')
      .required('First name is required'),
    last_name: yup
      .string()
      .max(10, 'Last name must not exceed 10 characters')
      .required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    avatar: yup.string().nullable(),
  })

  const fetchUsers = async ($state: any) => {
    try {
      const response = await getAllUser({ per_page: per_page.value, page: page.value })

      const data = response.data.data

      if (data.length < per_page.value) $state.complete()
      else {
        users.value.push(...data)
        $state.loaded()
      }

      page.value++
    } catch (error) {
      $state.error()
    }
  }

  const onSubmit = (values: User) => {
    !modalId.value ? onCreateUser(values) : onUpdateUser(values)
  }

  const onCreateUser = async (values: User) => {
    submitLoading.value = true

    try {
      const response = await createUser(values)

      const user = response.data
      user.id = parseInt(user.id)

      users.value = [user, ...toRaw(users.value)]
      closeModalInputUser()

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Create user successful',
        life: 3000,
      })

      if (route.name !== 'home') router.push('/')
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Failed',
        detail: error?.response?.data?.error,
        life: 3000,
      })
    } finally {
      submitLoading.value = false
    }
  }

  const onUpdateUser = async (values: User) => {
    submitLoading.value = true

    try {
      const response = await updateUser(modalId.value, values)

      const user = response.data

      users.value = toRaw(users.value).map((item) => {
        if (item.id === modalId.value) {
          return user
        }

        return item
      })
      closeModalInputUser()

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Update user successful',
        life: 3000,
      })
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Failed',
        detail: error?.response?.data?.error,
        life: 3000,
      })
    } finally {
      submitLoading.value = false
    }
  }

  const onDeleteUser = async (id: number) => {
    submitLoading.value = true

    try {
      await deleteUser(id)

      users.value = toRaw(users.value).filter((item) => item.id !== id)

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Delete user successful',
        life: 3000,
      })
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Failed',
        detail: error?.response?.data?.error,
        life: 3000,
      })
    } finally {
      submitLoading.value = false
    }
  }

  const confirmToDelete = (id: number) => {
    confirm.require({
      group: 'confirmToDelete',
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item? This action cannot be undone',
      accept: () => onDeleteUser(id),
      reject: () => {},
    })
  }

  const openModalInputUser = (id?: number) => {
    modalId.value = id
    modalInputUser.value = true

    if (id) {
      initialValues.value = users.value.find((item) => item.id === id)
    }
  }

  const closeModalInputUser = () => {
    modalId.value = null
    modalInputUser.value = false
    initialValues.value = null
  }

  return {
    users,
    resetData,
    schema,
    submitLoading,
    modalInputUser,
    modalId,
    initialValues,
    openModalInputUser,
    closeModalInputUser,
    fetchUsers,
    onSubmit,
    onDeleteUser,
    confirmToDelete,
  }
})
