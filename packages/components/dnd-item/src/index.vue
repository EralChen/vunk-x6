<script lang="ts">
import { defineComponent } from 'vue'
import { props } from './ctx'

export default defineComponent({
  name: 'VkDndItem',
  props,
})
</script>

<template>
  <div
    :data-type="shape"
    :data-data="JSON.stringify(data)"
    class="vk-dnd-item"
  >
    <slot></slot>
  </div>
</template>

<style>
.vk-dnd-item {
  display: flex;
  align-items: center;
}
</style>
