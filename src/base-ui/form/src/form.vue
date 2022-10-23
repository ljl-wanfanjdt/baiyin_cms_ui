<template>
  <div>
    <el-form
      :label-width="formOptions?.labelWidth"
      :model="formModel"
      :rules="formRules"
      :validate-on-rule-change="false"
    >
      <template
        v-if="
          !formOptions.formItemOptions.childrens ||
          !formOptions.formItemOptions.childrens.length
        "
      >
        <template v-for="(formItem, index) in singleFormItem" :key="index">
          <el-form-item :label="formItem.label" :prop="formItem.prop">
            <component
              v-bind="formItem?.attrs"
              :is="`el-${formItem.formItemTypes}`"
              :placeholder="formItem?.placeholder"
              v-model="formModel[formItem.prop]"
            ></component>
          </el-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, onMounted, computed } from 'vue'
import { formOptionsTypes, formItemOptionsTypes } from '../types/type'

let formModel = ref<any>({})
let formRules = ref<any>({})
const props = defineProps({
  formOptions: {
    type: Object as PropType<formOptionsTypes>,
    require: true
  }
})

const singleFormItem = computed(() => {
  return props.formOptions?.formItemOptions.filter(
    (formItem: formItemOptionsTypes) =>
      !formItem?.childrens || !formItem.childrens?.length
  )
})
onMounted(() => {
  const model: any = {}
  const rules: any = {}
  props.formOptions?.formItemOptions.forEach(
    (formItem: formItemOptionsTypes) => {
      model[formItem.prop] = formItem.value
      rules[formItem.prop] = formItem.rules
    }
  )
  formRules.value = { ...rules }
  formModel.value = { ...model }
  // console.log(formRules, formModel)
  // console.log(reactive({ name: 'ljl' }))
  // const testResult = test()
  // console.log(isRef(testResult.name))
})

// function test() {
//   const params = reactive({
//     name: 'ljl',
//     age: 18
//   })
//   return toRefs(params)
// }
</script>
<style lang="less" scoped></style>
