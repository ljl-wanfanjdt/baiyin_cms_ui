<template>
  <div class="login-panel">
    <div class="login-panel-wrap">
      <div class="left-img"></div>
      <div class="right-control">
        <login-account ref="accountRef" />
        <div class="control-btn">
          <el-checkbox
            v-model="isCachePassword"
            label="记住密码"
            size="large"
          />
          <div class="control-btn-right">
            <el-button
              type="primary"
              size="large"
              style="margin-bottom: 5px"
              @click="handleLoginClick"
              >立即登录</el-button
            >
            <el-link type="info">找回密码</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'

export default defineComponent({
  components: {
    LoginAccount
  },
  setup() {
    // const test = ref<HTMLScriptElement | null>(null)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const isCachePassword = ref(true)
    const handleLoginClick = () => {
      accountRef.value?.loginAction(isCachePassword.value)
    }
    // test.value?.onload
    return {
      isCachePassword,
      handleLoginClick,
      accountRef
    }
  }
})
</script>
<style lang="less" scoped>
@light_gray: #fff;
@cursor: #fff;
.login-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('../../../assets/img/login.png');
  .login-panel-wrap {
    display: flex;
    width: 1260px;
    height: 620px;
    padding: 88px 0 62px 0;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #ffffff;
    .left-img {
      width: 715px;
      height: 470px;
      background: no-repeat center center/100%
        url('../../../assets/img/_03.jpg');
    }
    .right-control {
      flex: 1;
      padding-right: 90px;
      .control-btn {
        display: flex;
        justify-content: space-between;
        height: 105px;
        width: 100%;
        padding: 15px 0 0 10px;
        box-sizing: border-box;
        .el-checkbox,
        .el-checkbox--large {
          color: #666666;
        }
        // background-color: antiquewhite;
        .control-btn-right {
          display: flex;
          flex-direction: column;

          .el-button {
            width: 230px;
            background-color: #4d69f6;
            color: 16px;
            letter-spacing: 1px;
          }
          .el-link {
            align-self: flex-end;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
