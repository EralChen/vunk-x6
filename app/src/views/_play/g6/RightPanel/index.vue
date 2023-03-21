<template>
  <div class="abs" sk-flex="col">
    <div class="right-info">
      <div class="h-1em">当前节点标签: </div>
      <div class="h-2em line-height-2em">{{ data.label }}</div>
      <div class="h-1em">当前节类型: </div>
      <div class="h-2em">{{ props.node?._cfg.type }}</div>
    </div>
    <div class="right-panel" sk-flex="col">
      <el-button @click="alignLayout">对齐</el-button>
      <el-button @click="delItem">删除</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Node } from '@antv/g6'
import { computed, PropType, nextTick } from 'vue'
import { useGraph } from '../ctx'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  node: {
    type: Object as PropType<any>,
  },
})

const data = computed({
  get: () => {
    console.log(props.node?._cfg.type)

    if (!props.node?.destroyed)
      return props.node?.getModel() || {}
    else {
      return {}
    }
  },
  set: (v) => emit('update:modelValue', v as unknown as Node),
})
const graph = useGraph()
const alignLayout = async () => {
  graph?.value.layout()
}

const delItem = () => {
  nextTick(() => {
    if (data.value.id) {

      graph?.value.removeItem(data.value.id)
      data.value = {}
    }

  })

}
</script>

<style lang="scss" scoped>
.abs {
  position: absolute;
  top: 0;
  right: 0;
  background: #ccc;
  padding: 20px;
  width: 160px;

}
.right-panel {
  
  
  & :not(:last-child) {
    margin-bottom: 10px;
  }
  & .el-button {
    margin-left: 0;
  }
}
.right-info {
  margin-bottom: 20px;
  word-break: break-all;
}
</style>
