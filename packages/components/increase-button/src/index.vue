<script lang="ts">
import { props, emits, createElBindProps, createElOnEmits } from './ctx'
import { defineComponent } from 'vue'
import { vButton } from '@skzz-platform/shared/directives'

export default defineComponent({
  name: 'SkIncreaseButton',
  directives: {
    button: vButton,
  },
  emits,
  props,
  setup (props, { emit }) {
    const coreProps = createElBindProps(props)
    const coreEmits = createElOnEmits(emit)

    return {
      coreProps,
      coreEmits,
    }
  },
})
</script>
<template>
  <ElButton 
    v-button:increase="btns"
    v-bind="coreProps"
    v-on="coreEmits"
  >新增</ElButton>
</template>
