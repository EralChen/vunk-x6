<template>
  <template v-if="nodeFormItem.length">
    <ElDivider>表单</ElDivider>
    <SkAppForm :rules="rules" :el-ref="def.resolve" :formItems="nodeFormItem" :data="nodeFormData"
      @setData="setData(nodeFormData, $event)">
    </SkAppForm>
    <ElDivider>表单 - end</ElDivider>
  </template>
  <ElFormItem label="审批" v-show="isFlowStart && (hasApprovelAuth || hasAssistAuth)">
    <div mt-page mb-page w-100>
      <el-input type="textarea" v-model="memo"></el-input>
    </div>
    <el-button v-if="!nodeModelCp.auditStatus" type="primary"
      @click="doApprovel(WorkFlowNodeState.通过, 'pass')">通过</el-button>
    <el-button v-show="nodeModelCp.id && nodeModelCp.auditStatus" type="success"
      @click="doApprovel(WorkFlowNodeState.驳回, 'th')">退回</el-button>
    <el-button type="warning" @click="doApprovel(WorkFlowNodeState.驳回, 'bh')">驳回</el-button>
  </ElFormItem>
</template>

<script setup lang="ts">
import { NodeModel } from '@zzg6/flow/components/editor/src/types'
import { PropType, computed, ref, watch } from 'vue'
import { User } from '@skzz/platform/api/system/user'
import { WorkFlowNodeState, doApproveNodeWithForm, rFormInfo } from '@skzz/platform/api/system/workflow'
import { getCurrentNodeId } from '../utils'
import { useUserStore } from '@skzz/platform/stores/user'
import { cloneDeep } from 'lodash'
import { SkAppForm } from '@skzz/platform'
import { setData } from '@vunk/core'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { CoreFormItem } from '@skzz/platform/components/app-form/src/types'


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
    type: Object as PropType<NodeModel>,
    default: () => ({}),
  },
  currentNodeInstIds: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  formTable: {
    type: String,
    default: '',
  },
  itemId: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['approvalSuccess'])

const userStore = useUserStore()
// 审批意见
const memo = ref('')

const nodeModelCp = computed(() => props.nodeModel)
const currentNodeInstIdsCp = computed(() => props.currentNodeInstIds)

const hasApprovelAuth = ref(false)
const hasAssistAuth = ref(false)

const nodeFormData = ref({})
// CoreFormItem[] 按理将应该是这个类型，但是会有实例过深且有无限可能的问题
const nodeFormItem = ref<any>([])
const rules = ref<FormRules>({})

const formTableCp = computed(() => props.formTable)

const def = new Deferred<FormInstance>()
/**
 * 是否有对选中节点的审批权限
 * 节点的操作人中是否有当前登录用户
 * @param opers 
 */
function judgeAuth (opers: User[]) {
  const ids = opers?.map(item => item.id + '')
  return !!ids?.includes(userStore.getUserInfo().id + '')
}

function genRules (formItems: CoreFormItem[]) {
  formItems.forEach(item => {
    (item as any).key = item.prop
    rules.value[item.prop] = [{ required: true, message: `${item.label}不能为空！` }]
  })

}
// 点击节点时，获取填写的表单数据
async function getFormInfn (flowInstId?: string) {
  if (flowInstId) {
    const res = await rFormInfo(flowInstId)
    nodeFormData.value = res
  }
}

// 为了和选人显示的内容做区分，要不然关闭选人窗口时会出现按钮不显示的问题
watch(() => props.nodeModel, (v) => {
  hasApprovelAuth.value = judgeAuth(v.opers || [])
  // && v.id !== ov?.id
  if (v && v.formColumns && v.formColumns.show) {
    nodeFormItem.value = cloneDeep(v.formColumns.show) as any
    genRules(nodeFormItem.value)
    getFormInfn(v.nodeInstId)
  } else {
    nodeFormItem.value = []
    nodeFormData.value = {}
  }
}, { immediate: true })
watch(() => props.nodeModel, (v) => {
  hasAssistAuth.value = judgeAuth(v.opers || [])
}, { immediate: true })

/**
 * 审批  
 * 1. 驳回逻辑为直接将整个流程中已审批的流程全部退回，传的为实例id,字段为 nodeInstId  
 * 2. 退回逻辑，指定某个节点，退回到该节点，传的是定义的id,字段为 backNodeId  
 * 3. auditStatus 用来判断是否审批过，用来控制退回按钮是否出现
 */
async function doApprovel (type: WorkFlowNodeState, e: string) {
  const formIns = await def.promise
  try {
    const valid = await formIns.validate()
    if (!valid) {
      ElMessage.warning('请按规则填写表单！')
      return
    }
  } catch (e) {
    ElMessage.warning('请按规则填写表单！')
    return
  }
  let currentBackId
  let currentNodeId
  if (e === 'bh') {
    currentNodeId = currentNodeInstIdsCp.value[0]
  } else {
    currentNodeId = getCurrentNodeId(currentNodeInstIdsCp.value, nodeModelCp.value)
    if (!currentNodeId) {
      ElMessage.warning('nodeInstId为空！')
      return
    }
  }

  if (e === 'th') {
    currentBackId = nodeModelCp.value.id
  }
  doApproveNodeWithForm(
    {
      itemId: props.flowId,
      status: type,
      memo: memo.value,
      nodeInstId: currentNodeId,
      backNodeId: currentBackId,
    },
    nodeFormData.value,
    props.itemId,
    formTableCp.value,
  ).then(() => {
    emit('approvalSuccess')
  })
}

</script>

<style lang="scss" scoped></style>