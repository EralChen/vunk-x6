<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, reactive, watch } from 'vue'
import { rRoles as rApi } from '@skzz-platform/api/system/role'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { SkAppQueryForm, __SkAppQueryForm } from '@skzz-platform/components/app-query-form'
import { Row } from './types'
import { Pagination } from '@skzz-platform/shared'
import { VkDuplex, setData } from '@vunk/core'
export default defineComponent({
  name: 'SkRoleTablesSelect',
  emits,
  props,
  components: {
    SkAppTables,
    VkDuplex,
    SkAppQueryForm,
  },
  setup () {
    const queryItems:__SkAppQueryForm.CoreFormItem<keyof Row>[] = [
      {
        prop: 'roleId',
        label: '角色id',
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
          title: '角色Id',
          dataKey: 'roleId',
          key: 'roleId',
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
    }
  },
})
</script>
<template>
  <VkDuplex>
    <template #one>
      <SkAppQueryForm
        :formItems="queryItems"
        :data="queryState.data"
        @setData="setData(queryState.data, $event)"
        
      ></SkAppQueryForm>
    </template>

    <SkAppTables 
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :columns="tableState.columns"
      :data="tableState.data"
      :total="tableState.total"
      v-model:start="tableState.pagination.start"
      v-model:pageSize="tableState.pagination.pageSize"
    ></SkAppTables>
  </VkDuplex>
</template>
