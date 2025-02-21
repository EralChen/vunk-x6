<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkfInformation } from '@vunk/form'
import { VkfInformation } from '@vunk/form'
import { VkfInformationTemplatesDefault } from '@vunk-x6/components/information-templates-default'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { defaultAttrs } from '@vunk-x6/components/port'
import { fieldInfomationItem } from '@vunk-x6/components/register-node'
import { ElCard } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { defaultData, RegisterStartNodePort } from './const'
import Drawer from './drawer.vue'
import Title from './title.vue'

defineOptions({
  name: 'VkRegisterStartNode',
})

const nodeData = cloneDeep(defaultData)

const formItems: __VkfInformation.FormItem[] = [
  {
    ...fieldInfomationItem,
    label: '输入',
    prop: 'input',
  },
]

const ports: PortManager.PortMetadata[] = [
  {
    group: 'right',
    id: RegisterStartNodePort.output,
    attrs: {
      circle: {
        ...defaultAttrs.circle,
        magnetRule: 'active',
      },

    },
  },
]
</script>

<template>
  <VkNodeComponent
    shape="VkRegisterStartNode"
    :auto-size="true"
    :items="ports"
    :data="nodeData"
  >
    <template #default="{ data }">
      <ElCard class="vk-register-start-node" shadow="hover">
        <template #header>
          <Title
            :label="data.label"
          />
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

  <Drawer
    shape="VkRegisterStartNode"
  ></Drawer>
</template>

<style>
.vk-register-start-node {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

.vk-register-start-node{
  min-width: 300px;
}
</style>
