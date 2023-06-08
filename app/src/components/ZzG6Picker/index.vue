<template>
  <ElDialog
    v-model="dialogVisible"
    :append-to-body="true"
    title="选择退回节点"
    :before-close="beforeClose"
  >
    <div style="height: 40vh;">
      <ZzG6Editor
        :mode="'preview'"
        :model-value="model"
        @nodeselectchange="nodeSelectChange"
      ></ZzG6Editor>
    </div>
    <ElForm
      ref="formNode"
      label-position="top"
      :rules="rules"
      :model="formModel"
    >
      <ElFormItem
        label="理由"
        prop="memo"
      >
        <el-input
          v-model="formModel.memo"
          type="textarea"
        />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton
        type="primary"
        @click="doBesure"
      >
        确定
      </ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import ZzG6Editor from '@/components/ZzG6Editor/index.vue'
import { GraphData, IG6GraphEvent, Node } from '@antv/g6'
import { rInstanceList, rWorkflowNodeRaw } from '@skzz-platform/api/system/workflow'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { PropType, computed, reactive, ref, watch } from 'vue'

const props = defineProps({
  flowInstId: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  selectedNode: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  memo: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:visible', 'update:selectedNode', 'besure', 'update:memo'])
const model = ref({} as any)
const formNode = ref<InstanceType<typeof ElForm>>()
const rules = ref<FormRules>({
  memo: [
    { required: true, message: '请输入理由', trigger: 'blur' },
  ],
})

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
})

const memoCpd = computed({
  get: () => props.memo,
  set: (val) => emit('update:memo', val),
})
// 这合理吗？？？
const formModel = reactive({
  memo: memoCpd,
})

let selectedItems: GraphData

const nodeSelectChange = (e: IG6GraphEvent) => {
  selectedItems = e.selectedItems as GraphData
  emit('update:selectedNode', selectedItems.nodes)
}

async function r () {
  if (!props.flowInstId) return
  const res = await rInstanceList(undefined, undefined, props.flowInstId)
  const rows = res.rows[0]
  const raws = await rWorkflowNodeRaw({
    itemId: rows.itemId,
    flowInstId: props.flowInstId,
  })

  model.value = raws as GraphData
}

watch(() => props.flowInstId, r, { immediate: true })

// TODO 递归查找父节点
// function findAncestorNode (data: GraphData, startNode: NodeModel) {
//   const edges = data.edges
//   if (!edges) return
//   for (const edge of edges) {
//   }

// }

const doBesure = async () => {
  if (!selectedItems?.nodes) {
    ElMessage.warning('请选择一个节点！')
    return
  }
  if (selectedItems.nodes?.length !== 1) {
    ElMessage.warning('请选择一个节点！')
    return
  }

  if ((selectedItems.nodes[0] as unknown as Node).getModel().auditStatus !== 1) {
    ElMessage.warning('无法退回到未审批的节点！')
    return
  }
  formNode.value?.validate()
    .then(() => {
      emit('besure')
    })
    .catch(err => {
      // console.log(err)
    })
  
}

function beforeClose (done: () => void) {
  memoCpd.value = ''
  done()
}

defineExpose({
  r,
})
</script>

<style scoped>

</style>