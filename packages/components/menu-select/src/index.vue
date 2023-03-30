<script lang="tsx">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { computed, reactive, watch } from 'vue'
import { rMenus } from '@skzz-platform/api/system/menu'
import { listToTree } from '@vunk/core/shared/utils-data'
import { SkCheckTags, __SkCheckTags  } from '@skzz-platform/components/check-tags'
import { SkAppTablesV1, __SkAppTablesV1 } from '@skzz-platform/components/app-tables-v1'
import { setData, unsetData, VkDuplexCalc, VkDuplex } from '@vunk/core'
import { Row } from './types'
import { SkAppQueryForm } from '@skzz-platform/components/app-query-form'
import { __SkAppForm } from '@skzz-platform/shared'
export default defineComponent({
  name: 'SkMenuSelect',
  emits,
  props,
  components: {
    SkCheckTags,
    VkCheckboxTree,
    SkAppTablesV1,
    VkDuplexCalc, VkDuplex, SkAppQueryForm,
  },
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
      // checked: [] as Row[],
    })
    const tableState = reactive({
      data: [] as Row[],
      columns: [

        {
          prop: 'label',
          label: '菜单名称',
        },
        {
          prop: 'path',
          label: '菜单路径',
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
      {
        prop: 'path',
        templateType: 'VkfInput',
        label: '菜单路径',
      },
    ]

    watch(() => checkTagsState.value, () => {
      // 切换标签时，清空选中的树节点
      rTree()
      r()
    }, { immediate: true })
    watch(() => treeCheckedMenuIds.value, () => {
      r()
    })
    watch(() => queryState.query, () => {
      r()
    }, { deep: true })

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
        ...queryState.query,
      }).then(res => {
        tableState.data = listToTree(res, {
          id: 'menuId',
          pId: 'parentMenuId',
        })
      })
    }

    return {
      setData,
      unsetData,
      checkTagsState,
      treeState,
      tableState,
      tableColumns,
      queryFormItems,
      queryState,
    }
  },
})
</script>
<template>
    <VkDuplexCalc :gap="'var(--gap-page)'">
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
            :modelValue="modelValue"
            @update:modelValue=" $emit('update:modelValue', $event)"
          ></VkCheckboxTree>
        </template>

        <VkDuplexCalc>
          <template #one>
            <SkAppQueryForm
              :formItems="queryFormItems"
              :data="queryState.query"
              @setData="setData(queryState.query, $event)"
            ></SkAppQueryForm>
          </template>

          <SkAppTablesV1 
            :defaultExpandAll="true"
            flex-1
            :modules="[]"
            :rowKey="'menuId'"
            :columns="tableColumns"
            :data="tableState.data"
          >
          </SkAppTablesV1>

        </VkDuplexCalc>

      </VkDuplex>

    </VkDuplexCalc>
</template>
