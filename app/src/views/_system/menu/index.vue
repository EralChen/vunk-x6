<script lang="tsx" setup>
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { computed, reactive, watch } from 'vue'
import { dMenus, rMenus, cuMenu, rMenuBtns } from '@skzz-platform/api/system/menu'
import { listToTree } from '@vunk/core/shared/utils-data'
import { SkAppDialog, SkAppOperations, SkCheckTags, __SkCheckTags, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { setData, unsetData, VkDuplexCalc, VkDuplex } from '@vunk/core'
import CUForm from './cu-form/index.vue'
import { Row } from './types'
import SkAppIcon from '@skzz-platform/components/app-icon'
import { ElMessageBox } from 'element-plus'
import BindBtnsForm from './bind-btns-form/index.vue'
import { dMenuAllRolePermissions } from '@skzz-platform/api/system/role'
import { SkIncreaseButton } from '@skzz-platform/components/increase-button'

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
  filterText: '',
  checked: [
    { menuId: 'init' },
  ] as Row[],
})
const treeCheckedMenuIds = computed(() => {
  return treeState.checked.map((item) => item.menuId)
})

const tableState = reactive({
  data: [] as Row[],
  columns: [
    {
      prop: 'label',
      label: '菜单名称',
      align: 'start',
    },
    {
      prop: 'menuId',
      label: '菜单ID',
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

    },
    {
      prop: undefined,
      label: '操作',
      width: '300em',
      slots: ({ row }) => <SkAppOperations
        api={rMenuBtns}
        excludes={['search']}
        onC={ () => precI(row.menuId) }
        onD={ () => d([row])  }
        onU={ () => preuI(row) }
        onClick={(e) => {
          if (e === 'auth') {
            preBindBtns(row)
          }
        }}
       
      >
        
      </SkAppOperations>,
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

const bindBtnsState = reactive({
  current: {} as Partial<Row>,
})


watch(() => checkTagsState.value, () => {

  rTree().then(() => {
    // 切换标签时，清空选中的树节点
    treeState.filterText = ''
    treeState.checked = [] // 将会触发 r
  })
}, { immediate: true })
watch(() => treeCheckedMenuIds.value, r)
function rTree () {
  return rMenus({
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
function d (rows: Row[]) {
  dMenus(rows.map(item => item.id))
    .catch((err) => {
  
      return ElMessageBox({
        title: '删除失败',
        message: `因 ${err.msg}, 是否尝试解绑菜单相关权限, 再次重试`,
        showCancelButton: true,
        type: 'warning',
        closeOnClickModal: false,
        
      })
    })
    .then(() => {
      return Promise.all(rows.map((item) => dMenuAllRolePermissions(item.menuId))) 
    }).then(() => {
      return dMenus(rows.map(item => item.id))
    })
    .finally(() => {
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

function preBindBtns (row: Row) {
  
  bindBtnsState.current = row
}


</script>
<template>
  <page-x>
    <VkDuplexCalc
      :gap="'var(--gap-page)'"
      class="pa-page h-full"
    >
      <template #one>
        <div sk-flex="row-between-center">
          <SkCheckTags 
            v-model="checkTagsState.value"
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
          />
          <SkIncreaseButton
            :btns="rMenuBtns()"
            @click="precI()"
          />
        </div>
      </template>
 
  
      <VkDuplex
        :gap="'var(--gap-page)'"
        :direction="'row'"
        h-full
      >
        <template #one>
          <VkCheckboxTree 
            v-model:filterText="treeState.filterText"
            v-model="treeState.checked"
            :node-key="'menuId'"
            :modules="['filter', 'srcollbar']"
            :default-expand-all="true" 
            :data="treeState.data"
          />
        </template>

        <SkAppTablesV1 
          :default-expand-all="true"
          flex-1
          :modules="[]"
          :row-key="'menuId'"
          :columns="tableState.columns"
          :data="tableState.data"
        />
      </VkDuplex>
    </VkDuplexCalc>

    <SkAppDialog
      :model-value="!!cuState.type"
      :title="cuState.type === 'u' ? '编辑' : '新增'"
      @update:modelValue="cuState.type = ''"
    >
      <CUForm
        :type="cuState.type"
        :data="cuState.data"
        @setData="setData(cuState.data, $event)"
        @submit="cuI"
      />
    </SkAppDialog>

    <SkAppDialog
      :model-value="!!bindBtnsState.current.menuId"
      :title="'按钮权限绑定'"
      @update:modelValue="bindBtnsState.current = {}"
    >
      <BindBtnsForm
        :id="bindBtnsState.current.id"
        :menu-id="bindBtnsState.current.menuId"
      />
    </SkAppDialog>
  </page-x>
</template>
