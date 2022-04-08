<template>
  <div class="login_container">
    <head-top
      :head-title="loginWay ? '登录' : '密码登录'"
      :go-back="true"
    />
    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">
        <input
          type="text"
          placeholder="账号密码随便输入"
          name="phone"
          maxlength="11"
          v-model="phoneNumber"
        >
        <button
          :class="{ right_phone_number: rightPhoneNumber }"
          v-show="!computedTime"
          @click.prevent="getVerifyCode"
        >
          {{ 获取验证码 }}
        </button>
        <button
          @click.prevent
          v-show="!computedTime"
        >
          已发送({{ computedTime }}s)
        </button>
      </section>
      <section class="input_container">
        <input
          type="text"
          placeholder="验证码"
          name="mobileCode"
          maxlength="6"
          v-model="mobileCode"
        >
      </section>
    </form>
    <form class="loginForm" v-else>
      <section class="input_container">
        <input
          type="text"
          placeholder="账号"
          v-model.lazy="userAccount"
        >
      </section>
      <section class="input_container">
        <input
          type="password"
          v-if="!showPassword"
          placeholder="密码"
          v-model="password"
        >
        <input
          v-else
          type="text"
          placeholder="密码"
          v-model="password"
        >
        <div></div>
      </section>
    </form>
  </div>
</template>

<script>
import headTop from '@/components/Head.vue'

export default {
  name: 'loginIndex',
  data: () => ({

  }),
  components: {
    headTop
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
