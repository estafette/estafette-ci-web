import userService from '../../services/userService'

const state = () => ({
  me: null,
  loaded: false
})

const mutations = {
  set: (state, user) => {
    state.me = user
    state.loaded = true
  },
  reset: (state) => {
    state.me = null
  }
}

const actions = {
  load ({ commit }) {
    return userService.load()
      .then(response => {
        commit('set', response.data)
      })
      .catch(e => {
        commit('reset')
      })
  },
  logout ({ commit }) {
    commit('reset')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
