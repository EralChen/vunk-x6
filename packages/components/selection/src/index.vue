<script lang="ts">
import { Selection } from '@antv/x6-plugin-selection'
import { useGraph } from '@vunk-x6/composables/instance'
import { defineComponent, onBeforeUnmount, provide, watch, watchEffect } from 'vue'
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
      rubberband: props.rubberband,
      showNodeSelectionBox: true,
    })
    graph.use(selection)

    // Provide selection instance
    provide('vk_selection', selection)

    // Handle selection changes
    const onSelectionChanged = () => {
      const selectedCells = selection.getSelectedCells()
      emit('update:modelValue', selectedCells)
    }
    graph.on('selection:changed', onSelectionChanged)

    // Watch external v-model changes
    watch(() => props.modelValue, (nodes) => {
      selection.clean()
      if (nodes.length) {
        selection.select(nodes)
      }
    }, { deep: true })

    // Sync selection options with props
    watchEffect(() => {
      graph.toggleMultipleSelection(props.mutiple)
    })
    watchEffect(() => {
      graph.toggleSelectionMovable(props.movable)
    })
    watchEffect(() => {
      graph.toggleRubberband(props.rubberband)
    })
    watchEffect(() => {
      graph.toggleStrictRubberband(props.strict)
    })
    watchEffect(() => {
      graph.setSelectionFilter(props.filter)
    })
    watchEffect(() => {
      if (props.modifiers) {
        graph.setRubberbandModifiers(props.modifiers)
      }
    })

    // Cleanup
    onBeforeUnmount(() => {
      graph.off('selection:changed', onSelectionChanged)
      graph.disposePlugins(['selection'])
    })

    emit('load', {
      selection,
      graph,
    })

    return () => slots.default?.()
  },
})
</script>
