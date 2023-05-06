<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, reactive } from 'vue'
import { VkCheckLogicProvider, VkCheckLogic } from '@vunk/core'
import { SkCheckTag } from '@skzz-template/components/check-tag'
import { Option } from './types'
export default defineComponent({
  name: 'SkCheckTags',
  components: {
    VkCheckLogicProvider,
    VkCheckLogic,
    SkCheckTag,
  },
  emits,
  props,
  setup (props, { emit }) {
    const cOptionState =  reactive({
      inputting: false,
      value: '',
    })
    const setDataOptions = () => {
      if (cOptionState.value) {
        emit('setData:options', {
          k: props.options.length,
          v: {
            label: cOptionState.value,
            value: cOptionState.value,
            closeable: true,
          } as Option,
          insert: true,
        })
        cOptionState.value = ''
        cOptionState.inputting = false
      }
    }
    const unsetDataOptions = (index: number, e: {
      isActive: boolean,
      toggle: () => void,
    }) => {
      emit('unsetData:options', {
        k: index,
      })
      if (e.isActive) {
        e.toggle()
      }
    }
    return {
      cOptionState,
      setDataOptions,
      unsetDataOptions,
    }
  },
})
</script>
<template>

    <VkCheckLogicProvider
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    >
      <div class="sk-check-tags">
        <VkCheckLogic class="sk-check-tag" v-for="(item, index) of options" :key="item.value"
          :name="item.value"
          :clearable="item.clearable ?? clearable" 
        
        >
          <template #default="{ isActive, toggle }">
            <SkCheckTag :checked="isActive" 
              :closeable="item.closeable"
              @close="unsetDataOptions(index, {
                isActive,
                toggle,
              })"
            >
              {{  item.label  }}
            </SkCheckTag>
          </template>
        </VkCheckLogic>

        <div class="sk-check-tag" sk-flex="row-center2"
          v-if="modules.includes('creatable')"
        >
          <ElInput
           :size="'small'"
            v-if="cOptionState.inputting"
            v-model="cOptionState.value"
            @keydown.enter="setDataOptions"
          >
            <template #append>
              <ElButton :size="'small'"
                @click="setDataOptions"
              >
                <el-icon><CircleCheck /></el-icon>
              </ElButton>
              <ElButton :size="'small'"
                @click="cOptionState.inputting = false"
              >
                <el-icon><CircleClose /></el-icon>
              </ElButton>

            </template>
          </ElInput>

          <SkCheckTag
            v-else
            @click="cOptionState.inputting = true"
          
          >+</SkCheckTag>
         
        </div>
      
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
