import { useTheme } from '@skzz/platform/composables'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme('ZZPT_ADMIN')
  return theme
})
