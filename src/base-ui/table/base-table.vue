<template>
  <div>哈哈</div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, PropType } from 'vue'
import { TableHeader, TableType } from './types/type'
export interface tableType {
  tableConfig: TableType
}
const props = withDefaults(defineProps<tableType>(), {
  header: () => ({
    header: {
      headerIndex: false
    }
  })
})

// const props = defineProps({
//   tableConfig: Object
// })
console.log(props.tableConfig)
</script>
<style lang="less" scoped></style>
