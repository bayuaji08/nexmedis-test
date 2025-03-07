<script setup lang="ts">
import overlay from '@/assets/img/overlay.png'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { logout } = useAuthStore()

const activeClassIcon = ' text-primary-900'
const inactiveClassIcon = ' text-gray-500'
const activeClassTitle = 'text-primary-900 text-sm font-medium text-center'
const inactiveClassTitle = 'text-gray-500 text-sm text-center'
</script>

<template>
  <div class="fixed inset-x-0 z-10">
    <div class="h-40 bg-primary-500 text-white relative z-10">
      <div class="max-w-5xl mx-auto p-4 lg:py-8 relative">
        <div class="absolute top-0 right-[calc(25%-5rem)] inset-y-0 overflow-hidden">
          <img :src="overlay" alt="" />
        </div>
        <div class="flex gap-4">
          <div class="flex-1">
            <span class="inline-block text-primary-50">Welcome Back</span>
            <h5 class="text-xl font-semibold">Bayu Aji</h5>
          </div>

          <div class="flex-none">
            <PButton
              label="Logout"
              class="bg-primary-400"
              rounded
              size="small"
              icon="pi pi-sign-out"
              iconPos="right"
              @click="logout()"
            />
          </div>
        </div>
        <div class="relative inset-x-0 bg-white text-black p-4 rounded-lg top-8 shadow">
          <div class="flex gap-2 sm:gap-4 h-full">
            <RouterLink to="/" custom v-slot="{ isActive, href, navigate }">
              <a
                :href="href"
                @click="navigate"
                v-ripple
                class="flex-1 p-2 flex flex-col gap-1 items-center relative overflow-hidden rounded hover:bg-primary-100"
              >
                <span
                  :class="['pi pi-home text-2xl', isActive ? activeClassIcon : inactiveClassIcon]"
                ></span>
                <span :class="isActive ? activeClassTitle : inactiveClassTitle">Homepage</span>
              </a>
            </RouterLink>
            <div class="border-l border-gray-200"></div>
            <div
              v-ripple
              class="flex-1 p-2 flex flex-col gap-1 items-center relative overflow-hidden rounded hover:bg-primary-100 cursor-pointer"
            >
              <span :class="['pi pi-user-plus text-2xl', inactiveClassIcon]"></span>
              <span :class="inactiveClassTitle">New User</span>
            </div>
            <div class="border-l border-gray-200"></div>
            <RouterLink to="/profile" custom v-slot="{ isActive, href, navigate }">
              <a
                :href="href"
                @click="navigate"
                v-ripple
                class="flex-1 p-2 flex flex-col gap-1 items-center relative overflow-hidden rounded hover:bg-primary-100"
              >
                <span
                  :class="['pi pi-user text-2xl', isActive ? activeClassIcon : inactiveClassIcon]"
                ></span>
                <span :class="isActive ? activeClassTitle : inactiveClassTitle">My Profile</span>
              </a>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="h-20 w-full bg-gradient-to-b from-gray-100 from-60% to-transparent"></div>
  </div>
</template>
