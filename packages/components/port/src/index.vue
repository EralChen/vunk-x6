<script lang="ts">
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkPort',
  props,
  emits,
  setup (props, { emit }) {
    return {}
  },
})
</script>

<template>
  <slot></slot>
</template>
