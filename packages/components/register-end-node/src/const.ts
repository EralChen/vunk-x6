import type { NodeData } from './types'

export const RegisterEndNodePort = {
  input: 'input',
} as const

export enum OutputMode {
  returnVariables = 'returnVariables',
  returnText = 'returnText',
}

export const outputModeOptions = [
  {
    label: '返回变量',
    value: OutputMode.returnVariables,
  },
  {
    label: '返回文本',
    value: OutputMode.returnText,
  },
]

export const outputModeMap = outputModeOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<OutputMode, typeof outputModeOptions[number]>)

export const defaultData: NodeData = {
  output: [
    {
      name: 'output',
      type: 'string',
    },
  ],
  outputMode: OutputMode.returnText,
  textTemplate: '{{output}}',
}
