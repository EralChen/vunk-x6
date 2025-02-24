<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkfInformation } from '@vunk/form'
import type { __VkNodeComponent } from '@vunk-x6/components/node-component'
import type { NodeData } from './types'
import { VkfInformation } from '@vunk/form'
import { VkfInformationTemplatesDefault } from '@vunk/form/components/information-templates-default'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { fieldColumnMap, fieldInfomationItem, fieldWithValueInfomationItem } from '@vunk-x6/components/register-node'

import { ElCard } from 'element-plus'
import { watchEffect } from 'vue'
import { RegisterLlmNodePort } from './const'
import { props as dProps } from './ctx'
import Drawer from './drawer.vue'

defineOptions({
  name: 'VkRegisterLlmNode',
})

const props = defineProps(dProps)

watchEffect(() => {
  // eslint-disable-next-line vue/no-mutating-props
  props.client.apiKey = props.apiKey
})

type FormItem = __VkfInformation.FormItem<keyof NodeData>

const formItems: FormItem[] = [
  {
    templateType: 'VkfSelect',
    label: '模型',
    prop: 'modelId',
  },

  {
    label: '输入',
    prop: 'input',
    ...fieldWithValueInfomationItem,
  },

  {
    label: '输出',
    prop: 'output',
    ...fieldInfomationItem,
  },
]

const ports: PortManager.PortMetadata[] = [
  {
    group: 'passiveLeft' as __VkNodeComponent.DefaultGroup,
    id: RegisterLlmNodePort.input,

  },
  {
    group: 'activeRight' as __VkNodeComponent.DefaultGroup,
    id: RegisterLlmNodePort.output,
  },
]
</script>

<template>
  <Drawer
    shape="VkRegisterLlmNode"
    :client="props.client"
    :api-key="props.apiKey"
  />

  <VkNodeComponent
    shape="VkRegisterLlmNode"
    :auto-size="true"
    :items="ports"
  >
    <template #default="{ data }">
      <ElCard class="vk-register-llm-node" shadow="hover">
        <template #header>
          <div class="vk-register-llm-node__header">
            <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-LLM-v2.jpg" />
            <span>{{ data.label || '大模型' }}</span>
          </div>
        </template>

        <VkfInformation
          :data="data"
          :form-items="formItems"
        >
          <VkfInformationTemplatesDefault />
        </VkfInformation>
      </ElCard>
    </template>
  </VkNodeComponent>
</template>

<style>
.vk-register-llm-node {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

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

.vk-register-llm-node {
  min-width: 300px;
}
</style>
