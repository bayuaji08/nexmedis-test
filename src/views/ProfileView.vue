<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'

const store = useProfileStore()
const { profile } = storeToRefs(store)
</script>

<template>
  <div class="lg:mt-6">
    <div
      class="bg-white rounded-lg shadow flex flex-col md:flex-row gap-4 sm:gap-6 overflow-hidden"
    >
      <div class="aspect-square sm:w-70 sm:h-70 bg-gray-400">
        <img :src="profile?.avatar" class="w-full h-full object-center" />
      </div>
      <div class="flex-1 overflow-hidden p-4">
        <h2 class="font-medium text-lg">My Profile</h2>
        <p class="text-gray-500 text-sm">
          Manage your personal information, update your details, and customize your preferences.
        </p>
        <div class="mt-4 flex flex-col divide-y divide-gray-200">
          <div class="py-2 flex flex-col">
            <span class="text-sm text-gray-500">Firt Name</span>
            <span>{{ profile?.first_name }}</span>
          </div>
          <div class="py-2 flex flex-col">
            <span class="text-sm text-gray-500">Last Name</span>
            <span>{{ profile?.last_name }} </span>
          </div>
          <div class="py-2 flex flex-col">
            <span class="text-sm text-gray-500">Email</span>
            <span>{{ profile?.email }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
