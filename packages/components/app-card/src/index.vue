<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SkAppCard',
  emits,
  props,
})
</script>
<template>
  <div class="sk-app-card"> 
    <div class="sk-app-card__header" :class="`is-${type}`">
      {{  title  }}
    </div>
    <div class="sk-app-card__body">
      <slot></slot>
    </div>
  </div>
</template>
<style>
.sk-app-card__header{
  color: var(--el-color-primary);
  font-weight: bold;
}
.sk-app-card__header.is-form {
  padding: var(--gap-form-ptb, 24px) var(--gap-form-pl, 70px);
}
</style>