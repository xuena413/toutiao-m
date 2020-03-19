<template>
<!-- 可以帮助我们实现上拉加载 -->
  <!-- scrollwrapper为了阅读记忆 -->
  <div class="scroll-wrapper">
 <van-list finished-text="暂无数据" offset="200" v-model="upLoading" :finished="finished" @load="onLoad">

  <van-cell v-for="item in articles" :key="item" title="美股又垄断了" :value="'天台排队'+item" ></van-cell>
 </van-list>
  </div>

</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 默认false 检测到距底部的的距离大于一个规定长度时
      finished: false, // 是否已经完成所有数据加载
      articles: [] // 文章列表
    }
  },
  methods: {
    //  onLoad ()会自动执行
    onLoad () {
      console.log('开始记载数据')
      //   定时器停不了
      //   setTimeout(() => {
      //     this.upLoading = false  //等待一秒就将其关闭 高度还是不够就在开开启
      //   }, 1000)
      // 有数据要把数据加载到list中才能结束
      // setTimeout(() => {
      //   this.finished = true // 表示数据已经加载完毕没有数据了
      // }, 1000)
      // 如果数据加载完毕，你应该把finished设置为true，表示一切结束了不在请求
      // vant-List组件 第一次加载 需要让List组件出现滚动条 如果没有滚动条 就没有办法 继续往下拉
      if (this.articles.length > 50) {
        // 如果此时记录已经大于200
        this.finished = true // 关闭加载
      } else { // 45不大于50,再加15就是60
        const arr = Array.from(Array(15), (value, index) => this.articles.length + index + 1)
        // ------------------------- 上拉加载 不是覆盖之前的数据 应该把数据追加到数组的队尾
        this.articles.push(...arr)
        // --------------------------- 添加完数据要手动关掉loading
        this.upLoading = false
      }
    }
  }
}
</script>

<style>

</style>
