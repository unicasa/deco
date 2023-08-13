<script setup>
import { useForm, useField } from 'vee-validate'
import { useAuthStore } from '../../../stores/auth'
import { loginFormSchema as validationSchema } from '../schemas'

const auth = useAuthStore()
const { handleSubmit } = useForm({ validationSchema })

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(async ({ email, password }) => {
  auth.login({ email, password })
})
</script>

<template>
  <v-card variant="flat" class="pa-8 mx-auto w-100">
    <v-card-title class="pa-0"> Iniciar Sesión </v-card-title>
    <v-card-subtitle class="pa-0"> Rellena con los datos de tu cuenta </v-card-subtitle>
    <v-form class="my-4">
      <v-text-field
        label="Correo"
        variant="filled"
        type="email"
        class="mb-3"
        autocomplete="null"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      />
      <v-text-field
        label="Contraseña"
        variant="filled"
        type="password"
        class="mb-3"
        autocomplete="null"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      />

      <v-btn class="mt-2 has-bg-unicasa has-color-white" @click="submit"> Iniciar Sesión </v-btn>
    </v-form>

    <!-- TODO: Enlazar a soporte -->
    <p class="text-caption text-end text-grey-darken-1">
      ¿No tienes datos? <a href="#" class="text-red-darken-4">Comunícate con soporte</a>
    </p>
  </v-card>

  <v-alert v-if="auth.hasError" type="error" class="alert-login">
    <template #title>
      <h4>{{ auth.errorMessage }}</h4>
    </template>
  </v-alert>
</template>

<style>
.alert-login {
  position: fixed;
  bottom: 1vw;
  left: 1vw;
  max-width: 480px;
}
.alert-login h4 {
  font-size: 1rem;
  font-weight: 400;
  font-family: inherit;
}
</style>
