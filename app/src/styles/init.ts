import { useSharedDark } from '@/composables'
import { useThemeStore } from '@/stores/theme'
import { elColor, elBgColor,  baseFontSize, namedFontSize, baseGap, namedGap  } from '@skzz-platform/theme'
import { NormalObject } from '@vunk/core'
import { nextTick, watch } from 'vue'

export const useElementPlusTheme = () => {
  const themeStore = useThemeStore()
  const isDark = useSharedDark()

  function setElColor (obj: NormalObject, prefix = '--el-color-') { 
    Object.keys(obj).forEach((_key) => {
      const key = _key as keyof typeof obj
      const themeKey = key ? `${prefix}${key}` : prefix.slice(0, -1)
      if (themeStore.colorStyles[themeKey]) {
        return
      }
      themeStore.colorStyles[themeKey] = obj[key]
    })
  }

  watch(() => isDark.value, (v) => {

    nextTick(() => {
      setElColor(v ? elColor.dark : elColor.default, '--el-color-')
      setElColor(v ? elBgColor.dark : elBgColor.default, '--el-bg-color-')

    })
  
  }, { immediate: true })

}




export const useFontSizeTheme = () => {
  const themeStore = useThemeStore()

  function setFontSize () {
    if (!themeStore.fontSizeStyles['font-size']) {
      themeStore.fontSizeStyles['font-size'] = '14px'
    }
    Object.keys(baseFontSize).forEach((_key) => {
      const key = _key as keyof typeof baseFontSize
      if (themeStore.fontSizeStyles[`--f-${key}`]) {
        return
      }
      themeStore.fontSizeStyles[`--f-${key}`] = baseFontSize[key]
    })
  }
  setFontSize()

}

export const useNamedFontSizeTheme = () => {
  const themeStore = useThemeStore()
  const setFontSize = () => {
    Object.keys(namedFontSize).forEach((_key) => {
      const key = _key as keyof typeof namedFontSize
      if (themeStore.fontSizeNamedStyles[`--f-${key}`]) {
        return
      }
      themeStore.fontSizeNamedStyles[`--f-${key}`] = namedFontSize[key]
    })
  }
  setFontSize()
}

export const useBaseGapTheme = () => {
  const themeStore = useThemeStore()
  const setBaseGap = () => {
    Object.keys(baseGap).forEach((_key) => {
      const key = _key as keyof typeof baseGap
      if (themeStore.gapBaseStyles[`--gap-${key}`]) {
        return
      }
      themeStore.gapBaseStyles[`--gap-${key}`] = baseGap[key]
    })
  }
  setBaseGap()
}

export const useNamedGapTheme = () => {
  const themeStore = useThemeStore()
  const setNamedGap = () => {
    Object.keys(namedGap).forEach((_key) => {
      const key = _key as keyof typeof namedGap
      if (themeStore.gapNamedStyles[`--gap-${key}`]) {
        return
      }
      themeStore.gapNamedStyles[`--gap-${key}`] = namedGap[key]
    })
  }
  setNamedGap()
}


export const useInitTheme = () => {   
  useElementPlusTheme()
  useFontSizeTheme()
  useNamedFontSizeTheme()
  useBaseGapTheme()
  useNamedGapTheme()
}
