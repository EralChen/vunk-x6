<script lang="tsx" setup>
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { computed, reactive, watch } from 'vue'
import { dMenus, rMenus, cuMenu } from '@skzz-platform/api/system/menu'
import { listToTree } from '@vunk/core/shared/utils-data'
import { SkAppDialog, SkAppOperations, SkCheckTags, __SkCheckTags, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { setData, unsetData, VkDuplexCalc, VkDuplex } from '@vunk/core'
import CUForm from './cu-form/index.vue'
import { Row } from './types'
import SkAppIcon from '@skzz-platform/components/app-icon'

const checkTagsState = reactive({
  options: [  
    {
      label: '桌面端',
      value: 'pc',
    },
    {
      label: '移动端',
      value: 'mobile',
    },
    {
      label: '管理端',
      value: 'admin',
    },
  ] as __SkCheckTags.Option[],
  value: 'admin',

})

const treeState = reactive({
  data: [] as __VkCheckboxTree.TreeNode[],
  checked: [] as Row[],
})
const treeCheckedMenuIds = computed(() => {
  return treeState.checked.map((item) => item.menuId)
})

const tableState = reactive({
  data: [] as Row[],
  columns: [
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
        onC={ () => precI(row.menuId) }
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
    client: checkTagsState.value,
  }
})


watch(() => checkTagsState.value, () => {
  // 切换标签时，清空选中的树节点
  treeState.checked = []
  rTree()
  r()
}, { immediate: true })
watch(() => treeCheckedMenuIds.value, () => {
  r()
})
function rTree () {
  rMenus({
    client: checkTagsState.value,
  }).then(res => {
    treeState.data = listToTree(res, {
      id: 'menuId',
      pId: 'parentMenuId',
    })
  })
}
function r () {
  rMenus({
    client: checkTagsState.value,
    menuId: treeCheckedMenuIds.value,
  }).then(res => {
    tableState.data = listToTree(res, {
      id: 'menuId',
      pId: 'parentMenuId',
    })
  })
}
function d (menuIds: string[]) {
  dMenus(menuIds).then(() => {
    rTree()
    r()
  })
}
function precI (parentMenuId?: string) {
  cuState.type = 'c'
  cuState.data = {}
  if (parentMenuId) {
    cuState.data.parentMenuId = parentMenuId
  }
}
function preuI (row: Row) {
  cuState.type = 'u'
  
  cuState.data = {...row}
}
function cuI () {
  cuMenu(cuData.value).then(() => {
    rTree()
    if (cuState.type === 'c') {
      treeState.checked.push(cuData.value as Row)
    }
   
  }).then(() => {
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
          <SkCheckTags 
            :modules="['creatable']"
            :options="checkTagsState.options"
            @setData:options="setData(
              checkTagsState.options,
              $event,
            )"
            @unsetData:options="unsetData(
              checkTagsState.options,
              $event,
            )"
            v-model="checkTagsState.value"
          >
          </SkCheckTags>
          <ElButton type="primary" sk-flex="row_center"
            @click="precI()"
          >
            <!-- <el-icon><Plus /></el-icon>   -->
            <span>新增</span>
          </ElButton>
        </div>

      </template>
 
  
      <VkDuplex :gap="'var(--gap-page)'" :direction="'row'"  h-full >
        <template #one>
          <VkCheckboxTree 
            :modules="['filter', 'srcollbar']"
            :defaultExpandAll="true"
            :data="treeState.data" 
            v-model="treeState.checked"
          ></VkCheckboxTree>
        </template>

        <SkAppTablesV1 
          :defaultExpandAll="true"
          flex-1
          :modules="[]"
          :rowKey="'menuId'"
          :columns="tableState.columns"
          :data="tableState.data"
        >
        </SkAppTablesV1>

      </VkDuplex>

    </VkDuplexCalc>

    <SkAppDialog
      :modal="false"
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
