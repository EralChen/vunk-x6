<script lang="ts">
import { emits,  props } from './ctx'
import { defineComponent, reactive } from 'vue'
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { rRoles } from '@skzz-platform/api/system/role'
export default defineComponent({
  name: 'SkRoleTreesSelect',
  components: {
    VkCheckboxTree,
  },
  props,
  emits,
  setup (props) {
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
    :node-key="'roleId'"
    :single="true"
    :data="treeState.data"
  />
</template>
