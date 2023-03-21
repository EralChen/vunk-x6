<template>
  <div ref="menuNode">
    <div>删除</div>
  </div>
</template>

<script setup lang="ts">
import { Menu } from '@antv/g6'
import { nextTick, onMounted, ref } from 'vue'
import { useGraph } from '../ctx'

const menuNode = ref<HTMLDivElement>()
const graph = useGraph()

const menu = new Menu({
  offsetX: 6,
  offsetY: 10,
  itemTypes: ['node'],
  getContent () {
    if (menuNode.value)
      return menuNode.value
    else
      return ''
  },
  handleMenuClick (target, item) {
    console.log(target, item)
  },
})
onMounted(() => {
  nextTick(() => graph?.value.addPlugin(menu))
})
</script>

<style scoped>

</style>