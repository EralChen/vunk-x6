<script lang="tsx">
import {
  props, emits,
  createTableV2BindProps,
  createPaginationBindProps, createPaginationOnEmits,
} from './ctx'
import { defineComponent, computed, watch } from 'vue'
import { ElTableV2, ElAutoResizer, ElPagination, Column } from 'element-plus'
import { VkDuplexCalc } from '@vunk/core'
import { SkAppOperations } from '@skzz-platform/components/app-operations'
import { pickObject } from '@vunk/core/shared/utils-object'
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
    const tableBindProps = createTableV2BindProps(props, ['columns'])
    const paginationBindProps = createPaginationBindProps(props)
    const paginationOnEmits = createPaginationOnEmits(emit)

    const columns = computed(() => {
      return props.columns.reduce((a, c) => {

        if (c.type) {
          const colProps = pickObject(c, {
            excludes: ['type'],
          })
          if (c.type === 'index') {
            a.push({
              key: 'index',
              title: '序号',
              width: 50,
              ...colProps,
              cellRenderer: ({ rowIndex }) => <span>{`${rowIndex + 1}`}</span>,
            })
          } else if (c.type === 'selection') {
            a.push({
              width: 60,
              ...colProps,
              
            })
          } else if (c.type === 'button') {
            a.push({
              title: '操作',
              width: 150,
              ...colProps,
              cellRenderer: () => <SkAppOperations

              ></SkAppOperations>,
            })
          }

        } else {
          a.push(c)
        }
        return a
      }, [] as Column[])
    })
    
    // currentPage 通过 start 和 pageSize 计算
    const currentPage = computed(() => {
      return Math.floor(props.start / props.pageSize) + 1
    })

    // updateStart 通过 currentPage 和 pageSize 计算
    const updateStart = (val: number) => {
      emit('update:start', (val - 1) * props.pageSize)
    }

    // 调整 props.pageSize 时，更新 start
    watch(() => props.pageSize, () => {
      updateStart(currentPage.value)
    })

    return {
      tableBindProps,
      paginationBindProps,
      paginationOnEmits,
      columns,
      currentPage,
      updateStart,
    }
  },
})
</script>
<template>
  <VkDuplexCalc :withResize="'one'" :gap="'var(--gap-page, 14px)'">
    <template #one>
      <ElAutoResizer>
        <template #default="{ height, width }">
          <ElTableV2  v-bind="tableBindProps" :class="tableClass" :style="tableStyle"
            :width="tableBindProps.width ?? width" :height="tableBindProps.width ?? height" :columns="columns">
            <slot></slot>
          </ElTableV2>
        </template>
      </ElAutoResizer>

    </template>
    <div class="sk-app-tables-pagination-x">
      <ElPagination 
        v-bind="paginationBindProps" 
        v-on="paginationOnEmits"
        :currentPage="currentPage"
        @update:current-page="updateStart"
        @current-change="updateStart"
      ></ElPagination>
    </div>

  </VkDuplexCalc>
</template>
<style>
.sk-app-tables-pagination-x {
  display: flex;
  justify-content: center;
}
</style>