<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import ModalInputUser from '@/components/ModalInputUser.vue'
import { useProfileStore } from '@/stores/profile'
import { onMounted } from 'vue'
const { getProfile } = useProfileStore()

onMounted(() => {
  getProfile()
})
</script>

<template>
  <div class="w-full">
    <AppHeader />

    <div
      class="pt-54 max-w-5xl w-full mx-auto p-4 flex-1 overflow-x-hidden overflow-y-auto relative"
    >
      <slot></slot>
    </div>

    <ModalInputUser />
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

:global(body) {
  @apply bg-gray-100;
}
</style>
