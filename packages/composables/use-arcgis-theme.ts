import { useSharedDark } from '@skzz-template/composables/use-shared-dark'
import { ToggleHandler } from '@vunk/core/shared/utils-class'
import { computed, watch } from 'vue'
export const useArcgisTheme = (basePath: '/Esri') => {
  
  const isDark = useSharedDark()
  // css in basePath + `/esri/themes/${mode}/main.css`
  
  const mode = computed(() => {
    return isDark.value ? 'dark' : 'light'
  })

  // 动态生成link标签
  function setlink ()  {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = basePath + `/esri/themes/${mode.value}/main.css`
    document.head.appendChild(link)
    // 暴露卸载方法
    return () => {
      document.head.removeChild(link)
    }
  }

  class ThemeToggle extends ToggleHandler {
    add () {
      this.removeHandler = setlink()
    }
    reset () {
      this.remove()
      this.add()
    }
  }
  const themeToggle = new ThemeToggle()

  watch(() => mode.value, () => {
    themeToggle.reset()
  }, { immediate: true })


}
