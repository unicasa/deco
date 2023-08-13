<script setup>
import useBranches from '../../composables/useBranches'
import useArticles from '../../composables/useArticles'
import useTransfers from '../../composables/useTransfers'

const { getNameArticle } = useArticles()
const { getNameBranch } = useBranches()
const { transferCollection } = useTransfers()

const parsedDate = (timestamp) => {
  const date = new Date(timestamp)

  const formattedDate = date.toLocaleString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

  return formattedDate
}
</script>

<template>
  <div>
    <header class="d-flex align-center justify-space-between mb-10">
      <div>
        <h1>Listado de Transferencias</h1>
      </div>
      <div>
        <v-btn class="has-bg-unicasa has-color-white" :to="{ name: 'new-transfer' }">
          Transferir
        </v-btn>
      </div>
    </header>

    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">Fecha</th>
          <th class="text-left">Artículo</th>
          <th class="text-left">Origen</th>
          <th class="text-left">Destino</th>
          <th class="text-left">Comentarios</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transfer of transferCollection" :key="transfer.id">
          <td>{{ parsedDate(transfer.created.toMillis()) }}</td>
          <td>{{ getNameArticle(transfer.article) }}</td>
          <td>{{ getNameBranch(transfer.originBranch) }}</td>
          <td>{{ getNameBranch(transfer.destinationBranch) }}</td>
          <td>{{ transfer?.comments || '-' }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
