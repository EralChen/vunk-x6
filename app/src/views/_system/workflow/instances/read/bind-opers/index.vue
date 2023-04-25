<template>
  <ElFormItem v-show="nodeModelCp.id" :label="`绑定人员`">
    <BindUser :show-data="showData" v-model="showdialog" v-model:data="nodeModelCp.opers" @doBindUser="bindOpers">
    </BindUser>
  </ElFormItem>
</template>

<script setup lang="ts">
import { bindOpersToNode } from '@skzz-platform/api/system/workflow'
import { PropType, computed, ref, watch } from 'vue'
import { User } from '@skzz-platform/api/system/user'
import BindUser from '../../bind-user/index.vue'
import { NodeModel } from '@zzg6/flow/components/editor/src/types'


const props = defineProps({
  nodeModel: {
    type: Object as PropType<NodeModel>,
    default: () => ({}),
  },
})
const emit = defineEmits(['bindSuccess'])
const showdialog = ref(false) // 绑定操作人弹窗显影状态
const showData = ref<User[]>([])// 绑定用户的时候用来展示已绑定的人字段
const nodeModelCp = computed(() => props.nodeModel)

watch(() => props.nodeModel, (v) => {
  showData.value = v.opers || []
}, { immediate: true })


/**
 * 绑定操作人,使用节点id
 */
function bindOpers () {
  const ids = nodeModelCp.value.opers?.map((item: any) => item.id) || []
  bindOpersToNode(
    nodeModelCp.value.id,
    ids,
  ).then(() => {
    showdialog.value = false
    // showData.value = nodeModelCp.value.opers!
    emit('bindSuccess')
  })
}
</script>

<style lang="scss" scoped></style>