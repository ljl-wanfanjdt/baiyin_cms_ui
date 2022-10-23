<template>
  <div>
    <base-form :formOptions="formOptions"></base-form>
  </div>
</template>

<script lang="ts" setup>
import BaseForm from '@/base-ui/form/index'
import formOptions from './config/formOptions'
</script>
<style lang="less" scoped></style>
