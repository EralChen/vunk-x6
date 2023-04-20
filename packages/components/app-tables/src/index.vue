<script lang="tsx">
import {
  props, emits,
  createTableV2BindProps,
  createPaginationBindProps, createPaginationOnEmits,
} from './ctx'
import { defineComponent, computed, watch } from 'vue'
import { ElTableV2, ElAutoResizer, ElPagination, Column, ElCheckbox } from 'element-plus'
import { VkDuplexCalc } from '@vunk/core'
import { SkAppOperations } from '@skzz-platform/components/app-operations'
import { pickObject } from '@vunk/core/shared/utils-object'
import { VkCheckRecordLogicProvider, VkCheckRecordLogic } from '@vunk/core'
import { vOn } from '@vunk/core/shared/utils-vue'
import { useComputedReadonly } from '@vunk/form'


export default defineComponent({
  name: 'SkAppTables',
  components: {
    ElTableV2,
    ElAutoResizer,
    VkDuplexCalc,
    ElPagination,
    VkCheckRecordLogicProvider,
  },
  emits,
  props,
  setup (props, { emit }) {
    const tableBindProps = createTableV2BindProps(props, ['columns'])
    const paginationBindProps = createPaginationBindProps(props)
    const paginationOnEmits = createPaginationOnEmits(emit)
    const readonly = useComputedReadonly(props)
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
              key: 'selection',
              width: 60,
              ...colProps, 
              headerCellRenderer: () => {
                if (props.single) return <span>单选</span>
                const getCurrentPageCheckInfo = () => {
                  const oidField = props.oidField
                  const allCheckedId = props.modelValue.map((d) => d[oidField])
                  const checkedNodes = [] as any[]
                  const uncheckedNodes = [] as any[]

                  props.data.forEach((d) => {
                    if (allCheckedId.includes(d[oidField])) {
                      checkedNodes.push(d)
                    } else {
                      uncheckedNodes.push(d)
                    }
                  })

                  return {
                    checkedNodes,
                    uncheckedNodes,
                  }
                }
                const { checkedNodes, uncheckedNodes } = getCurrentPageCheckInfo()

                return <ElCheckbox
                  disabled={readonly.value}
                  indeterminate={ checkedNodes.length > 0 && checkedNodes.length < props.data.length }
                  modelValue={ checkedNodes.length === props.data.length }
                  {
                    ...vOn({
                      'update:modelValue': (checked) => {
          
                        if (checked) { // 把当页没勾上的都勾上
                          emit('update:modelValue', [
                            ...props.modelValue,
                            ...uncheckedNodes,
                          ])
                        } else { // 把当页勾上的都去掉
                          emit('update:modelValue', [
                            ...props.modelValue.filter((d) => {
                              const id = d[props.oidField]
                              return !props.data.some((d) => d[props.oidField] === id)
                            }),
                          ])
                        }
                      },
                    })
                  }
                >
                  
                </ElCheckbox>
              },
              cellRenderer: ({ rowData }) => {
                return <VkCheckRecordLogic
                  name={rowData}
                  clearable={ true }
                  custom={ true }
                  v-slots={
                    {
                      default: ({ isActive, toggle }) => {
                        return <ElCheckbox disabled={readonly.value} modelValue={isActive}
                          {
                            ...vOn({
                              'update:modelValue': toggle,
                            })
                          }
                        ></ElCheckbox>
                        
                      },
                    }
                  }
                >
              
                </VkCheckRecordLogic>
              },
            })
          } else if (c.type === 'button') {
            a.push({
              title: '操作',
              width: 150,
              cellRenderer: () => <SkAppOperations></SkAppOperations>,
              ...colProps,
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
    const updateStart = (currentPage: number) => {
      emit('update:start', (currentPage - 1) * props.pageSize)
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
      readonly,
    }
  },
})
</script>
<template>
  <VkDuplexCalc :withResize="'one'" :gap="'var(--gap-page, 14px)'">
    <template #one>
      <ElAutoResizer>
        <template #default="{ height, width }">
          <VkCheckRecordLogicProvider 
            :allowExtra="true"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :oidField="oidField"
          >
            <ElTableV2   
              class="sk-app-tables__table"
              v-bind="tableBindProps" 
              :class="tableClass" 
              :style="tableStyle"
              :width="(tableBindProps.width ?? width) - 2" 
              :height="(tableBindProps.height ?? height) - 2" 
              :columns="columns"
              
            >
              <slot></slot>
            </ElTableV2>
          </VkCheckRecordLogicProvider>
        </template>
      </ElAutoResizer>

    </template>
    <div class="sk-app-tables-pagination-x"
      v-if="modules.includes('pagination')"
    >
      <ElPagination 
        v-bind="paginationBindProps" 
        v-on="paginationOnEmits"
        :currentPage="currentPage"
        @update:current-page="updateStart"
      ></ElPagination>
    </div>

  </VkDuplexCalc>
</template>
<style lang="scss">
.sk-app-tables__table .el-table-v2__table{
  border: var(--el-border);
}
// .sk-app-tables__table .el-table-v2__table {
//   border-right: var(--el-border);
// }
// .el-table-v2__header-cell{
//   border-top: var(--el-border);
// }
.sk-app-tables__table .el-table-v2__header-cell:not(:first-child){
  border-left: var(--el-border);
}
.sk-app-tables__table .el-table-v2__row-cell:not(:first-child){
  border-left: var(--el-border);
}

.sk-app-tables-pagination-x {
  display: flex;
  justify-content: center;
}
</style>