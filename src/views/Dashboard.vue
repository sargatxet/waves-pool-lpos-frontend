<template>
  <v-app>
    <v-main>
      <Cabecera />
      <DatosPool />
    </v-main>
    <Pie />
  </v-app>
</template>

<script>
import Cabecera from '@/components/Cabecera'
import DatosPool from '@/components/DatosPool'
import Pie from '@/components/Pie'

export default {
  name: 'Dashboard',
  components: {
    Cabecera,
    DatosPool,
    Pie
  }
}
</script>
