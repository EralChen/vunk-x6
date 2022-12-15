<script lang="ts">
import { NormalObject } from '@vunk/core'
import { defineComponent, getCurrentInstance, PropType, watch } from 'vue'
export default defineComponent({
  props: {
    data: {
      type: Object as PropType<NormalObject>,
      required: true,
    },
    type: {
      type: String as PropType<'class'|'style'>,
      default: 'default',
    },
  },
  setup (props) {
    const vm = getCurrentInstance()
    watch(() => props.data, (v, ov) => {
      if (props.type === 'class') {
   
        const parentVnode = vm?.parent?.vnode
        const parentElement = parentVnode?.el?.parentElement as HTMLElement
        if (parentElement) {

          if (ov) {
            for (const key in ov) {
              parentElement.classList.remove(key)
            }
          }

          for (const key in v) {
            if (v[key]) {
              parentElement.classList.add(key)
            } else {
              parentElement.classList.remove(key)
            }
          }
        }


      }
    }, { deep: true, immediate: true  })
    return () => null
  },
})
</script>

