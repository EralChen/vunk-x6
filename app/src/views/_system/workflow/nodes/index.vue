<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { rWorkflowNode, WorkflowNode, dWorkflowNodes,cuWorkflowNode } from '@skzz-platform/api/system/workflow'
import { SkAppDialog } from '@skzz/platform'
import CuForm from './cu-form/index.vue'
import { setData, VkDuplex } from '@vunk/core'
import { pickObject } from '@vunk/core/shared/utils-object'

type Row = Partial<WorkflowNode>
 
const props = defineProps({
  flowId: {
    type: String,
    required: true,
  },
})

const data = ref<WorkflowNode[]>([])
const idToNode = computed(() => {
  return data.value.reduce((acc, cur) => {
    acc[cur.id] = cur
    return acc
  }, {} as {[key: string]: WorkflowNode})
})
const getNodePath = (node: WorkflowNode) => {

  const pre = node.prevNodes.reduce((acc, cur) => {

    if (idToNode.value[cur]) {
      acc.push(idToNode.value[cur])
    }
    return acc
  }, [] as WorkflowNode[])
  const next = node.nextNodes.reduce((acc, cur) => {
    if (idToNode.value[cur]) {
      acc.push(idToNode.value[cur])
    }
    return acc
  }, [] as WorkflowNode[]) 
  const data = [node.name]
  if (pre.length) {
    data.unshift(pre.map(item => item.name).join('、'))
  }
  if (next.length) {
    data.push(next.map(item => item.name).join('、'))
  }

  return  data.join(' -> ')
}


const cuState = reactive({
  type: '' as 'c' | 'u' | '',
  data: {} as Row,
})

watch(() => props.flowId, r, { immediate: true })
function r () {
  rWorkflowNode({
    flowId: props.flowId,
  }).then((res) => {
    data.value = res.rows
  })
}
function d (ids: string[]) {
  dWorkflowNodes(ids).then(() => {
    r()
  })
}
function precI () {
  cuState.type = 'c'
  cuState.data = {}
}
function preuI (row: Row) {
  cuState.type = 'u'
  cuState.data = {...row}
}
function cuI () {
  cuWorkflowNode({
    ...cuState.data,
    flowId: props.flowId,
  }).then(() => {
    r()
    cuState.type = ''
  })
}
</script>
<template>
  <PageOver>

    <VkDuplex class="h-full" :gap="'var(--gap-page)'" gap-main-x>
      <template #one>
        <div sk-flex="row-between-center">
        <span></span>
        <ElButton type="primary"
          @click="precI"
        >新建</ElButton>
      </div>
      </template>

      <ElScrollbar>
        <div sub:mt-page>
        
        <el-descriptions v-for="(item, index) of data" :key="index" :title="getNodePath(item)" border
        >
          <template #extra>
            <el-button type="primary" 
              @click="preuI(item)"
            >修改</el-button>
            <el-button @click="d([item.id])"
              :type="'danger'"
            >删除</el-button>
          </template>
          <el-descriptions-item v-for="(v, k) of pickObject(item, {
            includes: ['name', 'id', 'isJointly',  'nextNodes', 'prevNodes']
          })" :key="k" :label="k + ''">
            {{ v }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      </ElScrollbar>



    </VkDuplex>

    <SkAppDialog 
      :modelValue="!!cuState.type"
      :title="cuState.type === 'c' ? '新建' : '编辑'"
      @update:modelValue="cuState.type = ''"
    >
      <CuForm
        :nodes="data"
        :type="cuState.type"
        :data="cuState.data"
        @setData="setData(cuState.data, $event)"
        @submit="cuI"
      ></CuForm>
    </SkAppDialog>

  </PageOver>
</template>
