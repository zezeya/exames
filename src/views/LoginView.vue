<template>
  <div class="login flex-center">
    <div class="popup flex-center">
      <div class="logo flex-column">
        <div class="icon-logo shadow">m</div>
        <p class="sub-title mt-20">desooooo</p>
        <p class="desc">desooooo</p>
      </div>
      <div class="form">
        <div>
          <div class="label">username</div>
          <el-input v-model="username"
                    placeholder="请输入名字"></el-input>
        </div>
        <div class="mt-10">
          <div class="label">password</div>
          <el-input v-model="password"
                    placeholder="请输入密码"
                    show-password></el-input>
        </div>
        <div class=" mt-10">
          <div class="label">captcha</div>
          <el-input class="flex-center mt-5"
                    v-model="captcha"
                    placeholder="请输入验证码"
                    maxlength='4'>
          </el-input>
          <img class=" mt-5"
               @click="getCaptcha"
               :src="captchaSrc"
               alt="">

        </div>

        <div>
          <el-button class="mt-30"
                     type="primary"
                     @click="submit()">login</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// @代表的是   src这一层
import { loginApi } from '@/api/api'
import { encrypt } from '../assets/ulils/index'
//默认导出
export default {
  data() {
    // 页面的初始数据
    return {
      // 存储用户输入数据
      username: 'zezeya',
      password: '123456',
      captcha: '', // 验证码 需要做必填校验
      captchaSrc: '/api/captcha',
    }
  },
  created() {
    this.keyupSubmit()
  },
  methods: {
    getCaptcha() {
      this.captchaSrc = '/api/captcha?' + Math.random()
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
      return res.result
    },

    // 首先第一点这里需要对axios进行一个封装 最好是对axios进行一个封装 这样能对错误码 进行一个拦截为了下一步就要做的token失效的功能
    // vueconfig 里对将服务端接口代理为 '/api' 写的代理根本不生效
    //  setToken() {
    //   //调登录的接口；

    //   axios
    //     .post('/user/login', {

    //       username: this.register.username,
    //       password: this.encrypt(this.register.password),
    //       captcha: this.register.captcha,
    //     })
    //     .then((res) => {
    //       console.log(res.data.data) //token;
    //       this.token = res.data.data
    //       sessionStorage.setItem('token', res.data.data) //结束
    //       // console.log(  sessionStorage.setItem('token', res.data.data));
    //     })
    // },
    // async confirm() {
    //   //this.token === 登录接口已经调用了，  500ms后才可以拿到token
    //   if (this.token) {
    //     this.$router.push({
    //       name: 'home',
    //     })
    //   } else {
    //     await this.setToken() //设置token
    //     this.confirm()
    //   }
    // },
    /**
     * promise   是解决低于回调的
     * axios     是基于promise来封装的
     * 接口api   是基于axios来封装的
     * async await 是promise.then的一个语法糖
     *
     */

    async submit() {
      var isValide = this.getValideResult() //校验结果
      if (!isValide) return //若校验不通过，后边代码就不执行
      const { username, captcha } = this //  这里是解构调用   这里写的东西  必须用  不用就报错
      //调用服务端的接口
      let res = await loginApi({
        username,
        password: encrypt(this.password), // rsa加密     这个因为要rsa加密  所以不能用解构   前面这个方法    是写在写方法的钩子函数里的  需要用this调用才能用   不然报错
        captcha,
      })
      //登录成功
      if (res.data.status == 1) {
        this.$message({
          // 提示成功信息
          type: 'success',
          message: res.data.msg,
        })
        // 登录成功的回调
        // 1.第一步先将token存储
        sessionStorage.setItem('token', res.data.data) //
        // 2.第二步再进行页面跳转 不然会导致页面销毁后边的程序直接释放不执行
        this.$router.push({
          name: 'home',
        })
      } else {
        this.$message({
          // 提示失败信息
          type: 'warning',
          message: res.data.msg,
        })
      }
    },
    //enter回车
    keyupSubmit() {
      document.onkeydown = () => {
        let _key = window.event.keyCode
        //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.submit()
        }
      }
    },
  },
}
// methods: {
//   //校验用户名和密码，如果成功，返回true，失败返回错误
//   getValideResult() {
//     //1 校验用户名和密码，如果校验成功，返回true，校验失败返回false;// this.$message方法的使用和 getvalidateResult(){
//     // 用户名密码不能为空; 密码也不能为空;
//     // if (this.username == "") {
//     //      this.$message({
//     //        type: 'warning',
//     //       message: '用户名不能为空'
//     //     });
//     //     return false;
//     //   } else if (this.password == "") {
//     //      this.$message({
//     //        type: 'warning',
//     //       message: '密码不能为空'
//     //     });
//     //     return false;
//     //   } else {
//     //     return true;
//     //   }
//   },
//   submit() {
//     //如果是from表单，我们可以用v-model进行数据双向绑定
//     console.log(this.username);
//     //v-model获取input的值
//     //校验input值是否符合
//     var isValide = this.getValideResult();
//     if (isValide) {
//       //调用服务端的接口
//       this.$message({
//         // 提示成功信息
//         type: "success",
//         message: "登录成功",
//       });
//     }
//   },
// },
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-color: #f5f8fd;
  & .popup {
    min-width: 800px;
    display: grid;
    grid-template-columns: 2.8fr 3fr;
    border: 13px solid #1e80e1;
    padding: 40px;
    color: #0c80e7;
    font-size: 12px;
    gap: 0 40px;
    & .logo {
      height: 478px;
      background-color: #1e80e1;
      transform: skewX(-10deg) translateX(40px);
      color: #fff;
      z-index: 100;
      & .icon-logo {
        width: 100px;
        height: 100px;
        padding: 20px;
        font-size: 60px;
        transform: skewX(10deg);
      }
      & .sub-title {
        font-size: 40px;
      }
      & .desc {
        font-size: 10px;
      }
    }
    & .form {
      padding: 20px;
      height: 50%;
      padding-left: 80px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;

      & .label {
        padding: 10px 0;
      }
      & .el-button {
        width: 380px;
      }
    }
  }
}
</style>
