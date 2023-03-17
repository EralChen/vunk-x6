<script lang="tsx" setup>
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { computed, reactive, watch } from 'vue'
import { dMenus, rMenus, cuMenu } from '@skzz-platform/api/system/menu'
import { SkAppDialog, SkAppOperations, SkCheckTags, __SkCheckTags, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { setData, unsetData, VkDuplexCalc, VkDuplex } from '@vunk/core'
import CUForm from './cu-form/index.vue'
import { Row } from './types'
import SkAppIcon from '@skzz-platform/components/app-icon'


const tableState = reactive({
  data: [] as Row[],
  colums: [
    {
      prop: 'menuId',
      label: '菜单ID',
    },
    {
      prop: 'label',
      label: '菜单名称',
    },
    {
      prop: 'path',
      label: '路径',
    },
    {
      prop: 'icon',
      label: '图标',
      slots: ({ row }) => row.icon 
        ? <SkAppIcon icon={row.icon} /> 
        : '',
      width: '100em',
      align: 'center',
      headerAlign: 'start',
    },
    {
      prop: undefined,
      label: '操作',
      width: '200em',
      slots: ({ row }) => <SkAppOperations
        modules={['c', 'u', 'd']}
        onC={ () => precI() }
        onD={ () => d([row.menuId])  }
        onU={ () => preuI(row) }
        
      >
        
      </SkAppOperations>,
      align: 'center',
      headerAlign: 'start',
    },
  ] as __SkAppTablesV1.Column<Row>[],
  query: {},
})
const cuState = reactive({
  type: '' as 'c' | 'u' | '',
  data: {} as Partial<Row>,
})
const cuData = computed(() => {
  return {
    ...cuState.data,
  }
})


function r () {
  //
}
function d (menuIds: string[]) {
  dMenus(menuIds).then(() => {
    r()
  })
}
function precI () {
  cuState.type = 'c'
  cuState.data = {}
}
function preuI (row: Row) {
  cuState.type = 'u'
  
  cuState.data = {...row}
}
function cuI () {
  cuMenu(cuData.value).then(() => {
    r()
    cuState.type = ''
    cuState.data = {}
  })
}
</script>
<template>
  <page-x>
    <VkDuplexCalc :gap="'var(--gap-page)'" class="pa-page h-full">
      <template #one>
        <div sk-flex="row-between-center">
          <span></span>
          <ElButton type="primary" sk-flex="row_center"
            @click="precI()"
          >
            <span>新增</span>
          </ElButton>
        </div>

      </template>

      <SkAppTablesV1 
        :defaultExpandAll="true"
        flex-1
        :modules="[]"
        :rowKey="'menuId'"
        :columns="tableState.colums"
        :data="tableState.data"
      >
      </SkAppTablesV1>


    </VkDuplexCalc>

    <SkAppDialog
      :modelValue="!!cuState.type"
      @update:modelValue="cuState.type = ''"
      :title="cuState.type === 'u' ? '编辑' : '新增'"
    >
      <CUForm
        :type="cuState.type"
        :data="cuState.data"
        @setData="setData(cuState.data, $event)"
        @submit="cuI"
      ></CUForm>
    </SkAppDialog>
  </page-x>
</template>
