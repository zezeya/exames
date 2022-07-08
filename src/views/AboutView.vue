<template>
  <div class="register flex-center">
    <div class="popup shadow">
      <el-container class="container">
        <el-main class="main shadow flex-column">
          <el-steps class="steps"
                    :active="stepActive"
                    finish-status="success"
                    align-center>
            <el-step title="注册"></el-step>
            <el-step title="注册完成"></el-step>

          </el-steps>
          <!-- 官方实例不能完全照搬 -->
          <!-- 步骤为1 时展示注册表单 -->
          <el-form class="form-content"
                   ref="register"
                   :model="register"
                   :rules="rules"
                   v-if="stepActive==1">
            <el-form-item prop="username"
                          label="用户名">
              <el-input v-model="register.username"
                        placeholder="用户名:"></el-input>
            </el-form-item>

            <el-form-item prop="name"
                          label="真实姓名">
              <el-input v-model="register.name"
                        placeholder="真实姓名:"></el-input>
            </el-form-item>
            <el-form-item prop="phone"
                          label="手机号码">
              <el-input v-model="register.phone"
                        placeholder="手机号:"></el-input>
            </el-form-item>
            <el-form-item prop="email">

              <el-input v-model="register.email"
                        placeholder="邮箱:"></el-input>
            </el-form-item>
            <el-form-item prop="password"
                          label="密码">

              <el-input v-model="register.password"
                        placeholder="输入密码:"
                        type="password"
                        show-password></el-input>
            </el-form-item>
            <el-form-item prop="checkPass"
                          label="确认密码">

              <el-input v-model="register.checkPass"
                        placeholder="再次确认密码:"
                        type="password"
                        show-password></el-input>
            </el-form-item>
            <el-form-item prop="captcha">

              <el-input v-model="register.captcha"
                        placeholder="请输入验证码:"
                        maxlength='4'></el-input>
              <!-- 展示验证码图片位置路径变量captchaImage -->
              <!-- 第一这里@click 是干嘛的 -->
              <img :src="captchaSrc"
                   @click="getCaptcha()"
                   alt="">
            </el-form-item>

            <el-form-item>
              <el-button class="btn-login"
                         type="primary"
                         @click="submit">Register</el-button>
              <span></span>
            </el-form-item>

          </el-form>
          <!-- 步骤为2时展示注册完成倒计时 -->
          <div class="countDown"
               v-if="stepActive==2">
            <div class="countDownTitle">注册完成</div>
            <div class="countDownSecond">{{count}}秒后自动跳转</div>
          </div>
        </el-main>
      </el-container>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
// import { encrypt } from '../assets/ulils/index'
export default {
  data() {
    // 密码验证
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.register.checkPass !== '') {
          this.$refs.register.validateField('checkPass')
        }
        callback()
      }
    }
    // 再次确认密码验证
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.register.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 手机号码验证
    var validatePhone = (rule, value, callback) => {
      var reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('手机号码格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      register: {
        active: 0,
        username: '',
        name: '',
        phone: '',
        password: '',
        checkPass: '',
        email: '', //必填 用户邮W箱
        captcha: '',
      },
      stepActive: 1, // 当前的步骤
      count: 3, //倒计时
      captchaSrc: '/api/captcha',
      timer: null,
      //    captchaImage: '',
      rules: {
        // 可添加一些表单规则
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: 'blur' },
        ],
      },
    }
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    },
    // 这个事件是用来刷新验证路径的
    // 怎么触发这个事件
    getCaptcha() {
      this.captchaSrc = '/api/captcha?' + Math.random() //
    },
    //校验用户名和密码，如果成功，返回true，失败返回错误
    getValideResult() {
      //1 校验用户名和密码，如果校验成功，返回true，校验失败返回false;// this.$message方法的使用和 getvalidateResult(){
      // 用户名密码不能为空; 密码也不能为空;
      var res = { result: true }
      if (this.username == '') {
        // 这种错误的提示语言不太好;
        res.result = false
        res.message = { type: 'warning', message: '用户名不能为空' }
      } else if (this.password == '') {
        res.result = false
        res.message = { type: 'warning', message: '密码不能为空' }
      }
      if (!res.result) this.$message(res.message)
      return res
    },

    submit() {
      //v-model获取input的值
      //校验input值是否符合

      var isValide = this.getValideResult()
      //   const { password, username, captcha, email, phone } = this.register //  这里是解构调用   这里写的东西  必须用  不用就报错

      if (isValide) {
        //调用服务端的接口
        // 目前接口登录是成功了
        axios.post('/api/user/register', this.register).then((res) => {
          console.log(res.data.msg)
          if (res.data.status == 1) {
            //步骤条置成第二步
            this.stepActive = 2

            //倒计时
            this.timer = setInterval(() => {
              --this.count
              if (this.count == 0) {
                this.$router.push({
                  name: 'login',
                })
              }
              //   console.log(1);
            }, 1000)
          } else {
            this.$message({
              // 提示失败信息
              type: 'warning',
              message: res.data.msg,
            })
          }
        })
      }
    },
    destroyed() {
      clearInterval(this.timer)
    },
  },
}
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;
  background-color: #f5f8fd;
  padding: 0 60px;
  & .popup {
    background: #fefefe;
    border: 13px solid #363636;
    border-radius: 4px;
    height: 700px;
    width: 800px;
    padding: 0 60px;
    box-sizing: border-box;
    & .container {
      height: 100%;
      padding-bottom: 60px;
    }
    & .main {
      height: 100%;
      background-color: #fff;
      padding: 0 30%;
    }
    & .steps {
      width: 100%;
    }
    & .btn {
      width: 100%;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
.countDown {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
