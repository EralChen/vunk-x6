<script lang="ts">
import type { __VkNodeCard } from '@vunk-x6/components/node-card'
import { VkNodeCard } from '@vunk-x6/components/node-card'
import { VkSender } from '@vunk/plus/components/sender'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkRegisterSenderNode',
  components: {
    VkNodeCard,
    VkSender,
  },
  props,
  emits,
  setup (props, { emit }) {
    const ports: __VkNodeCard.Port[] = [
      {
        group: 'passiveTop',
      },
      {
        group: 'activeBottom',
      },
    ]

    return {
      ports,
    }
  },
})
</script>

<template>
  <VkNodeCard
    shape="VkRegisterSenderNode"
    :ports="ports"
    class="vk-register-sender-node"
    :default-data="{
      label: 'Sender',
    }"
    :stop-move-class="['ant-sender-content']"
  >
    <template #default="{ data }">
      <VkSender
        class="vk-node-card-stop__click"
        :auto-size="true"
      ></VkSender>
    </template>
  </VkNodeCard>
</template>

<style>
.vk-register-sender-node{
  min-width: 600px;
}
</style>
