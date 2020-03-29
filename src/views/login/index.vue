<template>
  <div class="login-container">
    <div class="username-input">
      <el-input
        placeholder="请输入您的账号"
        name="username"
        type="text"
        v-model="loginForm.account"
      >
        <div slot="prefix" class="input-prefix">
          <img src="@/assets/icon-user.svg" alt="" />
        </div>
      </el-input>
    </div>
    <div class="password-input">
      <el-input
        type="password"
        placeholder="请输入账号密码"
        name="password"
        v-model="loginForm.password"
      >
        <div slot="prefix" class="input-prefix">
          <img src="@/assets/icon-password.svg" alt="" />
        </div>
      </el-input>
    </div>
    <div class="remeber-password">
      <el-checkbox v-model="checked">记住密码</el-checkbox>
    </div>
    <div class="login-btn" @click="login">
      登录
    </div>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";

export default {
  name: "index",
  data() {
    return {
      loginForm: {
        account: "admin",
        password: "admin"
      },
      checked: false
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.login-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .username-input,
  .password-input {
    width: 320px;
    height: 50px;

    .input-prefix {
      width: 30px;
      height: 30px;
      img {
        width: 100%;
      }
    }
  }
  .username-input {
    padding-bottom: 20px;
  }
  .remeber-password {
    width: 320px;
    padding-top: 15px;
  }
  .login-btn {
    width: 320px;
    height: 44px;
    background: rgba(67, 115, 249, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-top: 32px;
    line-height: 44px;
    text-align: center;
    cursor: pointer;
  }
  @{aaa} .el-input {
    height: 100%;
  }
  @{aaa} .el-input__inner {
    border-radius: 2px;
    height: 100%;
    border: 1px solid rgba(229, 229, 229, 1);
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    padding-left: 52px;
  }
  @{aaa} .el-input__prefix {
    left: 10px;
    display: flex;
    align-items: center;
  }
  @{aaa} .el-checkbox__inner {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid rgba(216, 216, 216, 1);
    &::after {
      left: 5px;
      top: 2px;
    }
  }
  @{aaa} .el-checkbox__label {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
