<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
          <!--这里会被缓存的视图组件，比如Home-->
          <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <!--这里是不被缓存的视图组件，比如Edit-->
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from '@/components/svg.vue'

export default {
  name: 'App',
  components: {
    svgIcon
  },
  data () {
    return {

    }
  },
  mounted () {

  }
}
</script>

<style lang="scss">
  @import '@/style/common';
  .router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
      opacity: 0;
  }
</style>
