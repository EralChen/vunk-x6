<script lang="ts">
import { AnyFunc } from '@vunk/core'
import { defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import SpreadToParent from '_c/SpreadToParent/index.vue'
export default defineComponent({
  components: {
    SpreadToParent,
  },
  props: {
    data: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    isMenu: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
  },
  setup (props) {
    const doNav = (navigate: AnyFunc) => {
      if (!props.isMenu) {
        navigate()
      }
    }
    return {
      doNav,
    }
  },
})
</script>
<template>
<RouterLink :to="to" custom>
  <template #default="{ navigate, isActive, isExactActive, href }">
    <a
      @click.prevent="doNav(navigate)"
      class="layout-default-aside-link"
      :href="href"
      :class="{
        'is-active': isActive,
        'is-exact-active': isExactActive,
      }"
    >
      <SpreadToParent 
        :type="'class'"
        :data="{ 
          'is-active': isActive, 
          'is-exact-active': isExactActive,
        }"
      ></SpreadToParent>
      
      <slot 
        :isActive="isActive" 
        :isExactActive="isExactActive"
      >
        {{ data.meta?.name }}
      </slot>
    </a>
  </template>
</RouterLink>
</template>
<style>
.layout-default-aside-link{
  text-decoration: none;
  color: var(--el-menu-text-color);
}

.layout-default-aside-link.is-active{
  color: var(--el-menu-item-active-color);
}
</style>

