<template>
  <div class="right-panel">
    <el-button @click="alignLayout">对齐</el-button>
  </div>
</template>

<script setup lang="ts">
import { useGraph } from '../ctx'

const graph = useGraph()
const alignLayout = async () => {
  graph?.value.layout()
}
</script>

<style lang="scss" scoped>
.right-panel{
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  background: #ccc;
}
</style>