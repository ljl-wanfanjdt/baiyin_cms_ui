import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import cache from '@/utils/cache'
// 创建路由器配置对象
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'home-main',
    path: '/main',
    component: () => import('@/layout/index.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/components/login-panel.vue')
  }
]

// 创建路由器对象
const Router = createRouter({
  routes,
  history: createWebHashHistory()
})
Router.beforeEach((to) => {
  // 非登录页必须携带token访问
  if (to.path !== '/login') {
    const token = cache.getCache('token', 1)
    if (!token) {
      return '/login'
    }
  }
})
export default Router
