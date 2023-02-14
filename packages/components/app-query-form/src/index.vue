<script lang="ts">
import { props, emits } from './ctx'
import { computed, defineComponent, ref } from 'vue'
import { SkAppForm, _SkAppFormCtx } from '@skzz-platform/components/app-form'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
export default defineComponent({
  name: 'SkAppQueryForm',
  components: {
    SkAppForm,
    ArrowDown,
    ElIcon,
  },
  emits,
  props,
  setup (props, { emit }) {
    const formProps = _SkAppFormCtx.createBindProps(props, ['formItems'])
    const formEmits = _SkAppFormCtx.createOnEmits(emit)
    const fixedFormItems = computed(() => {
      return props.formItems.slice(0, props.fixes)
    })
    const moreFormItems = computed(() => {
      return props.formItems.slice(props.fixes)
    })
    const showMore = ref(false)
    return {
      formProps,
      formEmits,
      fixedFormItems,
      moreFormItems,
      showMore,
    }
  },
})
</script>
<template>
<div class="sk-app-query-form">
  <div class="sk-app-query-form__fixed">
    <SkAppForm 
      v-bind="formProps" 
      :formItems="fixedFormItems"
    >
    </SkAppForm>
    <slot name="options">
      <ElButton type="primary">查询</ElButton>
    </slot>
  </div>

  <div 
    class="sk-app-query-form__more"
    @click="showMore = !showMore"
  >
    <span>
      {{ showMore ? '收起' : '更多' }}
    </span>
    <ElIcon>
      <ArrowDown class="sk-app-query-form__arrow"
        :class="{
          'is-reverse': showMore,
        }"
      ></ArrowDown>
    </ElIcon>
  </div>

  <ElCollapseTransition>
    <SkAppForm 
      v-show="showMore"
      v-bind="formProps" 
      :formItems="moreFormItems"
    >
    </SkAppForm>
  </ElCollapseTransition>

</div>
</template>
<style>
.sk-app-query-form{
  position: relative;
}
.sk-app-query-form__fixed{
  display: flex;
  justify-content: space-between;
}
.sk-app-query-form__more{
  font-size: var(--f-xxs, 12px);
  color: var(--el-text-color-secondary);
  position: absolute;
  cursor: pointer;
  bottom: -1em;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  padding: 2px;

  display: flex;
  align-items: center;
}

.sk-app-query-form__more:hover{
  background: var(--el-fill-color);
  color: var(--el-color-primary);
}
.sk-app-query-form__more > * + * {
  margin-left: var(--gap-xxs, 4px);
}
.sk-app-query-form__arrow{
  transition: transform .5s;
}
.sk-app-query-form__arrow.is-reverse{
  transform: rotate(-180deg);
}
</style>