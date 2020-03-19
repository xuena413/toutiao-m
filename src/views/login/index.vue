 <template>
    <div class='container'>
    <!-- 导航 显示返回箭头-->
    <!-- click-left点击左侧事件 -->
    <!-- $router.go(-1) $router.back() -->
    <van-nav-bar title='登录'  left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 登录布局 -->
    <!-- 外层需要用cell-group组件来包裹提供 边框 -->
    <van-cell-group>
      <!-- ----------------------------第二步：将参数绑定到表单 用v-model然后加上trim，去除空白格 -->
        <!-- 登录手机号 -->
         <!-- // --------------------------------------第四步：光标离开进行触发方法 -->
          <van-field @blur="checkMobile" :error-message="errorMessage.mobile" label="手机号" v-model.trim="loginForm.mobile" placeholder="请输入手机号"></van-field>
        <!-- 验证码 -->
          <van-field @blur="checkcode" :error-message="errorMessage.code" label="验证码" v-model.trim="loginForm.code" placeholder="请输入验证码">
            <!-- 插槽内容 -->
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class='login-box'>
        <!-- // --------------------------------------第五步：登录时间进行表单校验 -->
      <van-button @click="login" type="info" round size="small" block>登录</van-button>
    </div>
  </div>
</template>

<script>

// --------------------------------第八步：引入user的api （也就是axios请求接口封装方法）
// //引入方法1
// import * as user from  '@/api/user'  使用时user.login
// 引入方法2
import { login } from '@/api/user'
// 第十步 映射mutition方法
import { mapMutations } from 'vuex'
export default {
  data () {
    // --------------------------------------第一步：表单数据的声明
    return {
      // 表单数据
      // --------------------------------------第六步：为了操作方便，可将手机号和验证码写死 -->
      loginForm: {
        mobile: '13911111111', // 手机号
        code: '246810'// 验证码
      },
      errorMessage: {
        mobile: '', // 手机号
        code: ''// 验证码
      }
      // codeMessage: '',
      // mobileMessage: ''
    }
  },

  // --------------------------------------第三步：验证方法的声明
  methods: {
    ...mapMutations(['updateUser']), // 可以导入需要的方法
    // 检查手机号（非空，格式校验）
    checkMobile () {
      if (!this.loginForm.mobile) { // 为空
        this.errorMessage.mobile = '手机号不能为空'
        return false // 不往下校验直接返回false  通过了返回true
      }
      console.log(this.loginForm.mobile)
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMessage.mobile = '手机号格式不正确'
        return false
      }
      this.errorMessage.mobile = ''
      return true
    },
    // 检查验证码
    checkcode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码为六位数字'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    async login () {
      // this.checkMobile()
      // this.checkcode()1
      // 小bug解决只判断当不填默认值，什么都不填就登录时间只校验手机号的bug，
      const validateMobile = this.checkMobile()
      const validateCode = this.checkcode()
      if (validateMobile && validateCode) {
        // 两个都为true则通过校验
        // console.log('校验通过')
        // --------------------------------------第七步：调接口验证密码是否正确
        // --------------------------------------第九步：调方法+传参
        // 复杂方法： login({ mobile: this.loginForm.mobile, code: this.loginForm.code })
        // 简单方法：
        // 项目一：then catch
        // login(this.loginForm).then(result => {

        // }).catch()
        try {
          const result = await login(this.loginForm)
          console.log(result) // 打印结果

          // 拿到token之后，应该把token设置给vuex中的state
          // 修改Vuex中的state必须通过mutations
          // 方法1：this.$state.commit('')
          // 方法2：
          this.updateUser({ user: result }) // 相当于更新当前token和refresh_token
          // 跳转到主页
          // 获取当前页面的路由信息
          const { redirectUrl } = this.$route.query
          // 有值跳该页面，没值不跳
          this.$router.push(redirectUrl || '/') // 短路函数
        } catch (error) {
          // 提示用户登录失败
          // this.$notify({
          //   message: '手机号或者验证码错误',
          //   duration: 500
          // })

          // 可对别人的组件进行这种形式的修改
          this.$xnotify({
            message: '手机号或者验证码错误'

          })
        }
      }
    }

  }
}
</script>

<style>
.login-box {
  padding: 20px
}
</style>
