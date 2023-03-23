<script lang="ts" setup>
import { GraphOptions } from '@antv/g6'

import { ZzGraph } from '@zzg6/flow/components/graph'
import { ZzGrid } from '@zzg6/flow/components/grid'
import { ZzMinimap } from '@zzg6/flow/components/minimap'
import { ZzRender } from '@zzg6/flow/components/render'
import { ZzToolBar } from '@zzg6/flow/components/tool-bar'
import { ref } from 'vue'
import '@zzg6/flow/index.css'

const data = ref({
  nodes: [
    {'id': '0', 'label': 'n0', 'class': 'c0','x': 1000, 'y': -100, description: '描述' },
    {'id': '1', 'label': 'n1', 'class': 'c0','x': 300, 'y': -10 },
  ],
  edges: [
    {'source': '0', 'target': '1', 'label': 'e0-1', 'weight': 1 },
    // {'source': '0', 'target': '2', 'label': 'e0-2', 'weight': 2 },
  ],
})
const defaultOptions: Partial<GraphOptions> = {
  modes: {
    default: [
      'click-select',
      'drag-canvas', 
      'zoom-canvas',
      // {
      //   type: 'drag-node',
      //   shouldBegin: e => {
      //     if (e.target.get('name') === 'link-point-right') return false
      //     if (e.target.get('name') === 'link-point-left') return false
      //     return true
      //   },
      // },
      {
        type: 'create-edge',
        trigger: 'drag',
        // shouldBegin: e => {
        //   if (e.target && e.target.get('name') !== 'link-point-right') return false
        //   return true
        // },
        // shouldEnd: e => {
        //   if (e.target && e.target.get('name') !== 'link-point-left') return false
        //   if (e.target) {
        //     e.target.set('links', e.target.get('links') + 1)
        //     return true
        //   }
        //   return true
        // },
      },
    ],
    altSelect: [
      {
        type: 'click-select',
        trigger: 'alt',
      },
      'drag-node',
    ],
  },
  layout: {
    type: 'dagre',
    rankdir: 'LR',
    align: 'UL',
    controlPoints: true,
    nodesepFunc: () => 1,
    ranksep: 100,
  },
  defaultEdge: {
    style: {
      endArrow: {
        path: 'M 0,0 L 8,4 L 8,-4 Z',
        fill: '#e2e2e2',
      },
      radius: 20,
    },
    size: 2,
    color: '#000',
    labelCfg: {
      autoRotate: true,
    },
  },
  nodeStateStyles: {
    selected: {
      stroke: '#5B8FF9',
      lineWidth: 3,
    },
  },
}
</script>
<template>
  <div class="h-page overflow-hidden">
    <ZzGraph
      :defaultOptions="defaultOptions"
    >
      <ZzGrid></ZzGrid>
      <ZzMinimap></ZzMinimap>
      <ZzToolBar></ZzToolBar>
      <ZzRender></ZzRender>
    </ZzGraph>
  </div>
</template>
