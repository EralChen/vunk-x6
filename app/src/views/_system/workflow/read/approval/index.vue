<template>
  <ElFormItem label="审批" v-show="isFlowStart && (hasApprovelAuth || hasAssistAuth)">
    <div mt-page mb-page w-100>
      <el-input type="textarea" v-model="memo"></el-input>
    </div>
    <el-button type="primary" @click="doApprovel(WorkFlowNodeState.通过, 'pass')">通过</el-button>
    <el-button v-show="nodeModelCp.id && nodeModelCp.auditStatus" type="success"
      @click="doApprovel(WorkFlowNodeState.驳回, 'th')">退回</el-button>
    <el-button type="warning" @click="doApprovel(WorkFlowNodeState.驳回, 'bh')">驳回</el-button>
  </ElFormItem>
</template>

<script setup lang="ts">
import { NodeModel } from '@zzg6/flow/components/editor/src/types'
import { PropType, computed, ref } from 'vue'
import { User } from '@skzz-platform/api/system/user'
import { WorkFlowNodeState, doApproveNode } from '@skzz-platform/api/system/workflow'
import { getCurrentNodeId } from '../utils'
import { useUserStore } from '@skzz-platform/stores/user'


const props = defineProps({
  flowId: {
    type: String,
    required: true,
  },
  isFlowStart: {
    type: Boolean,
    default: false,
  },
  nodeModel: {
    type: Object as PropType<NodeModel<User>>,
    default: () => ({}),
  },
  currentNodeInstIds: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})
const emit = defineEmits(['approvalSuccess'])

const userStore = useUserStore()
const memo = ref('') // 审批意见

const nodeModelCp = computed(() => props.nodeModel)
const currentNodeInstIdsCp = computed(() => props.currentNodeInstIds)

const hasApprovelAuth = computed(() => judgeAuth('opers'))
const hasAssistAuth = computed(() => judgeAuth('assistOpers'))
/**
 * 是否有选中节点的操作权限
 * @param key 
 */
function judgeAuth (key: 'opers' | 'assistOpers') {
  let opers = nodeModelCp.value[key]
  const ids = opers?.map(item => item.id + '')
  return ids?.includes(userStore.getUserInfo().id + '')
}

/**
 * 审批  
 * 1. 驳回逻辑为直接将整个流程中已审批的流程全部退回，传的为实例id,字段为 nodeInstId  
 * 2. 退回逻辑，指定某个节点，退回到该节点，传的是定义的id,字段为 backNodeId  
 * 3. auditStatus 用来判断是否审批过，用来控制退回按钮是否出现
 */
function doApprovel (type: WorkFlowNodeState, e: string) {
  let currentBackId
  let currentNodeId
  if (e === 'bh') {
    currentNodeId = currentNodeInstIdsCp.value[0]
  } else {
    currentNodeId = getCurrentNodeId(currentNodeInstIdsCp.value, nodeModelCp.value)
    if (!currentNodeId) return
  }

  if (e === 'th') {
    currentBackId = nodeModelCp.value.id
  }
  doApproveNode(
    props.flowId,
    type,
    memo.value,
    currentNodeId,
    currentBackId,
  ).then(() => {
    emit('approvalSuccess')
  })
}

</script>

<style lang="scss" scoped></style>