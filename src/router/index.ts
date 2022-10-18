import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import cache from '@/utils/cache'
import { firstRoute } from '@/utils/index'
// 创建路由器配置对象
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'homeMain',
    path: '/main',
    component: () => import('@/layout/index.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/components/login-panel.vue')
  },
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue')
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
    const token = cache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  // 路由重定向到dashboard
  if (to.path === '/main') {
    return firstRoute?.path
  }
})
export default Router
