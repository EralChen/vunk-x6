<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
import { useGraph } from '@skzz-platform/composables/use-graph'
export default defineComponent({
  name: 'SkG6Render',
  emits,
  props,
  setup (props, { emit }) {
    const g = useGraph()
    g.data(props.data)
    g.render()
  
    return {}
  },
})
</script>
<template>
  <slot></slot>
</template>
