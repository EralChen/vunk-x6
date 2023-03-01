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
      'g-primary': isFirstMain,
      'g-secord': !isFirstMain,
    }) + ' ' + normalizeClass(itemClass)">

      <slot name="one"></slot>
    </div>

    <div :class="normalizeClass({
      'g-secord': isFirstMain,
      'g-primary': !isFirstMain,
    }) + ' ' + normalizeClass(itemClass)">
      <slot name="two"></slot>
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>

.g-primary{
  flex: 1125;
}
.g-secord{
  flex: 568;
}
</style>
