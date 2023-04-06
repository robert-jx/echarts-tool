import { createStore } from 'vuex'

export default createStore({
  state: {
    isSideBar: true
  },
  getters: {
  },
  mutations: {
    changeSideBar(state) {
      state.isSideBar = !state.isSideBar
    }
  },
  actions: {
  },
  modules: {
  }
})
