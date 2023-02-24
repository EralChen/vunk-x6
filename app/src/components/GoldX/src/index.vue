<script lang="ts">
import { computed, defineComponent, PropType, normalizeClass } from 'vue'
import { props } from './ctx'
export default defineComponent({
  props,
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
      normalizeClass,
    }
  },
})
</script>
<template>
  <div :class="{
    [skFlex]: true,
  }">
    <div :class="normalizeClass({
      'g-618': isFirstMain,
      'g-382': !isFirstMain,
    }) + ' ' + normalizeClass(itemClass)">

      <slot name="one"></slot>
    </div>

    <div :class="normalizeClass({
      'g-382': isFirstMain,
      'g-618': !isFirstMain,
    }) + ' ' + normalizeClass(itemClass)">
      <slot name="two"></slot>
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>

.g-618{
  flex: .618;
}
.g-382{
  flex: .382;
}
</style>
