<template>
  <v-app>
    <v-main>
      <Cabecera />
      <DatosPool />
      <Estadisticas />
      <BloquesFirmados />
    </v-main>
    <Pie />
  </v-app>
</template>

<script>
import Cabecera from '@/components/Cabecera'
import DatosPool from '@/components/DatosPool'
import Estadisticas from '@/components/Estadisticas'
import BloquesFirmados from '@/components/BloquesFirmados'
import Pie from '@/components/Pie'

export default {
  name: 'Dashboard',
  components: {
    Cabecera,
    DatosPool,
    Estadisticas,
    BloquesFirmados,
    Pie
  }
}
</script>
