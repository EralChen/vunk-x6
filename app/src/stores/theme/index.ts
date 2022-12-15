import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { loadStyleString } from '@vunk/core/shared/utils-dom'
import { ToggleHandler } from '@vunk/core/shared/utils-class'
import { NormalObject } from '@vunk/core'


class ToggleRootStyles extends ToggleHandler {
  key: string
  constructor (k: string) {
    super()
    this.key = k
  }
  add (v: NormalObject) {
    this.removeHandler = loadStyleString(`:root{
      ${
  Object.entries(v)
    .filter(([, v]) => !!v)
    .map(([key, value]) => `${key}:${value}`)
    .join(';')
};
    }`)
    localStorage.setItem(this.key, JSON.stringify(v))
  }
  
  rCurrent () {
    return JSON.parse(localStorage.getItem(this.key) || '{}')
  }

  reset (v: NormalObject) {
    this.remove()
    this.add(v)
  }
}

const useRootStyles = (key: string) => {
  const toggleMenuStyles = new ToggleRootStyles(key)
  const styles = ref<NormalObject>(toggleMenuStyles.rCurrent())
  watch(() => styles.value, (v) => {
    toggleMenuStyles.reset(v)
  }, { immediate: true, deep: true })
  return styles
}

export const useThemeStore = defineStore('theme', () => {
  const menuStyles = useRootStyles('ZZ_PLATFORM_THEME_MENU_STYLES')
  const globalStyles = useRootStyles('ZZ_PLATFORM_THEME_GLOBAL_STYLES')

  return { 
    globalStyles,
    menuStyles,
  }
  
})
