<template>
  <SkTableSelectTags
    v-model="showDataVm"
    :closable="closable"
    :prop="{ label: 'name' }"
    @click="preBind()"
  />
  <SkAppDialog
    v-model="showdialog"
    :title="props.title"
    :before-close="beforeClose"
    :append-to-body="true"
  >
    <SkUserTablesSelect
      v-model="data"
      class="h-40em"
    />
    <template
      v-if="hasBind"
      #footer
    >
      <el-button
        type="primary"
        @click="doBindUser"
      >
        确定
      </el-button>
    </template>
  </SkAppDialog>
</template>

<script setup lang="ts">
import { User } from '@skzz-platform/api/system/user'
import { SkAppDialog, SkUserTablesSelect , SkTableSelectTags } from '@skzz/platform'
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
  showData: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
  hasBind: {
    type: Boolean,
    default: true,
  },
  closable: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['doBindUser', 'update:modelValue', 'update:data', 'update:showData'])
const showdialog = useVModel(props, 'modelValue', emit)
const data = useVModel(props, 'data', emit)
const showDataVm = useVModel(props, 'showData', emit)


function beforeClose (done: () => void) {
  props.hasBind && (data.value = [])
  done()
}

function doBindUser () {
  emit('doBindUser')
}
function preBind () {
  props.hasBind && ( data.value = showDataVm.value)
  showdialog.value = true
}
</script>

<style lang="scss" scoped></style>