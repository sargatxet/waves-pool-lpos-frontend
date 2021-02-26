<template>
  <v-card elevation="12" light rounded="true" width="80%" class="mx-auto ma-4" color="#494949">
    <v-card-title class="title font-weight-bold white--text text--lighten-1">
      {{ titulo }}

      <v-spacer></v-spacer>

      <v-responsive max-width="460">
        <v-text-field dense flat hide-details rounded solo-inverted append-icon="mdi-magnify" v-model="search" @change="filtrarLeaser()"> </v-text-field>
      </v-responsive>
    </v-card-title>
    <v-card-text>
      <template>
        <v-data-table
          :headers="headersBloques"
          :items="bloques"
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
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'BloquesFirmados',

  data: () => ({
    titulo: 'Bloques firmados',
    expanded: [],
    bloques: [],
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
        value: 'skateDelegado',
        filterable: true
      }
    ]
  }),

  created() {
    this.descargarBloques()
  },

  methods: {
    descargarBloques() {
      axios
        .get(`${process.env.VUE_APP_URL_BACKEND}/api/blocks/list`)
        .then((datos) => {
          if (datos && datos.data) {
            this.bloques = datos.data.map((d, i) => {
              return {
                nBloque: i + 1,
                height: d.height,
                fecha: moment(d.fecha).format('yyyy/MM/DD HH:mm'),
                recompensasBloque: d.rewards.totalRewards.toFixed(6),
                recompensasPool: d.rewards.poolRewards.toFixed(6),
                recompensasDelegantes: d.rewards.leased.leasersRewards.toFixed(6),
                nDelegantes: d.rewards.leased.leasers.length,
                comisionesTransferencias: d.rewards.leased.leasersFees.toFixed(4),
                skateDelegado: d.rewards.leased.totalLeased.toFixed(6)
              }
            })
          }
        })
        .catch((err) => console.error(err))
    }
  }
}
</script>
