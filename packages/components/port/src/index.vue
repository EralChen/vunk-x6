<script lang="ts">
import { useGraph, useNode } from '@vunk-x6/composables'
import { computed, defineComponent, onBeforeUnmount, useId } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkPort',
  props,
  emits,
  setup (props, { emit }) {
    const id = useId()
    const theId = computed(() => {
      return props.id ?? id
    })
    const node = useNode()
    const graph = useGraph()
    node.addPort({
      id: theId.value,
      group: props.group,
    })

    emit('load', {
      port: node.getPort(theId.value)!,
      node,
      graph,
    })

    onBeforeUnmount(() => {
      node.removePort(theId)
    })
    return {}
  },
})
</script>

<template>
  <slot></slot>
</template>
