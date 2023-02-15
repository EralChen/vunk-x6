
export const baseGap = {
  '--gap-xxs': '0.3rem',
  '--gap-s': '0.5rem',
  '--gap-m': '1rem',
  '--gap-l': '1.5rem',
  '--gap-xl': '2rem',
  '--gap-xxl': '2.5rem',
}

export const baseGapOptions = Object.keys(baseGap).map(key => {
  return {
    label: key,
    value: `var(${key})`,
  }
})

export const namedGap = {
  '--gap-page': 'var(--gap-m)',
  '--gap-main-ptb': 'var(--gap-l)',
  '--gap-form-ptb': 'var(--gap-main-ptb)',
  '--gap-tab-ptb': 'var(--gap-main-ptb)',

  '--gap-form-pl': '70px',
  '--gap-tab-space': '70px',

}
