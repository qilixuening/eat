<template>
  <div class="home-container">
    <head-top signin-up='home'>
      <template #logo>
        <span
          class='head_logo'
          @click='reload'
        >
          ele.me
        </span>
      </template>
    </head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link
        :to="'city/'+guessCity"
        class="guess_city"
      >
        <span>{{ guessCity }}</span>
        <svg class="arrow_right">
          <use xlink:href="#arrow-right" />
        </svg>
      </router-link>
    </nav>
    <section id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear">
        <router-link
          v-for="city in hotCities"
          :to="'/city/'+city.id"
          :key="city.id"
        >
          <li>{{ city.name }}</li>
        </router-link>
      </ul>
    </section>
    <section class="group_city_container">
      <ul class="letter_classify">
        <li
          v-for="(cities, char, i) in sortedGroupCities"
          :key="char"
          class="letter_classify_li"
        >
          <h4 class="city_title">
            {{ char }}
            <span v-if="i === 0">（按字母排序）</span>
          </h4>
          <ul class="groupcity_name_container citylistul clear">
            <router-link
              v-for="city in cities"
              :key="city.id"
              :to="'/city/' + city.id"
            >
              <li class="ellipsis">{{ city.name }}</li>
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import headTop from '@/components/Head.vue'
import {
  cityGuess,
  hotcity,
  groupcity
} from '@/api/getData'

export default {
  name: 'HomeIndex',
  props: {},
  data () {
    return {
      guessCity: '', // 当前城市
      guessCityId: '', // 当前城市id
      hotCities: [], // 热门城市泪飙
      groupCities: {} // 所有城市列表
    }
  },
  components: {
    headTop
  },
  computed: {
    sortedGroupCities () {
      const ret = {}
      for (let i = 65; i <= 90; i++) {
        if (this.groupCities[String.fromCharCode(i)]) {
          ret[String.fromCharCode(i)] = this.groupCities[String.fromCharCode(i)]
        }
      }
      return ret
    }
  },
  mounted () {
    this.getGuessCity()
    this.getHotCity()
    this.getGroupCity()
  },
  methods: {
    async getGuessCity () {
      const { name, id } = await cityGuess()
      this.guessCity = name
      this.guessCityId = id
    },
    async getHotCity () {
      this.hotCities = await hotcity()
    },
    async getGroupCity () {
      this.groupCities = await groupcity()
    },
    reload () {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .head_logo{
    left: 0.4rem;
    font-weight: 400;
    @include sc(0.7rem, #fff);
    @include wh(2.3rem, 0.7rem);
    @include ct;
  }
  .city_nav{
    padding-top: 2.35rem;
    border-top: 1px solid $bc;
    background-color: #fff;
    margin-bottom: 0.4rem;
    .city_tip{
      @include fj;
      line-height: 1.45rem;
      padding: 0 0.45rem;
      span:nth-of-type(1){
        @include sc(0.55rem, #666);
      }
      span:nth-of-type(2){
        font-weight: 900;
        @include sc(0.475rem, #9f9f9f);
      }
    }
    .guess_city{
      @include fj;
      align-items: center;
      height: 1.8rem;
      padding: 0 0.45rem;
      border-top: 1px solid $bc;
      border-bottom: 2px solid $bc;
      @include font(0.75rem, 1.8rem);
      span:nth-of-type(1){
        color: $blue;
      }
      .arrow_right{
        @include wh(.6rem, .6rem);
        fill: #999;
      }
    }
  }
  #hot_city_container{
    background-color: #fff;
    margin-bottom: 0.4rem;
  }
  .citylistul{
    li{
      float: left;
      text-align: center;
      color: $blue;
      border-bottom: 0.025rem solid $bc;
      border-right: 0.025rem solid $bc;
      @include wh(25%, 1.75rem);
      @include font(0.6rem, 1.75rem);
    }
    li:nth-of-type(4n){
      border-right: none;
    }
  }
  .city_title{
    color: #666;
    font-weight: 400;
    text-indent: 0.45rem;
    border-top: 2px solid $bc;
    border-bottom: 1px solid $bc;
    @include font(0.55rem, 1.45rem, "Helvetica Neue");
    span{
      @include sc(0.475rem, #999);
    }
  }

  .letter_classify_li{
    margin-bottom: 0.4rem;
    background-color: #fff;
    border-bottom: 1px solid $bc;
    .groupcity_name_container{
      li{
        color: #666;
      }
    }
  }
</style>
