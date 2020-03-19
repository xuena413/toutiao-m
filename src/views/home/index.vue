<template>
  <div class="container">
  <!-- <van-button type="default">默认按钮</van-button>
  <van-button type="primary">主要按钮</van-button>
  <van-button type="info">信息按钮</van-button>
  <van-button type="warning">警告按钮</van-button>
  <van-button type="danger">危险按钮</van-button> -->
  <van-tabs>
    <!-- 第一处修改 -->
    <!-- <van-tab :title="`标签${item}`" v-for="item in 10" :key="item"> -->
        <van-tab :title="item.name" v-for="item in channels" :key="item.id">
      <!-- 生成若干单元格 -->
      <!-- <div class="scroll-wrapper">
     <van-cell-group>
      <van-cell title="单元格" value="内容"  v-for="item in 20" :key="item"/>
     </van-cell-group>
      </div> -->
   <ArticleList></ArticleList>

    </van-tab>

  </van-tabs>
  <span class="bar_btn">
    <van-icon name='wap-nav'></van-icon>
  </span>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleList from './components/article-list'
import { getMyChannels } from '@/api/channels'
export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      channels: [] // 接收频道数据
    }
  },
  methods: {
    async getMyChannels () {
      const data = await getMyChannels() // 从api调出来的数据   data就是接收返回的数据结构
      this.channels = data.channels
    }
  },
  created () {
    // 直接获取频道数据
    this.getMyChannels()
  }
}
</script>

<style lang='less' scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    // 在写scoped的情况下 /deep/是让样式在其他子组件生效
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    //这里为啥叫类型  scroll-wrapper 超出部分自动加滚动条，不超出不加 scroll 是直接加，但是不超不起作用
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
