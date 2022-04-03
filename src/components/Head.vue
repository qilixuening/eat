<template>
  <header id="head-container">
    <slot name="logo" />
    <slot name="search" />
    <section
      class="head_goback"
      v-if="goBack"
      @click="$router.back()"
    >
      <svg
       width="100%"
       height="100%"
       xmlns="http://www.w3.org/2000/svg"
       version="1.1"
      >
        <polyline
          points="12,18 4,9 12,0"
          style="fill:none; stroke:rgb(255,255,255); stroke-width:2"
        />
      </svg>
    </section>

    <router-link
      class="head_login"
      v-if="signinUp"
      :to="userInfo ? '/profile' : '/login'"
    >
      <svg
        class="user_avatar"
        v-if="userInfo"
      >
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#user"
        />
      </svg>
      <span
        class="login_span"
        v-else
      >
        登录|注册
      </span>
    </router-link>
    <section
      class="title_head ellipsis"
      v-if="headTitle"
    >
      <span class="title_text">
        {{ headTitle }}
      </span>
    </section>
    <slot name="edit" />
    <slot name="msite-title" />
    <slot name="changecity" />
    <slot name="changelogin" />
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'headIndex',
  data: () => ({

  }),
  mounted () {
    this.getUserInfo()
  },
  props: {
    signinUp: {
      type: String,
      default: ''
    },
    headTitle: {
      type: String,
      default: ''
    },
    goBack: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ])
  }
}
</script>

<style lang='scss' scoped>
  @import '@/style/mixin';
  #head-container{
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
  }
  .head_goback{
    left: 0.4rem;
    @include wh(0.6rem, 1rem);
    line-height: 2.2rem;
    margin-left: .4rem;
  }
  .head_login{
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login_span{
      color: #fff;
    }
    .user_avatar{
      fill: #fff;
      @include wh(.8rem, .8rem);
    }
  }
  .title_head{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      font-weight: bold;
    }
  }
</style>
