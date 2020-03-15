// 处理postcss插件
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'] // 所有文件都转化
    }
  }
}
