<script lang="ts">
import type { __VkNodeCard } from '@vunk-x16/components/node-card'
import type { __VkRegisterNode } from '@vunk-x16/components/register-node'
import type { FormItem, InformationItem } from '@vunk-x16/shared'
import type { __VkfForm, __VkfInformation } from '@vunk/form'
import type { NodeData } from './types'
import { VkNodeCard } from '@vunk-x16/components/node-card'
import { fieldColumnMap } from '@vunk-x16/components/register-node'
import { getValue, setData } from '@vunk/core'
import { VkfForm, VkfInformation } from '@vunk/form'
import { VkSender } from '@vunk/plus/components/sender'
import { defineComponent } from 'vue'
import { defaultData } from './const'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkRegisterSenderNode',
  components: {
    VkNodeCard,
    VkSender,
    VkfInformation,
    VkfForm,
  },
  props,
  emits,
  setup (props, { emit }) {
    const ports: __VkNodeCard.Port[] = [
      // {
      //   group: 'passiveTop',
      // },
      {
        group: 'activeBottom',
      },
    ]
    const cardFormItems: InformationItem[] = [
      {
        templateType: 'VkfInputCollection',
        label: '输出',
        prop: 'output',
        columns: [
          fieldColumnMap.name,
          fieldColumnMap.type,
          fieldColumnMap.description,
        ] as __VkRegisterNode.FieldConlectionColumn[],
      },
    ]

    const drawerFormItems: FormItem<keyof NodeData>[] = [
      {
        templateType: 'VkfInputCollection',
        label: '输出',
        prop: 'output',
        labelPosition: 'top',
        splicable: false,
        readonly: true,
        columns: [
          fieldColumnMap.name,
          fieldColumnMap.type,
          {
            // ...fieldColumnMap.description,
            templateType: 'VkfInput',
            prop: 'description',
            label: '描述',
          },

        ] as __VkRegisterNode.FieldConlectionColumn[],
      },
    ]

    return {
      ports,
      cardFormItems,
      defaultData,
      getValue,
      setData,
      drawerFormItems,
    }
  },
})
</script>

<template>
  <VkNodeCard
    shape="VkRegisterSenderNode"
    :ports="ports"
    class="vk-register-sender-node"
    :default-data="defaultData"
    :stop-move-class="['ant-sender-content']"
    :stop-zoom-class="['ant-sender-content']"
    :stop-click-class="['vk-register-sender-node__sender']"
  >
    <template #default="{ data }">
      <VkSender
        :model-value="getValue(data, ['output', 0, 'value'])"
        class="vk-register-sender-node__sender"
        :auto-size="true"
        @update:model-value="setData(data, {
          k: ['output', 0, 'value'],
          v: $event,
        })"
      ></VkSender>

      <VkfInformation
        :data="data"
        :form-items="cardFormItems"
      ></VkfInformation>
    </template>

    <template #drawer="{ data }">
      <VkfForm
        :data="data"
        :form-items="drawerFormItems"
      ></VkfForm>
    </template>
  </VkNodeCard>
</template>

<style>
.vk-register-sender-node__sender{
  margin-bottom: 18px;
}
.vk-register-sender-node{
  min-width: 600px;
}
</style>
