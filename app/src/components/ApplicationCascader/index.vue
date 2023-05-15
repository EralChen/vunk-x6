<script lang="ts" setup>
import { CascaderValue, ElAvatar, ElCascaderPanel } from 'element-plus'
import { PropType, ref } from 'vue'
import { useModelComputed } from '@vunk/core/composables'
import { rTAInfo } from '@skzz-platform/api/login'
import { ApiReturnType } from '@vunk/core'
import { useUserStore } from '@skzz-platform/stores/user'
import { useUpdateApplictionEvent } from '@/composables'
const props = defineProps({
  size: null,
  modelValue: {
    type: Array as PropType<CascaderValue>,
    default: undefined,
  },
})
const emit = defineEmits(['update:modelValue'])
const userStore = useUserStore()
const { addListener } = useUpdateApplictionEvent()
const cascaderValue = useModelComputed({
  default: [] as string[],
  key: 'modelValue',
}, props, emit) 

const { tenantId, applicationId } = userStore.getPuppet()
const options = ref<ApiReturnType<typeof rTAInfo>['tenants']>([])


const appChange = async ([tenantId, applicationId]: string[]) => {
  await userStore.setPuppet({
    applicationId,
    tenantId,
  })
  window.location.reload()
}

r()
addListener(r)
function r () {
  rTAInfo().then(res => {
    if (res) {
      options.value = res.tenants.filter(t => t.applications.length > 0)
    }
    cascaderValue.value = [
      tenantId, applicationId, 
    ]
  })
}

</script>
<template>
  <ElDropdown  :trigger="'click'"  :placement="'bottom-end'"
    v-if="options.length"
  >
   
    <ElAvatar :size="size"  class="cursor-pointer">
      <span class="f-xxs">App</span>

    </ElAvatar>
    <template #dropdown>
      <div class="w-500px application-cascader-panel-x">
        <ElCascaderPanel 
          v-model="cascaderValue"
          @change="appChange"
          :border="false"
          :options="options"
          :props="{
            expandTrigger: 'hover',
          }" 
        />
      </div>
    </template>
  </ElDropdown>
</template>
<style>
.application-cascader-panel-x .el-cascader-menu{
  width: 50%;
}
</style>