<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, inject, onMounted, onUnmounted, watch } from 'vue'
import { __SkMultipageRenderer } from '@skzz-platform/components/multipage-renderer'
export default defineComponent({
  name: 'SkMultipageTemplate',
  emits,
  props,
  setup (props, { slots }) {
    const pvm = inject<__SkMultipageRenderer.VM>('skMultipageRenderer')
    if (!pvm) {
      throw new Error('SkMultipageTemplate must be used inside SkMultipageRenderer')
    }
    const setModule = () => {
      pvm.data.items.set(props.value, {
        module: {
          label: props.label,
          value: props.value,
        },
        slots: {
          default: slots.default ?? (() => null),
          options: slots.options ?? (() => null),
        },
      })
    }
    onMounted(() => {
      setModule()
    })

    watch(() => props.value, () => {
      pvm.data.items.delete(props.value)
      setModule()
    })
    
    watch(() => props.label, () => {
      setModule()
    })

    onUnmounted(() => {
      pvm.data.items.delete(props.value)
    })

    return () => null
  },
})
</script>
