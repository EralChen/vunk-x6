<template>
  <div class="h-page overflow-hidden">
    <GraphCp
      :ops="ops"
      @load="def.resolve"
    >
      <Material></Material>
      <RightPanel></RightPanel>
      <Menu></Menu>
    </GraphCp>
  </div>
</template>

<script setup lang="ts">
import { Graph, Grid, Minimap } from '@antv/g6'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { SGraphOptions } from './Graph/ctx'
import GraphCp from './Graph/index.vue'
import RightPanel from './RightPanel/index.vue'
import Material from './Material/index.vue'
import Menu from './Menu/index.vue'
import { genRect } from './Nodes'


const def = new Deferred()
const minimap = new Minimap({
  size: [100, 100],
  className: 'minimap',
  type: 'delegate',
})
const grid = new Grid()

genRect()
const ops: SGraphOptions = {
  plugins: [grid, minimap],
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

async function init () {
  const graph = await def.promise as Graph
  const data = {
    nodes: [
      // {'id': '0', 'label': 'n0', 'class': 'c0','x': 1000, 'y': -100, description: '描述' },
      // {'id': '1', 'label': 'n1', 'class': 'c0','x': 300, 'y': -10 },
    ],
    edges: [
      // {'source': '0', 'target': '1', 'label': 'e0-1', 'weight': 1 },
      // {'source': '0', 'target': '2', 'label': 'e0-2', 'weight': 2 },
    ],
  }

  graph.data(data)
  graph.render()
}
init()

</script>

<style lang="scss" scoped>
.g6-x{
  background: #fff;
}
:deep(.minimap){
  position: absolute;
  left: 0;
  bottom: 0;
}
:deep(.g6-grid-container) {
  z-index: 0!important;
  pointer-events: none;
}


</style>
