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
          <van-field @blur="checkMobile" :error-message="errorMessage.moblie" label="手机号" v-model.trim="loginForm.moblie" placeholder="请输入手机号"></van-field>
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
export default {
  data () {
    // --------------------------------------第一步：表单数据的声明
    return {
      // 表单数据
      loginForm: {
        moblie: '', // 手机号
        code: ''// 验证码
      },
      errorMessage: {
        moblie: '', // 手机号
        code: ''// 验证码
      }
      // codeMessage: '',
      // mobileMessage: ''
    }
  },

  // --------------------------------------第三步：验证方法的声明
  methods: {
    // 检查手机号（非空，格式校验）
    checkMobile () {
      if (!this.loginForm.moblie) { // 为空
        this.errorMessage.moblie = '手机号不能为空'
        return false // 不往下校验直接返回false  通过了返回true
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMessage.moblie = '手机号格式不正确'
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
    login () {
      this.checkMobile()
      this.checkcode()
      if (this.checkMobile() && this.checkcode()) {
        // 两个都为true则通过校验
        console.log('校验通过')
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
