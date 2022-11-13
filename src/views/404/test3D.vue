<template>
  <tag-cloud :tags="tags" width="600" height="600" radius="250"></tag-cloud>
</template>

<script lang="ts" setup>
import tagCloud from '@/base-ui/tag3d/vue-tag-cloud.vue'
const tags = [
  { name: '测试1', color: '#006666' },
  { name: '哈哈哈', color: '#009999' },
  { name: '5656454', color: '#333333' },
  { name: '999999', color: '#660099' },
  { name: '89898989', color: '#990066' },
  { name: '对方水电费', color: '#CC0099' },
  { name: '发送到发送到搞定四个', color: '#CC3300' },
  { name: '合格后付孤鸿寡鹄', color: '#FF9900' },
  { name: '人与人统一回复', color: '#006633' },
  { name: '非官方的广泛地' } // color 可以不传，默认黑色
]
</script>
