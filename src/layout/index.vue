<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside :width="isCollapse ? '60px' : '200px'" class="layout-aside">
        <nav-menu :isCollapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <nva-header @handleFoldChange="handleCollapse">哈哈哈哈</nva-header>
        </el-header>
        <el-main>
          <div class="layout-main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from './components/nav-menu/index'
import NvaHeader from './components/nav-header/index'
export default defineComponent({
  components: {
    NavMenu,
    NvaHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleCollapse = (value: boolean) => {
      isCollapse.value = value
    }
    return {
      isCollapse,
      handleCollapse
    }
  }
})
</script>
<style lang="less" scoped>
.common-layout {
  height: 100%;
  background-color: #f7f7f7;
  .layout-container {
    height: 100%;
    .layout-aside {
      height: 100%;
      transition: width 0.5s ease;
    }
    .el-header {
      background-color: #ffffff;
      box-shadow: 0px 2px 1px 0px rgb(230, 230, 230, 0.5);
    }
    .layout-main {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      border-radius: 5px;
    }
  }
}
</style>
