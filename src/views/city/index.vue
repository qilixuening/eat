<template>
  <div class="city_container">
    <head-top
      :head-title="cityName"
      :go-back="true"
    >
      <template #changecity>
        <router-link to="/home" class="change_city">切换城市</router-link>
      </template>
    </head-top>
    <!-- 搜索区域 -->
    <form class="city_form" @submit.prevent>
      <div>
        <input
          type="search"
          name="city"
          placeholder="输入地址（学校、写字楼、小区）"
          class="city_input input_style"
          v-model="inputValue"
          required
        >
      </div>
      <div>
        <input
          type="submit"
          name="submit"
          class="city_submit input_style"
          @click="postpois"
          value="提交"
        >
      </div>
    </form>
    <header v-if="isShowHistoryTitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li
        v-for="(place, index) in placeList"
        :key="index"
        @click="nextpage(idnex, place.geohash)"
      >
        <h4 class="pois_name ellipsis">{{ place.name }}</h4>
        <p class="pois_address ellipsis">{{ place.address }}</p>
      </li>
    </ul>
    <footer
      v-if="isShowHistoryTitle && placeList.length"
      class="clear_all_history"
      @click="clearAll"
    >
      清空所有
    </footer>
    <div
      class="search_none_place"
      v-if="isSearchEmpty"
    >
      抱歉！无搜索结果
    </div>
  </div>
</template>

<script>
import headTop from '@/components/Head.vue'
import { getCityName, getCityPlaces } from '@/api/getData'
import { getStore, setStore, removeStore } from '@/config/mUtils'

export default {
  name: 'CityIndex',
  data: () => ({
    cityName: '', // 当前城市名称
    cityId: '', // 当前城市id
    inputValue: '', // 搜索词
    placeList: [], // 地址搜索列表
    placeHistory: [], // 历史搜索记录
    isShowHistoryTitle: true, // 显示搜索历史这一行
    isSearchEmpty: false // 搜索是否无结果
  }),
  components: {
    headTop
  },
  mounted () {
    this.cityId = this.$route.params.cityId
    this.initData()
    this.getCityName()
  },
  computed: {
  },
  methods: {
    // 获取城市名称
    async getCityName () {
      const { name } = await getCityName(this.cityId)
      this.cityName = name
    },
    // 获取搜索历史
    initData () {
      const history = getStore('placeHistory')
      if (history) {
        this.placeList = JSON.parse(history)
      }
    },
    // 进行搜索
    async postpois () {
      if (this.inputValue) {
        const ret = await getCityPlaces(this.cityId, this.inputValue)
        this.isShowHistoryTitle = false
        this.placeList = ret
        this.isSearchEmpty = !ret.length
      }
    },
    // 点击地址进入下一页
    nextpage (index, geohash) {
      const history = getStore('placeHistory')
      // 更新浏览记录
      if (history) {
        this.placeHistory = JSON.parse(history)
        if (this.placeHistory.some(place => place.geohash === geohash)) {
          this.placeHistory.splice(index, 1)
        }
      }
      this.placeHistory.unshift(this.placeList[index])
      setStore('placeHistory', this.placeHistory)
      this.$router.push({ path: '/msite', query: { geohash } })
    },
    // 清除历史记录
    clearAll () {
      removeStore('placeHistory')
      this.initData()
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '@/style/mixin';
  .city_container{
    padding-top: 2.35rem;
  }
  .change_city{
    right: 0.4rem;
    @include sc(0.6rem, #fff);
    @include ct;
  }
  .city_form{
    background-color: #fff;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-top: 0.4rem;
    div{
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .input_style{
        border-radius: 0.1rem;
        margin-bottom: 0.4rem;
        @include wh(100%, 1.4rem);
      }
      .city_input{
        border: 1px solid $bc;
        padding: 0 0.3rem;
        @include sc(0.65rem, #333);
      }
      .city_submit{
        background-color: $blue;
        @include sc(0.65rem, #fff);
      }
    }
  }
  .pois_search_history{
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-left: 0.5rem;
    @include font(0.475rem, 0.8rem);
  }
  .getpois_ul{
    background-color: #fff;
    border-top: 1px solid $bc;
    li{
      margin: 0 auto;
      padding-top: 0.65rem;
      border-bottom: 1px solid $bc;
      .pois_name{
        margin: 0 auto 0.35rem;
        width: 90%;
        @include sc(0.65rem, #333);
      }
      .pois_address{
        width: 90%;
        margin: 0 auto 0.55rem;
        @include sc(0.45rem, #999);
      }
    }
  }
  .search_none_place{
    margin: 0 auto;
    @include font(0.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-indent: 0.5rem;
  }
  .clear_all_history{
    @include sc(0.7rem, #666);
    text-align: center;
    line-height: 2rem;
    background-color: #fff;
  }
</style>
