<template>
  <SkTableSelectTags @click="preBind()" v-model="showDataVm" :prop="{ label: 'name' }"></SkTableSelectTags>
  <SkAppDialog v-model="showdialog" :title="props.title" :before-close="beforeClose">
    <SkUserTablesSelect v-model="data" class="h-40em"></SkUserTablesSelect>
    <template #footer>
      <el-button type="primary" @click="doBindUser">确定</el-button>
    </template>
  </SkAppDialog>
</template>

<script setup lang="ts">
import { User } from '@skzz-platform/api/system/user'
import { SkAppDialog, SkUserTablesSelect } from '@skzz/platform'
import { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { SkTableSelectTags } from '@skzz/platform'


const props = defineProps({
  title: {
    type: String,
    default: '绑定操作人',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  showData: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
})
const emit = defineEmits(['doBindUser', 'update:modelValue', 'update:data', 'update:showData'])
const showdialog = useVModel(props, 'modelValue', emit)
const data = useVModel(props, 'data', emit)
const showDataVm = useVModel(props, 'showData', emit)


function beforeClose (done: () => void) {
  data.value = []
  done()
}

function doBindUser () {
  emit('doBindUser')
}
function preBind () {
  data.value = showDataVm.value
  showdialog.value = true
}
</script>

<style lang="scss" scoped></style>