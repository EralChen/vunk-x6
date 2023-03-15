<script lang="tsx" setup>
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { computed, reactive, watch } from 'vue'
import { dMenus, rMenus } from '@skzz-platform/api/system/menu'
import { listToTree } from '@vunk/core/shared/utils-data'
import { SkAppOperations, SkCheckTags, __SkCheckTags, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { ApiReturnType, setData, unsetData, VkDuplexCalc, VkDuplex } from '@vunk/core'

type Row = ApiReturnType<typeof rMenus>[number]

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
    },
    {
      prop: undefined,
      label: '操作',
      width: '200em',
      slots: ({ row }) => <SkAppOperations
        modules={['c', 'u', 'd']}
        onC={ precI }
        onD={ () => dMenus([row.menuId])  }
      >
        
      </SkAppOperations>,
    },
  ] as __SkAppTablesV1.Column<Row>[],
  query: {},
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
    menuId: treeCheckedMenuIds.value,
  }).then(res => {
    treeState.data = listToTree(res)
  })
}
function r () {
  rMenus({
    client: checkTagsState.value,
    menuId: treeCheckedMenuIds.value,
  }).then(res => {
    tableState.data = listToTree(res)
  })
}
function precI () {
  //
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
          :columns="tableState.colums"
          :data="tableState.data"
        >
        </SkAppTablesV1>

      </VkDuplex>

    </VkDuplexCalc>


  </page-x>
</template>
