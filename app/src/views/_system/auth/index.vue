<script lang="ts" setup>
import { SkRoleTreesSelect } from '@skzz-platform/components/role-trees-select'
import { SkMenuSelect } from '@skzz-platform/components/menu-select'
import { VkDuplex } from '@vunk/core'
import { reactive, watch } from 'vue'
import { Role, rRolePermission } from '@skzz-platform/api/system/role'
import { Menu } from '@skzz-platform/api/system/menu'
const roleState = reactive({
  current: [] as Role[],
})

const menuState = reactive({
  current: [] as Menu[],
  buttons: {} as Record<string, string[]>,
})

/* 根据role获取选中的menu */
watch(() => roleState.current[0]?.roleId, (v) => {
  if (!v) return 
  r(v)

}, {
  immediate: true,
})

function r (roleId: string) {
  return rRolePermission({
    roleId: roleId,
  }).then(res => {
    menuState.current = res.map(item => {
      menuState.buttons[item.menuId] = item.buttonIds
      return {
        menuId: item.menuId,
      } as Menu
    })
  }).then(() => {
    console.log(menuState.buttons)
  })
}
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
