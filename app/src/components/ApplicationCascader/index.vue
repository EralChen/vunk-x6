<script lang="ts" setup>
import { CascaderValue, ElAvatar, ElCascaderPanel } from 'element-plus'
import { PropType, ref } from 'vue'
import { useModelComputed } from '@vunk/core/composables'
import { rTAInfo } from '@skzz-platform/api/login'
import { ApiReturnType } from '@vunk/core'
import { useUserStore } from '@skzz-platform/stores/user'
const props = defineProps({
  size: null,
  modelValue: {
    type: Array as PropType<CascaderValue>,
    default: undefined,
  },
})
const emit = defineEmits(['update:modelValue'])

const cascaderValue = useModelComputed({
  default: [] as string[],
  key: 'modelValue',
}, props, emit) 


const options = ref<ApiReturnType<typeof rTAInfo>['tenants']>([])
rTAInfo().then(res => {
  options.value = res.tenants
  cascaderValue.value = [res.defaultTenantId, res.defaultApplicationId]
})

</script>
<template>
  <ElDropdown  :trigger="'click'"  :placement="'bottom-end'">
   
    <ElAvatar :size="size"  class="cursor-pointer">
      <span class="f-xxs">App</span>

    </ElAvatar>
    <template #dropdown>
      <div class="w-500px application-cascader-panel-x">
        <ElCascaderPanel 
          v-model="cascaderValue"
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