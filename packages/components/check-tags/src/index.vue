<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
import { VkCheckLogicProvider, VkCheckLogic } from '@vunk/core'
import { ElCheckTag } from 'element-plus'
export default defineComponent({
  name: 'SkCheckTags',
  components: {
    VkCheckLogicProvider,
    VkCheckLogic,
    ElCheckTag,
  },
  emits,
  props,
})
</script>
<template>

    <VkCheckLogicProvider
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    >
      <div class="sk-check-tags">
        <VkCheckLogic class="sk-check-tag" v-for="item of options" :key="item.value"
          :name="item.value"
          :clearable="item.clearable ?? clearable" 
        >
          <template #default="{ isActive }">
            <ElCheckTag :checked="isActive" >
              {{  item.label  }}
            </ElCheckTag>
          </template>
        </VkCheckLogic>
      </div>
    </VkCheckLogicProvider>


</template>
<style>
.sk-check-tags{
  display: flex;
}
.sk-check-tag + .sk-check-tag{
  margin-left: var(--gap-widget-space, 14px);
}
</style>
