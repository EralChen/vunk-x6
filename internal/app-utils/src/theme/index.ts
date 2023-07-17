import { baseGap, namedGap, baseFontSize, namedFontSize, unoShortcuts, unoThemeColors } from '@skzz/platform/theme'
import { NormalObject } from '@vunk/core/shared/types'

export const vunkPresetsTheme = {

  baseGap: Object.keys(baseGap).reduce((a, c) => {
    const key = c.replace('--gap-', '')
    a[key] = baseGap[c]
    return a
  }, {} as NormalObject),

  namedGap: Object.keys(namedGap).reduce((a, c) => {
    const key = c.replace('--gap-', '')
    a[key] = namedGap[c]
    return a
  }, {} as NormalObject),

  baseFontSize: Object.keys(baseFontSize).reduce((a, c) => {
    if (c === 'font-size') {
      return a
    }
    const key = c.replace('--f-', '')
    a[key] = baseFontSize[c]
    return a
  }, {} as NormalObject),



  namedFontSize: Object.keys(namedFontSize).reduce((a, c) => {
    const key = c.replace('--f-', '')
    a[key] = namedFontSize[c]
    return a
  }, {} as NormalObject),

  

}

export const vunkPresetsShortcuts = {
  ...unoShortcuts,
}

export {
  unoThemeColors,
}

export default vunkPresetsTheme