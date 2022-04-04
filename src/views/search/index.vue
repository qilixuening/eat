<template>
  <div class="paddingTop search_page">
    <head-top head-title="搜索" :goBack="true" />
      <form class="search_form">
        <input
          type="search"
          name="search"
          placeholder="请输入商家或美食名称"
          class="search_input"
          v-model="searchValue"
          @input="checkInput"
        >
        <input
          type="submit"
          name="submit"
          class="search_submit"
          @click.prevent="searchTarget('')"
        >
      </form>
  </div>
</template>

<script>
import headTop from '@/components/HeadTop.vue'
import footGuide from '@/components/FootGuide.vue'
import { searchRestaurant } from '@/api/getData'
import { imgBaseUrl } from '@/config/env'
import { getStore, setStore } from '@/config/mUtils'

export default {
  name: 'searchIndex',
  data: () => ({
    geohash: '', // msite页面传递过来的地址信息
    searchValue: '', // 搜索内容
    restaurantList: [], // 搜索返回的结果
    imgBaseUrl, // 图片域名地址
    searchHistory: [], // 搜索历史记录
    showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
    emptyResult: false // 搜索结果为空时显示
  }),
  components: [
    headTop,
    footGuide
  ],
  mounted () {
    this.geohash = this.$route.params.geohash
    const history = getStore('searchHistory')
    if (history) {
      this.searchHistory = JSON.parse(history)
    }
  },
  methods: {
    // 点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
    async searchTarget (historyValue) {
      if (historyValue) {
        this.searchValue = historyValue
      } else if (!this.searchValue) {
        return
      }
      // 隐藏历史记录
      this.showHistory = false
      // 获取搜索结果
      this.restaurantList = await searchRestaurant(this.geohash, this.searchValue)
      this.emptyResult = !this.restaurantList.length
      /**
       * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
       * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
       */
      const history = getStore('searchHistory')
      if (history) {
        this.searchHistory = JSON.parse(history)
        this.searchHistory.some((item, i) => {
          if (item === this.searchValue) {
            this.searchHistory.splice(i, 1)
            return true
          } else return false
        })
      }
      this.searchHistory.unshift(this.searchValue)
      setStore('searchHistory', this.searchHistory)
    },
    // 搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
    checkInput () {
      if (this.searchValue === '') {
        this.showHistory = true // 显示历史记录
        this.restaurantList = [] // 清空搜索结果
        this.emptyResult = false // 隐藏搜索为空提示
      }
    },
    // 点击删除按钮，删除当前历史记录
    deleteHistory (index) {
      this.searchHistory.splice(index, 1)
      setStore('searchHistory', this.searchHistory)
    },
    // 清除所有历史记录
    clearAllHistory () {
      this.searchHistory = []
      setStore('searchHistory', this.searchHistory)
    }
  }
}
</script>
