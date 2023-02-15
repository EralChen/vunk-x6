<script lang="ts">
import { 
  props, emits, 
  createTableV2BindProps, 
  createPaginationBindProps, createPaginationOnEmits,
} from './ctx'
import { defineComponent } from 'vue'
import { ElTableV2, ElAutoResizer, ElPagination } from 'element-plus'
import { VkDuplexCalc } from '@vunk/core'
export default defineComponent({
  name: 'SkAppTables',
  components: {
    ElTableV2,
    ElAutoResizer,
    VkDuplexCalc,
    ElPagination,
  },
  emits,
  props,
  setup (props, { emit }) {
    const tableBindProps = createTableV2BindProps(props)
    const paginationBindProps = createPaginationBindProps(props)
    const paginationOnEmits = createPaginationOnEmits(emit)
    return {
      tableBindProps,
      paginationBindProps,
      paginationOnEmits,
    }
  },
})
</script>
<template>
  <VkDuplexCalc :withResize="'one'" :gap="'var(--gap-page, 14px)'">
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
    <div class="sk-app-tables-pagination-x">
      <ElPagination
        v-bind="paginationBindProps"
        v-on="paginationOnEmits"
      ></ElPagination>
    </div>

  </VkDuplexCalc>
</template>
<style>
.sk-app-tables-pagination-x{
  display: flex;
  justify-content: center;
}
</style>