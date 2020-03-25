 <template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search @search="onSearch" v-model.trim="q" placeholder="请输入搜索关键词" shape="round" />
   <!-- 联想内容 有输入内容时 显示联想 -->
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell @click="toResult(item)" icon="search" v-for="(item,index) in suggestList" :key='index'>
        <!-- <span>java</span> -->
        {{item}}
      </van-cell>
    </van-cell-group>

    <!-- <div class="history-box" v-if="!q"> -->
      <div class="history-box" v-else>
      <!--1.-------------------------- 历史记录存在的时候才显示头部 -->
      <div class="head" v-if="historyList.length>0">
        <span>历史记录</span>
        <van-icon name="delete" @click="clear"></van-icon>
      </div>
      <van-cell-group>
        <!--2.1----------------------------------------- 绑定参数历史列表 -->
        <van-cell @click="toResult(item)" v-for='(item,index)  in historyList' :key="index">
          <a class="word_btn">{{item}}</a>
          <!-- 2.---------------------注册点击×的事件 -->
          <!-- 3.---------------------绑定点击事件的名称并传入删除的索引 -->
           <!-- 4.爆发出来一个问题：就是点击儿子（X）父亲上面的事件也被触发了 因此要解决事件冒泡
         js  event.stopPagintion()
         vue中可以用修饰符阻止事件冒泡
           -->

          <van-icon @click.stop="delHistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/articles' // 引入建议的接口
const key = 'hm-94-toutiao-history' // 此key用来作为历史记录在本地缓存中的key
export default {
  name: 'search',
  data () {
    return {
      q: '',
      // historyList: [], // 作为数据变量搜索历史记录
      // 初始值设定：方法1
      // ['马云','动漫']
      historyList: JSON.parse(localStorage.getItem(key) || '[1,2,3,4,5]'),
      suggestList: [] // 联想的搜索建议
    }
  },
  watch: {
    // ----------------------------------------------防抖方法(联想搜索)
    /* q () {
      // console.log(this.q)
      clearTimeout(this.timer) // 先清除掉定时器
      this.timer = setTimeout(async () => {
        // 参函数需要请求 联想搜索的建议
        // 当为空的时间不发送请求
        if (!this.q) {
          this.suggestList = []
          return
        }
        const data = await getSuggestion({ q: this.q }) // 等待期执行成功 发送请求
        this.suggestList = data.options // 将返回的词条的
      }, 300)
    } */
    // ----------------------------------------------节流方法(联想搜索)
    q () {
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null
          if (!this.q) {
            this.suggestList = []
            return
          }
          const data = await getSuggestion({ q: this.q }) // 等待期执行成功 发送请求
          this.suggestList = data.options // 将返回的词条的
        }, 500)
      }
    }
  },
  methods: {
    // toSearchResult (text) {
    //   // this.$router 路由对象实例
    //   // this.$router 之前的路由页面的对象信息 当前地址params 参数 query参数 fullpath
    //   // --------------------------------------5.1 传参的两种方式
    //   // this.$router.push('/search/result?q=' + text) // (此处采用query传参)
    //   // 5:-------------------------------------路由传参 params query
    //   this.$router.push({ path: '/search/result', query: { q: text } }) // (此处采用params传参)
    // },
    // -------------------------------- toSearchResult (text) 与 toResult (text)二合一
    toResult (text) {
      // 应该把text放到历史记录
      this.historyList.push(text) // 加到历史记录
      this.historyList = Array.from(new Set(this.historyList)) // 去重
      localStorage.setItem(key, JSON.stringify(this.historyList))// 设置到本地的缓存当中
      // 跳转到搜索结果
      this.$router.push({ path: '/search/result', query: { q: text } }
      )
    },
    // ----------------------3.1 删除方法
    delHistory (index) {
      // 删除要先在data中删除数据 然后把data中的数据同步到本地缓存中
      this.historyList.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(this.historyList))
    },

    async clear () {
      // 6.-------------------------清空历史纪录
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确认删除所有的历史纪录吗？'
        })
        this.historyList = [] // 将历史纪录设置为空
        localStorage.setItem(key, '[]') // 同步设置历史纪录为空
      } catch (error) {
        // 失败不需要数据
      }
    },
    onSearch () {
      // 1. 回车时跳转到结果页 ,并且携带参数
      // 2.跳转之前把搜索结国添加到历史纪录
      // alert(111)
      if (!this.q) return
      this.historyList.push(this.q)
      this.historyList = Array.from(new Set(this.historyList)) // 去重
      localStorage.setItem(key, JSON.stringify(this.historyList))
      this.$router.push({ path: '/search/result', query: { q: this.q } })
    }
  },
  created () {
  // 钩子函数 实例初始化之后
    // 初始值设定：方法2
    // this.historyList = localStorage.getItem(key || '[]')
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
