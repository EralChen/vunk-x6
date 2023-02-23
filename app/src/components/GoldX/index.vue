<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    type: {
      type: String as PropType<'rtl'| 'ltr' | 'ttb'| 'btt'>,
      default: 'ltr', 
    },
  },
  setup (props) {
    const skFlex = computed(() => {
      if (['rtl', 'ltr'].includes(props.type))  {
        return 'sk-flex-row'
      } else {
        return 'sk-flex-col'
      }
      
    })
    const isFirstMain = computed(() => {
      return ['ltr', 'ttb'].includes(props.type)
    })
    return {
      skFlex,
      isFirstMain,
    }
  },
})
</script>
<template>
  <div :class="{
    [skFlex]: true,
  }">
    <div :class="{
      'overflow-hidden': true,
      'g-618': isFirstMain,
      'g-382': !isFirstMain,
    }">
      <slot name="one"></slot>
    </div>

    <div :class="{
      'overflow-hidden': true,
      'g-382': isFirstMain,
      'g-618': !isFirstMain,
    }">
      <slot name="two"></slot>
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>

.g-618{
  flex: 0.618;
}
.g-382{
  flex: 0.382;
}
</style>
