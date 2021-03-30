import pipelineService from '../../services/pipelineService'
import refresh from '../../helpers/refresh'

const state = () => ({
  pipelines: [],
  pagination: {
    page: 1,
    size: 12,
    totalPages: 0,
    totalItems: 0
  },
  timeouts: []
})

const mutations = {
  set: (state, payload) => {
    state.pipelines = payload.pipelines
    state.pagination = payload.pagination
  },
  reset: (state) => {
    state.pipelines = []
  },
  setTimeout: (state, timeout) => {
    state.timeouts.push(timeout)
  },
  cancelTimeouts: (state) => {
    for (const timeout of state.timeouts) {
      clearTimeout(timeout)
    }
    state.timeouts = []
  }
}

const actions = {
  loadPipelines ({ dispatch, commit, state }, filter) {
    pipelineService.loadPipelines(filter, state.pagination)
      .then(response => {
        commit('set', { pipelines: response.data.items, pagination: response.data.pagination })
        refresh.setTimeoutWithJitter(commit, () => dispatch('loadPipelines'), 30)
      })
      .catch(e => {
        refresh.setTimeoutWithJitter(commit, () => dispatch('loadPipelines'), 60)
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
