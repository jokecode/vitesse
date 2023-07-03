<script lang="ts">
import { Component, Vue, Watch } from 'vue-facing-decorator'
import type { LocationQuery, RouteLocationNormalized } from 'vue-router'
import type { FormInstance, InputInstance } from 'element-plus'

import { useUserStore } from '~/modules/stores/modules/user'
import { isValidUsername } from '~/utils/validate'
import LangSelect from '~/components/LangSelect/index.vue'

@Component({
  name: 'Login',
  components: {
    LangSelect,
  },
})
export default class Login extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value))
      callback(new Error('Please enter the correct user name'))
    else
      callback()
  }

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6)
      callback(new Error('The password can not be less than 6 digits'))
    else
      callback()
  }

  public loginForm = {
    username: 'admin',
    password: '111111',
  }

  public loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }],
  }

  public loading = false
  private redirect?: string
  private otherQuery: LocationQuery = {}

  @Watch('$route', { immediate: true })
  private onRouteChange(route: RouteLocationNormalized) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as LocationQuery
    if (query) {
      this.redirect = query.redirect as string
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted() {
    if (this.loginForm.username === '')
      (this.$refs.username as InputInstance).focus()
    else if (this.loginForm.password === '')
      (this.$refs.password as InputInstance).focus()
  }

  public handleLogin() {
    (this.$refs.loginForm as FormInstance).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        await useUserStore().LOGIN(this.loginForm)
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery,
        }).catch((err) => {
          console.warn(err)
        })
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
      }
      else {
        return false
      }
    })
  }

  private getOtherQuery(query: LocationQuery) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect')
        acc[cur] = query[cur]

      return acc
    }, {} as LocationQuery)
  }
}
</script>

<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          系统登录
        </h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" name="username" type="text" tabindex="1" autocomplete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input v-model="loginForm.password" tabindex="2" autocomplete="on" type="password" show-password @keyup.enter="handleLogin" />
      </el-form-item>

      <el-button :loading="loading" type="primary" size="large" style="width:100%; margin-bottom:30px;" @click.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input { color: $loginCursorColor; }
    input::first-line { color: $lightGray; }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: calc(100% - 40px);
    .el-input__wrapper {

      width: 100%;
      background: transparent;
      border: unset;
      box-shadow: unset;
    }

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
