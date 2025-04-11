<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkfInformation } from '@vunk/form'
import { VkfInformation } from '@vunk/form'
import { VkInformationTemplates } from '@vunk-x6/components/information-templates'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { VkNodeHeader } from '@vunk-x6/components/node-header'
import { defaultAttrs } from '@vunk-x6/components/port'
import { fieldInformationItem } from '@vunk-x6/components/register-node'
import { VkStartIcon } from '@vunk-x6/icons/start'
import { ElCard } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { defaultData, RegisterStartNodePort } from './const'
import Drawer from './drawer.vue'

defineOptions({
  name: 'VkRegisterStartNode',
})

const nodeData = cloneDeep(defaultData)

const formItems: __VkfInformation.FormItem[] = [
  {
    ...fieldInformationItem,
    label: '输入',
    prop: 'input',
  },
]

const ports: PortManager.PortMetadata[] = [
  {
    group: 'activeBottom',
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
    :default-instance-data="nodeData"
  >
    <template #default="{ data, node }">
      <ElCard class="vk-register-start-node" shadow="hover">
        <template #header>
          <VkNodeHeader
            v-model:title="data.label"
            :node="node"
          >
            <template #icon>
              <VkStartIcon color="var(--el-color-success)"></VkStartIcon>
            </template>
          </VkNodeHeader>
        </template>

        <VkfInformation
          :data="data"
          :form-items="formItems"
        >
          <VkInformationTemplates />
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
  min-width: 380px;
}
</style>
