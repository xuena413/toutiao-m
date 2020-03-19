<template>
<!-- 可以帮助我们实现上拉加载 -->
  <!-- scrollwrapper为了阅读记忆 -->
  <div class="scroll-wrapper">
    <!-- 下拉刷新组件包裹 列表组件 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" success-text="successText">
      <van-list finished-text="暂无数据" offset="200" v-model="upLoading" :finished="finished" @load="onLoad">
       <van-cell-group>
         <!------------------------------------ 假数据------------------------------>
        <!-- <van-cell v-for="item in articles" :key="item" title="美股又垄断了" :value="'天台排队'+item" > -->
           <van-cell v-for="item in articles" :key="item">
          <!-- 无图/单图/三图 -->
          <div class="article_item">
            <!-- 标题 -->
            <h3 class="van-ellipsis">2020年是世界大变革</h3>
            <!-- 三图图片 -->
            <div class="img_box">
              <!-- 图片组件用的是vant的图片组件  需要使用该组件进行图片的懒加载-->
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
            </div>
            <!-- 单图 -->
             <!-- <div class="img_box">
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
            </div> -->
            <!-- 作者信息 -->
            <div class="info_box">
              <span>你像一阵风</span>
              <span>8评论</span>
              <span>10分钟前</span>
              <span class="close"><van-icon name="cross"></van-icon></span>
            </div>
</div>
        </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      successText: '', // 刷新成功的文本
      downLoading: false,
      upLoading: false, // 默认false 检测到距底部的的距离大于一个规定长度时
      finished: false, // 是否已经完成所有数据加载
      articles: [] // 文章列表
      // 下载刷新状态 表示是否正在下拉刷新

    }
  },
  methods: {
    // 上拉加载
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
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        // 读取最新的数据 而且最新的数据要添加数据头部
        const arr = Array.from(Array(2), (value, index) => '追加' + (index + 1))
        // 数组添加到头部
        this.articles.unshift(...arr)
        // 手动的关闭正在加载的状态
        this.downLoading = false
        this.successText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.article_item{
  h3{
    font-weight: normal;
    line-height: 2;
  }
  .img_box{
    display: flex;
    justify-content: space-between;
    .w33{
      width: 33%;
      height: 90px;
    }
    .w100{
      width: 100%;
      height: 180px;
    }
  }
  .info_box{
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span{
      padding-right: 10px;
      &.close{
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
