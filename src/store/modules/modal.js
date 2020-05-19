const state = () => ({
  visible: false
})

const mutations = {
  show (state) {
    if (!state.visible) {
      state.visible = true
    }
  },
  hide (state) {
    if (state.visible) {
      state.visible = false
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
