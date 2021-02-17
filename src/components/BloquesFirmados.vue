<template>
  <v-card elevation="12" light rounded="true" width="80%" class="mx-auto ma-4" color="#494949">
    <v-card-title class="title font-weight-bold white--text text--lighten-1">{{ titulo }}</v-card-title>
    <v-card-text>
      <template>
        <v-data-table
          :headers="headersBloques"
          :items="bloques"
          item-key="height"
          :items-per-page="10"
          show-expand
          :expanded.sync="expanded"
          single-expand
          class="elevation-1"
          sort-by="nBloque"
          sort-desc
          dense
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">Información sobre el bloque {{ item.height }}</td>
          </template>
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
    headersBloques: [
      {
        text: 'Nº bloque',
        align: 'start',
        sortable: true,
        value: 'nBloque'
      },
      {
        text: 'Id. bloque',
        value: 'height'
      },
      {
        text: 'Fecha',
        value: 'fecha'
      },
      {
        text: 'Recompensas bloque',
        value: 'recompensasBloque'
      },
      {
        text: 'Recompensas pool (5%)',
        value: 'recompensasPool'
      },
      {
        text: 'Recompensas delegantes',
        value: 'recompensasDelegantes'
      },
      {
        text: 'Comisiones transferencias',
        value: 'comisionesTransferencias'
      },
      {
        text: 'Nº delegantes',
        value: 'nDelegantes'
      },
      {
        text: 'Capital activo',
        value: 'capitalDelegado'
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
                capitalDelegado: d.rewards.leased.totalLeased.toFixed(6)
              }
            })
          }
        })
        .catch((err) => console.error(err))
    }
  }
}
</script>
