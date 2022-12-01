<script lang="ts" setup>
import { ElMenu } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import { ref } from 'vue'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
const permissionStore = usePermissionStore()
const collapse = ref(false)

</script>
<template>
  <ElMenu 
    class="layout-default-aside"
    :collapse="collapse"
  >
    <VkRoutesMenuContent :data="permissionStore.routes">
      <template #default="{ data }">
        <RouterLink :to="data.path" class="layout-default-aside-link">
          <!-- {{ data.meta?.name }} -->
          {{ data.path }}
        </RouterLink>
      </template>
    </VkRoutesMenuContent>
  </ElMenu>
</template>
<style>
.layout-default-aside{
  height: 100%;
}
.layout-default-aside:not(.el-menu--collapse) {
  width: 200px;
}
</style>

<style lang="scss">
.layout-default-aside{
  &.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-sub-menu__title{
    padding-left: initial;
  }
  &.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item{
    padding-left: initial;
  }
}
.layout-default-aside-link{
  width: 100%;
  padding-left: calc(
    var(--el-menu-base-level-padding) 
    + var(--el-menu-level) 
    * var(--el-menu-level-padding)
  );
}

</style>