<template>
  <div class='container'>
      <!-- 返回上一页是.go(-1)或者back() -->
     <van-nav-bar fixed title="搜索结果" left-arrow  @click-left="$router.back()"></van-nav-bar>
  <!-- 实现上拉加载 -->
  <!------------------------------------------- 数据渲染部分-------------------------- -->
  <!--1. 先用假数据 -->
  <!--2. 然后把数据绑定至数据显示区域 -->
     <van-list v-model="upLoading" @load="onLoad" :finished="finished">
        <van-cell-group>
        <van-cell v-for="item in articles" :key="item.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{item.title}}</h3>
            <div class="img_box" v-if="item.cover.type===3">
              <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
              <van-image class="w33" fit="cover"  :src="item.cover.images[1]" />
              <van-image class="w33" fit="cover" :src="item.cover.images[2]" />
            </div>
            <div class="img_box" v-if="item.cover.type===1">
              <van-image class="w100" fit="cover"  :src="item.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{item.au-_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate | relTime}}</span>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
     </van-list>
  </div>
</template>

<script>
import * as Articles from '@/api/articles'
export default {

  data () {
    return {
      upLoading: false, // 上拉加载
      finished: false, // 表示当前的加载是否全部完成
      // 当全部完成时要将finished设置为true
      articles: [], // 放置搜索结果
      page: {
        page: 1, // 当前第几页
        per_page: 10 // 每页多少条记录
        // currentPage:1
      }
    }
  },
  methods: {
    // 该方法会在 滚动条滚动到底部的时间执行
    async onLoad () {
      // 加载数据
      // Articles.searchArticle({ page: this.page.page, per_page: this.page.per_page })
      const { q } = this.$route.query // 获取query参数

      // Articles.searchArticle({ ...this.page, q: q })
      const data = await Articles.searchArticle({ ...this.page, q })
      this.articles.push(...data.results) // 把数组结构出来，上拉加载触发时，将数据追加到队尾
      // 关闭上拉加载状态
      this.upLoading = false
      // 如何判断所有的数据被加载完了（可以根据返回的数据是否有记录）
      // 如果你反回的查询记录是0，我此时认为没有下一页的数据了
      if (data.results.length) {
        // 我认为是有下一页数据
        this.page.page++ // 如果有下一页应该把页码切到写一页
      } else {
        // 否则是没有下一页的数据
        this.finished = true // 没有下一页了
      }
    }
  }
}

</script>

<style lang='less' scoped>
.container {
  padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>
