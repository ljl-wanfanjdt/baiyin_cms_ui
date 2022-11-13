<template>
  <count-to :startVal="startVal" :endVal="endVal" :duration="3000"></count-to>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import countTo from '@/base-ui/countTo/vue-countTo.vue'
const startVal = ref(0)
const endVal = ref(1000)
onMounted(() => {
  setInterval(() => {
    startVal.value = endVal.value
    endVal.value += 100
  }, 5000)
})
</script>
<style lang="less" scoped></style>
