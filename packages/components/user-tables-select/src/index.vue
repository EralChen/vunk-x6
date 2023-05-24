<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, reactive, watch } from 'vue'
import { rUsers } from '@skzz-platform/api/system/user'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { SkAppQueryForm, __SkAppQueryForm } from '@skzz-platform/components/app-query-form'
import { Row } from './types'
import { Pagination } from '@skzz-platform/shared'
import { VkDuplex, setData } from '@vunk/core'
export default defineComponent({
  name: 'SkUserTablesSelect',
  components: {
    SkAppTables,
    VkDuplex,
    SkAppQueryForm,
  },
  props,
  emits,
  setup () {
    const queryItems:__SkAppQueryForm.CoreFormItem<keyof Row>[] = [
      {
        prop: 'code',
        label: '用户名',
        templateType: 'VkfInput',
      },
      {
        prop: 'name',
        label: '姓名',
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
          title: '用户名',
          dataKey: 'code',
          key: 'code',
          width: 200,
        },
        {
          title: '姓名',
          dataKey: 'name',
          key: 'name',
          width: 200,
          flexGrow: 1,
        },
        
      ] as __SkAppTables.Column[], 

      pagination: {
        pageSize: 8,
        start: 0,
      } as Pagination,

      total: 0,
    })

    watch(() => tableState.pagination, r, { deep: true, immediate: true })
    watch(() => queryState.data, r, { deep: true })
    function r () {
      rUsers(queryState.data, tableState.pagination).then(res => {
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
      :model-value="modelValue"
      :columns="tableState.columns"
      :data="tableState.data"
      :total="tableState.total"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </VkDuplex>
</template>
