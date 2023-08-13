<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFirestore } from 'vuefire'
import { useForm, useField } from 'vee-validate'
import { collection, addDoc, Timestamp, updateDoc, doc } from 'firebase/firestore'
import useBranches from '../../composables/useBranches'
import useArticles from '../../composables/useArticles'
import { transferFormSchema as validationSchema } from '../../schemas'

const { branchCollection } = useBranches()
const { getArticlesByBranch } = useArticles()

const db = useFirestore()
const router = useRouter()
const { handleSubmit } = useForm({ validationSchema })

const article = useField('article')
const originBranch = useField('originBranch')
const destinationBranch = useField('destinationBranch')
const comments = useField('comments', null, { initialValue: '' })

const loading = ref(false)
const articleList = ref([])

// Extracts the articles corresponding to the origin branch
watch(
  () => originBranch.value.value,
  (newValue) => {
    articleList.value = getArticlesByBranch(newValue)

    const [{ id }] = articleList.value
    article.value.value = id
  }
)

const submit = handleSubmit(async (values) => {
  const { article, originBranch, destinationBranch, comments } = values

  loading.value = true

  // Add a new document with a generated id.
  const transferRef = await addDoc(collection(db, 'transfers'), {
    article,
    originBranch,
    destinationBranch,
    comments,
    created: Timestamp.now()
  })

  loading.value = false
  transferRef.id && router.push({ name: 'transfers' })

  const articleRef = doc(db, 'articles', article)

  await updateDoc(articleRef, {
    transferred: destinationBranch
  })
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
          <h3 class="text-h4 font-weight-bold">Crear Transferencia</h3>
          <p>Realiza una transferencia entre sucursales rellenado el siguiente formulario</p>
        </div>
      </div>
    </header>

    <v-card flat max-width="800" class="pa-5" :loading="loading">
      <v-form class="mt-10">
        <v-row>
          <v-row>
            <v-col auto>
              <v-select
                label="Surcusal Origen"
                class="mb-3"
                item-value="id"
                item-title="name"
                :items="branchCollection"
                v-model="originBranch.value.value"
                :error-messages="originBranch.errorMessage.value"
              />
            </v-col>
            <v-col auto>
              <v-select
                label="Surcusal Destino"
                class="mb-3"
                item-value="id"
                item-title="name"
                :items="branchCollection"
                v-model="destinationBranch.value.value"
                :error-messages="destinationBranch.errorMessage.value"
              />
            </v-col>
          </v-row>
        </v-row>

        <v-row>
          <v-col auto>
            <v-select
              label="Artículo"
              class="mb-5"
              item-value="id"
              item-title="name"
              persistent-hint
              hint="El listado de artículos mostrado pertenece a la sucursal de origen"
              :items="articleList"
              :disabled="!originBranch.value.value"
              v-model="article.value.value"
              :error-messages="article.errorMessage.value"
            />
          </v-col>
        </v-row>

        <v-textarea
          label="Comentarios"
          class="mb-3"
          v-model="comments.value.value"
          :error-messages="comments.errorMessage.value"
        ></v-textarea>

        <v-btn @click="submit" class="mt-10 w-100 has-bg-unicasa has-color-white">
          Realizar Transferencia
        </v-btn>
      </v-form>

      <template #loader="{ isActive }">
        <v-progress-linear color="red-lighten-4" indeterminate :active="isActive" />
      </template>
    </v-card>
  </div>
</template>
