<script lang="ts">
import { props, emits } from './ctx'
import { computed, defineComponent } from 'vue'
import { SkAppForm, _SkAppFormCtx } from '@skzz-platform/components/app-form'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElForm, ElIcon } from 'element-plus'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { useReady } from '@skzz-platform/composables'
import { useModelComputed } from '@vunk/core/composables'
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
    const fixedFormDef = new Deferred<InstanceType<typeof ElForm>>()
    const moreFormDef = new Deferred<InstanceType<typeof ElForm>>()
    const { ready, result: forms } = useReady(Promise.all(
      [fixedFormDef.promise, moreFormDef.promise],
    ))

    const expand = useModelComputed({
      default: false,
      key: 'expand',
    }, props, emit) 

    return {
      formProps,
      formEmits,
      fixedFormItems,
      moreFormItems,
      expand,
      fixedFormDef,
      moreFormDef,
      ready,
      forms,
    }
  },
})
</script>
<template>
<div class="sk-app-query-form">
  <div class="sk-app-query-form__fixed">
    <SkAppForm 
      v-bind="formProps" 
      v-on="formEmits"
      :formItems="fixedFormItems"
      :elRef="fixedFormDef.resolve"
    >
    </SkAppForm>
    <div>
      <slot 
       name="options"
       v-if="ready" 
        :forms="forms"
      >
      <ElButton type="primary">查询</ElButton>
    </slot>
    </div>

  </div>

  <div 
    class="sk-app-query-form__more"
    @click="expand = !expand"
  >
    <span>
      {{ expand ? '收起' : '更多' }}
    </span>
    <ElIcon>
      <ArrowDown class="sk-app-query-form__arrow"
        :class="{
          'is-reverse': expand,
        }"
      ></ArrowDown>
    </ElIcon>
  </div>

  <ElCollapseTransition>
    <SkAppForm 
      v-show="expand"
      v-bind="formProps" 
      v-on="formEmits"
      :formItems="moreFormItems"
      :elRef="moreFormDef.resolve"
    >
    </SkAppForm>
  </ElCollapseTransition>

</div>
</template>
<style>
.sk-app-query-form{
  position: relative;
  padding-bottom: 1em;
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
  bottom: 0;
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