<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const { authUser } = storeToRefs(auth)

const rail = ref(true)
const drawer = ref(true)

const displayName = computed(() => authUser.value?.displayName ?? 'Usuario')
</script>

<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
    <v-list-item
      prepend-avatar="/img/user_profile_fallback.png"
      :title="displayName"
      :subtitle="authUser?.email"
      nav
    >
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item title="Articulos" prepend-icon="mdi-shape" :to="{ name: 'articles' }" />
      <v-list-item
        title="Transferencias"
        prepend-icon="mdi-swap-horizontal"
        :to="{ name: 'transfers' }"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped></style>
