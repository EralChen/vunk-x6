import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { loadStyleString } from '@vunk/core/shared/utils-dom'
import { ToggleHandler } from '@vunk/core/shared/utils-class'
import { NormalObject } from '@vunk/core'

const menuStylesKey = 'ZZ_PLATFORM_CONFIG_LAYOUT_MENU_STYLES'
class ToggleMenuStyles extends ToggleHandler {
  add (v: NormalObject) {
    this.removeHandler = loadStyleString(`:root{
      ${Object.entries(v).map(([key, value]) => `${key}:${value}`).join(';')};
    }`)
    localStorage.setItem(menuStylesKey, JSON.stringify(v))
  }
}

export const useLayoutStore = defineStore('layout', () => {
  const asideInfo = reactive({
    menuCollapse: false,
  })
  
  const menuStyles = ref<NormalObject>(JSON.parse(
    localStorage.getItem(menuStylesKey) || '{}',
  ))

  const toggleMenuStyles = new ToggleMenuStyles()
  watch(() => menuStyles.value, (v) => {
    toggleMenuStyles.toggle(v)
  }, { immediate: true, deep: true })

  return { 
    asideInfo,
    menuStyles,
  }
  
})
