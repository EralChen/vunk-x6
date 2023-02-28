<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SkAppModule',
  emits,
  props,
})
</script>
<template>
  <div class="sk-app-module"> 
    <div class="sk-app-module__header" :class="`is-${type}`">
      {{  title  }}
    </div>
    <div class="sk-app-module__body" :class="`is-${type}`">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.sk-app-module__header{
  color: var(--el-color-primary);
  font-weight: bold;
}
.sk-app-module__header.is-form {
  font-size: var(--f-module-title, 18px);
  padding: var(--gap-tab-pt, 24px) var(--gap-form-pl, 70px);
}

.sk-app-module__body.is-form {
  padding: var(--gap-form-pt, 14px) var(--gap-form-pl, 70px);
}
</style>