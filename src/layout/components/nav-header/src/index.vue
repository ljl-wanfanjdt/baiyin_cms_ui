<template>
  <div class="nav-header">
    <div class="collapse" @click="handleClick">
      <el-icon class="collapse-icon" :size="25" v-if="!isCollapse"
        ><Fold
      /></el-icon>
      <el-icon class="collapse-icon" :size="25" v-else><Expand /></el-icon>
    </div>
    <div class="nav-header-info">
      <!-- 面包屑 -->
      <div class="header-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/">promotion management</a></el-breadcrumb-item
          >
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header-user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            用户信息
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>{{ userinfo?.fullName }}</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogOut">
                <span>退出登录</span>
                <el-icon class="el-icon--right">
                  <CircleClose />
                </el-icon>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import cache from '@/utils/cache'
export default defineComponent({
  components: {},
  emits: ['handleFoldChange'],
  setup(props, { emit }) {
    const isCollapse = ref(false)
    const stroe = useStore()
    const route = useRoute()
    const router = useRouter()
    // 监听route的改变
    watch(
      () => route.path,
      (newValue, oldValue) => {
        console.log(newValue, oldValue)
      },
      { deep: true }
    )
    const userinfo = stroe.state.loginMoudle.userInfo

    // 切换面包导航状态
    const handleClick = () => {
      isCollapse.value = !isCollapse.value
      emit('handleFoldChange', isCollapse.value)
    }

    // 退出登录
    const handleLogOut = () => {
      router.replace('/login')
      cache.clearCache()
    }
    return { isCollapse, handleClick, userinfo, handleLogOut }
  }
})
</script>
<style lang="less" scoped>
.nav-header {
  display: flex;
  height: 60px;
  width: 100%;
  .collapse {
    line-height: 60px;
    .el-icon {
      vertical-align: middle;
    }
  }
  .nav-header-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding-left: 10px;
  }
}
</style>
