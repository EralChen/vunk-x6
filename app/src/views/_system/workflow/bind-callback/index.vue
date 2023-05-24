<template>
  <ElForm
    :label-position="'top'"
    :label-suffix="':'"
  >
    <SkMultipageRenderer
      v-model="currentPage"
      :tab-x-class="'plr-form-pl'"
      :body-class="'h-100% '"
      :class="'h-100%'"
    >
      <SkMultipageTemplate
        :label="'成功回调'"
        :value="'success'"
      >
        <div class="plr-form-pl">
          <Cu
            v-model="passData"
            :form-id="props.formId"
          />
        </div>
      </SkMultipageTemplate>

      <SkMultipageTemplate
        :label="'失败回调'"
        :value="'fail'"
      >
        <div class="plr-form-pl">
          <Cu
            v-model="rejectData"
            :form-id="props.formId"
          />
        </div>
      </SkMultipageTemplate>
    </SkMultipageRenderer>
  </ElForm>
  <div sk-flex="row-end">
    <ElButton
      type="primary"
      @click="doBindCallback"
    >
      确定
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { SkMultipageRenderer, SkMultipageTemplate } from '@skzz/platform'
import { ref, watch } from 'vue'
import Cu from './cu/index.vue'
import { FlowCallback, FlowCallbackItem } from '@skzz-platform/api/system/workflow/callback/types'
import { cFlowCallback, rFlowCallbacks } from '@skzz-platform/api/system/workflow'

const props = defineProps({
  formId: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['success'])

const currentPage = ref('success')

const passData = ref<FlowCallbackItem>({
  notify: [],
  updateFormData: [],
})
const rejectData = ref<FlowCallbackItem>({
  notify: [],
  updateFormData: [],
})

watch(() => props.id, r, {immediate: true})
function r () {
  if (props.id)
    rFlowCallbacks(props.id)
      .then(res => {
        if (res) {
          const data = JSON.parse(res) as FlowCallback
          passData.value = data.pass
          rejectData.value = data.reject
        } else {
          clear()
        }
      })
}

function clear () {
  passData.value = {
    notify: [],
    updateFormData: [],
  }
  rejectData.value = {
    notify: [],
    updateFormData: [],
  }
}
const doBindCallback = () => {
  if (!passData.value.notify.length && !passData.value.updateFormData.length && !rejectData.value.notify.length && !rejectData.value.updateFormData.length) {
    return
  }
  cFlowCallback(props.id, {
    pass: passData.value,
    reject: rejectData.value,
  }).then(() => {
    clear()
    emit('success')
  })
}
</script>

<style lang="scss" scoped></style>