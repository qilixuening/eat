<template>
  <div class="msite_container">
    <head-top signin-up="msite">
      <template #search>
        <router-link
          class="link_search"
          to="/search/geohash"
        >
          <!-- 搜索图标 -->
          <svg width="100%" height="100%">
            <circle
              cx="8" cy="8" r="7"
              stroke="rgb(255,255,255)" stroke-width="1" fill="none"
            />
            <line
              x1="14" y1="14" x2="20" y2="20"
              stroke="rgb(255,255,255)" stroke-width="2"
            />
          </svg>
        </router-link>
      </template>
      <template #msite-title>
        <router-link
          class="msite_title"
          to="/home"
        >
          <span
            class="title_text ellipsis"
          >
            {{ msiteTitle }}
          </span>
        </router-link>
      </template>
    </head-top>

    <nav class="msite_nav">
      <div
        v-if="foodTypes.length"
        class="swiper-container"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide food_types_container"
            v-for="(item, index) in foodTypes"
            :key="index"
          >
            <router-link
              class="link_to_food"
              v-for="foodItem in item"
              :key="foodItem.id"
              :to="{
                path: '/food',
                query: { geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link) }
              }"
            >
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>
                  {{ foodItem.title }}
                </figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination" />
      </div>
      <img
        v-else
        class="fl_back animation_opactiy"
        src="@/assets/fl.svg"
      >
    </nav>

    <foot-guide />
  </div>
</template>

<script>
import headTop from '@/components/Head.vue'
import footGuide from '@/components/FootGuide.vue'
import { cityGuess, getMsiteAddress, getMsiteFoodTypes } from '@/api/getData'
import { mapMutations } from 'vuex'

import '@/plugins/swiper.min.js'
import '@/style/swiper.min.css'

export default {
  name: 'msiteIndex',
  data: () => ({
    geohash: '', // 当前页面地址的geohash
    msiteTitle: '请选择地址...', // msite页面头部标题
    isMsiteReady: false, // 是否已获取到地址位置数据，成功后再获取商铺列表
    foodTypes: [], // 食品分类列表
    imgBaseUrl: 'https://fuss10.elemecdn.com' // 图片域名地址
  }),
  components: {
    headTop,
    footGuide
  },
  async beforeMount () {
    if (!this.$route.query.geohash) {
      const city = await cityGuess()
      this.geohash = `${city.latitude}.${city.longitude}`
    } else {
      this.geohash = this.$route.query.geohash
    }
    // 将geohash存入vuex
    this.SAVE_GEOHASH(this.geohash)
    // 根据geohash获取位置描述信息
    const res = await getMsiteAddress(this.geohash)
    this.msiteTitle = res.name
    // 记录经纬度信息
    this.RECORD_ADDRESS(res)

    this.isMsiteReady = true
  },
  mounted () {
    // 获取导航食品类型列表
    getMsiteFoodTypes(this.geohash).then(res => {
      const ret = [...res]
      const foodList = []
      for (let i = 0, j = 0; i < res.length; i += 8, j++) {
        foodList[j] = ret.splice(0, 8)
      }
      this.foodTypes = foodList
    }).then(() => {
      return new window.Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true
      })
    })
  },
  computed: {

  },
  methods: {
    ...mapMutations([
      'SAVE_GEOHASH',
      'RECORD_ADDRESS'
    ]),
    getCategoryId (url) {
      const urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''))
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '@/style/mixin';
  .link_search {
    left: .8rem;
    @include wh(.9rem, .9rem);
    @include ct;
  }
  .msite_title {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title_text {
      @include sc(.8rem, #fff);
      text-align: center;
      display: block;
    }
  }
  .msite_nav{
    padding-top: 2.1rem;
    background-color: #fff;
    border-bottom: 0.025rem solid $bc;
    height: 10.6rem;
    .swiper-container{
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
      .swiper-pagination{
        bottom: 0.2rem;
      }
    }
    .fl_back{
      @include wh(100%, 100%);
    }
  }
  .food_types_container{
    display:flex;
    flex-wrap: wrap;
    .link_to_food{
      width: 25%;
      padding: 0.3rem 0rem;
      @include fj(center);
      figure{
        img{
          margin-bottom: 0.3rem;
          @include wh(1.8rem, 1.8rem);
        }
        figcaption{
          text-align: center;
          @include sc(0.55rem, #666);
        }
      }
    }
  }
</style>
