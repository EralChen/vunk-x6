<script lang="ts">
import { props, emits, createTableV2BindProps } from './ctx'
import { defineComponent } from 'vue'
import { ElTableV2, ElAutoResizer } from 'element-plus'
import { VkDuplexCalc } from '@vunk/core'
export default defineComponent({
  name: 'SkAppTables',
  components: {
    ElTableV2,
    ElAutoResizer,
    VkDuplexCalc,
  },
  emits,
  props,
  setup (props, { emit }) {
    const tableBindProps = createTableV2BindProps(props)
    return {
      tableBindProps: tableBindProps,
    }
  },
})
</script>
<template>
  <VkDuplexCalc :withResize="'one'">
    <template #one>
      <ElAutoResizer>
        <template #default="{ height, width }">
          <ElTableV2 
            v-bind="tableBindProps"
            :class="tableClass"
            :style="tableStyle"
            :width="tableBindProps.width ?? width"
            :height="tableBindProps.width ?? height"
          >
            <slot></slot>
          </ElTableV2>
          </template>
      </ElAutoResizer>
     
    </template>
  </VkDuplexCalc>
</template>
