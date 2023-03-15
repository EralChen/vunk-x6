<script lang="ts">
import { props, emits, createCheckTagBindProps, createCheckTagOnEmits } from './ctx'
import { defineComponent } from 'vue'
import { ElCheckTag,ElIcon } from 'element-plus'
import { Close } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'SkCheckTag',
  components: {
    ElCheckTag,
    Close,
    ElIcon,
  },
  emits,
  props,

  setup (props, { emit }) {
    const coreProps = createCheckTagBindProps(props)
    const coreEmits = createCheckTagOnEmits(emit)
    return {
      coreProps,
      coreEmits,
    }
  },
})
</script>
<template>
  <ElCheckTag class="sk-check-tag"
    v-bind="coreProps"
    v-on="coreEmits"
  >
    <slot></slot>
    <ElIcon v-if="closeable" class="sk-check-tag__close" @click.stop="$emit('close')">
      <Close></Close>
    </ElIcon>
  </ElCheckTag>
</template>
<style>
.sk-check-tag{
  display: flex;
  align-items: center;

  --el-tag-bg-color: var(--el-color-info-light-9);
    --el-tag-border-color: var(--el-color-info-light-8);
    --el-tag-hover-color: var(--el-color-info);
    --el-icon-size: 14px;
}
.sk-check-tag__close{
  margin-left: 6px;
  border-radius: 50%;
  cursor: pointer;
  font-size: calc(var(--el-icon-size) - 2px);
  height: var(--el-icon-size);
  width: var(--el-icon-size);
}
.sk-check-tag__close:hover{

    color: var(--el-color-white);
    background-color: var(--el-tag-hover-color);
}
</style>