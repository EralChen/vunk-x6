import type { PortManager } from '@antv/x6/lib/model/port'
import type { defaultGroups } from './const'

export type Groups = Record<string, PortManager.PortMetadata>

export type DefaultGroup = keyof typeof defaultGroups
