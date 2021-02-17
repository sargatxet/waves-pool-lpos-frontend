<template>
  <v-app>
    <v-main>
      <Cabecera />
      <DatosPool />
    </v-main>
  </v-app>
</template>

<script>
import Cabecera from '@/components/Cabecera'
import DatosPool from '@/components/DatosPool'

export default {
  name: 'Dashboard',
  components: {
    Cabecera,
    DatosPool
  }
}
</script>
