<template>
  <div class='container'>
      <!-- 返回上一页是.go(-1)或者back() -->
     <van-nav-bar title="搜索结果" left-arrow  @click-left="$router.back()"></van-nav-bar>
  </div>
</template>

<script>

export default {
  name: 'searchResult'
}

</script>

<style>

</style>
