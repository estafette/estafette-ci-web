import userService from '../../services/userService'
import refresh from '../../helpers/refresh'

const state = () => ({
  me: {
    authenticated: false
  },
  timeouts: []
})

const mutations = {
  set: (state, user) => { state.me = user },
  reset: (state) => {
    state.me = {
      authenticated: false
    }
  },
  setTimeout: (state, timeout) => {
    state.timeouts.push(timeout)
  },
  cancelTimeouts: (state) => {
    for (var timeout of state.timeouts) {
      clearTimeout(timeout)
    }
    state.timeouts = []
  }
}

const actions = {
  load ({ dispatch, commit }) {
    userService.load()
      .then(response => {
        commit('set', response.data)
        refresh.setTimeoutWithJitter(commit, () => dispatch('load'), 30)
      })
      .catch(e => {
        refresh.setTimeoutWithJitter(commit, () => dispatch('load'), 60)
      })
  },
  destroy ({ commit }) {
    commit('cancelTimeouts')
    commit('reset')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
