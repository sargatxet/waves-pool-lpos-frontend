<template>
  <v-app>
    <v-main>
      <Cabecera />
      <DatosPool />
      <Estadisticas />
      <BloquesFirmados />
      <Delegantes />
    </v-main>
    <Pie />
  </v-app>
</template>

<script>
import Cabecera from '@/components/Cabecera'
import DatosPool from '@/components/DatosPool'
import Estadisticas from '@/components/Estadisticas'
import BloquesFirmados from '@/components/BloquesFirmados'
import Delegantes from '@/components/Delegantes'
import Pie from '@/components/Pie'

export default {
  name: 'Dashboard',
  components: {
    Cabecera,
    DatosPool,
    Estadisticas,
    BloquesFirmados,
    Delegantes,
    Pie
  }
}
</script>
