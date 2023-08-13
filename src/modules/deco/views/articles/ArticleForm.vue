<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirestore } from 'vuefire'
import { useForm, useField } from 'vee-validate'
import { collection, addDoc } from 'firebase/firestore'
import useBranches from '../../composables/useBranches'
import { articleFormSchema as validationSchema } from '../../schemas'

const db = useFirestore()
const router = useRouter()
const { handleSubmit } = useForm({ validationSchema })
const { branchCollection } = useBranches()

const loading = ref(false)

const name = useField('name')
const model = useField('model')
const serial = useField('serial')
const branch = useField('branch')
const comments = useField('comments', null, { initialValue: '' })

const submit = handleSubmit(async (values) => {
  const { name, model, serial, branch, comments } = values

  loading.value = true

  // Add a new document with a generated id.
  const articleRef = await addDoc(collection(db, 'articles'), {
    name,
    model,
    serial,
    branch,
    comments
  })

  loading.value = false
  articleRef.id && router.push({ name: 'articles' })
})
</script>

<template>
  <div>
    <header class="d-flex align-center mb-10">
      <div class="d-flex align-start">
        <v-btn flat class="has-color-unicasa" @click="router.go(-1)">
          <v-icon icon="mdi-arrow-left-drop-circle" size="32"></v-icon>
        </v-btn>
        <div>
          <h3 class="text-h4 font-weight-bold">Nuevo Artículo</h3>
          <p>Registra un artículo llenando el siguiente formulario</p>
        </div>
      </div>
    </header>

    <v-card flat max-width="800" class="pa-5" :loading="loading">
      <v-form class="mt-10">
        <v-row>
          <v-col auto>
            <v-text-field
              label="Nombre"
              class="mb-3"
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col auto>
            <v-text-field
              label="Modelo"
              class="mb-3"
              v-model="model.value.value"
              :error-messages="model.errorMessage.value"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="7">
            <v-text-field
              label="Serial"
              class="mb-3"
              v-model="serial.value.value"
              :error-messages="serial.errorMessage.value"
            />
          </v-col>
          <v-col cols="5">
            <v-select
              label="Surcusal"
              class="mb-3"
              item-value="id"
              item-title="name"
              :items="branchCollection"
              v-model="branch.value.value"
              :error-messages="branch.errorMessage.value"
            />
          </v-col>
        </v-row>

        <v-textarea
          label="Comentarios"
          class="mb-3"
          hint="Detalle los defectos u observaciones hechas al artículo que desea registrar"
          persistent-hint
          v-model="comments.value.value"
          :error-messages="comments.errorMessage.value"
        ></v-textarea>

        <v-btn @click="submit" class="mt-10 w-100 has-bg-unicasa has-color-white">
          Registrar articulo
        </v-btn>
      </v-form>

      <template #loader="{ isActive }">
        <v-progress-linear color="red-lighten-4" indeterminate :active="isActive" />
      </template>
    </v-card>
  </div>
</template>
