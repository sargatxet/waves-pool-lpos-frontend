import axios from 'axios'
import moment from 'moment'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastBlock: 0,
    signedBlocks: [],
    blocksView: [],
    stats: {
      activeStake: { title: 'Stake activo', value: 0 },
      totalStake: { title: 'Stake total', value: 0 },
      nLeasers: { title: 'Nº delegaciones', value: 0 },
      nSignedBlocks: { title: 'Bloques firmados', value: 0 }
    }
  },
  mutations: {
    blocksProcess(state) {
      if (state.signedBlocks.length > 0) {
        state.blocksView = state.signedBlocks.map((d, i) => {
          return {
            nBloque: i + 1,
            height: d.height,
            fecha: moment(d.fecha).format('yyyy/MM/DD HH:mm'),
            recompensasBloque: d.rewards.totalRewards.toFixed(6),
            recompensasPool: d.rewards.poolRewards.toFixed(6),
            recompensasDelegantes: d.rewards.leased.leasersRewards.toFixed(6),
            nDelegantes: d.rewards.leased.leasers.length,
            comisionesTransferencias: d.rewards.leased.leasersFees.toFixed(4),
            staketeDelegado: d.rewards.leased.totalLeased.toFixed(6)
          }
        })
      } else state.blocksView = []

      // Calculamos el nº de bloques firmados hasta el momento
      state.stats.nSignedBlocks.value = state.blocksView.length
    }
  },
  actions: {
    getLastBlock(context) {
      axios
        .get(`${process.env.VUE_APP_URL_BACKEND}/node/status`)
        .then((datos) => {
          if (datos && datos.data) context.state.lastBlock = datos.data.stateHeight
          else context.state.lastBlock = 0
        })
        .catch((err) => {
          context.state.lastBlock = 0
        })
    },
    getSignedBlocks(context) {
      // Cargamos bloques
      axios
        .get(`${process.env.VUE_APP_URL_BACKEND}/api/blocks/list`)
        .then((datos) => {
          if (datos && datos.data) context.state.signedBlocks = datos.data
          else context.state.signedBlocks = []

          // Procesamos bloques para visionado
          context.commit('blocksProcess')
        })
        .catch((err) => {
          context.state.signedBlocks = []
        })
    },
    getStats(context) {
      axios
        .get(`${process.env.VUE_APP_URL_BACKEND}/addresses/balance/details/${process.env.VUE_APP_DIR_POOL}`)
        .then((datos) => {
          if (datos && datos.data) {
            context.state.stats.activeStake.value = datos.data.generating / Math.pow(10, 8)
            context.state.stats.totalStake.value = datos.data.effective / Math.pow(10, 8)
          } else {
            context.state.stats.activeStake.value = 0
            context.state.stats.totalStake.value = 0
          }
        })
        .catch((err) => {
          context.state.stats.activeStake.value = 0
          context.state.stats.totalStake.value = 0
        })

      // Calculamos el nº de delegantes
      axios
        .get(`${process.env.VUE_APP_URL_BACKEND}/leasing/active/${process.env.VUE_APP_DIR_POOL}`)
        .then((datos) => {
          if (datos && datos.data)
            context.state.stats.nLeasers.value = datos.data.reduce((t, l) => {
              const i = t.findIndex((d) => d.sender == l.sender)
              if (i == -1) t.push({ sender: l.sender, amount: l.amount })
              else t[i].amount += l.amount
              return t
            }, []).length
          else context.state.stats.nLeasers.value = 0
        })
        .catch((err) => {
          context.state.stats.nLeasers.value = 0
        })
    }
  },
  modules: {},
  getters: {}
})
