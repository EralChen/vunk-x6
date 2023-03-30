<script lang="ts">
import { emits } from './ctx'
import { defineComponent, reactive } from 'vue'
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { rRoles } from '@skzz-platform/api/system/role'
export default defineComponent({
  name: 'SkRoleTreesSelect',
  emits,
  // props,
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
        })  
      
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
    :nodeKey="'id'"
    :single="true"
    :data="treeState.data"
  >
  </VkCheckboxTree>
</template>
