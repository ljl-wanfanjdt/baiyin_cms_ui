<template>
  <div
    class="scroll-table"
    @mouseenter="handelMouseEnter"
    @mouseleave="handelMouseLeave"
  >
    <!-- <base-table :tableConfig="tableConfig"></base-table> -->
    <el-table
      :data="tableData"
      border
      style="width: 300px"
      height="200"
      ref="tableRef"
    >
      <!-- <el-table-column prop="name" /> -->
      <el-table-column
        v-for="col in tableCloum"
        :prop="col.prop"
        :key="col.id"
        :label="col.label"
        :width="col.width"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, onUnmounted } from 'vue'
import BaseTable, { tableType } from '@/base-ui/table/base-table.vue'

const tableConfig: tableType = {
  header: {
    headerIndex: true
  }
}

const tableRef = ref(null)
const scrollWrap = ref(null)
const tableCloum = [
  { id: 1, prop: 'id', label: '排名', width: '100' },
  { id: 1, prop: 'name', label: '姓名' }
]
const tableData = ref(null)
let animationTimer = null
let startTimer = null
const originTable = [
  {
    id: 1,
    name: 'ljl'
  },
  {
    id: 2,
    name: '王婧'
  },
  {
    id: 3,
    name: '小飞'
  },
  {
    id: 4,
    name: 'cluo'
  },
  {
    id: 5,
    name: '梅西'
  },
  {
    id: 6,
    name: '内马尔'
  }
]

tableData.value = [...originTable]
const length = tableData.value.length
const currentIndex = ref(0)
const moveNum = 1
const scrollHandle = () => {
  let scrollTop = 0

  animationTimer = setInterval(() => {
    scrollWrap.value.scrollTop += 1
    scrollTop += 1
    if (scrollTop >= 40) {
      // 前后拼接
      const listData = originTable.slice(currentIndex.value)
      listData.push(...originTable.slice(0, currentIndex.value))
      tableData.value = listData
      console.log(tableData.value)
      scrollWrap.value.scrollTop = 0
      clearInterval(animationTimer)
    }
  }, 1000 / 60)
}

const handelMouseEnter = () => {
  clearInterval(startTimer)
  clearInterval(animationTimer)
}

const handelMouseLeave = () => {
  start()
}

const start = () => {
  nextTick(() => {
    startTimer = setInterval(() => {
      currentIndex.value += moveNum
      currentIndex.value %= length
      scrollHandle()
    }, 1000)
  })
}

onMounted(() => {
  scrollWrap.value = document.querySelector('.el-scrollbar__wrap')
  start()
})

onUnmounted(() => {
  clearInterval(startTimer)
  clearInterval(animationTimer)
})
</script>
<style lang="less" scoped>
:root {
  --table-hove: transparent;
}
.scroll-table {
  width: 300px;
  :deep(.el-table) {
    --el-table-row-hover-bg-color: var(--table-hove);
  }
  :deep(.el-table__row):hover {
    background-color: aqua !important;
  }
}
</style>
