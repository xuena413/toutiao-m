/**
 * 负责处理频道的请求
 */
import request from '@/utils/request'

export function getMyChannels () {
  return request({
    url: '/user/channels'
  })
}
