<template>
  <div
    class="add-item flex"
    sk-flex="col-start-center"
  >
    <div
      class="drag-node-item rect"
      draggable="true"
      @dragend="drageEnd($event, MaterialNode.zzRect)"
    ></div>
    <div
      class="drag-node-item circle"
      draggable="true"
      @dragend="drageEnd($event, MaterialNode.zzCircle)"
    ></div>
    <div
      class="drag-node-item diamond"
      draggable="true"
      @dragend="drageEnd($event, MaterialNode.zzDiamond)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { IPoint, Util } from '@antv/g6'
import { useGraph } from '../ctx'
import { MaterialNode, nodeStyleMap } from '../Nodes/ctx'

const graph = useGraph()

const addNode = (point: IPoint, type: MaterialNode) => {
  
  graph?.value.addItem('node', {
    id: Util.uniqueId(),
    x: point.x,
    y: point.y,
    type,
    ...nodeStyleMap[type],
  })
}

const drageEnd = (e: DragEvent, type: MaterialNode) => {
  const point = graph?.value.getPointByClient(e.x, e.y)

  if (point)
    addNode(point, type)
}

</script>

<style lang="scss" scoped>
.add-item{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  background: #ccc;
  padding: 20px;
}
.drag-node-item{
  width: 40px;
  height: 40px;
  height: 40px;
  border: 1px solid #000;
  cursor: pointer;
  &:not(:last-child){
    margin-bottom: 20px;
  }
}
.circle{
  border-radius: 50%;
  background: transparent;
}
.diamond{
  border: none;
  background: url("data:image/svg+xml,%3Csvg preserveAspectRatio='none' viewBox='0 0 246 82' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath vector-effect='non-scaling-stroke' d='M3.162 41L123 1.054 242.838 41 123 80.946 3.162 41z' fill='' fill-opacity='.6' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")
}
</style>