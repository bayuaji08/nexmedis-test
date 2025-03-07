<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'

const store = useLoginStore()
const { loading } = storeToRefs(store)
const { schema, onSubmit } = store
</script>

<template>
  <div class="min-h-screen flex w-full">
    <div class="hidden lg:flex lg:w-[55%] bg-primary-50 flex-col justify-center items-center">
      <img src="@/assets/img/illustration-login.svg" alt="Illustration" width="350" height="350" />
      <h2 class="font-semibold text-3xl text-primary-500 mt-8 max-w-md text-center">
        Live a Healthy Life
      </h2>
      <p class="text-gray-500 max-w-lg text-center mt-2 leading-6">
        By adopting a healthy routine, the body becomes fitter, the mind feels fresher, and the
        future looks brighter!
      </p>
    </div>
    <div class="w-full lg:w-[45%] p-6 lg:p-8 flex justify-center items-center bg-white">
      <VeeForm class="max-w-md w-full" :validation-schema="schema" @submit="onSubmit">
        <h2 class="font-semibold text-3xl">Login to your Account</h2>
        <p class="text-gray-500 mb-8">Start your journey to a healthier life today</p>
        <div class="flex flex-col gap-2 mb-6">
          <label for="email" class="text-gray-500"> Email </label>
          <VeeField name="email" v-slot="{ field, meta }">
            <PInputText
              type="email"
              v-bind="field"
              id="email"
              aria-describedby="email-help"
              :invalid="meta.touched && !meta.valid"
            />
          </VeeField>
          <VeeErrorMessage name="email" class="text-red-500 text-sm" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password" class="text-gray-500"> Password </label>
          <VeeField name="password" v-slot="{ value, handleChange, meta }">
            <PPassword
              type="password"
              :modelValue="value"
              @update:modelValue="handleChange"
              id="password"
              aria-describedby="password-help"
              toggleMask
              :feedback="false"
              inputClass="w-full"
              :invalid="meta.touched && !meta.valid"
            />
          </VeeField>
          <VeeErrorMessage name="password" class="text-red-500 text-sm" />
        </div>
        <div class="mt-8">
          <PButton label="Login" type="submit" class="w-full" :loading="loading"></PButton>
        </div>
        <div class="mt-20 text-center">
          <p class="text-gray-500">
            Not Registered Yet?
            <RouterLink to="/register" class="text-primary-500"> Create an account </RouterLink>
          </p>
        </div>
      </VeeForm>
    </div>
  </div>
</template>
