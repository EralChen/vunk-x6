<script lang="ts" setup>
import { SkUpload } from '@skzz-platform/components/upload'
import './api-init'
import { ref } from 'vue'
import { UploadUserFile } from 'element-plus'
const fileList = ref<UploadUserFile[]>([])
const fileIds = ref('648016b65b459966966d77f8,648028e55b459966966d7856,648028fe5b459966966d7858')

</script>
<template>
  <SkUpload 
    v-model:fileList="fileList"
    v-model="fileIds"
  ></SkUpload>

  {{ fileIds }}
</template>
