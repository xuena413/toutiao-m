// 放用户的请求api
// ---------------------------------------------第二步引入调用的工具
import request from '@/utils/request'
// request相当于axios的实例，和axios有同样的效果   例如instance
// ---------------------------------------------第一步导出登录的方法
export function login (data) {
// ---------------------------- 第三步：返回axios对象
  return request({ // 相当于返回axios()和promise对象
    // -------------------------------第四步：  配置选项
    url: '/authorizations', // 由于在request里面设置过了，因此在这里不用写全
    method: 'post',
    //   body参数写在data中（传入登录手机号和验证码）
    data// axios中body参数设置在data中

  })
  // 返回promise对象
}
