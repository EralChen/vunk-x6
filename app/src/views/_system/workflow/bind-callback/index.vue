<template>
  <ElForm :label-position="'top'" :label-suffix="':'">
    <SkMultipageRenderer v-model="currentPage" :tabXClass="'plr-form-pl'" :bodyClass="'h-100% '" :class="'h-100%'">
      <SkMultipageTemplate :label="'成功回调'" :value="'success'">
        <div class="plr-form-pl">
          <Cu :formId="props.formId"></Cu>
        </div>
      </SkMultipageTemplate>

      <SkMultipageTemplate :label="'失败回调'" :value="'fail'">
        <div  class="plr-form-pl">
          <Cu :formId="props.formId"></Cu>
        </div>
      </SkMultipageTemplate>
    </SkMultipageRenderer>
  </ElForm>
  <div sk-flex="row-end">
    <ElButton type="primary" >确定</ElButton>
  </div>
</template>

<script setup lang="ts">
import { SkMultipageRenderer, SkMultipageTemplate } from '@skzz/platform'
import { ref } from 'vue'
import Cu from './cu/index.vue'

const props = defineProps({
  formId: {
    type: String,
    default: '',
  },
})

const currentPage = ref('success')
</script>

<style lang="scss" scoped></style>