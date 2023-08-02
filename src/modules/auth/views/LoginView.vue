<script setup>
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <v-sheet class="d-flex h-screen w-screen overflow-hidden">
    <v-img :width="'50%'" cover src="/img/banner_login.png"></v-img>
    <div class="container-auth d-flex flex-column justify-center">
      <LoginForm />
    </div>
  </v-sheet>
</template>

<style scoped>
.container-auth {
  max-width: 620px;
  width: 100%;
}
</style>
