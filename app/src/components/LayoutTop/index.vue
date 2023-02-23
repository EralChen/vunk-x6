<script lang="ts" setup>
import DarkSwitch from '_c/DarkSwitch/index.vue'
import { defineAsyncComponent } from 'vue'
import { useThemeStore } from '@skzz-platform/stores/theme'
import { ElAvatar, useNamespace } from 'element-plus'
import { logout } from '@skzz-platform/api/login'
import { useSharedDark } from '@skzz-platform/composables'
defineEmits({
  'load': null,
})
const LayoutTopMenu = defineAsyncComponent(() => import('_c/LayoutTopMenu/index.vue'))
const { layoutTopClassName } = useThemeStore()
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]
const nsCascader = useNamespace('cascader')
const isDark = useSharedDark()
</script>
<template>

    <div sk-flex="row-between-center" class="layout-top text-white"
      :class="{
        [layoutTopClassName]: true
      }"
    >
      <div sk-flex="row_center">
        <div class="layout-top-title f-xxxl font-600 plr-l ptb-s">
          智子开发平台
        </div>
        <LayoutTopMenu
          @load="$emit('load')"
        ></LayoutTopMenu>
      </div>
      
      <div class="pr-l sub-ml-widget-space " sk-flex="row_center">
        <DarkSwitch></DarkSwitch>
        <ElTooltip 
        :effect="isDark ? 'dark' : 'light'"
        :placement="'bottom-end'"

        >
          <ElButton>角色</ElButton>
          <template #content>
            <div class="w-530px">
              <el-cascader-panel
                :border="false"
                :modelValue="[options[0].value, options[0].children[0].value, options[0].children[0].children[0].value]"
                :options="options"
                :props="{
                  expandTrigger: 'hover',
                  
                }"
              />
            </div>
    
          </template>
        </ElTooltip>
        

        <ElDropdown>
          <ElAvatar
            :size="32"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          >
            user
          </ElAvatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <!-- <el-dropdown-item disabled>Action 4</el-dropdown-item> -->
              <el-dropdown-item divided>
                <ElLink :type="'danger'" @click="logout">退出登录</ElLink>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
   
        </ElDropdown>

      
        <!-- <ElButton @click="logout">退出</ElButton> -->

      </div>

    </div>


</template>
<style>
.layout-top{
  background: var(--layout-top-bg, var(--el-color-primary));
}
.layout-top-title{
  min-width: var(--layout-aside-width);
}
</style>