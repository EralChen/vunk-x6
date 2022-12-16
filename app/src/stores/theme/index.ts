import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { loadStyleString } from '@vunk/core/shared/utils-dom'
import { ToggleHandler } from '@vunk/core/shared/utils-class'
import { NormalObject } from '@vunk/core'
import { useSharedDark } from '@/composables'

class ToggleRootStyles extends ToggleHandler {
  key: string
  mode: 'dark' | 'default'
 
  constructor (k: string, mode?: 'dark'|'default') {
    super()
    this.mode = mode || 'default'
    this.key = k + '_' + this.mode
  }
  add (v: NormalObject) {
    this.removeHandler = loadStyleString(`${this.mode === 'default' 
      ? ':root'
      : `html.${this.mode}`}{
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
  const toggleMenuStyles = {
    default: new ToggleRootStyles(key),
  }
  const currentToggle = toggleMenuStyles.default

  const styles = ref<NormalObject>({})

  watch(() => styles.value, (v) => {
    currentToggle.reset(v)
  }, { immediate: true, deep: true })
  return styles
}
const useRootStylesWithMode = (key: string) => {
  const isDark = useSharedDark()
  const toggleMenuStyles = {
    default: new ToggleRootStyles(key),
    dark: new ToggleRootStyles(key, 'dark'),
  }
  const currentToggle = computed(() => {
    const mode = isDark.value ? 'dark' : 'default'
    return toggleMenuStyles[mode]
  })

  const styles = ref<NormalObject>({})

  watch(() => currentToggle.value, () => {
    styles.value = currentToggle.value.rCurrent()
  }, { immediate: true })

  watch(() => styles.value, (v) => {
    currentToggle.value.reset(v)
  }, { immediate: true, deep: true })
  return styles
}

export const useThemeStore = defineStore('theme', () => {
  const menuStyles = useRootStylesWithMode('ZZ_PLATFORM_THEME_MENU_STYLES')
  const globalStyles = useRootStylesWithMode('ZZ_PLATFORM_THEME_GLOBAL_STYLES')
  const fontSizeStyles = useRootStyles('ZZ_PLATFORM_THEME_FONT_SIZE_STYLES')

  return { 
    globalStyles,
    menuStyles,
    fontSizeStyles,
  }
  
})
