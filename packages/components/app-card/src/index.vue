<script lang="ts">
import { props, createCardBindProps } from './ctx'
import { defineComponent } from 'vue'
import { ElCard } from 'element-plus'
export default defineComponent({
  name: 'SkAppCard',
  components: {
    ElCard,
  },
  props,
  setup (props) { 
    const cardProps = createCardBindProps(props)
    return {
      cardProps,
    }
  },
})
</script>
<template>
  <ElCard class="sk-app-card" :class="{
    'has-not-body-padding': !bodyPadding,
    'is-flex': flex,
  }" v-bind="cardProps">
    <template #header>
      <slot name="header">
        <span>{{  header  }}</span>
        <slot name="header__options">
          <span></span>
        </slot>
      </slot>
    </template>
    <slot></slot>
  </ElCard>
</template>
<style>
.sk-app-card.is-flex{
  display: flex;
  flex-direction: column;
}

.sk-app-card.is-flex .el-card__body{
  flex: 1;
  overflow: hidden;
}

.sk-app-card.has-not-body-padding .el-card__body{
  padding: 0;
}

.sk-app-card .el-card__header{
  font-weight: bold;
  font-size: var(--f-card-title, 18px);
  display: flex;
  justify-content: space-between;
}
</style>