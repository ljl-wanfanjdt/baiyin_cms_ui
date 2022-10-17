<template>
  <div class="login-account">
    <h3 class="title">管理系统登录</h3>
    <el-form
      class="account-form"
      :model="userInfo"
      ref="formRef"
      :rules="rules"
    >
      <el-form-item prop="userName">
        <span>
          <el-icon :size="20"><UserFilled /></el-icon>
        </span>
        <el-input
          v-model="userInfo.userName"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span>
          <el-icon :size="20"><Lock /></el-icon>
        </span>
        <el-input
          v-model="userInfo.password"
          placeholder="请输入密码"
          clearable
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import { rules } from '../config/rules'
import cache from '@/utils/cache'
export default defineComponent({
  components: {},
  setup() {
    const userInfo = reactive({
      userName: cache.getCache('userName', 1) ?? '',
      password: cache.getCache('password', 1) ?? ''
    })
    const store = useStore()
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isCachePassword: boolean) => {
      // 检验参数
      formRef.value?.validate(async (valid) => {
        if (!valid) {
          return
        }
        if (isCachePassword) {
          // 将账号密码存入本地缓存中
          cache.setCache('userName', userInfo.userName, 1)
          cache.setCache('password', userInfo.password, 1)
        }
        store.dispatch('loginMoudle/loginActionHandle', {
          userName: userInfo.userName,
          password: userInfo.password
        })
      })
    }
    return {
      userInfo,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>
<style lang="less" scoped>
.login-account {
  padding-left: 10px;
  text-align: center;
  // background-color: rgb(236, 163, 163);
  .account-form {
    color: #8c8c8c;
    .el-form-item {
      margin-bottom: 30px;
      :deep(.el-form-item__content) {
        padding-left: 8px;
        box-sizing: border-box;
        border: 1px solid #cccccc;
        border-radius: 5px;
        .el-icon {
          vertical-align: middle;
        }
        .el-input {
          flex: 1;
          .el-input__wrapper {
            height: 54px;
            border: none;
            box-shadow: none;
          }
        }
      }
    }
  }
  .title {
    margin: 0;
    margin-bottom: 50px;
    font-size: 28px;
    font-weight: 500;
    color: #333333;
    letter-spacing: 2px;
    font-family: '微软雅黑';
  }
}
</style>
