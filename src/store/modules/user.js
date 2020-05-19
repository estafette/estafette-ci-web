const state = () => ({
  me: {
    authenticated: false
  }
})

const mutations = {
  set (state, user) {
    state.me = user
  },
  reset (state, user) {
    state.me = {
      authenticated: false
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
