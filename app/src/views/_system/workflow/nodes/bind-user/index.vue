<template>
  <!-- <div>
    <el-button type="primary" @click="preBind(item)">绑定</el-button>
  </div> -->
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
type Row = Partial<WorkflowNode>
const bindState = reactive({
  nodeId: '',
  data: [] as WorkflowNode[],
})
function preBind (row: Row) {
  bindState.nodeId = row.id || ''
}
function bindOpers () {
  bindOpersToNode(
    bindState.nodeId,
    bindState.data.map(item => item.id),
  ).then(() => {
    // r()
    bindState.nodeId = ''
  })
}

</script>

<style lang="scss" scoped></style>