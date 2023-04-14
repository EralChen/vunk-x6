<script lang="ts">
import { cloneDeep } from 'lodash'
import { props, emits } from './ctx'
import { computed, defineComponent } from 'vue'
import { useFormDisabled } from 'element-plus'
import { useComputedReadonly } from '@vunk/form'
export default defineComponent({
  name: 'SkTableSelectTags',
  emits,
  props,
  setup (props, { emit }) {
    const tempProp = {
      id: 'id',
      label: 'label',
      ...props.prop,
    }

    const tDisabled = useFormDisabled()
    const tReadonly = useComputedReadonly(props)
    const unuse = computed(() => tDisabled.value || tReadonly.value)


    const model = computed({
      get: () => props.modelValue,
      set: (v) => {
        return emit('update:modelValue', v)
      },
    })

    const closeTag = (id: string) => {
      if (!props.closable) return
      const tempModelValue = cloneDeep(model.value)
      tempModelValue.splice(
        tempModelValue.findIndex((item) => item[tempProp.id] === id),
        1,
      )
      model.value = tempModelValue
    }
    function doClick (e: MouseEvent) {
      if (unuse.value) return
      emit('click', e)
    }
    return {
      closeTag,
      tempProp,
      model,
      unuse,
      doClick,
    }
  },
})
</script>
<template>
  <div :class="{'fack-input-x': true, 'is-disabled': unuse}" @click="doClick">
    <div class="fack-input w-100%">
      <ElTag v-for="item in model" :key="item[tempProp.id]" :closable="closable" type="info"
        @close="closeTag(item[tempProp.id])">
        {{ item[tempProp.label] }}
      </ElTag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fack-input-x {
  --el-input-inner-height: calc(var(--el-input-height, 32px) - 2px);
  display: inline-flex;
  flex-grow: 1;
  padding: 1px 11px;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  transition: var(--el-transition-box-shadow);
  transform: translateZ(0);
  cursor: pointer;
  min-height: var(--el-input-inner-height);

  &:hover:not(.is-disabled) {
    box-shadow: 0 0 0 1px var(--el-text-color-secondary) inset;
  }
  &.is-disabled {
    background-color: var(--el-disabled-bg-color);
    box-shadow: 0 0 0 1px var(--el-disabled-border-color) inset;
    cursor: not-allowed;
  }
}

.fack-input .el-tag {
  margin-right: 5px;
}</style>