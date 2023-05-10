<script lang="ts">
import { props, emits } from './ctx'
import { computed, defineComponent } from 'vue'
import { ElIcon } from 'element-plus'
import { VkSvgIcon } from '@vunk/core'
export default defineComponent({
  name: 'SkAppIcon',
  inheritAttrs: false,
  components: {
    ElIcon,
    VkSvgIcon,
  },
  emits,
  props,
  setup (props) {
    const elIconName = computed(() => {
      // 正则匹配 <el-icon><SwitchButton /></el-icon> 获取到名称
      const icon = props.icon
      if (!icon) {
        return ''
      }
      const regex = /<el-icon><(.+?)\s*\/><\/el-icon>/
      const match = regex.exec(icon)
      if (match) {
        const componentName = match[1]
        return componentName
      } 
        
      return  ''
    })
    return {
      elIconName,
    }
  },
})
</script>
<template>

<template v-if="icon">
  <VkSvgIcon
    v-if="icon.startsWith(customPrefix)"
    :iconClass="icon.replace(customPrefix, '')"
    :style="{
      color: color,
      'font-size': size
    }"
    v-bind="$attrs"
  >
  </VkSvgIcon>
  <!-- 正则判断是否是url  -->
  <VkSvgIcon
    v-else-if="/^https?:\/\//.test(icon) || /^data:image/.test(icon) ||icon.startsWith('/')"
    :url="icon"
    
    :style="{
      color: color,
      'font-size': size
    }"
    v-bind="$attrs"
  >
  </VkSvgIcon>

  <ElIcon v-else-if="elIconName">
    <component :is="elIconName.trim()">
    </component>
  </ElIcon>

  <ElIcon 
    v-else-if="icon.startsWith('<svg')"
    :color="color" 
    :size="size"
    v-bind="$attrs"
  >
    <span v-html="icon" class="sk-app-icon-svg__inner"></span>
  </ElIcon>

  <span 
    v-else-if="/^\d/.test(icon)"
    v-bind="$attrs"
  >
    {{ icon }}
  </span>

  <ElIcon 
    v-else-if="/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/.test(icon)"
    :color="color" 
    :size="size"
    v-bind="$attrs"
  >
    <component :is="icon.trim()">
    </component>
  </ElIcon>

</template>

</template>
<style>
.sk-app-icon-svg__inner{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>