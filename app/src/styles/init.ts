import { useSharedDark } from '@/composables'
import { useThemeStore } from '@/stores/theme'
import { elColor } from '@skzz-platform/theme'
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
