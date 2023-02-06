export const baseFontSize = {
  'xxxs': '0.7rem',
  'xxs': '0.8rem',
  's': '0.9rem',
  'm': '1rem',
  'l': '1.1rem',
  'xl': '1.2rem',
  'xxl': '1.3rem',
  'xxxl': '1.4rem',
}

export const baseFontSizeOptions = Object.keys(baseFontSize).map(item => {
  return {
    label: item,
    value: `var(--f-${item})`,
  }
})

export const namedFontSize = {
  'card-title': '18px',
  
}