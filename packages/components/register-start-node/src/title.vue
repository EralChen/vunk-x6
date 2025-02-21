<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: '开始',
  },
})
</script>

<template>
  <div class="vk-register-start-node__title">
    <img
      src="https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-Start-v2.jpg"
    />
    <span>{{ label }}</span>
  </div>
</template>

<style>
.vk-register-start-node__title {
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.vk-register-start-node__title img{
  width: 1em;
  height: 1em;
  margin-right: 8px;
}
</style>
