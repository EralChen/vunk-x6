<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="vk-register-end-node-title">
    <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-End-v2.jpg" />
    <span>{{ label }}</span>
  </div>
</template>

<style>
.vk-register-end-node-title {
  display: flex;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
}

.vk-register-end-node-title img {
  width: 1em;
  height: 1em;
  margin-right: 8px;
}
</style>
