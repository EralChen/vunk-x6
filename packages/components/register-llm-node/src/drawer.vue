<script lang="ts" setup>
import type OpenAI from 'openai'
import type { PropType } from 'vue'
import { setData } from '@vunk/core'

import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import DrawerForm from './drawer-form.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  shape: {
    type: String,
    default: 'VkRegisterLlmNode',
  },
  client: {
    type: Object as PropType<OpenAI>,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
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
    <template #title="{ data }">
      <div class="vk-register-llm-node__header">
        <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-LLM-v2.jpg" />
        <span>{{ data.label || '大模型' }}</span>
      </div>
    </template>

    <template #description>
      大模型节点，用于配置模型参数和输入输出
    </template>

    <template #default="{ data, node }">
      <DrawerForm
        :data="data"
        :node="node"
        :client="props.client"
        :api-key="props.apiKey"
        @set-data="setData(data, $event)"
      />
    </template>
  </VkNodeDrawer>
</template>

<style>
.vk-register-llm-node__header {
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.vk-register-llm-node__header img {
  width: 1em;
  height: 1em;
  margin-right: 8px;
}
</style>
