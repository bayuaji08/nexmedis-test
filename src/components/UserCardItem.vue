<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/models/user'
import type { Menu } from 'primevue'
import { useHomeStore } from '@/stores/home'
import defaultAvatar from '@/assets/img/avatar.jpg'

const props = withDefaults(defineProps<User>(), {
  avatar: defaultAvatar,
})
const { confirmToDelete, openModalInputUser } = useHomeStore()
const menu = ref<InstanceType<typeof Menu> | null>(null)
const items = ref([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => openModalInputUser(props.id),
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => confirmToDelete(props.id),
  },
])

const toggle = (event: PointerEvent) => {
  menu.value?.toggle(event)
}
</script>

<template>
  <div class="bg-white rounded overflow-hidden shadow-sm">
    <div class="aspect-square">
      <img :src="props.avatar" :alt="props.first_name" class="object-cover w-full h-full" />
    </div>
    <div class="p-2">
      <div class="flex gap-2">
        <div class="w-10 h-10 flex-none">
          <img
            :src="props.avatar"
            :alt="props.first_name"
            class="object-cover w-full h-full rounded-full"
          />
        </div>
        <div class="flex-1 overflow-hidden">
          <h3 class="font-semibold text-lg leading-5 truncate">
            {{ props.first_name }} {{ props.last_name }}
          </h3>
          <p class="text-gray-500 text-sm truncate">{{ props.email }}</p>
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
