<template>
  <v-card elevation="12" light rounded="true" width="80%" class="mx-auto ma-4" color="#494949">
    <v-card-title class="title font-weight-bold white--text text--lighten-1">
      {{ titulo }}

      <v-spacer></v-spacer>

      <v-responsive max-width="460" class="font-weight-regular">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
          append-icon="mdi-magnify"
          background-color="#898989"
          v-model="search"
          @change="filtrarLeaser()"
        >
        </v-text-field>
      </v-responsive>
    </v-card-title>
    <v-card-text>
      <template>
        <v-data-table
          :headers="headersBloques"
          :items="$store.state.blocksView"
          item-key="height"
          :items-per-page="5"
          class="elevation-1"
          sort-by="nBloque"
          sort-desc
          dense
          :search="search"
        >
        </v-data-table>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BloquesFirmados',

  data: () => ({
    titulo: 'Bloques firmados',
    search: '',
    headersBloques: [
      {
        text: 'Nº bloque',
        align: 'start',
        sortable: true,
        value: 'nBloque'
      },
      {
        text: 'Id. bloque',
        align: 'end',
        value: 'height',
        filterable: true
      },
      {
        text: 'Fecha',
        value: 'fecha',
        filterable: true
      },
      {
        text: 'Recompensas bloque',
        align: 'end',
        value: 'recompensasBloque'
      },
      {
        text: 'Recompensas pool (5%)',
        align: 'end',
        value: 'recompensasPool'
      },
      {
        text: 'Recompensas delegantes',
        align: 'end',
        value: 'recompensasDelegantes'
      },
      {
        text: 'Comisiones transferencias',
        align: 'end',
        value: 'comisionesTransferencias'
      },
      {
        text: 'Nº delegantes',
        align: 'end',
        value: 'nDelegantes'
      },
      {
        text: 'Stake activo',
        align: 'end',
        value: 'staketeDelegado',
        filterable: true
      }
    ]
  })
}
</script>
