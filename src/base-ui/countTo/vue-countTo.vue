<template>
  <span>
    {{ displayValue }}
  </span>
</template>

<script lang="ts" setup>
import {
  defineProps,
  ref,
  computed,
  watch,
  onMounted,
  vModelSelect,
  defineEmits,
  onUnmounted
} from 'vue'
import {
  requestAnimationFrame,
  cancelAnimationFrame
} from './requestAnimationFrame'
const props = defineProps({
  startVal: {
    type: Number,
    required: false,
    default: 0
  },
  endVal: {
    type: Number,
    required: false,
    default: 2017
  },
  duration: {
    type: Number,
    required: false,
    default: 3000
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: true
  },
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value) {
      return value >= 0
    }
  },
  decimal: {
    type: String,
    required: false,
    default: '.'
  },
  separator: {
    type: String,
    required: false,
    default: ','
  },
  prefix: {
    type: String,
    required: false,
    default: ''
  },
  suffix: {
    type: String,
    required: false,
    default: ''
  },
  useEasing: {
    type: Boolean,
    required: false,
    default: true
  }
})
const emit = defineEmits(['callback', 'mountedCallback'])
let localStartVal = ref(props.startVal)
let displayValue = ref(0)
let printVal = ref(null)
let paused = ref(false)

let localDuration = ref(props.duration)
let startTime = ref(null)
let timestamp = ref(null)
let remaining = ref(null)
let rAF = ref(null)

const countDown = computed(() => {
  return props.startVal > props.endVal
})
const easingFn = (t, b, c, d) => {
  return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
}

const count = (timeParams) => {
  if (!startTime.value) startTime.value = timeParams
  timestamp.value = timeParams
  const progress = timeParams - startTime.value
  remaining.value = localDuration.value - progress

  if (props.useEasing) {
    if (countDown.value) {
      printVal.value =
        localStartVal.value -
        easingFn(
          progress,
          0,
          localStartVal.value - props.endVal,
          localDuration.value
        )
    } else {
      printVal.value = easingFn(
        progress,
        localStartVal.value,
        props.endVal - localStartVal.value,
        localDuration.value
      )
    }
  } else {
    if (countDown.value) {
      printVal.value =
        localStartVal.value -
        (localStartVal.value - props.endVal) * (progress / localDuration.value)
    } else {
      printVal.value =
        localStartVal.value +
        (props.endVal - localStartVal.value) * (progress / localDuration.value)
    }
  }
  if (countDown.value) {
    printVal.value =
      printVal.value < props.endVal ? props.endVal : printVal.value
  } else {
    printVal.value =
      printVal.value > props.endVal ? props.endVal : printVal.value
  }

  displayValue.value = formatNumber(printVal.value)
  if (progress < localDuration.value) {
    // debugger
    rAF.value = requestAnimationFrame(count)
  } else {
    emit('callback')
  }
}

// 开始
const start = () => {
  localStartVal.value = props.startVal
  startTime.value = null
  localDuration.value = props.duration
  paused.value = false
  rAF.value = requestAnimationFrame(count)
}

// 恢复
const resume = () => {
  startTime.value = null
  localDuration.value = +remaining.value
  localStartVal.value = +printVal.value
  requestAnimationFrame(count)
}

// 暂停
const pause = () => {
  cancelAnimationFrame(rAF.value)
}

// 暂停恢复
const pauseResume = () => {
  if (paused.value) {
    resume()
    paused.value = false
  } else {
    pause()
    paused.value = true
  }
}

const formatNumber = (num) => {
  num = num.toFixed(props.decimals)
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? props.decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + props.separator + '$2')
    }
  }
  return props.prefix + x1 + x2 + props.suffix
}

const isNumber = (val) => {
  return !isNaN(parseFloat(val))
}

watch(
  () => props.startVal,
  () => {
    if (props.autoplay) {
      start()
    }
  }
)

watch(
  () => props.endVal,
  () => {
    if (props.autoplay) {
      start()
    }
  }
)
formatNumber(props.startVal)
onMounted(() => {
  if (props.autoplay) {
    console.log(props.autoplay)
    start()
  }
  emit('mountedCallback')
})
onUnmounted(() => {
  cancelAnimationFrame(rAF.value)
})
</script>
<style lang="less" scoped></style>
