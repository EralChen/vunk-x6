import type { NodeData } from './types'
import { FieldType } from '@vunk-x6/shared'

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
      type: FieldType.ArrayObject,
      valueRef: {
        id: 'xxxx',
        name: 'xxx',
      },

    },
  ],
  outputMode: OutputMode.returnText,
  textTemplate: '{{output}}',
}
