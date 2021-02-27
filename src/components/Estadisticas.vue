<template>
  <v-card elevation="12" light rounded="true" width="80%" class="mx-auto ma-4 text-no-wrap" color="#494949">
    <v-card-title class="title font-weight-bold white--text text--lighten-1">Estadísticas del pool</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col v-for="s in $store.state.stats" :key="s.title">
          <v-card>
            <v-card-title>{{ s.title }}</v-card-title>
            <v-card-text>
              <h2 style="color: blue">{{ s.value }}</h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Estadisticas',

  data: () => ({
    titulo: 'Estadísticas del pool'
  })
}
</script>
