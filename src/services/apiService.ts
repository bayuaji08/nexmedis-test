import type { Login } from '@/models/login'
import type { Register } from '@/models/register'
import type { User } from '@/models/user'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export const getUserProfile = async (id: number) => {
  return await api.get(`users/${id}`)
}

export const loginUser = async (payload: Login) => {
  return await api.post(`login`, payload)
}

export const registerUser = async (payload: Register) => {
  return await api.post(`register`, payload)
}

export const getAllUser = async (params = {}) => {
  return await api.get(`users`, { params })
}

export const getUser = async (id: number, params = {}) => {
  return await api.get(`users/${id}`, { params })
}

export const createUser = async (payload: User) => {
  return await api.post(`users`, payload)
}

export const updateUser = async (id: number, payload: User) => {
  return await api.put(`users/${id}`, payload)
}

export const deleteUser = async (id: number) => {
  return await api.delete(`users/${id}`)
}
