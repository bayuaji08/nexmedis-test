<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
const AppLayoutDefault = defineAsyncComponent(() => import('@/layouts/AppLayoutDefault.vue'))
const AppLayoutAuth = defineAsyncComponent(() => import('@/layouts/AppLayoutAuth.vue'))

const route = useRoute()
const layouts = { AppLayoutDefault, AppLayoutAuth }

const layout = computed(() => {
  const layoutKey = route.meta?.layout as keyof typeof layouts
  return layouts[layoutKey] || layouts['AppLayoutDefault']
})
</script>

<template>
  <div>
    <component :is="layout">
      <slot></slot>
    </component>
  </div>
</template>
