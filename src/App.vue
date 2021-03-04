<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.getStatus()
    setInterval(this.getStatus, 5000)
  },
  methods: {
    async getStatus() {
      const actual = this.$store.state.lastBlock
      await this.$store.dispatch('getStatus')
      if (actual != this.$store.state.lastBlock || actual == 0) {
        await this.$store.dispatch('getSignedBlocks')
        await this.$store.dispatch('getStats')
        await this.$store.dispatch('getLeasers')

        this.$store.commit('blocksProcess')
      }
    }
  }
}
</script>
