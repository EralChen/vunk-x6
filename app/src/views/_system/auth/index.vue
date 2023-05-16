<script lang="ts" setup>
import { SkRoleTreesSelect } from '@skzz-platform/components/role-trees-select'
import { SkMenuSelect, __SkMenuSelect } from '@skzz-platform/components/menu-select'
import { getValue, SetDataEvent, UnsetDataEvent, VkDuplex } from '@vunk/core'
import { computed, reactive, watch } from 'vue'
import { Role, rRolePermissions, cdRoleMenuPermissions, cdRolePermissions } from '@skzz-platform/api/system/role'
import { Menu } from '@skzz-platform/api/system/menu'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'

const roleState = reactive({
  current: [
    {
      roleId: 'root',
    },
  ] as Role[],
})

const menuState = reactive({
  current: [] as Menu[],
  buttons: {} as Record<string, string[]>,
})
const currentRoleId = computed(() => roleState.current[0]?.roleId)

/**
 * @description: 菜单树选择
 */
const menuCheck:__SkMenuSelect.OnCheck = (
  data, checked, record,
) => {
  
  // 判断是否选中
  const checkedKeys = checked.checkedKeys
  const checkedKeysSet = new Set(checkedKeys)
  const isCheck = checkedKeysSet.has(data.menuId)
  const currentCheckedKeys: string[] = []
  const currentUnCheckedKeys: string[] = []

  // // 如果选中该节点
  if (isCheck) {
    // 选中该节点
    currentCheckedKeys.push(data.menuId)
    // 递归选中叶子节点
    function addChildren (data: Menu) {
      const children = data.children || []
      children.forEach(item => {
        currentCheckedKeys.push(item.menuId)
        addChildren(item)
      })
    }
    addChildren(data)

    // 如果父节点在 全选节点里，则添加到 currentCheckedKeys
    function addParent (data:Menu) {
      if (checkedKeysSet.has(data.parentMenuId)) {
        currentCheckedKeys.push(data.parentMenuId)
        const parentMenu = record[data.parentMenuId]
        if (parentMenu) {
          addParent(parentMenu)
        }
      }
    }
    addParent(data)

  } else {
    // 取消选中该节点
    currentUnCheckedKeys.push(data.menuId)
    // 取消选中子节点
    function addChildren (data: Menu) {
      const children = data.children || []
      children.forEach(item => {
        currentUnCheckedKeys.push(item.menuId)
        addChildren(item)
      })
    }
    addChildren(data)

    // 取消选中该节点
    function addParent (data:Menu) {

      if (data.parentMenuId) {
        currentUnCheckedKeys.push(data.parentMenuId)

        const parentMenu = record[data.parentMenuId]

        if (parentMenu) {
          addParent(parentMenu)
        }
      }
    }
    addParent(data)

  }

  if (currentCheckedKeys.length) {
    cdBindMenus(currentCheckedKeys)
  }
  if (currentUnCheckedKeys.length) {
    cdBindMenus(currentUnCheckedKeys, RestFetchOp.d)
  }


}

/* 根据role获取选中的menu */
watch(currentRoleId, r, {
  immediate: true,
})


/* 按钮权限控制 */
const setMenuButtons = (e: SetDataEvent) => {
  const { v, k } = e
  const menuId = k[0]

  cdRolePermissions([
    {
      buttonId: v,
      menuId,
      roleId: currentRoleId.value,
    },
  ]).then(r)
}
const unsetMenuButtons = (e: UnsetDataEvent) => {
  const { k } = e
  const menuId = k[0]
  const buttonId = getValue(menuState.buttons, k)

  cdRolePermissions([
    {
      buttonId,
      menuId,
      roleId: currentRoleId.value,
    },
  ], RestFetchOp.d).then(r)
}
/* 按钮权限控制 /> */

function r () {
  if (!currentRoleId.value) return 
  return rRolePermissions({
    roleId: currentRoleId.value,
  }).then(res => {
    menuState.current = res.map(item => {
      menuState.buttons[item.menuId] = item.buttonIds
      return {
        menuId: item.menuId,
      } as Menu
    })
  })
}

function cdBindMenus (menuIds: string[], op?: RestFetchOp) {
  if (!currentRoleId.value) return 
  return cdRoleMenuPermissions(menuIds.map(menuId => {
    return {
      menuId,
      roleId: currentRoleId.value,
    }
  }), op).then(r)
}

</script>
<template>
  <page-x>
    <VkDuplex h-full :direction="'row'" :gap="'var(--gap-page)'"  gap-main-x>

      <template #one>
        <!-- 左侧放角色列表 -->
        <SkRoleTreesSelect
          :filter="(v) => !(v.isSys && v.lv <= 1)"
          class="w-12em"
          v-model="roleState.current"
        ></SkRoleTreesSelect>
      </template>
      <!-- 右侧放菜单table -->
      <ElEmpty h-full v-if="!roleState.current.length"></ElEmpty>
      <SkMenuSelect v-else
        v-model="menuState.current"
        :buttons="menuState.buttons"
        @check="menuCheck"
        @setData:buttons="setMenuButtons"
        @unsetData:buttons="unsetMenuButtons"
      ></SkMenuSelect>
    </VkDuplex>

  </page-x>

</template>
