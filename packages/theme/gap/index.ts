export const baseGap = {
  'xxs': '0.3rem',
  's': '0.5rem',
  'm': '1rem',
  'l': '1.5rem',
  'xl': '2rem',
  'xxl': '2.5rem',
}




export const baseGapOptions = Object.keys(baseGap).map(key => {
  return {
    label: key,
    value: `var(--gap-${key})`,
  }
})


export const namedGap = {
  page: 'var(--gap-m)',
 
  'form-ptb': '14px', 

  'form-pl': '70px',


  'tab-ptb': '24px',
  'tab-space': '70px',
  
}