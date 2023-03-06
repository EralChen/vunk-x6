export const baseFontSize = {
  'font-size': '14px',
  '--f-xxxs': '0.6rem',
  '--f-xxs': '0.7rem',
  '--f-xs': '0.8rem',
  '--f-s': '0.9rem',
  '--f-m': '1rem',
  '--f-l': '1.3rem',
  '--f-xl': '1.35rem',
  '--f-xxl': '1.5rem',
  '--f-xxxl': '1.7rem',
}
export const baseFontSizeOptions = Object.keys(baseFontSize).map(item => {
  return {
    label: item,
    value: `var(${item})`,
  }
})

export const namedFontSize = {
  '--f-module-title': 'var(--f-l)',
  '--f-card-title': 'var(--f-l)',
}
