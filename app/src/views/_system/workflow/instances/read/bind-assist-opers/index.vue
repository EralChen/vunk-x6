<template>
  <ElFormItem v-show="nodeModelCp.id && isFlowStart && nodeModelCp.isCurrentNode" :label="`绑定协办人`">
    <BindUser v-model:show-data="showData" v-model="showdialog" v-model:data="nodeModelCp.assistOpers"
      @doBindUser="bindAssOpers"></BindUser>
  </ElFormItem>
</template>

<script setup lang="ts">
import { bindAssistOperToNode } from '@skzz-platform/api/system/workflow'
import { PropType, computed, ref, watch } from 'vue'
import { User } from '@skzz-platform/api/system/user'
import BindUser from '../../../bind-user/index.vue'
import { NodeModel } from '@zzg6/flow/components/editor/src/types'
import { getCurrentNodeId } from '../utils'


const props = defineProps({

  nodeModel: {
    type: Object as PropType<NodeModel>,
    default: () => ({}),
  },
  isFlowStart: {
    type: Boolean,
    default: false,
  },
  currentNodeInstIds: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})
const emit = defineEmits(['bindSuccess'])
const showdialog = ref(false) // 绑定操作人弹窗显影状态
const showData = ref<User[]>([])// 绑定用户的时候用来展示已绑定的人字段
const nodeModelCp = computed(() => props.nodeModel)
const currentNodeInstIdsCp = computed(() => props.currentNodeInstIds)

watch(() => props.nodeModel, (v) => {
  showData.value = v.assistOpers || []
}, { immediate: true })


/**
 * 绑定协办人  
 * 1. 只能针对未审核的节点实例添加  
 * 2. 只有当前登录用户与待审核节点的审批人一致,才能添加协办人  
 * 3. 必须当前用户和协办用户全部审批完成,节点才会走向下一节点  
 * 4. 协办用户不支持回退,比如现在有ABC三个节点,B节点添加了协办人,全部审批通过后到了C节点,C节点操作回退到了B节点,B节点只会生成节点定义时指定的那些审批人实例  
 * 5. 节点A设置a,b,c三个操作人,a添加了协办人d,那么a,d都会被标记成协办人,后台把操作人剔除了所以看不见
 */
function bindAssOpers () {
  let currentNodeId = getCurrentNodeId(currentNodeInstIdsCp.value, nodeModelCp.value)
  if (!currentNodeId) return
  const ids = nodeModelCp.value.assistOpers?.map(item => item.id) || []
  if (!nodeModelCp.value.nodeInstId) return
  bindAssistOperToNode(
    nodeModelCp.value.nodeInstId,
    ids,
  ).then(() => {
    emit('bindSuccess')
    // showData.value = nodeModelCp.value.assistOpers!
    showdialog.value = false
  })
}
</script>

<style lang="scss" scoped></style>