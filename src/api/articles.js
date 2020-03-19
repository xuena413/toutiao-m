/**
 * 处理文章的请求
 */
import request from '@/utils/request'
/**
 * 获取文章推荐的数据
 * 需要传入 timestamp 时间戳 channel_id(频道id)
 */
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params } // 延展运算符进行合并
  })
}