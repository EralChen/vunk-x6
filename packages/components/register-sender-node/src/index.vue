<script lang="ts">
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkRegisterSenderNode',
  props,
  emits,
  setup (props, { emit }) {
    return {}
  },
})
</script>

<template>
  <VkNodeComponent
    shape="VkRegisterSenderNode"
    :auto-size="true"
  >
    <template #default="{ data }">
      <ElCard class="vk-register-sender-node" shadow="hover">
      </ElCard>
    </template>
  </vknodecomponent>
</template>
