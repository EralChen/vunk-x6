<script lang="tsx" setup>
import type { CascaderNode, ElCascader } from 'element-plus'
import type { CascaderChangeEffect } from '../types'
import { useDeferred } from '@vunk/core/composables'
import { __VkfCascader, VkfCascader } from '@vunk/form/components/cascader'
import { noop } from '@vunk/shared/function'
import { cloneDeep } from 'lodash-es'
import { type PropType, ref } from 'vue'

const props = defineProps({
  value: null,
  emitSetData: null,
  changeEffect: {
    type: Function as PropType<CascaderChangeEffect>,
    default: noop,
  },
  prop: null,
})
const cascarderDef = useDeferred<{
  getCheckedNodes: () => CascaderNode[]
}>()

function handleChange (e) {
  const nodes = cascarderDef.value.getCheckedNodes()

  props.changeEffect?.(
    e,
    nodes,
    cloneDeep(props.prop),
    props.emitSetData,
  )
}
</script>

<template>
  <VkfCascader
    :cascader-ref="cascarderDef.resolve"
    :show-all-levels="false"
    :model-value="value"
    :props="{
      value: 'name',
      label: 'label',
    }"
    @change="handleChange"
  >
  </VkfCascader>
</template>
