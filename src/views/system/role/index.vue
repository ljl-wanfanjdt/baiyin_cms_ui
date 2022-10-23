<template>
  <div>
    <Test :isRule="true" @changeTest="changeTest" />
    <test-two>
      <template #default>
        <button>test2</button>
      </template>
      <template #testTwo>
        <button>testTwo</button>
      </template>
      <template #scope="scope">
        <button>{{ scope.name }}</button>
      </template>
    </test-two>
  </div>
</template>

<script lang="ts">
import Test from './components/test'
import TestTwo from './components/test2'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { Test, TestTwo },
  setup() {
    const changeTest = (value: string) => {
      console.log(value)
    }
    return { changeTest }
  }
})
</script>
<style lang="less" scoped></style>
