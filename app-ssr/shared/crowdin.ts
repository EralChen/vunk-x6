import type { NormalObject } from '@vunk/core'
import type { FlattenedTreeNode } from '@vunk/shared'

export enum CrowdinFileLang {
  zhCN = 'zh-CN',
  enUS = 'en-US',
}
export enum CrowdinFilePath {
  menus = 'pages/menus.json',
}

export interface CrowdinFile<S extends NormalObject = NormalObject> {
  lang: string
  path: string
  basename: string
  source: S
}

export interface Crowdin {
  [CrowdinFilePath.menus]: MenuRaw[]
}

export interface CrowdinFileLangMedia {
  label: string
  value: CrowdinFileLang
  glob: Record<string, () => Promise<NormalObject>>
}

export interface CrowdinFile<S extends NormalObject = NormalObject> {
  lang: string
  path: string
  basename: string
  source: S
}

export interface MenuRaw extends FlattenedTreeNode {
  label: string
}
