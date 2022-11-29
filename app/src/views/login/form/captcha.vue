<script lang="ts" setup>
import { defineComponent } from 'vue'
import { VkfInput } from '@vunk/form/components/input'

</script>
<template>
  <div vk-flex>
    <VkfInput
      label="验证码"
      labelWidth="4em"
      prop="captcha"
    ></VkfInput>
    <img :src="captcha.captcha" class="image" @click="getCaptcha" />
  </div>
</template>
