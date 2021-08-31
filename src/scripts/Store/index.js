import { createStore } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'

//Modules
import second from '@scripts/Store/modules/second'

export default createStore({
  modules: {
    second
  },
  state: () => ({
    debug: false
  }),
  getters: {
    getField,
    example: () => {
      //state, getters
      return `Hello world`
    }
  },
  mutations: {
    updateField
  },
  actions: {}
})
