<template>
  <SkAppDialog :modelValue="!!bindState.nodeId" @update:modelValue="bindState.nodeId = ''" :title="'绑定操作人'">
    <SkUserTablesSelect v-model="bindState.data" class="h-40em"></SkUserTablesSelect>

    <template #footer>
      <el-button size="large" type="primary" @click="bindOpers">确定</el-button>
    </template>

  </SkAppDialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { WorkflowNode, bindOpersToNode } from '@skzz-platform/api/system/workflow'
import { SkUserTablesSelect } from '@skzz-platform/components/user-tables-select'
import { SkAppDialog } from '@skzz/platform'

const bindState = reactive({
  nodeId: '',
  data: [] as WorkflowNode[],
})

function bindOpers () {
  bindOpersToNode(
    bindState.nodeId,
    bindState.data.map(item => item.id),
  ).then(() => {
    bindState.nodeId = ''
  })
}

</script>

<style lang="scss" scoped></style>