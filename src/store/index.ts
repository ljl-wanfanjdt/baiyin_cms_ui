import { createStore } from 'vuex'
import loginMoudle from './login/login-store'
const store = createStore({
  state() {
    return {}
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginMoudle
  }
})

export default store
