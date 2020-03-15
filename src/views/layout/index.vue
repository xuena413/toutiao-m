<template>
  <div class="container">
<!--  导航组件 -->
<van-nav-bar
  title="黑马头条"
  right-text="搜索"
  fixed
   @click-right="$router.push('/search')"
  v-if="$route.path!=='/user'"
   >
</van-nav-bar>
<!-- 二级理由容器 -->
<div class="my-wrapper" :class="{noTop: $route.path === '/user'}">
<router-view></router-view>
</div>

<!-- 标签栏组件 -->
  <van-tabbar route>
      <!-- router-link  to  -->
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  //控制二级路由容器
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }}
</style>
