<script lang="tsx">
import { props, emits } from './ctx'
import { defineComponent, ref , computed, reactive, watch } from 'vue'
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { Menu, rMenus, rMenusWithButtons } from '@skzz-platform/api/system/menu'
import { listToTree } from '@vunk/core/shared/utils-data'
import { SkCheckTags, __SkCheckTags  } from '@skzz-platform/components/check-tags'
import { SkAppTablesV1 } from '@skzz-platform/components/app-tables-v1'
import { setData, unsetData, VkDuplexCalc, VkDuplex, Media } from '@vunk/core'
import { Row , TreeCheckEvents } from './types'
import { SkAppQueryForm } from '@skzz-platform/components/app-query-form'
import { __SkAppForm } from '@skzz-platform/shared'
import { VkfCheckbox } from '@vunk/form/components/checkbox'
import { rButtons } from '@skzz-platform/api/system/button'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { ElTree } from 'element-plus'
import { ButtonId } from '@skzz-platform/shared/enum'
const nodeKey = 'menuId'
export default defineComponent({
  name: 'SkMenuSelect',
  components: {
    SkCheckTags,
    VkCheckboxTree,
    SkAppTablesV1,
    VkDuplexCalc, VkDuplex, SkAppQueryForm,
  },
  props,
  emits,
  setup (props, { emit }) {
    

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
      record: {} as Record<string, Menu>,
      // checked: [] as Row[],
      filterText: '',
      def: new Deferred<InstanceType<typeof ElTree>>(),
    })

    const buttonsOptions = ref<Media[]>([])
    rButtons().then(res => {
      buttonsOptions.value = res.rows.map(item => ({
        label: item.label,
        value: item.buttonId,
      }))
    })
    const tableState = reactive({
      data: [] as Row[],
      columns: [
        {
          prop: 'name',
          label: '菜单名称',
          align: 'start',
        },
        {
          prop: 'menuId',
          label: '菜单ID',
        },
        {
          prop: 'buttons',
          label: '按钮',
          align: 'start',
          slots: ({ row }) => <VkfCheckbox

            class={'mb-0 menu-select-buttons-col'}
            options={
              row.buttons.map(item => ({
                label: item.label,
                value: item.buttonId,
                disabled: item.buttonId === ButtonId.search,
                onChange: (v:boolean) => {
                  if (v) {
                    emit('setData:buttons', {
                      k: [row.menuId, 0],
                      v: item.buttonId,
                      insert: true,
                    })
                  } else {
                    const index = props.buttons[row.menuId].findIndex(v => v === item.buttonId)
                    emit('unsetData:buttons', {
                      k: [row.menuId, index],
                    })
                  }
                },
              }))
            }
            modelValue={ props.buttons[row.menuId] }
   
            
          >
          </VkfCheckbox>,
        },

      ] as any[],
      query: {},
    })
    const tableColumns = computed(() => {
      return [
        ...tableState.columns,
        ...props.tableColumns,
      ]
    })

    const treeCheckedMenuIds = computed(() => {
      return props.modelValue.map((item) => item.menuId)
    })
    
    const queryState = reactive({
      query: {},
    })
    const queryFormItems:__SkAppForm.CoreFormItem<keyof Row>[] = [
      {
        prop: 'name',
        templateType: 'VkfInput',
        label: '菜单名称',
      },
    ]

    watch(() => checkTagsState.value, () => {
      treeState.filterText = ''
      rTree()
      r()
    }, { immediate: true })
    watch(() => treeCheckedMenuIds.value, () => {
      r()
    })
    watch(() => queryState.query, () => {
      r()
    }, { deep: true })

    const treeCheck = (...args:TreeCheckEvents) => {
      emit('check', ...args, treeState.record)
    }

    function rTree () {
      rMenus({
        client: checkTagsState.value,
      }).then(res => {
        treeState.record = res.reduce((a, c) => {
          a[c.menuId] = c
          return a
        }, {} as Record<string, Menu>)

        treeState.data = listToTree(res, {
          id: 'menuId',
          pId: 'parentMenuId',
        })
      })
    }
    async function r () {
      if (!treeCheckedMenuIds.value.length) {
        return tableState.data = []
      }
      const treeNode = await treeState.def.promise
      const halfCheckedKeys = treeNode.getHalfCheckedKeys() as string[]
      return rMenusWithButtons({
        client: checkTagsState.value,
        menuIds: [...treeCheckedMenuIds.value, ...halfCheckedKeys],
        ...queryState.query,
      }).then(res => {
        tableState.data = listToTree(res)
      })
    }
    

    return {
      nodeKey,
      setData,
      unsetData,
      checkTagsState,
      treeState,
      tableState,
      tableColumns,
      queryFormItems,
      queryState,
      treeCheck,
    }
  },
})
</script>
<template>
  <VkDuplexCalc :gap="'var(--gap-page)'">
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
          :el-ref="treeState.def.resolve"
          :node-key="nodeKey"
          :modules="['filter', 'srcollbar']"
          :default-expand-all="true"
          :data="treeState.data" 
          :model-value="modelValue"
          @update:modelValue=" $emit('update:modelValue', $event)"

          @check="treeCheck"
        />
      </template>

      <VkDuplexCalc>
        <template #one>
          <SkAppQueryForm
            :form-items="queryFormItems"
            :data="queryState.query"
            @setData="setData(queryState.query, $event)"
          />
        </template>

        <SkAppTablesV1 
          :default-expand-all="true"
          flex-1
          :modules="[]"
          :row-key="'menuId'"
          :columns="tableColumns"
          :data="tableState.data"
        />
      </VkDuplexCalc>
    </VkDuplex>
  </VkDuplexCalc>
</template>
<style>
.menu-select-buttons-col .el-checkbox.is-disabled{
  display: none;
}
</style>
