<script setup lang="ts">
import { onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
import UserCardItem from '@/components/UserCardItem.vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import AppConfirmToDelete from '@/components/AppConfirmToDelete.vue'

const store = useHomeStore()
const { users, resetData } = storeToRefs(store)
const { fetchUsers } = store
</script>

<template>
  <div
    class="lg:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    target=".users-results"
    :identifier="resetData"
  >
    <UserCardItem v-for="user in users" :key="user.id" v-bind="user" />
  </div>
  <InfiniteLoading @infinite="fetchUsers" target=".users-results" :identifier="resetData">
    <template #spinner>
      <div class="flex justify-center my-4">
        <PProgressSpinner style="width: 50px; height: 50px" strokeWidth="2" fill="transparent" />
      </div>
    </template>
    <template #complete>
      <div class="flex justify-center my-4">
        <span class="text-gray-500">No more data found!</span>
      </div>
    </template>
    <template #error="{ retry }">
      <div class="flex justify-center my-4">
        <PButton
          label="Retry"
          class="bg-primary-400"
          rounded
          size="small"
          icon="pi pi-refresh"
          @click="retry"
        ></PButton>
      </div>
    </template>
  </InfiniteLoading>

  <AppConfirmToDelete />
</template>
