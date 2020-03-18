<template>
<!-- 可以帮助我们实现上拉加载 -->
  <!-- scrollwrapper为了阅读记忆 -->
  <div class="scrollwrapper">
 <van-list v-model="upLoading" ></van-list>
  </div>

</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 默认false
      finished: false // 是否已经完成所有数据加载
    }
  },
  methods: {
    onLoad () {
      console.log('开始记载数据')
      //   定时器停不了
      //   setTimeout(() => {
      //     this.upLoading = false  //等待一秒就将其关闭 高度还是不够就在开开启
      //   }, 1000)

      setTimeout(() => {
        this.upLoading = true // 表示数据已经加载完毕没有数据了
      }, 1000)
    }
  }
}
</script>

<style>

</style>
