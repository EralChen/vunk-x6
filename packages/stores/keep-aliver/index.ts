
import { isNotEmptyObject } from '@vunk/core/shared/utils-object'
import { waiting } from '@vunk/core/shared/utils-promise'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useKeepAliverStore = defineStore('keepAliver', () => {
  const includeSet = ref(new Set<string>())
  const include = computed(() => Array.from(includeSet.value))

  const addInclude = (name: string) => {
    includeSet.value.add(name)
  }
  const removeInclude = (name: string) => {
    includeSet.value.delete(name)
  }

  const collectingInclude = () => {
    const route = useRoute()
    return watch(() => route.matched, async (matched) => {
      const item = matched.at(-1)
      if (!item) return
      if (item.meta.noCache == 1) return
      
      if (item.instances) {
        // item.instances中的值是异步的添加的，所以需要有值后再执行下一步
        await waiting(() => isNotEmptyObject(item.instances))

        for (const key in item.instances) {
          const instance = item.instances[key]
          const vm = instance?.$

          if (vm) {
            vm.type.name && addInclude(vm.type.name)
          }
        }
      }

    }, {
      immediate: true,
    })
  } 


  return { 
    include,
    addInclude,
    removeInclude,
    collectingInclude,
  }
  
})
