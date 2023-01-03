<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, getCurrentInstance, watch } from 'vue'
export default defineComponent({
  name: 'VkSpreadTo',
  emits,
  props,
  setup (props) {
    const vm = getCurrentInstance()
    watch(() => props.data, async (v, ov) => {
      if (props.type === 'class') {
   
        const parentVnode = vm?.parent?.vnode
        if (parentVnode) {
          const parentElement = await props.target(parentVnode)  as HTMLElement

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
       
      }
    }, { deep: true, immediate: true  })
    return () => null
  },
})
</script>
