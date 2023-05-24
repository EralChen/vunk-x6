<script lang="ts">
import { props, emits, createElBindProps, createElOnEmits } from './ctx'
import { defineComponent, computed } from 'vue'
import { vButton } from '@skzz-platform/shared/directives'

export default defineComponent({
  name: 'SkIncreaseButton',
  directives: {
    button: vButton,
  },
  props,
  emits,
  setup (props, { emit }) {
    const coreProps = createElBindProps(props)
    const coreEmits = createElOnEmits(emit)
    const btns = computed(() => {
      // 判断 props.btns 是不是 function
      if (typeof props.btns === 'function') {
        return props.btns()
      } else {
        return props.btns
      }
    })
    return {
      coreProps,
      coreEmits,
      btns,
    }
  },
})
</script>
<template>
  <ElButton 
    v-button:increase="btns"
    v-bind="coreProps"
    v-on="coreEmits"
  >
    新增
  </ElButton>
</template>
