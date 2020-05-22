import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modal'
import user from './modules/user'
import pipeline from './modules/pipeline'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modal,
    user,
    pipeline
  }
})
