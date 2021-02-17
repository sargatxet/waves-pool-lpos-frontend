<template>
  <v-card elevation="12" light rounded="true" width="80%" class="mx-auto ma-4 text-no-wrap" color="#494949">
    <v-card-title class="title font-weight-bold white--text text--lighten-1">Datos para delegar en el pool</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col>
          <v-card>
            <v-card-title>Dirección de delegación</v-card-title>
            <v-card-text>
              <h2>
                <span style="color: blue">{{ poolId }}</span>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="copyToClipboard(poolId)" v-bind="attrs" v-on="on">
                      <v-icon size="24px">mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                  <span>Copiar dirección</span>
                </v-tooltip>
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-card>
            <v-card-title>Alias de delegación</v-card-title>
            <v-card-text>
              <h2>
                <span style="color: blue">{{ poolAlias }}</span>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="copyToClipboard(poolAlias)" v-bind="attrs" v-on="on">
                      <v-icon size="24px">mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                  <span>Copiar alias</span>
                </v-tooltip>
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-card>
            <v-card-title>Comisión del pool</v-card-title>
            <v-card-text>
              <h2>
                <span style="color: blue">{{ poolPCT }}%</span>
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-card>
            <v-card-title>Soporte</v-card-title>
            <v-card-text>
              <h2>
                <span style="color: blue">Grupo Discord</span>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon href="https://discord.gg/BFMFTb6" target="_blank" v-bind="attrs" v-on="on">
                      <v-icon size="16x">mdi-discord</v-icon>
                    </v-btn>
                  </template>
                  <span>Unirme al grupo de Discord</span>
                </v-tooltip>
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Tutoriales</v-card-title>
            <v-card-text>
              <h2>
                <span style="color: blue">&copy; Individuo Digital</span>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon href="https://www.youtube.com/watch?v=6elP6OtzjfY" target="_blank" v-bind="attrs" v-on="on">
                      <v-icon size="16x">mdi-youtube</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver el tutorial</span>
                </v-tooltip>
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DatosPool',

  data: () => ({
    poolId: '3P5KC6qJH9TjDdQfgnvP1FpAg2Wa551JZEC',
    poolAlias: 'sarga',
    poolPCT: 5
  }),

  methods: {
    copyToClipboard(texto) {
      navigator.clipboard.writeText(texto)
    }
  }
}
</script>
