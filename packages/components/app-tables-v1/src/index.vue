<script lang="ts">
import { props, emits, createPaginationBindProps, createPaginationOnEmits, createTableBindProps } from './ctx'
import { computed, defineComponent, watch } from 'vue'
import { VkDuplexCalc } from '@vunk/core'
import { ElPagination } from 'element-plus'
import { ElTable } from 'element-plus'
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
  emits,
  props,
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
  <VkDuplexCalc :withResize="'one'" :gap="'var(--gap-page, 14px)'">
    <template #one>

      <ElTable 
      :style="tableStyle"
       :className="'sk-app-tables-v1-table ' + tableClass" v-bind="tableProps" v-on="tableOnEmits">
        <VkTableColumns v-bind="columnsProps" :source="columns"></VkTableColumns>
      </ElTable>
    </template>

    <div class="sk-app-tables-v1-pagination-x">
      <ElPagination v-bind="paginationBindProps" v-on="paginationOnEmits" :currentPage="currentPage"
        @update:current-page="updateStart"></ElPagination>
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