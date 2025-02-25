<script lang="ts">
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkDnd',
  props,
  emits,
  setup (props, { emit }) {
    return {}
  },
})
</script>

<template>
  <div>Dnd</div>
</template>
