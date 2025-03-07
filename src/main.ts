import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import {
  Button,
  Checkbox,
  InputText,
  Password,
  Toast,
  ToastService,
  Ripple,
  ProgressSpinner,
  Menu,
} from 'primevue'
import { Form, Field, ErrorMessage } from 'vee-validate'

import 'primeicons/primeicons.css'

const app = createApp(App)

app.component('PInputText', InputText)
app.component('PPassword', Password)
app.component('PCheckbox', Checkbox)
app.component('PButton', Button)
app.component('PToast', Toast)
app.component('PProgressSpinner', ProgressSpinner)
app.component('PMenu', Menu)
app.component('VeeForm', Form)
app.component('VeeField', Field)
app.component('VeeErrorMessage', ErrorMessage)
app.directive('ripple', Ripple)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{sky.50}',
      100: '{sky.100}',
      200: '{sky.200}',
      300: '{sky.300}',
      400: '{sky.400}',
      500: '{sky.500}',
      600: '{sky.600}',
      700: '{sky.700}',
      800: '{sky.800}',
      900: '{sky.900}',
      950: '{sky.950}',
    },
  },
})

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.my-app-dark',
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
})
app.use(ToastService)
app.use(createPinia())
app.use(router)
app.mount('#app')
