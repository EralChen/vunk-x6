<script lang="ts" setup>
import { SkRoleTreesSelect } from '@skzz-platform/components/role-trees-select'
import { SkMenuSelect } from '@skzz-platform/components/menu-select'
import { VkDuplex } from '@vunk/core'
import { reactive } from 'vue'
const roleState = reactive({
  current: [],
})
const menuState = reactive({
  current: [],
})
</script>
<template>
  <page-x>
    <VkDuplex h-full :direction="'row'" :gap="'var(--gap-page)'" gap-main-x>

      <template #one>
        <!-- 左侧放角色列表 -->
        <SkRoleTreesSelect
          v-model="roleState.current"
        ></SkRoleTreesSelect>
      </template>
      <!-- 右侧放菜单table -->
      <ElEmpty h-full v-if="!roleState.current.length"></ElEmpty>
      <SkMenuSelect v-else
        v-model="menuState.current"
      ></SkMenuSelect>
    </VkDuplex>

  </page-x>

</template>
