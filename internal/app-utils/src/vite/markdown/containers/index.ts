import { ContainerOptions, basicContainerPlugin } from './basic'
import { demoContainerPlugin } from './demo'
import type MarkdownIt from 'markdown-it'
import { docRoot } from '@lib-env/path'
import { Options } from '../preWrapper'
import { DemoOptions } from '../types'

export const containerPlugin = (
  md: MarkdownIt,
  options: Partial<
    Options & DemoOptions
  > = {},
  containerOptions?: ContainerOptions,
) => {

  const defaultOptions = {
    hasSingleTheme: true,
    root: docRoot,
    ...options,
  }
  
  basicContainerPlugin(md, defaultOptions, containerOptions)
  
  demoContainerPlugin(md, defaultOptions)


}