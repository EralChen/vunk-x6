import { defineStore } from 'pinia'
import { useTheme } from '@skzz-platform/composables/theme'
export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme('ZZPT_ADMIN')
  return theme
})

