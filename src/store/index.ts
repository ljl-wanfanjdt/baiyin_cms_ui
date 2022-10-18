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

// 派发-->获取缓存中的持久化数据
export function getLocalCacheData() {
  store.dispatch('loginMoudle/localCacheData')
}
export default store
