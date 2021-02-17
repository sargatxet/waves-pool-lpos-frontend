<template>
  <v-app>
    <v-main>
      <Cabecera />
      <DatosPool />
      <BloquesFirmados />
    </v-main>
    <Pie />
  </v-app>
</template>

<script>
import Cabecera from '@/components/Cabecera'
import DatosPool from '@/components/DatosPool'
import BloquesFirmados from '@/components/BloquesFirmados'
import Pie from '@/components/Pie'

export default {
  name: 'Dashboard',
  components: {
    Cabecera,
    DatosPool,
    BloquesFirmados,
    Pie
  }
}
</script>
