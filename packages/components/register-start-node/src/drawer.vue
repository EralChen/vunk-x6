<script lang="ts" setup>
import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'

defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  shape: {
    type: String,
    default: 'VkRegisterStartNode',
  },
})

defineEmits({
  'update:modelValue': null,
})
</script>

<template>
  <VkNodeDrawer
    :model-value="modelValue"
    :shape="shape"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #header>
      <div class="vk-register-start-node__header">
        <img
          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-Start-v2.jpg"
        />
        <span>开始</span>
      </div>
    </template>
  </VkNodeDrawer>
</template>
