import { baseGap, namedGap, baseFontSize, namedFontSize } from '@skzz-platform/theme'
import { NormalObject } from '@vunk/core/shared/types'


export const vunkPresetsTheme = {

  baseGap: Object.keys(baseGap).reduce((a, c) => {
    const key = c.replace('--gap-', '')
    a[key] = baseGap[key]
    return a
  }, {} as NormalObject),

  namedGap: Object.keys(namedGap).reduce((a, c) => {
    const key = c.replace('--gap-', '')
    a[key] = namedGap[key]
    return a
  }, {} as NormalObject),

  baseFontSize: Object.keys(baseFontSize).reduce((a, c) => {
    if (c === 'font-size') {
      return a
    }
    const key = c.replace('--f-', '')
    a[key] = baseFontSize[key]
    return a
  }, {} as NormalObject),



  namedFontSize: Object.keys(namedFontSize).reduce((a, c) => {
    const key = c.replace('--f-', '')
    a[key] = namedFontSize[key]
    return a
  }, {} as NormalObject),

  

}

export default vunkPresetsTheme