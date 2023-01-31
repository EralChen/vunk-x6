<script lang="ts">
import { props, emits } from './ctx'
import { computed, defineComponent, ref } from 'vue'
import { VkCheckLogic, VkCheckLogicProvider, VkDuplex } from '@vunk/core'

export default defineComponent({
  name: 'SkMultipage',
  components: {
    VkCheckLogic, VkCheckLogicProvider, VkDuplex,
  },
  emits,
  props,
  setup (props) {
    const visitedTabs =  ref(new Set<string|number>())
    const visitedModules = computed(() => {
      return props.lazy 
        ? props.modules.filter(item => visitedTabs.value.has(item.value))
        : props.modules
    })

    return {
      visitedTabs,
      visitedModules,
    }
  },
})
</script>
<template>
  <VkDuplex>
    <template #one>
      <VkCheckLogicProvider :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      >
        <div class="sk-multipage-header">
          <div class="sk-multipage-tab-x" :class="tabXClass">
            <VkCheckLogic 
              v-for="item of modules" 
              :key="item.value"
              :name="item.value"
              class="sk-multipage-tab"
              :clearable="false"
              @active="visitedTabs.add(item.value)"
            >
              {{ item.label }} 
            </VkCheckLogic>
          </div>

          <div 
            class="sk-multipage-options-x" 
            v-for="item of visitedModules" 
            :key="item.value"
            v-show="modelValue === item.value"
          >
            <slot v-bind="item" :name="item.value + '__options'"></slot>
          </div>
       

        </div>
      </VkCheckLogicProvider>
    </template>
    
    <div 
      v-for="item of visitedModules" 
      :key="item.value"
      v-show="modelValue === item.value"
    >
      <slot v-bind="item" :name="item.value"></slot>
    </div>
  </VkDuplex>
</template>
<style>
.sk-multipage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sk-multipage-tab-x{
  display: flex;
}
.sk-multipage-tab{
  font-size: var(--f-multipage-tab, 18px);
  padding-top: var(--gap-multipage-tab-ptb, 24px);
  padding-bottom: var(--gap-multipage-tab-ptb, 24px);
  color: var(--el-text-color-secondary);
  cursor: pointer;
}
.sk-multipage-tab.is-active  {
  color: var(--el-color-primary);
  font-weight: bold;
}
.sk-multipage-tab + .sk-multipage-tab{
  margin-left: var(--gap-multipage-tab-space, 70px);
}

</style>