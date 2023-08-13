<script setup>
import useArticles from '../../composables/useArticles'
import useBranches from '../../composables/useBranches'

const { articleCollection } = useArticles()
const { getNameBranch } = useBranches()
</script>

<template>
  <div>
    <header class="d-flex align-center justify-space-between mb-10">
      <div>
        <h1>Listado de Artículos</h1>
      </div>
      <div>
        <v-btn class="has-bg-unicasa has-color-white" :to="{ name: 'new-article' }">
          Registrar artículo
        </v-btn>
      </div>
    </header>

    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Modelo</th>
          <th class="text-left">Serial</th>
          <th class="text-left">Sucursal</th>
          <th class="text-left">Transferido</th>
          <th class="text-left">Comentarios</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article of articleCollection" :key="article.id">
          <td>{{ article.name }}</td>
          <td>{{ article.model }}</td>
          <td>{{ article.serial }}</td>
          <td>{{ getNameBranch(article.branch) }}</td>
          <td>{{ getNameBranch(article.transferred) }}</td>
          <td>{{ article?.comments || '-' }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
