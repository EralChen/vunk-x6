<template>
  <PageOver>
    <ZzG6Editor :model-value="editData" @update:data="e => backData = e" :id-gen-fn="snowFlake" :form-id="formId">
      <template #toolbar>
        <li>
          <el-button type="primary" link size="small" @click="jsonLoad">
            保存
          </el-button>
        </li>
      </template>
    </ZzG6Editor>
  </PageOver>
</template>

<script setup lang="ts">
import { rWorkflowNodes, cWorkflowNodeByJson, WorkflowData, rWorkflow } from '@skzz-platform/api/system/workflow'
import ZzG6Editor from '@/components/ZzG6Editor/index.vue'
import { ref, shallowRef, watch } from 'vue'
import { GraphData, TreeGraphData } from '@antv/g6'
import { snowFlake } from '@skzz-platform/api/basic'

// 用来判断当前操作是编辑还是新增，调用接口的时候做判断
let isEdit = true
const formId = ref('')
const props = defineProps({
  flowId: {
    type: String,
    required: true,
  },
})
/**
 * 为什么分开数据传输，不用v-model？
 * 内部emit是通过g6的事件监听实现的，如果回填和输出是同一个对象，内部监听外部数据变化会触发g6渲染方法，渲染方法会触发g6监听，导致死循环
 */
// 回填数据
const editData = shallowRef({} as WorkflowData)
// 编辑后返回的数据
const backData = shallowRef({} as GraphData | TreeGraphData)

watch(() => props.flowId, r, { immediate: true })
function r () {
  Promise.all([
    rWorkflow({
      flowId: props.flowId,
    }),
    rWorkflowNodes({
      flowId: props.flowId,
    }),
  ]).then(([info, res]) => {
    if (!res.nodes?.length) {
      isEdit = false
    }
    editData.value = res
    if (info.formId)
      formId.value = info.formId
  })
}

function jsonLoad () {
  cWorkflowNodeByJson(props.flowId, backData.value, isEdit)
    .then(() => {
      isEdit = true
    })
}


// onBeforeRouteLeave((to, from, next) => {
//   ElMessageBox.confirm('确定离开吗？未保存数据将消失！', '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//   }).then(() => {
//     next()
//   }).catch(() => {
//     next(false)
//   })
// })
</script>

<style lang="scss" scoped>

</style>