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
      nDelegantes: { titulo: 'Nº delegantes', valor: 0 },
      bloquesFirmados: { titulo: 'Bloques firmados', valor: 0 }
    }
  }),

  created() {
    this.descargarBloques()
  },

  methods: {
    descargarBloques() {
      axios
        .get(`${process.env.VUE_APP_URL_BACKEND}/api/stats`)
        .then((datos) => {
          if (datos && datos.data) {
            this.estadisticas.stakeActivo.valor = datos.data.stakeActivo.toFixed(6)
            this.estadisticas.stakeTotal.valor = datos.data.stakeTotal.toFixed(6)
            this.estadisticas.nDelegantes.valor = datos.data.nDelegantes
            this.estadisticas.bloquesFirmados.valor = datos.data.bloquesFirmados
          }
        })
        .catch((err) => console.error(err))
    }
  }
}
</script>
