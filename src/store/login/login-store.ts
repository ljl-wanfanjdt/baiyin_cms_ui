import type { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import { loginStateType } from './login-type'
import loginApi from '@/service/login/login'
import cache from '@/utils/cache'
import { refigterRoutes } from '@/utils/index'
import { UserInfo, userMenuType } from '@/service/login/type'
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
    MUTATION_MENUINFO(state, userMenus: Array<userMenuType>) {
      state.userMenus = userMenus

      // 根据用户权限菜单-->动态注册路由
      if (state.userMenus.length) {
        const routes = refigterRoutes(state.userMenus)
        routes.forEach((route: RouteRecordRaw) => {
          router.addRoute('homeMain', route)
        })
      }
    }
  },
  actions: {
    // 1.登录,获取token
    async loginActionHandle({ commit }, payload: any) {
      const loginResult = await loginApi.loginRequest(payload)
      const { token } = loginResult.data
      commit('MUTATION_TOKEN', token)
      cache.setCache('token', token)

      //2.根据token获取当前登录用户的角色
      const userRoleResult = await loginApi.getUserInfo()
      commit('MUTATION_USERINFO', userRoleResult.data)
      cache.setCache('userInfo', userRoleResult.data)
      const roleId = userRoleResult.data.roleInfo[0].id

      // 根据当前用户获取菜单数据
      const userMenuList = await loginApi.getUserMenuList(roleId)
      commit('MUTATION_MENUINFO', userMenuList.data)
      cache.setCache('userMenu', userMenuList.data)

      // 4.跳转至首页
      router.push('/')
    },

    // 页面刷新--->持久化数据
    localCacheData({ commit }) {
      const token = cache.getCache('token')
      token && commit('MUTATION_TOKEN', token)
      const userInfo = cache.getCache('userInfo')
      userInfo && commit('MUTATION_USERINFO', userInfo)
      const userMenuList = cache.getCache('userMenu')
      userMenuList && commit('MUTATION_MENUINFO', userMenuList)
    }
  },
  getters: {}
}

export default loginMoudle
