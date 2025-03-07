<script setup lang="ts">
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'

const store = useHomeStore()
const { modalInputUser, modalId, submitLoading, initialValues } = storeToRefs(store)
const { closeModalInputUser, onSubmit, schema } = store
</script>

<template>
  <PDialog
    v-model:visible="modalInputUser"
    modal
    :header="!modalId ? 'New User' : 'Edit User'"
    :style="{ width: '25rem' }"
    :closable="false"
  >
    <template #header>
      <div class="flex justify-center w-full">
        <span class="text-center text-lg font-medium">
          {{ !modalId ? 'New User' : 'Edit User' }}
        </span>
      </div>
    </template>
    <VeeForm
      :validation-schema="schema"
      :initial-values="initialValues"
      @submit="onSubmit"
      v-slot="{ resetForm }"
    >
      <div class="flex flex-col gap-1 mb-4">
        <label for="first_name" class="text-sm w-24">Firt Name</label>
        <div class="flex-1 overflow-hidden">
          <VeeField name="first_name" v-slot="{ field, meta }">
            <PInputText
              id="first_name"
              class="w-full"
              autocomplete="off"
              v-bind="field"
              aria-describedby="first_name-help"
              :invalid="meta.touched && !meta.valid"
            />
            <VeeErrorMessage name="first_name" class="text-red-500 text-sm" />
          </VeeField>
        </div>
      </div>
      <div class="flex flex-col gap-1 mb-4">
        <label for="last_name" class="text-sm w-24">Last Name</label>
        <div class="flex-1 overflow-hidden">
          <VeeField name="last_name" v-slot="{ field, meta }">
            <PInputText
              id="last_name"
              class="w-full"
              autocomplete="off"
              v-bind="field"
              aria-describedby="last_name-help"
              :invalid="meta.touched && !meta.valid"
            />
            <VeeErrorMessage name="last_name" class="text-red-500 text-sm" />
          </VeeField>
        </div>
      </div>
      <div class="flex flex-col ga1-4 mb-8">
        <label for="email" class="text-sm w-24">Email</label>
        <div class="flex-1 overflow-hidden">
          <VeeField name="email" v-slot="{ field, meta }">
            <PInputText
              id="email"
              class="w-full"
              autocomplete="off"
              v-bind="field"
              aria-describedby="email-help"
              :invalid="meta.touched && !meta.valid"
            />
            <VeeErrorMessage name="email" class="text-red-500 text-sm" />
          </VeeField>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <PButton
          type="button"
          label="Cancel"
          severity="secondary"
          class="bg-gray-100"
          outlined
          :disabled="submitLoading"
          @click="
            () => {
              resetForm()
              closeModalInputUser()
            }
          "
        >
        </PButton>
        <PButton type="submit" label="Save" :loading="submitLoading"></PButton>
      </div>
    </VeeForm>
  </PDialog>
</template>
