<script lang="ts">
import { Selection } from '@antv/x6-plugin-selection'
import { useGraph } from '@vunk-x6/composables/instance'
import { defineComponent, provide, watch } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkSelection',
  props,
  emits,
  setup (props, { emit, slots }) {
    const graph = useGraph()

    // Initialize selection plugin
    const selection = new Selection({
      multiple: props.mutiple,
      rubberband: props.mutiple,
      showNodeSelectionBox: true,
    })
    graph.use(selection)

    // Provide selection instance
    provide('vk_selection', selection)

    // Handle selection changes
    graph.on('selection:changed', () => {
      const selectedNodes = selection.getSelectedCells().filter(cell => cell.isNode())
      emit('update:modelValue', selectedNodes)
    })

    // Watch external v-model changes
    watch(() => props.modelValue.map(item => item.id), (nodes) => {
      selection.clean()
      if (nodes.length) {
        selection.select(nodes)
      }
    }, { deep: true })

    emit('load', {
      selection,
      graph,
    })

    return () => slots.default?.()
  },
})
</script>
