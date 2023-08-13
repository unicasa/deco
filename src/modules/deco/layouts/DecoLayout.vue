<script setup>
import { RouterView } from 'vue-router'
import NavDrawer from '../components/NavDrawer.vue'
import { useAuthStore } from '../../../stores/auth'

const { logout } = useAuthStore()
</script>

<template>
  <v-sheet max-width="1440" class="mx-auto">
    <v-layout>
      <v-app-bar class="has-bg-unicasa has-color-white">
        <template #prepend>
          <v-btn :to="{ name: 'deco' }"> Unicasa - Deco </v-btn>
        </template>
        <template #append>
          <v-btn @click="logout"> Cerrar sesión </v-btn>
        </template>
      </v-app-bar>

      <NavDrawer />

      <v-main>
        <v-container fluid class="py-12">
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-sheet>
</template>
