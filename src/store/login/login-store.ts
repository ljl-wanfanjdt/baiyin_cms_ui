import type { Module } from 'vuex'
import router from '@/router'
import { loginStateType } from './login-type'
import loginApi from '@/service/login/login'
import cache from '@/utils/cache'
import { UserInfo, MenuInfo } from '@/service/login/type'
const loginMoudle: Module<loginStateType, any> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    MUTATION_TOKEN(state, value: string) {
      state.token = value
    },
    MUTATION_USERINFO(state, userInfo: UserInfo) {
      state.userInfo = userInfo
    },
    MUTATION_MENUINFO(state, userMenus: Array<MenuInfo>) {
      state.userMenus = userMenus
    }
  },
  actions: {
    // 1.登录,获取token
    async loginActionHandle({ commit }, payload: any) {
      const loginResult = await loginApi.loginRequest(payload)
      const { token } = loginResult.data
      commit('MUTATION_TOKEN', token)
      cache.setCache('token', token, 1)

      //2.根据token获取当前登录用户的角色
      const userRoleResult = await loginApi.getUserInfo()
      commit('MUTATION_USERINFO', userRoleResult.data)
      cache.setCache('userInfo', userRoleResult.data, 1)
      const roleId = userRoleResult.data.roleInfo[0].id

      // 根据当前用户获取菜单数据
      const userMenuList = await loginApi.getUserMenuList(roleId)
      commit('MUTATION_MENUINFO', userMenuList.data)
      cache.setCache('userMenu', userMenuList.data, 1)

      // 4.跳转至首页
      router.push('/')
    }
  },
  getters: {}
}

export default loginMoudle
