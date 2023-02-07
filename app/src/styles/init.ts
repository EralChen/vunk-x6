import { useSharedDark } from '@/composables'
import { useThemeStore } from '@/stores/theme'
import { elColor, baseFontSize, namedFontSize, baseGap, namedGap  } from '@skzz-platform/theme'
import { nextTick, watch } from 'vue'

export const useElementPlusTheme = () => {
  const themeStore = useThemeStore()
  const isDark = useSharedDark()

  function setElColor (obj: typeof elColor['dark' | 'default']) { 
    Object.keys(obj).forEach((_key) => {
      const key = _key as keyof typeof obj

      if (themeStore.colorStyles[`--el-color-${key}`]) {
        return
      }
      themeStore.colorStyles[`--el-color-${key}`] = obj[key]
    })
  }

  watch(() => isDark.value, () => {

    nextTick(() => {
      setElColor(isDark.value ? elColor.dark : elColor.default)
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
