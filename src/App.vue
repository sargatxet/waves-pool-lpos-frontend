<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  async created() {
    await this.$store.dispatch('getLastBlock')
    await this.$store.dispatch('getSignedBlocks')
    await this.$store.dispatch('getStats')
    await this.$store.dispatch('getLeasers')
  }
}
</script>
