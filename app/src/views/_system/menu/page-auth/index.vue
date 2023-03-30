<script lang="ts" setup>
import { SkRoleTreesSelect } from '@skzz-platform/components/role-trees-select'
import { SkMenuSelect } from '@skzz-platform/components/menu-select'
import { VkDuplex } from '@vunk/core'
import { reactive } from 'vue'
const treeState = reactive({
  current: [],
})
</script>
<template>
  <page-x>
    <VkDuplex h-full :direction="'row'" :gap="'var(--gap-page)'" gap-main-x>

      <template #one>
        <!-- 左侧放角色列表 -->
        <SkRoleTreesSelect
          v-model="treeState.current"
        ></SkRoleTreesSelect>
      </template>
      <!-- 右侧放菜单table -->
      <ElEmpty h-full v-if="!treeState.current.length"></ElEmpty>
      <SkMenuSelect v-else></SkMenuSelect>
    </VkDuplex>

  </page-x>

</template>
