<template>
  <div class="forget_container">
    <head-top
      head-title="重置密码"
      :goBack="true"
    />
    <form class="restForm">
      <section class="input_container phone_number">
        <input
          type="text"
          placeholder="账号"
          name="phone"
          maxlength="11"
          v-model="phoneNumber"
          @input="inputPhone"
        >
      </section>
      <section class="input_container">
        <input
          type="text"
          placeholder="旧密码"
          name="oldPassWord"
          v-model="oldPassWord"
        >
      </section>
      <section class="input_container">
        <input
          type="text"
          placeholder="请输入新密码"
          name="newPassWord"
          v-model="newPassWord"
        >
      </section>
      <section class="input_container">
        <input
          type="text"
          placeholder="请确认密码"
          name="confirmPassWord"
          v-model="confirmPassWord"
        >
      </section>
      <section class="input_container captcha_code_container">
        <input
          type="text"
          placeholder="验证码"
          maxlength="6"
          name="mobileCode"
          v-model="mobileCode"
        >
        <div class="img_change_img">
          <img
            v-show="captchaCodeImg"
            :src="captchaCodeImg"
          >
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div class="login_container" @click="resetButton">确认修改</div>
    <alert-tip
      v-if="showAlert"
      :showHide="showAlert"
      :alertText="alertText"
      @closeTip="clsoeTip"
    />
  </div>
</template>

<script>
import headTop from '@/components/Head.vue'
import alertTip from '@/components/common/AlertTip.vue'
import {
  getCaptchas,
  checkExist,
  mobileCode,
  changePassword
} from '@/api/getData.js'

export default {
  data () {
    return {
      phoneNumber: '', // 电话号码
      oldPassWord: '', // 旧密码
      newPassWord: '', // 新密码
      rightPhoneNumber: false, // 手机号是否符合规范
      confirmPassWord: '', // 确认密码
      captchaCodeImg: '', // 验证码地址
      mobileCode: '', // 短信验证码
      computedTime: 0, // 倒计时
      showAlert: false, // alert-tip组件是否显示
      alertText: '', // alert-tip组件现实的内容
      accountType: 'mobile' // 注册方式
    }
  },
  components: {
    headTop,
    alertTip
  },
  created () {
    this.getCaptchaCode()
  },
  methods: {
    // 判断输入的电话号码
    inputPhone () {
      if (/.+/gi.test(this.phoneNumber)) {
        this.rightPhoneNumber = true
      } else {
        this.rightPhoneNumber = false
      }
    },
    // 获取短信验证码
    async getVerifyCode () {
      if (!this.rightPhoneNumber) {
        return undefined
      }

      this.computedTime = 30
      this.timer = setInterval(() => {
        this.computedTime--
        if (this.computedTime === 0) {
          clearInterval(this.timer)
        }
      }, 1000)
      // 判断用户是否存在
      const { message, is_exists: existing } = await checkExist(this.phoneNumber, 'mobile')
      if (message) {
        this.showAlert = true
        this.alertText = message
        return undefined
      } else if (existing) {
        this.showAlert = true
        this.alertText = '您输入的手机号尚未绑定'
        return undefined
      }
      // 发送短信验证码
      const { message: me, validate_token: token } = await mobileCode(this.phoneNumber)
      if (me) {
        this.showAlert = true
        this.alertText = me
        return undefined
      }
      this.validate_token = token
    },
    // 获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
    async getCaptchaCode () {
      const { code } = await getCaptchas()
      this.captchaCodeImg = code
    },
    // 重置密码
    async resetButton () {
      if (!this.phoneNumber) {
        this.showAlert = true
        this.alertText = '请输入正确的账号'
        return
      } else if (!this.oldPassWord) {
        this.showAlert = true
        this.alertText = '请输入旧密码'
        return
      } else if (!this.newPassWord) {
        this.showAlert = true
        this.alertText = '请输入新密码'
        return
      } else if (!this.confirmPassWord) {
        this.showAlert = true
        this.alertText = '请输确认密码'
        return
      } else if (this.newPassWord !== this.confirmPassWord) {
        this.showAlert = true
        this.alertText = '两次输入的密码不一致'
        return
      } else if (!this.mobileCode) {
        this.showAlert = true
        this.alertText = '请输验证码'
        return
      }
      // 发送重置信息
      const { message } = await changePassword(
        this.phoneNumber,
        this.oldPassWord,
        this.newPassWord,
        this.confirmPassWord,
        this.mobileCode)
      if (message) {
        this.showAlert = true
        this.alertText = message
        await this.getCaptchaCode()
      } else {
        this.showAlert = true
        this.alertText = '密码修改成功'
      }
    },
    closeTip () {
      this.showAlert = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.forget_container{
  padding-top: 1.95rem;
}
.restForm{
  background-color: #fff;
  margin-top: .6rem;
  .input_container{
    display: flex;
    justify-content: space-between;
    padding: .6rem .8rem;
    border-bottom: 1px solid #f1f1f1;
    input{
      @include sc(.7rem, #666);
    }
    button{
      @include sc(.65rem, #fff);
      font-family: Helvetica Neue,Tahoma,Arial;
      padding: .28rem .4rem;
      border: 1px;
      border-radius: 0.15rem;
    }
    .right_phone_number{
      background-color: #4cd964;
    }
  }
  .phone_number{
    padding: .3rem .8rem;
  }
  .captcha_code_container{
    height: 2.2rem;
    .img_change_img{
      display: flex;
      align-items: center;
      img{
        @include wh(3.5rem, 1.5rem);
        margin-right: .2rem;
      }
      .change_img{
        display: flex;
        flex-direction: 'column';
        flex-wrap: wrap;
        width: 2rem;
        justify-content: center;
        p{
          @include sc(.55rem, #666);
        }
        p:nth-of-type(2){
          color: #3b95e9;
          margin-top: .2rem;
        }
      }
    }
  }
}
.captcha_code_container{
  height: 2.2rem;
  .img_change_img{
    display: flex;
    align-items: center;
    img{
      @include wh(3.5rem, 1.5rem);
      margin-right: .2rem;
    }
    .change_img{
      display: flex;
      flex-direction: 'column';
      flex-wrap: wrap;
      width: 2rem;
      justify-content: center;
      p{
        @include sc(.55rem, #666);
      }
      p:nth-of-type(2){
        color: #3b95e9;
        margin-top: .2rem;
      }
    }
  }
}
.login_container{
  margin: 1rem .5rem;
  @include sc(.7rem, #fff);
  background-color: #4cd964;
  padding: .5rem 0;
  border: 1px;
  border-radius: 0.15rem;
  text-align: center;
}
</style>
