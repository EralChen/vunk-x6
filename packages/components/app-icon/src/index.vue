<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
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
  setup () {
    return {

    }
  },
})
</script>
<template>

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

  <VkSvgIcon
    v-else-if="icon.includes('/')"
    :iconClass="icon"
    :style="{
      color: color,
      'font-size': size
    }"
    v-bind="$attrs"
  >
  </VkSvgIcon>

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
    v-else 
    :color="color" 
    :size="size"
    v-bind="$attrs"
  >

    
    <component :is="icon">
    </component>
    
  </ElIcon>
</template>
<style>
.sk-app-icon-svg__inner{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>