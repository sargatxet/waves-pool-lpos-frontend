<template>
  <v-card elevation="12" light rounded="true" width="80%" class="mx-auto ma-4 text-no-wrap" color="#494949">
    <v-card-title class="title font-weight-bold white--text text--lighten-1">Estadísticas del pool</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col v-for="s in estadisticas" :key="s.titulo">
          <v-card>
            <v-card-title>{{ s.titulo }}</v-card-title>
            <v-card-text>
              <h2 style="color: blue">{{ s.valor }}</h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Estadisticas',

  data: () => ({
    titulo: 'Estadísticas del pool',
    estadisticas: {
      stakeActivo: { titulo: 'Stake activo', valor: 0 },
      stakeTotal: { titulo: 'Stake total', valor: 0 },
      nDelegantes: { titulo: 'Nº delegaciones', valor: 0 },
      bloquesFirmados: { titulo: 'Bloques firmados', valor: 0 }
    },
    ultimoBloque: 0,
    balancePool: 0,
    bloques: []
  }),

  created() {
    this.actualizarDatos()
  },

  methods: {
    async obtenerUltimoBloque() {
      const datos = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/node/status`)
      if (datos && datos.data) this.ultimoBloque = datos.data.stateHeight
      else this.ultimoBloque = 0
    },
    async actualizarBalances() {
      const datos = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/addresses/balance/details/${process.env.VUE_APP_DIR_POOL}`)
      if (datos && datos.data) {
        this.estadisticas.stakeActivo.valor = datos.data.generating / Math.pow(10, 8)
        this.estadisticas.stakeTotal.valor = datos.data.effective / Math.pow(10, 8)
      } else {
        this.estadisticas.stakeActivo.valor = 0
        this.estadisticas.stakeTotal.valor = 0
      }
    },
    async descargarBloques() {
      const datos = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/leasing/active/${process.env.VUE_APP_DIR_POOL}`)
      if (datos && datos.data) this.bloques = datos.data
      else this.bloques = []
    },
    async nBloquesFirmados() {
      // TODO: Cambiarlo por la llamada a /api/blocks/count cuando se actualice el Backend
      const datos = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/api/blocks/list`)
      if (datos && datos.data) return datos.data.length
      else return 0
    },
    async actualizarDatos() {
      // Descargamos datos
      await this.obtenerUltimoBloque()
      await this.descargarBloques()

      // Calculamos los stakes
      await this.actualizarBalances()

      // Calculamos el nº de delegantes
      this.estadisticas.nDelegantes.valor = this.bloques.reduce((t, l) => {
        const i = t.findIndex((d) => d.sender == l.sender)
        if (i == -1) t.push({ sender: l.sender, amount: l.amount })
        else t[i].amount += l.amount
        return t
      }, []).length

      // Calculamos el nº de bloques firmados hasta el momento
      this.estadisticas.bloquesFirmados.valor = await this.nBloquesFirmados()
    }
  }
}
</script>
