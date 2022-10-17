<template>
  <div class="nav-menu">
    <h3 class="nav-title">白银物流管理系统</h3>
    <el-menu
      default-active="5"
      @open="handleOpen"
      background-color="#597bc9"
      text-color="#ffffff"
      active-text-color="#ffd04b"
      @close="handleClose"
      :collapse="isCollapse"
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
              <el-menu-item :index="innerItem.id + ''">
                <template #title>
                  <span>{{ innerItem.menuName }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- type2不能展开的一级菜单-->
        <template v-else-if="item.type == 2">
          <el-menu-item :index="item.id + ''">
            <el-icon><HomeFilled /></el-icon>
            <!-- 不能展开的一级菜单标题 -->
            <template #title>
              <span>{{ item.menuName }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
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
    const userMenu = computed(() => store.state.loginMoudle.userMenus)
    console.log(userMenu.value)

    return {
      userMenu
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
