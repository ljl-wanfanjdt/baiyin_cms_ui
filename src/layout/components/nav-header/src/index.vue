<template>
  <div class="nav-header">
    <div class="collapse" @click="handleClick">
      <el-icon class="collapse-icon" :size="25" v-if="!isCollapse"
        ><Fold
      /></el-icon>
      <el-icon class="collapse-icon" :size="25" v-else><Expand /></el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  components: {},
  emits: ['handleFoldChange'],
  setup(props, { emit }) {
    const isCollapse = ref(false)
    const handleClick = () => {
      isCollapse.value = !isCollapse.value
      emit('handleFoldChange', isCollapse.value)
    }
    return { isCollapse, handleClick }
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
}
</style>
