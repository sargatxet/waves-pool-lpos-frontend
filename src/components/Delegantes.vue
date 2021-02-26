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
          :headers="headersDelegantes"
          :items="datosDelegantes"
          item-key="sender"
          :items-per-page="5"
          class="elevation-1"
          sort-by="stakeActivo"
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
  name: 'Delegantes',

  data: () => ({
    titulo: 'Delegantes',
    heightActual: 0,
    expanded: [],
    delegantes: [],
    datosDelegantes: [],
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
    ]
  }),

  created() {
    this.descargarDelegantes()
  },

  methods: {
    descargarDelegantes() {
      this.delegantes = []
      this.datosDelegantes = []
      axios
        .get(`${process.env.VUE_APP_URL_BACKEND}/node/status`)
        .then((datos) => {
          this.heightActual = datos.data.stateHeight
          axios
            .get(`${process.env.VUE_APP_URL_BACKEND}/leasing/active/${process.env.VUE_APP_DIR_POOL}`)
            .then((datos) => {
              if (datos && datos.data) {
                this.delegantes = datos.data.reduce((t, l) => {
                  const i = t.findIndex((d) => d.sender == l.sender)
                  if (i == -1)
                    t.push({
                      sender: l.sender,
                      leases: [
                        {
                          height: l.height,
                          amount: l.amount,
                          fecha: moment(new Date(l.timestamp)).format('yyyy/MM/DD HH:mm')
                        }
                      ],
                      stakeTotal: l.amount,
                      stakeActivo: l.height <= this.heightActual - 1000 ? l.amount : 0
                    })
                  else {
                    t[i].stakeTotal += l.amount
                    t[i].stakeActivo += l.height <= this.heightActual - 1000 ? l.amount : 0
                    t[i].leases.push({
                      height: l.height,
                      amount: l.amount,
                      fecha: moment(new Date(l.timestamp)).format('yyyy/MM/DD HH:mm')
                    })
                  }
                  return t
                }, [])
                this.datosDelegantes = this.delegantes.map((d) => {
                  return {
                    sender: d.sender,
                    stakeTotal: (d.stakeTotal / Math.pow(10, 8)).toFixed(6),
                    stakeActivo: (d.stakeActivo / Math.pow(10, 8)).toFixed(6)
                  }
                })
              }
            })
            .catch((err) => console.error(err))
        })
        .catch((err) => console.error(err))
    }
  }
}
</script>
