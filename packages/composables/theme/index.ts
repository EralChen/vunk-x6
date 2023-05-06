import { NormalObject } from '@vunk/core'
import { ToggleHandler } from '@vunk/core/shared/utils-class'
import { loadStyleString } from '@vunk/core/shared/utils-dom'
import { computed, ref, watch } from 'vue'
import { useSharedDark } from '@skzz-template/composables/use-shared-dark'

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
export const useRootStyles = (key: string, selector?: string) => {
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
export const useRootStylesWithMode = (key: string) => {
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

export const useTheme = (pre = 'ZZPT') => {
  /* globalll */
  const colorStyles = useRootStylesWithMode(`${pre}_COLOR_STYLES`)
  const fontSizeStyles = useRootStyles(`${pre}_FONT_SIZE_STYLES`)
  const fontSizeNamedStyles = useRootStyles(`${pre}_FONT_SIZE_NAMED_STYLES`)
  const gapBaseStyles = useRootStyles(`${pre}_GAP_BASE_STYLES`)
  const gapNamedStyles = useRootStyles(`${pre}_GAP_NAMED_STYLES`)
  /* globalll /> */
  
  
  /* el components */
  const menuStyles = useRootStylesWithMode(`${pre}_MENU_STYLES`)
  const cardStyles = useRootStyles(`${pre}_CARD_STYLES`, '.el-card')
  const buttonPrimaryStyles = useRootStyles(`${pre}_BUTTON_PRIMARY_STYLES`, '.el-button--primary')
  const tableV2Styles = useRootStyles(`${pre}_TABLE_V2_STYLES`, '.el-table-v2')
  /* el components /> */
  
  /* custom component */
  const layoutTopClassName = 'zz-platform-top-menu'
  const layoutTopStyles = useRootStyles(`${pre}_LAYOUT_TOP_STYLES`, `.${layoutTopClassName}`)
  /* custom component /> */
  
  
  return { 
    gapBaseStyles,
    gapNamedStyles,
  
    layoutTopClassName,
    layoutTopStyles,
      
    colorStyles,
    menuStyles,
      
    fontSizeStyles,
    fontSizeNamedStyles,
  
    cardStyles,
    tableV2Styles,
    buttonPrimaryStyles,
  
  }
}

