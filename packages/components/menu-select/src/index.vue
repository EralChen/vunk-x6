<script lang="tsx">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { computed, reactive, watch } from 'vue'
import { rMenus } from '@skzz-platform/api/system/menu'
import { listToTree } from '@vunk/core/shared/utils-data'
import { SkCheckTags, __SkCheckTags  } from '@skzz-platform/components/check-tags'
import { SkAppTablesV1 } from '@skzz-platform/components/app-tables-v1'
import { setData, unsetData, VkDuplexCalc, VkDuplex } from '@vunk/core'
import { Row } from './types'
import SkAppIcon from '@skzz-platform/components/app-icon'

export default defineComponent({
  name: 'SkMenuSelect',
  emits,
  props,
  components: {
    SkCheckTags,
    VkCheckboxTree,
    SkAppTablesV1,
    VkDuplexCalc, VkDuplex,
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
      ] as any[],
      query: {},
    })

    const treeCheckedMenuIds = computed(() => {
      return props.modelValue.map((item) => item.menuId)
    })

    watch(() => checkTagsState.value, () => {
      // 切换标签时，清空选中的树节点
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

    return {
      setData,
      unsetData,
      checkTagsState,
      treeState,
      tableState,
    }
  },
})
</script>
<template>
    <VkDuplexCalc :gap="'var(--gap-page)'" class="h-full">
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
</template>
