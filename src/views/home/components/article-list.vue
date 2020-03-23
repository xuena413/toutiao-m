<template>
<!-- 可以帮助我们实现上拉加载 -->
  <!-- scrollwrapper为了阅读记忆 -->
  <div class="scroll-wrapper">
    <!-- 下拉刷新组件包裹 列表组件 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="successText">
      <van-list finished-text="暂无数据" offset="200" v-model="upLoading" :finished="finished" @load="onLoad">
       <van-cell-group>
         <!------------------------------------ 假数据------------------------------>
        <!-- <van-cell v-for="item in articles" :key="item" title="美股又垄断了" :value="'天台排队'+item" > -->
           <van-cell v-for="item in articles" :key="item.art_id.toString()">
          <!-- 无图/单图/三图 -->
          <div class="article_item">
            <!-- 标题 -->
            <h3 class="van-ellipsis">{{item.title}}</h3>
            <!-- 根据封面类型决定 3/1/0 -->
            <!-- 三图图片 -->
            <div class="img_box" v-if="item.cover.type===3">
              <!-- 图片组件用的是vant的图片组件  需要使用该组件进行图片的懒加载-->
                <!-- 三图图片 -->
                <!----------------------------------1.动态加载 -->
              <!-- <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/> -->

              <van-image class="w33" fit="cover" :src="item.cover.images[0]"/>
              <van-image class="w33" fit="cover" :src="item.cover.images[1]"/>
              <van-image class="w33" fit="cover" :src="item.cover.images[2]"/>
            </div>
            <!-- 单图 --> -->
             <div class="img_box" v-if="item.cover.type===1" >
              <van-image class="w100" fit="cover"  :src="item.cover.images[0]"/>
            </div>
            <!-- 作者信息 -->
            <div class="info_box">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}</span>
              <span>{{item.pubdate}}</span>
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
import { getArticles } from '@/api/articles'
// 引入请求模块 article

export default {
  // prop:['channel_id'] 字符串数组接收，接收方式，比较简单
  props: {
    // key(prop属性名):value(对象 配置)
    channel_id: {
      required: true, // elenment ui的必填项
      type: Number, // 表示传入的prop的属性类型
      default: null // 没传入就会被采用
    }
  },
  data () {
    return {
      // 存储历史时间戳
      successText: '', // 刷新成功的文本
      downLoading: false,
      upLoading: false, // 默认false 检测到距底部的的距离大于一个规定长度时
      finished: false, // 是否已经完成所有数据加载
      articles: [],
      // 文章列表
      timestamp: null
      // 下载刷新状态 表示是否正在下拉刷新

    }
  },
  methods: {
    // 上拉加载
    //  onLoad ()会自动执行
    /* onLoad () {
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
    }, */
    async onLoad () {
      await this.$sleep(2000)
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()

      }) // 指的当前的频道  =》（有历史时间戳用历史的没有就用当前的）
      this.articles.push(...data.results) // 将数据追加到队尾  push一项一项的内容 （数组里面）
      this.upLoading = false
      // 需要判断历史时间戳是否为0，0就是没数据  this.upLoading = false
      if (data.pre_timestamp) {
      // 有历史时间戳 表示有数据进行加载
        this.timestamp = data.pre_timestamp
      } else {
      // 表示没有数据可以请求了
        this.finished = true
      }
    },
    // 下拉刷新
    // onRefresh () {
    //   setTimeout(() => {
    //     // 读取最新的数据 而且最新的数据要添加数据头部
    //     const arr = Array.from(Array(2), (value, index) => '追加' + (index + 1))
    //     // 数组添加到头部
    //     this.articles.unshift(...arr)
    //     // 手动的关闭正在加载的状态
    //     this.downLoading = false
    //     this.successText = `更新了${arr.length}条数据`
    //   }, 1000)
    // }
    // ------------------------------------------下拉动态数据更新
    async onRefresh () {
      // 下拉发送最新的时间戳
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: Date.now()
      })
      this.downLoading = false
      if (data.results.length) {
        this.articles = data.results // 历史数据被全部覆盖
        // 此时你 已经之前的全部覆盖了 假如你之前把数据拉到了底端 也就意味着 finished=true
        //  this.finished= data.pre_timestamp?
        if (data.pre_timestamp) {
          this.finished = false // 重新唤醒列表，让列表可以继续上拉加载
          this.timestamp = data.pre_timestamp
        }
        this.successText = `更新了${data.results.length}条数据`
      } else {
        this.successText = '当前已经是最新数据'
      }
      // 需要判断最新的时间戳能否换来数据  把新数据替换旧数据 如果不能 就告诉大家暂时没有更新
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
