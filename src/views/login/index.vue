<template>
  <div class="logo-container login-container">
    <div class="logo-wrapper"></div>
    <el-form class="login-form" auto-complete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">商品管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" auto-complete="on" placeholder="请输入您的账号" maxlength="11" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input name="password" :type="pwdType" v-model="loginForm.password" auto-complete="on"
          placeholder="请输入您的登录密码" maxlength="24" @keyup.enter.native="handleLogin"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" v-show="!falg"/><svg-icon icon-class="password-view" v-show="falg"/></span>
      </el-form-item>
      <el-form-item>
        <el-button class="log-btn" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { requiredTip, checkPhoneV } from '@/utils/validator'
import '@/styles/loginform.scss'

export default {
  name: 'login',
  data() {
    return {
      falg: false,
      loginForm: {
        username: '',
        password: '',
        role: 2
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: checkPhoneV }],
        password: [
          { required: true, message: requiredTip('您的登录密码'), trigger: 'blur' }
        ]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      this.falg = !this.falg
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      var that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          that.loading = true
          that.$store.dispatch('Login', that.loginForm).then(() => {
            that.$router.replace({ path: '/' })
          }).catch((error) => {
            that.$error(error.response.data)
          })
        }
      })
    }
  }
}
</script>
