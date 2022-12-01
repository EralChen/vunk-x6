<script lang="ts" setup>
import { ElMenu } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import { ref } from 'vue'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from './link.vue'
const permissionStore = usePermissionStore()
const collapse = ref(false)

</script>
<template>
  <ElMenu 
    class="layout-default-aside"
    :collapse="collapse"
  >
    <VkRoutesMenuContent :data="permissionStore.routes">
      <template #default="{ data, isMenu }">
        <LinkVue :isMenu="isMenu" :data="data">
          {{ data.meta?.name }}
        </LinkVue>
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

</style>