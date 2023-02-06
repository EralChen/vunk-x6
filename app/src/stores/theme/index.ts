import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { loadStyleString } from '@vunk/core/shared/utils-dom'
import { ToggleHandler } from '@vunk/core/shared/utils-class'
import { NormalObject } from '@vunk/core'
import { useSharedDark } from '@/composables'

class ToggleRootStyles extends ToggleHandler {
  key: string
  mode: 'dark' | 'default'
  selector: string
  constructor (k: string, mode?: 'dark'|'default', selector = ':root') {
    super()
    this.mode = mode || 'default'
    this.key = k + '_' + this.mode
    this.selector = selector
  }
  add (v: NormalObject) {
    this.removeHandler = loadStyleString(`${this.mode === 'default' 
      ?  `${this.selector}`
      : `html.${this.mode}${this.selector === ':root' ? '' : ' ' + this.selector}`}{
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
const useRootStyles = (key: string, selector?: string) => {
  const toggleMenuStyles = {
    default: new ToggleRootStyles(key, 'default', selector),
  }
  const currentToggle = toggleMenuStyles.default

  const styles = ref<NormalObject>(currentToggle.rCurrent())

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
  const menuStyles = useRootStylesWithMode('ZZPT_MENU_STYLES')

  const headerMenuClassName = 'zz-platform-header-menu'
  const headerMenuStyles = useRootStyles('ZZPT_HEADER_MENU_STYLES', `.${headerMenuClassName}`)

  const colorStyles = useRootStylesWithMode('ZZPT_GLOBAL_STYLES')

  const fontSizeStyles = useRootStyles('ZZPT_FONT_SIZE_STYLES')
  const fontSizeNamedStyles = useRootStyles('ZZPT_FONT_SIZE_NAMED_STYLES')


  const gapBaseStyles = useRootStyles('ZZPT_GAP_BASE_STYLES')
  const gapNamedStyles = useRootStyles('ZZPT_GAP_NAMED_STYLES')



  return { 
    gapBaseStyles,
    gapNamedStyles,

    headerMenuClassName,
    headerMenuStyles,
    
    colorStyles,
    menuStyles,
    
    fontSizeStyles,
    fontSizeNamedStyles,
  }
  
})
