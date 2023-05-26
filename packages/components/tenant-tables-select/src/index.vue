<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, reactive, watch, computed } from 'vue'
import { rTenants as rApi } from '@skzz-platform/api/platform/tenant'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { SkAppQueryForm, __SkAppQueryForm } from '@skzz-platform/components/app-query-form'
import { Row } from './types'
import { Pagination } from '@skzz-platform/shared'
import { VkDuplex, setData } from '@vunk/core'
export default defineComponent({
  name: 'SkTenantTablesSelect',
  components: {
    SkAppTables,
    VkDuplex,
    SkAppQueryForm,
  },
  props,
  emits,
  setup (props) {
    const queryItems:__SkAppQueryForm.CoreFormItem<keyof Row>[] = [
      {
        prop: 'tenantId',
        label: '租户Id',
        templateType: 'VkfInput',
      },
      {
        prop: 'name',
        label: '名称',
        templateType: 'VkfInput',
      },

    ]
    const queryState = reactive({
      data: {} as Partial<Row>,
    })
    const tableState = reactive({
      data: [] as Row[],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          key: 'selection',
        },
        {
          title: '租户Id',
          dataKey: 'tenantId',
          key: 'tenantId',
          width: 200,
        },
        {
          title: '名称',
          dataKey: 'name',
          key: 'name',
          width: 200,
          flexGrow: 1,
        },
        
      ] as __SkAppTables.Column[], 

      pagination: {
        pageSize: 10,
        start: 0,
      } as Pagination,

      total: 0,
    })

    const tableCols = computed(() => {
      return [
        ...tableState.columns,
        ...props.columns,
      ]
    })

    watch(() => tableState.pagination, r, { deep: true, immediate: true })
    watch(() => queryState.data, r, { deep: true })
    function r () {
      rApi(queryState.data, tableState.pagination).then(res => {
        tableState.data = res.rows
        tableState.total = res.total
      })
    }
    return {
      queryItems,
      setData,
      queryState,
      tableState,
      r,
      tableCols,
    }
  },
})
</script>
<template>
  <VkDuplex>
    <template #one>
      <SkAppQueryForm
        :form-items="queryItems"
        :data="queryState.data"
        @setData="setData(queryState.data, $event)"
      />
    </template>

    <SkAppTables 
      
      v-model:start="tableState.pagination.start"
      v-model:pageSize="tableState.pagination.pageSize"
      :readonly="readonly"
      :oid-field="'tenantId'"
      :model-value="modelValue"
      :columns="tableCols"
      :data="tableState.data"
      :total="tableState.total"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </VkDuplex>
</template>
