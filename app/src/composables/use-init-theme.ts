import type { NormalObject } from '@vunk/core'
import { useThemeStore } from '@/stores/theme'
import { useSharedDark } from '@skzz/platform/composables'
import { baseFontSize, baseGap, elBgColorWithMode, elBorderColorWithMode, elColorWithMode, elFillColorWithMode, elMenuTheme, elTableV2Theme, elTextColorWithMode, layoutTopTheme, namedFontSize, namedGap } from '@skzz/platform/theme'
import { nextTick, watch } from 'vue'
import { useInitEsriTheme } from './use-init-esri-theme'

function useElementPlusTheme () {
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
      setElColor(v ? elMenuTheme.dark : elMenuTheme.default)
    })
  }, { immediate: true })
}

function useFontSizeTheme () {
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

function useNamedFontSizeTheme () {
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

function useBaseGapTheme () {
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

function useNamedGapTheme () {
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

function useLayoutTopTheme () {
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

function useTableV2Theme () {
  const themeStore = useThemeStore()
  const setTableV2 = () => {
    Object.keys(elTableV2Theme).forEach((_key) => {
      const key = _key as keyof typeof elTableV2Theme
      if (themeStore.tableV2Styles[key]) {
        return
      }
      themeStore.tableV2Styles[key] = elTableV2Theme[key]
    })
  }
  setTableV2()
}

export function useInitTheme () {
  useElementPlusTheme()
  useFontSizeTheme()
  useNamedFontSizeTheme()
  useBaseGapTheme()
  useNamedGapTheme()
  useLayoutTopTheme()
  useTableV2Theme()
  useInitEsriTheme()
}
