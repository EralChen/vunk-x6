import { useSharedDark } from '@skzz-platform/composables'
import { useThemeStore } from '@skzz-platform/stores/theme'
import { elColorWithMode, elBgColorWithMode, elTextColorWithMode, elFillColorWithMode, elBorderColorWithMode, layoutTopTheme, baseFontSize, namedFontSize, baseGap, namedGap   } from '@skzz-platform/theme'
import { NormalObject } from '@vunk/core' 
import { nextTick, watch } from 'vue'

const useElementPlusTheme = () => {
  const themeStore = useThemeStore()
  const isDark = useSharedDark()

  function setElColor (obj: NormalObject) { 
    Object.keys(obj).forEach((_key) => {
      const key = _key as keyof typeof obj
      if (themeStore.colorStyles[key]) {
        return
      }
      themeStore.colorStyles[key] = obj[key]
    })
  }

  watch(() => isDark.value, (v) => {

    nextTick(() => {
      setElColor(v ? elColorWithMode.dark : elColorWithMode.default)
      setElColor(v ? elBgColorWithMode.dark : elBgColorWithMode.default)
      setElColor(v ? elTextColorWithMode.dark : elTextColorWithMode.default)
      setElColor(v ? elFillColorWithMode.dark : elFillColorWithMode.default)
      setElColor(v ? elBorderColorWithMode.dark : elBorderColorWithMode.default)
    })
  
  }, { immediate: true })

}

const useFontSizeTheme = () => {
  const themeStore = useThemeStore()

  function setFontSize () {

    Object.keys(baseFontSize).forEach((_key) => {
      const key = _key as keyof typeof baseFontSize
      if (themeStore.fontSizeStyles[key]) {
        return
      }
      themeStore.fontSizeStyles[key] = baseFontSize[key]
    })
  }
  setFontSize()

}

const useNamedFontSizeTheme = () => {
  const themeStore = useThemeStore()
  const setFontSize = () => {
    Object.keys(namedFontSize).forEach((_key) => {
      const key = _key as keyof typeof namedFontSize
      if (themeStore.fontSizeNamedStyles[key]) {
        return
      }
      themeStore.fontSizeNamedStyles[key] = namedFontSize[key]
    })
  }
  setFontSize()
}

const useBaseGapTheme = () => {
  const themeStore = useThemeStore()
  const setBaseGap = () => {
    Object.keys(baseGap).forEach((_key) => {
      const key = _key as keyof typeof baseGap
      if (themeStore.gapBaseStyles[key]) {
        return
      }
      themeStore.gapBaseStyles[key] = baseGap[key]
    })
  }
  setBaseGap()
}

const useNamedGapTheme = () => {
  const themeStore = useThemeStore()
  const setNamedGap = () => {
    Object.keys(namedGap).forEach((_key) => {
      const key = _key as keyof typeof namedGap
      if (themeStore.gapNamedStyles[key]) {
        return
      }
      themeStore.gapNamedStyles[key] = namedGap[key]
    })
  }
  setNamedGap()
}

const useLayoutTopTheme = () => {
  const themeStore = useThemeStore()
  const setLayoutTop = () => {
    Object.keys(layoutTopTheme).forEach((_key) => {
      const key = _key as keyof typeof layoutTopTheme
      if (themeStore.layoutTopStyles[key]) {
        return
      }
      themeStore.layoutTopStyles[key] = layoutTopTheme[key]
    })
  }
  setLayoutTop()
}


export const useInitTheme = () => {   
  useElementPlusTheme()
  useFontSizeTheme()
  useNamedFontSizeTheme()
  useBaseGapTheme()
  useNamedGapTheme()
  useLayoutTopTheme()
}
