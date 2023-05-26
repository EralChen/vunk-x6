<script lang="ts">
import { props, emits, createPaginationBindProps, createPaginationOnEmits, createTableBindProps } from './ctx'
import { computed, defineComponent, watch } from 'vue'
import { VkDuplexCalc } from '@vunk/core'
import { ElPagination , ElTable } from 'element-plus'
import { VkTableColumns, _VkTableColumnsElCtx } from '@vunk/skzz/components/table-columns'
import { createElTableOnEmits } from './el-ctx'
export default defineComponent({
  name: 'SkAppTablesV1',
  components: {
    ElPagination,
    VkDuplexCalc,
    ElTable,
    VkTableColumns,
  },
  props,
  emits,
  setup (props, { emit }) {
    const paginationBindProps = createPaginationBindProps(props)
    const paginationOnEmits = createPaginationOnEmits(emit)
    const columnsProps = _VkTableColumnsElCtx.createTableColumnBindProps(props, [])
    const tableProps = createTableBindProps(props)
    const tableOnEmits = createElTableOnEmits(emit)
    /*   currentPage => start */
    const currentPage = computed(() => {
      return Math.floor(props.start / props.pageSize) + 1
    })
    const updateStart = (currentPage: number) => {
      emit('update:start', (currentPage - 1) * props.pageSize)
    }
    watch(() => props.pageSize, () => {
      updateStart(currentPage.value)
    })
    /* currentPage => start end */

    return {
      paginationBindProps,
      paginationOnEmits,
      currentPage,
      updateStart,
      columnsProps,
      tableProps,
      tableOnEmits,
    }
  },
})
</script>
<template>
  <VkDuplexCalc
    :with-resize="'one'"
    :gap="'var(--gap-page, 14px)'"
  >
    <template #one>
      <ElTable 
        v-bind="tableProps"
        :ref="elRef"
        :style="tableStyle"
        :class-name="'sk-app-tables-v1-table ' + tableClass"
        v-on="tableOnEmits"
      >
        <VkTableColumns 
          
          v-bind="columnsProps" 
          :source="columns"
        />
      </ElTable>
    </template>

    <div
      v-if="modules.includes('pagination')"
      class="sk-app-tables-v1-pagination-x"
    >
      <ElPagination
        v-bind="paginationBindProps"
        :current-page="currentPage"
        v-on="paginationOnEmits"
        @update:current-page="updateStart"
      />
    </div>
  </VkDuplexCalc>
</template>
<style>
.sk-app-tables-v1-table{
  height: 100%;
}
.sk-app-tables-v1-pagination-x {
  display: flex;
  justify-content: center;
}
</style>