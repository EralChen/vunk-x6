<script lang="tsx">
import { props, emits } from './ctx'
import { defineComponent, ref } from 'vue'
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { computed, reactive, watch } from 'vue'
import { rMenus, rMenusWithButtons } from '@skzz-platform/api/system/menu'
import { listToTree } from '@vunk/core/shared/utils-data'
import { SkCheckTags, __SkCheckTags  } from '@skzz-platform/components/check-tags'
import { SkAppTablesV1, __SkAppTablesV1 } from '@skzz-platform/components/app-tables-v1'
import { setData, unsetData, VkDuplexCalc, VkDuplex, Media } from '@vunk/core'
import { Row } from './types'
import { SkAppQueryForm } from '@skzz-platform/components/app-query-form'
import { __SkAppForm } from '@skzz-platform/shared'
import { VkfCheckbox } from '@vunk/form/components/checkbox'
import { rButtons } from '@skzz-platform/api/system/button'
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
          
        },
        {
          prop: 'menuId',
          label: '菜单ID',
        },
        {
          prop: 'buttons',
          label: '按钮',
          slots: ({ row }) => <VkfCheckbox
            class={'mb-0'}
            options={
              row.buttons.map(item => ({
                label: item.label,
                value: item.buttonId,
              }))
            }
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

    const treeCheckedIds = computed(() => {
      return props.modelValue.map((item) => item.id)
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
      // 切换标签时，清空选中的树节点
      rTree()
      r()
    }, { immediate: true })
    watch(() => treeCheckedIds.value, () => {
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

      rMenusWithButtons({
        client: checkTagsState.value,
        ids: treeCheckedIds.value,
        ...queryState.query,
      }).then(res => {
        tableState.data = listToTree(res)
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
            :checkStrictly="true"
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
