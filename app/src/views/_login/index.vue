<script lang="ts" setup>
import FormVue from './form/index.vue'
import { setData } from '@vunk/core'
import { ref } from 'vue'
import { LoginFormData } from './types'
import { loginByPassword } from '@skzz-platform/api/login'
import { useRouter } from 'vue-router'
import { ElTabs, ElTabPane } from 'element-plus'
const router = useRouter()
const currentPage = ref('1')
const data = ref({
  userCode: 'root',
  password: '123456',
} as LoginFormData)
const login = () => {
  loginByPassword(data.value).then(() => {
    router.push({ path: '/home' })
  })
}
</script>
<template>
  <div sk-flex="col-center2" class="h-100% bg-bg-page">
    <div class="w-1200px h-680px bg-bg-overlay rd-16px overflow-hidden" sk-flex>
      <div class="flex-1  overflow-hidden bg-login-bg" >
        <div class="pa-42px text-white  h-full" sk-flex="col-between">
          <div class="fw-bold f-l ">智子开发平台</div>
          <div>
            浙江时空智子大数据
          </div>
        </div>
   
      </div>
      <div class="flex-1 overflow-hidden " > 
        <div class="pl-80px pr-80px ">
          <div class="c-primary fw-bold text-28px pt-90px
            pb-56px text-center
          ">智子开发平台</div>

          <ElTabs  v-model="currentPage" class="login-tabs">
            <ElTabPane label="账号密码登录" name="1">
              <FormVue 
                class="login-form"
                :data="data"
                @setData="setData(data, $event)"
                @login="login"
              ></FormVue>
            </ElTabPane>

            <ElTabPane label="手机验证码登录" name="2">
      
            </ElTabPane>

            <ElTabPane label="扫码登录" name="3">
              
            </ElTabPane>
          </ElTabs>
     
        </div>

      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
.bg-login-bg{
  background-image: url('/imgs/login-bg.png');
  background-size: cover;
  background-position: center;
}

</style>

<style lang="scss">
.login-tabs{
  .el-tabs__nav{
    width: 100%;
  }
  .el-tabs__item{
    width: 33.33%;
    text-align: center;
  }
  .el-tabs__header{
    margin-bottom: 60px;
  }
}
</style>