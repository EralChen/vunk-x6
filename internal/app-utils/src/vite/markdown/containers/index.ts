import { Options } from '../preWrapper'
import { ContainerOptions, basicContainerPlugin } from './basic'
import { demoContainerPlugin } from './demo'
import type MarkdownIt from 'markdown-it'

export const containerPlugin = (
  md: MarkdownIt,
  options: Options = {
    hasSingleTheme: true,
  },
  containerOptions?: ContainerOptions,
) => {
  
  basicContainerPlugin(md, options, containerOptions)
  
  demoContainerPlugin(md)


}