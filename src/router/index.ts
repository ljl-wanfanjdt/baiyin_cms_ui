import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

// 创建路由器配置对象
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'home',
    path: '/main',
    component: () => import('views/main/Home.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/LoginPanel.vue')
  }
]

// 创建路由器对象
const Router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default Router
