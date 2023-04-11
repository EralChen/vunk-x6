<template>
  <PageX>
    <SkAppCard class="h-100%" :header="'新增表单配置'">
      <template #header__options>
        <ElButton type="primary" @click="cu">提交</ElButton>
      </template>
      <div class="h-full">
        <SkAppFormaker class="h-full" :data="data" @setData="setData(data, $event)" v-model:formItems="formItems"
          @setData:formItems="setData(formItems, $event)" @unsetData:formItems="unsetData(formItems, $event)"
          :canU="canU"></SkAppFormaker>
      </div>
    </SkAppCard>
  </PageX>
</template>

<script setup lang="ts">
import PageX from '_c/PageX/index.vue'
import { SkAppCard, SkAppFormaker } from '@skzz/platform'
import { NormalObject, setData, unsetData } from '@vunk/core'
import { Ref, ref } from 'vue'
import { FIRS } from '../types'

const canU = ref<boolean>()
const data = ref<NormalObject>({})
const formItems = ref([]) as Ref<FIRS[]>
function cu () {
  console.log('cu')
}

</script>

<style scoped></style>