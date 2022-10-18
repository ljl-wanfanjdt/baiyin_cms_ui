import { RouteRecordRaw } from 'vue-router'
import { userMenuType } from '@/service/login/type'
let firstRoute: RouteRecordRaw | undefined = undefined
export function refigterRoutes(userMenu: userMenuType[]) {
  const routes: RouteRecordRaw[] = []
  // 读取本地前端已经注册好的路由
  const localRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((path) => {
    const route = require(`../router/main${path.split('.')[1]}`)
    localRoutes.push(route.default)
  })

  // 递归获取路由 type===2 说明是动态路由页面
  const _recursGetRoute = (menus: userMenuType[]) => {
    menus.forEach((menu: userMenuType) => {
      if (menu.type === '2') {
        const route = localRoutes.find(
          (route: RouteRecordRaw) => route.path === menu.path
        )
        if (!firstRoute) firstRoute = route
        route && routes.push(route)
      } else {
        menu?.children && _recursGetRoute(menu.children)
      }
    })
  }

  _recursGetRoute(userMenu)
  return routes
}

export { firstRoute }
