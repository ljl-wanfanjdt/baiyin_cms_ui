<template>
  <div class="nav-menu">
    <h3 class="nav-title">白银物流管理系统</h3>
    <el-menu
      :default-active="route.path"
      background-color="#597bc9"
      text-color="#ffffff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :router="true"
    >
      <template v-for="item in userMenu" :key="item.id">
        <!-- type1能继续展开的一级菜单,继续遍历 -->
        <template v-if="item.type == 1">
          <el-sub-menu :index="item.id + ''">
            <!-- 一级菜单标题 -->
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>{{ item.menuName }}</span>
            </template>
            <!-- 继续遍历 -->
            <template v-for="innerItem in item.children" :key="innerItem.id">
              <el-menu-item
                :index="innerItem.path"
                @click="clickMenuItem(innerItem)"
              >
                <template #title>
                  <span>{{ innerItem.menuName }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- type2不能展开的一级菜单-->
        <template v-else-if="item.type == 2">
          <el-menu-item :index="item.path" @click="clickMenuItem(item)">
            <!-- 不能展开的一级菜单标题 -->
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.menuName }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { userMenuType } from '@/service/login/type'
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userMenu: userMenuType[] = store.state.loginMoudle.userMenus

    // 点击切换菜单
    const clickMenuItem = (menuItem: userMenuType) => {
      // activeId.value = menuItem.id + ''
      const path = menuItem.path ?? '/not-found'
      router.push(path)
    }

    // 页面刷新/重置后激活菜单id获取
    // const pathToMenu = <T extends userMenuType>(
    //   menus: T[],
    //   currentPath: string
    // ): userMenuType | any => {
    //   for (let index = 0, l = menus.length; index < l; index++) {
    //     if (menus[index].type === '1') {
    //       const menu = menus[index]?.children
    //       if (menu) {
    //         const findMenu = pathToMenu(menu, currentPath)
    //         return findMenu
    //       }
    //     } else if (
    //       menus[index].type === '2' &&
    //       menus[index].path === currentPath
    //     ) {
    //       return menus[index]
    //     }
    //   }
    // }
    // const menu = pathToMenu(userMenu, route.path)
    // const activeId = ref<string>(menu?.id + '')
    return {
      userMenu,
      clickMenuItem,
      // activeId,
      route
    }
  }
})
</script>
<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #597bc9;
  text-align: center;
  .nav-title {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 70px;
    background-color: #2b5ac5;
    font-size: 18px;
    font-family: '微软雅黑';
    color: #ffffff;
    letter-spacing: 1px;
    font-weight: 500;
  }
  .el-menu {
    width: 100%;
    border-right: 0px;
  }
  .el-sub-menu {
    :deep(.el-menu) {
      background-color: #2b5ac5;
    }
  }
}
</style>
