<template>
  <div class="rating_page">
    <head-top
      head-title="发现"
      :goBack="true"
    />
    <section>发现</section>
    <foot-guide />
  </div>
</template>

<script>
import headTop from '@/components/Head.vue'
import { getImgPath } from '@/components/common/mixin'
import footGuide from '@/components/footGuide.vue'

export default {
  data () {
    return {

    }
  },
  created () {

  },
  components: {
    headTop,
    footGuide
  },
  mixins: [
    getImgPath
  ],
  props: [

  ],
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';

.rating_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 202;
  padding-top: 1.95rem;
  p, span {
    font-family: Helvetica Neue,Tahoma,Arial;
  }
}
</style>
