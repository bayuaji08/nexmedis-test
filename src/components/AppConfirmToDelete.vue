<template>
  <PConfirmDialog group="confirmToDelete">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center p-8 bg-surface-0 rounded">
        <div
          class="rounded-full bg-red-500 text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20"
        >
          <i class="pi pi-info-circle text-5xl"></i>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
        <p class="mb-0 line-clamp-2 max-w-xs text-center leading-5">{{ message.message }}</p>
        <div class="flex items-center gap-2 mt-6">
          <PButton label="Delete" severity="danger" @click="acceptCallback"></PButton>
          <PButton label="Cancel" severity="secondary" outlined @click="rejectCallback"></PButton>
        </div>
      </div>
    </template>
  </PConfirmDialog>
</template>
