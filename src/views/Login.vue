<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-card class="card-container">
          <div slot="header" class="header">
            <span>Vue-Admin</span>
          </div>
          <el-form :model="userInfo" :rules="rules" ref="loginForm">
            <el-form-item prop="username">
              <el-input :prefix-icon="User" v-model="userInfo.username" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input :prefix-icon="Lock" :show-password="true" v-model="userInfo.password" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login" :loading="isLoading">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time';

const userInfo = reactive({ username: 'admin', password: '111111' })
const store = useUserStore()
const router = useRouter()
const isLoading = ref(false)
const loginForm = ref()
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (/^\w{6,}/.test(value)) {
    callback()
  } else {
    callback(new Error('密码至少6位'))
  }
}
const rules = {
  username: [{ required: true, min: 5, max: 10, message: '账号长度至少5位', trigger: 'change' }],
  password: [{ validator: validatorPassword, trigger: 'change' }]
}

const login = async () => {
  await loginForm.value.validate()
  isLoading.value = true
  try {
    await store.userLogin(userInfo)
    router.push('/')
    ElNotification({ type: 'success', title: `Hi,${getTime()}好`, message: '欢迎回来' })
  } catch (error) {
    ElNotification({ type: 'error', message: (error as Error).message })
  } finally {
    isLoading.value = false
  }
}

</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .el-row {
    height: 100%;

    .el-col {
      display: flex;
      justify-content: center;
      align-items: center;

      .card-container {
        width: 62%;
        background: url('@/assets/images/login_form.png') no-repeat bottom;
        border: 0;
        box-shadow: none;
        border-radius: 3px;

        .header {
          color: #fff;
          font-size: 28px;
          padding-bottom: 22px;
        }

        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
