<script lang="ts">
import { emits,  props } from './ctx'
import { defineComponent, reactive } from 'vue'
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { rRoles } from '@skzz-platform/api/system/role'
export default defineComponent({
  name: 'SkRoleTreesSelect',
  emits,
  props,
  components: {
    VkCheckboxTree,
  },
  setup (props, { emit }) {
    const treeState = reactive({
      data: [] as __VkCheckboxTree.Data,
    })
    r()
    function r () {
      rRoles().then(res => {

        treeState.data = res.rows.map(item => {
          return {
            label: item.name,
            ...item,
          }
        }).filter(props.filter)
      
      })
    }
    return {
      treeState,
      r,
    }
  },
})
</script>
<template>
  <VkCheckboxTree
    :modules="[]"
    :nodeKey="'roleId'"
    :single="true"
    :data="treeState.data"
  >
  </VkCheckboxTree>
</template>
