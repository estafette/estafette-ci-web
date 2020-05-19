import userService from '../../services/userService'
import refresh from '../../helpers/refresh'

const state = () => ({
  me: {
    authenticated: false
  },
  refresh: true,
  timeout: null
})

const mutations = {
  set: (state, user) => { state.me = user },
  reset: (state) => {
    state.me = {
      authenticated: false
    }
  },
  setTimeout: (state, timeout) => {
    state.timeout = timeout
  },
  clearTimeout: (state) => {
    if (state.timeout) {
      clearTimeout(state.timeout)
    }
  },
  destroy: (state) => {
    state.refresh = false
  }
}

const actions = {
  load ({ dispatch, commit }) {
    userService.load()
      .then(response => {
        commit('clearTimeout')
        commit('set', response.data)
        if (state.refresh) {
          commit('setTimeout', refresh.setTimeoutWithJitter(() => dispatch('load'), 30))
        }
      })
      .catch(e => {
        commit('clearTimeout')
        commit('reset')
        if (state.refresh) {
          commit('setTimeout', refresh.setTimeoutWithJitter(() => dispatch('load'), 60))
        }
      })
  },
  destroy ({ commit }) {
    commit('destroy')
    commit('clearTimeout')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
