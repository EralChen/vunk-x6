<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkfInformation } from '@vunk/form'
import { VkfInformation } from '@vunk/form'
import { VkfInformationTemplatesDefault } from '@vunk/form/components/information-templates-default'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { ElCard } from 'element-plus'
import { RegisterLlmNodePort } from './const'

defineOptions({
  name: 'VkRegisterLlmNode',
})

const formItems: __VkfInformation.FormItem[] = [
  {
    templateType: 'VkfInput',
    label: '模型ID',
    prop: 'modelId',
  },
  {
    templateType: 'VkfInput',
    label: '提示词',
    prop: 'prompt',
  },
  {
    templateType: 'VkfInputCollection',
    label: '输入',
    prop: 'input',
    summaryLabel (data) {
      return `${data.name}`
    },
    columns: [
      {
        label: '字段',
        prop: 'name',
        templateType: 'VkfInput',
      },
      {
        prop: 'type',
        templateType: 'VkfSelect',
        label: '类型',
        templateProps: {
          options: [
            {
              label: '字符串',
              value: 'string',
            },
          ],
        },
      },
      {
        prop: 'description',
        templateType: 'VkfInput',
        label: '描述',
      },
      {
        prop: 'valueRef.id',
        templateType: 'VkfInput',
        label: '值引用ID',
      },
      {
        prop: 'valueRef.name',
        templateType: 'VkfInput',
        label: '值引用名称',
      },
    ],
  },
  {
    templateType: 'VkfInputCollection',
    label: '输出',
    prop: 'output',
    summaryLabel (data) {
      return `${data.name}`
    },
    columns: [
      {
        label: '字段',
        prop: 'name',
        templateType: 'VkfInput',
      },
      {
        prop: 'type',
        templateType: 'VkfSelect',
        label: '类型',
        templateProps: {
          options: [
            {
              label: '字符串',
              value: 'string',
            },
          ],
        },
      },
      {
        prop: 'description',
        templateType: 'VkfInput',
        label: '描述',
      },
    ],
  },
]

const ports: PortManager.PortMetadata[] = [
  {
    group: 'left',
    id: RegisterLlmNodePort.input,
  },
  {
    group: 'right',
    id: RegisterLlmNodePort.output,
  },
]
</script>

<template>
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
            <span>大模型</span>
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
