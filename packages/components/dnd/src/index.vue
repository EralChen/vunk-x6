<script lang="ts">
import { Dnd } from '@antv/x6-plugin-dnd'
import { useGraph } from '@vunk-x6/composables'
import { defineComponent, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkDnd',
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()

    let dnd: Dnd | null = null

    const ready = ref(false)

    onMounted(() => {
      dnd = new Dnd({
        target: graph,
        ...props.defaultOptions,
      })

      const onDragStart = (e) => {
        emit('dragstart', e)
      }

      const onDragEnd = (e) => {
        emit('dragend', e)
      }

      dnd.on('dnd:start', onDragStart)
      dnd.on('dnd:end', onDragEnd)

      ready.value = true

      // 提供dnd实例给其他组件使用
      provide('vk_dnd', dnd)
    })

    onBeforeUnmount(() => {
      if (dnd) {
        dnd.off('dnd:start')
        dnd.off('dnd:end')
        dnd = null
      }
    })

    return {
      ready,
    }
  },
})
</script>

<template>
  <div class="vk-dnd">
    <slot v-if="ready" />
  </div>
</template>

<style>
.vk-dnd {
  width: 100%;
  height: 100%;
}
</style>
