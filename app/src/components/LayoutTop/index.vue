<script lang="ts" setup>
import DarkSwitch from '_c/DarkSwitch/index.vue'
import { computed, defineAsyncComponent } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@skzz-platform/stores/user'
import { ElAvatar } from 'element-plus'
import { logout } from '@skzz-platform/api/login'
import ApplicationCascader from '_c/ApplicationCascader/index.vue'
import SizeCtrl from '_c/SizeCtrl/index.vue'
import { VkDuplex } from '@vunk/core'

defineEmits({
  'load': null,
})
const LayoutTopMenu = defineAsyncComponent(() => import('_c/LayoutTopMenu/index.vue'))
const { layoutTopClassName } = useThemeStore()
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUserInfo())
const powerfulRoleId = computed(() => userStore.getPowerfulRoleId()) 
</script>
<template>
  <VkDuplex
    :direction="'row'"
    sk-flex="row-between-center"
    :with-flex="'one'"
    class="layout-top text-white"
    :class="{
      [layoutTopClassName]: true
    }"
  >
    <template #one>
      <VkDuplex
        :direction="'row'"
        sk-flex="row_center"
      >
        <template #one>
          <div class="layout-top-title f-xxxl font-600 plr-l ptb-s">
            智子开发平台
          </div>
        </template>


        <template #two>
          <ElScrollbar>
            <LayoutTopMenu
              @load="$emit('load')"
            />
          </ElScrollbar>
        </template>
      </VkDuplex>
    </template>

    <template #two>
      <div
        class="pr-l sub-ml-widget-space "
        sk-flex="row_center"
      >
        <DarkSwitch />
              
        <SizeCtrl />

        <ApplicationCascader
          :size="32"
        />

        <ElDropdown>
          <ElAvatar
            :size="32"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          >
            user
          </ElAvatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <ElLink :type="'primary'">
                  修改密码
                </ElLink>
              </el-dropdown-item>

              <el-dropdown-item @click="logout">
                <ElLink :type="'danger'">
                  退出登录
                </ElLink>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </ElDropdown>

        <div>
          <p>{{ userInfo.name || userInfo.code }}</p> 
          <p>{{ powerfulRoleId }}</p> 
        </div>
    
      <!-- <ElButton @click="logout">退出</ElButton> -->
      </div>
    </template>
  </VkDuplex>
</template>
<style>
.layout-top{
  background: var(--layout-top-bg, var(--el-color-primary));
}
.layout-top-title{
  min-width: var(--layout-aside-width);
}
</style>