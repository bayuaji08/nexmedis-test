<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/models/user'

const props = defineProps<User>()

const menu = ref(null)
const items = ref([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
  },
])

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="bg-white rounded overflow-hidden shadow-sm">
    <div class="aspect-square">
      <img :src="avatar" :alt="first_name" class="object-cover w-full h-full" />
    </div>
    <div class="p-2">
      <div class="flex gap-2">
        <div class="w-10 h-10 flex-none">
          <img :src="avatar" :alt="first_name" class="object-cover w-full h-full rounded-full" />
        </div>
        <div class="flex-1 overflow-hidden">
          <h3 class="font-semibold text-lg leading-5 truncate">{{ first_name }} {{ last_name }}</h3>
          <p class="text-gray-500 text-sm truncate">{{ email }}</p>
        </div>
        <div class="flex-none">
          <PButton
            variant="text"
            severity="secondary"
            rounded
            icon="pi pi-ellipsis-h"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            @click="toggle"
          ></PButton>
          <PMenu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
      </div>
    </div>
  </div>
</template>
