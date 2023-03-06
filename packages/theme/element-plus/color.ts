const allColor = {
  '--el-color-primary': 'rgba(25, 81, 193, 1)',
  '--el-color-success': 'rgba(45, 166, 65, 1)',
  '--el-color-warning': 'rgba(237, 106, 12, 1)',
  '--el-color-danger': 'rgba(212, 0, 0, 1)',
  '--el-color-info': 'rgba(150, 151, 153, 1)',
  '--el-color-white': '#FFFFFF',
  '--el-color-black': '#000000',

  '--el-bg-color': '#ffffff',
  '--el-bg-color-page': '#f2f3f5',
  '--el-bg-color-overlay': '#ffffff',

  '--el-text-color-primary': 'rgba(50, 50, 51, 1)',
  '--el-text-color-regular': 'rgba(100, 101, 102, 1)',
  '--el-text-color-secondary': 'rgba(150, 151, 153, 1)',
  '--el-text-color-placeholder': 'rgba(200, 201, 204, 1)',
  '--el-text-color-disabled': 'rgba(220, 222, 224, 1)',

  '--el-fill-color': 'rgba(242, 243, 245, 1)',
  '--el-fill-color-light': 'rgba(247, 248, 250, 1)',
  '--el-fill-color-lighter': '#fafafa',
  '--el-fill-color-extra-light': '#fafcff',
  '--el-fill-color-dark': '#ebedf0',
  '--el-fill-color-darker': '#e6e8eb',
  '--el-fill-color-blank': '#ffffff',

  '--el-border-color': 'rgba(220, 222, 224, 1)',
  '--el-border-color-light': 'rgba(235, 237, 240, 1)',
  '--el-border-color-lighter': '#ebeef5',
  '--el-border-color-extra-light': '#f2f6fc',
  '--el-border-color-dark': '#d4d7de',
  '--el-border-color-darker': '#cdd0d6',
}

export const elColorWithMode = {
  dark: Object.keys(allColor).reduce((acc, cur) => {
    if (cur.startsWith('--el-color-')) {
      acc[cur] = allColor[cur]
    }
    return acc
  }, {}),
  // 从 allColor 中取出来 --el-color- 开头的
  default: Object.keys(allColor).reduce((acc, cur) => {
    if (cur.startsWith('--el-color-')) {
      acc[cur] = allColor[cur]
    }
    return acc
  }, {}),
}

export const elBgColorWithMode = {
  /* 
      '': '#141414',
    page: '#0a0a0a',
    overlay: '#1d1e1f',
  */
  dark: {
    '--el-bg-color': '#141414',
    '--el-bg-color-page': '#0a0a0a',
    '--el-bg-color-overlay': '#1d1e1f',
  },
  /* 
    '': '#ffffff',
    page: '#f2f3f5',
    overlay: '#ffffff',
  */
  default: Object.keys(allColor).reduce((acc, cur) => {
    if (cur.startsWith('--el-bg-color')) {
      acc[cur] = allColor[cur]
    }
    return acc
  }, {}),
}


export const elTextColorWithMode = {
  dark: {
    '--el-text-color-primary': '#E5EAF3',
    '--el-text-color-regular': '#CFD3DC',
    '--el-text-color-secondary': '#A3A6AD',
    '--el-text-color-placeholder': '#8D9095',
    '--el-text-color-disabled': '#6C6E72',
  },
  default: Object.keys(allColor).reduce((acc, cur) => {
    if (cur.startsWith('--el-text-color')) {
      acc[cur] = allColor[cur]
    }
    return acc
  }, {}),
}

export const elFillColorWithMode = {
  dark: {
    '--el-fill-color': '#303030',
    '--el-fill-color-light': '#262727',
    '--el-fill-color-lighter': '#1D1D1D',
    '--el-fill-color-extra-light': '#191919',
    '--el-fill-color-dark': '#39393A',
    '--el-fill-color-darker': '#424243',
    '--el-fill-color-blank': 'transparent',
  },
  default: Object.keys(allColor).reduce((acc, cur) => {
    if (cur.startsWith('--el-fill-color')) {
      acc[cur] = allColor[cur]
    }
    return acc
  }, {}),
}

export const elBorderColorWithMode = {
  dark: {
    '--el-border-color': '#4C4D4F',
    '--el-border-color-light': '#414243',
    '--el-border-color-lighter': '#363637',
    '--el-border-color-extra-light': '#2B2B2C',
    '--el-border-color-dark': '#58585B',
    '--el-border-color-darker': '#636466',
  },
  default: Object.keys(allColor).reduce((acc, cur) => {
    if (cur.startsWith('--el-border-color')) {
      acc[cur] = allColor[cur]
    }
    return acc
  }, {}),
}

