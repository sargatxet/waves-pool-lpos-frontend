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
          background-color="#797979"
          v-model="search"
          @change="filtrarLeaser()"
        >
        </v-text-field>
      </v-responsive>
    </v-card-title>
    <v-card-text>
      <template>
        <v-data-table
          :headers="headersDelegantes"
          :items="$store.state.leasersData"
          item-key="sender"
          :items-per-page="5"
          class="elevation-1"
          sort-by="stakeActivo"
          sort-desc
          dense
          :search="search"
          show-expand
          single-expand
          :expanded.sync="expanded"
          @item-expanded="filtrarLeases"
        >
          <template v-slot:expanded-item="{ headers }">
            <td :colspan="headers.length">
              Lista delegaciones

              <v-data-table :headers="headersLeases" :items="leasesFiltrados" item-key="height" disable-pagination hide-default-footer disable-sort dense>
              </v-data-table>
            </td>
          </template>
        </v-data-table>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Delegantes',

  data: () => ({
    titulo: 'Delegantes',
    expanded: [],
    leasesFiltrados: [],
    search: '',
    headersDelegantes: [
      {
        text: 'Delegante',
        align: 'start',
        value: 'sender',
        filterable: true
      },
      {
        text: 'Total delegado',
        align: 'end',
        value: 'stakeTotal',
        filterable: true
      },
      {
        text: 'Stake activo',
        align: 'end',
        value: 'stakeActivo',
        filterable: true
      }
    ],
    headersLeases: [
      {
        text: 'Height',
        value: 'height'
      },
      {
        text: 'Fecha',
        value: 'fecha'
      },
      {
        text: 'Cantidad',
        align: 'end',
        value: 'amount',
        filterable: true
      }
    ]
  }),

  methods: {
    filtrarLeases(data) {
      const sender = data.item.sender
      const leases = this.$store.state.leasers.filter((d) => d.sender == sender)
      if (leases && leases.length > 0)
        this.leasesFiltrados = leases[0].leases.map((l) => {
          return {
            height: l.height,
            fecha: l.fecha,
            amount: (l.amount / Math.pow(10, 8)).toFixed(6)
          }
        })
      else this.leasesFiltrados = []
    }
  }
}
</script>
