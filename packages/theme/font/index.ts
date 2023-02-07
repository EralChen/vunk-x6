export const baseFontSize = {
  'xxxs': '0.7rem',
  'xxs': '0.8rem',
  's': '0.9rem',
  'm': '1rem',
  'l': '1.3rem',
  'xl': '1.35rem',
  'xxl': '1.5rem',
  'xxxl': '1.7rem',
}

export const baseFontSizeOptions = Object.keys(baseFontSize).map(item => {
  return {
    label: item,
    value: `var(--f-${item})`,
  }
})

export const namedFontSize = {
  'card-title': 'var(--f-xl)',
  
}