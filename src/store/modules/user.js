const state = () => ({
  user: {
    authenticated: false
  }
})

const mutations = {
  set (state, user) {
    state.user = user
  },
  reset (state, user) {
    state.user = {
      authenticated: false
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
