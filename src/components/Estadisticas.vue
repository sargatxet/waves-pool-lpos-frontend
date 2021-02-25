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
    bloques: [],
    bloquesFirmados: [],
    leasers: []
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
    async actualizarBalance() {
      const datos = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/addresses/balance/${process.env.VUE_APP_DIR_POOL}`)
      if (datos && datos.data) this.balancePool = datos.data.balance
      else this.balancePool = 0
    },
    async descargarBloques() {
      const datos = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/leasing/active/${process.env.VUE_APP_DIR_POOL}`)
      if (datos && datos.data) this.bloques = datos.data
      else this.bloques = []
    },
    async descargarBloquesFirmados() {
      const datos = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/api/blocks/list`)
      if (datos && datos.data) this.bloquesFirmados = datos.data
      else this.bloquesFirmados = []
    },
    async actualizarDatos() {
      // Descargamos datos
      await this.obtenerUltimoBloque()
      await this.actualizarBalance()
      await this.descargarBloques()
      await this.descargarBloquesFirmados()

      // Calculamos el stake total
      this.estadisticas.stakeTotal.valor = (this.bloques.reduce((t, l) => (t += l.amount), 0) + this.balancePool) / Math.pow(10, 8)

      // Calculamos el stake activo
      this.estadisticas.stakeActivo.valor =
        (this.bloques.filter((l) => l.height <= this.ultimoBloque - 1000).reduce((t, l) => (t += l.amount), 0) + this.balancePool) / Math.pow(10, 8)

      // Calculamos el nº de delegantes
      this.leasers = this.bloques.reduce((t, l) => {
        const i = t.findIndex((d) => d.sender == l.sender)
        if (i == -1) t.push({ sender: l.sender, amount: l.amount })
        else t[i].amount += l.amount
        return t
      }, [])
      this.estadisticas.nDelegantes.valor = this.leasers.length

      // Calculamos el nº de bloques firmados hasta el momento
      this.estadisticas.bloquesFirmados.valor = this.bloquesFirmados.length
    }
  }
}
</script>
