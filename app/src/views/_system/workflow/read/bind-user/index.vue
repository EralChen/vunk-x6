<template>
  <div>
    <div>
      <div>已绑定用户：</div>
      <div>{{ data.map(item => item?.name).join('、') }}</div>
    </div>
    <el-button type="primary" @click="preBind()">绑定</el-button>
  </div>

  <SkAppDialog v-model="showdialog" :title="props.title">
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

const props = defineProps({
  title: {
    type: String,
    default: '绑定操作人',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
})
const emit = defineEmits(['doBindUser', 'update:modelValue', 'update:data'])
const showdialog = useVModel(props, 'modelValue', emit)
const data = useVModel(props, 'data', emit)


function doBindUser () {
  emit('doBindUser')
}
function preBind () {
  showdialog.value = true
}
</script>

<style lang="scss" scoped></style>