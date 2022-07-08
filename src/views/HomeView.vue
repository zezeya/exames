<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <el-container>
      <el-header class="header flex-between">
        <div class="info logo align-center">
          <img class="icon ml-10"
               src="../assets/logo.png"
               alt="" />
          <span>Alick</span>
        </div>
        <div class="align-center">

          <!-- <div>武汉市 2017-7-20 15:00 星期三 21-22℃ 晴 风力 1-2级</div> -->
          <div class="align-center">
            <img class="icon mr-5"
                 :src="$store.state.userInfo.avatarImg"
                 alt="" />

            <span>{{userInfo.username || userInfo.phone}}</span>
          </div>
          <div class="align-center">
            <img class="icon mr-5"
                 src="../assets/logo.png"
                 alt="" />
            <span @click="quitLogin">退出</span>
          </div>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside class="aside"
                  style="width:200px">
          <el-col>
            <el-menu default-active="2"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     background-color="#0b1b34"
                     text-color="#fff"
                     active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>题库管理</span>
                </template>

                <el-menu-item-group @click="navigator('questioncomponent')">
                  <el-menu-item index="1-1"
                                @click="navigator('homecomponent')">题库管理
                  </el-menu-item>
                  <el-menu-item index="1-2"
                                @click="navigator('htmlcomponent')">html题库</el-menu-item>
                  <el-menu-item index="1-3"
                                @click="navigator('jscomponent')">js题库</el-menu-item>
                  <el-menu-item index="1-4"
                                @click="navigator('csscomponent')">css题库</el-menu-item>
                </el-menu-item-group>

              </el-submenu>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>账号设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1"
                                @click="navigator('setid')">个人资料</el-menu-item>
                  <el-menu-item index="1-2"
                                @click="navigator('setAvate')">修改头像</el-menu-item>
                  <el-menu-item index="1-3"
                                @click="navigator('listuser')">用户信息</el-menu-item>

                </el-menu-item-group>

              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1"
                                @click="navigator('creatrole')">创建角色</el-menu-item>
                  <el-menu-item index="1-2"
                                @click="navigator('listRole')">角色列表</el-menu-item>
                  <el-menu-item index="1-3"
                                @click="navigator('jilian')">权限管理</el-menu-item>

                </el-menu-item-group>

              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>任务中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1"
                                @click="navigator('mytask')">我的任务</el-menu-item>
                  <el-menu-item index="1-2"
                                @click="navigator('createTask')">创建页面</el-menu-item>
                  <el-menu-item index="1-3"
                                @click="navigator('listTask')">创建列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item index="1-4"
                              @click="navigator('detailTask')">任务详情</el-menu-item>
              </el-submenu>

              <el-menu-item index="5"
                            @click="navigator('about')">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">用户注册</span>
              </el-menu-item>

              <el-menu-item index="6"
                            @click="navigator('login')">
                <i class="el-icon-s-custom"></i>
                <span slot="title">用户登录</span>
              </el-menu-item>
              <el-submenu index="7">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>权限设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1"
                                @click="navigator('createPermission')">创建权限</el-menu-item>
                  <el-menu-item index="1-2"
                                @click="navigator('listRole')">角色列表</el-menu-item>
                  <el-menu-item index="1-3"
                                @click="navigator('jilian')">权限管理</el-menu-item>

                </el-menu-item-group>

              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <!-- 右边头部 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeView',

  data() {
    return {
      config: {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
      activeIndex: '1',
      activeIndex2: '1',
      userInfo: {
        username: '请登录',
      },
      payload: '',
    }
  },
  mounted() {
    this.getUserInfo()
  },
  created() {
    console.log(this.$store)
  },
  computed: {
    avatarImg: function () {
      return this.$store.state.userInfo.avatarImg
    },
  },
  methods: {
    //vuex变量的存取
    // save_userInfo() {
    //   //   this.$store.commit('saveUserInfo', this.payload) //存
    //   var getUserInfo = this.$store.state.userInfo //取
    //   console.log(getUserInfo)
    // },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    navigator(name) {
      if (this.$route.name == name) return
      this.$router.push({
        name: name,
      })
    },

    // navigator() {
    //   //原生
    //   // window.location.href = "#/login";
    //   //vue-cli自带的 router
    //   // this.$router.push('/login')
    //   //name:src/views/home.vue
    //   if (this.$route.name == "abc") return;
    //   this.$router.push({
    //     name: "abc",
    //     // query:{
    //     //   id:1,
    //     //   artivleId:123456,
    //     //   isLogin:1
    //     // }
    //   });
    // },

    getUserInfo() {
      axios
        .post(
          '/api/user/info',
          {
            data: {
              id: 1, //个人id
              phone: '', //手机号
              email: '', //邮箱
            },
          },
          this.config
        )
        .then((res) => {
          console.log(res)
          if (res.data.status == 1) {
            this.userInfo = res.data.data
            sessionStorage.getItem('token') //结束
            this.$store.commit('saveUserInfo', res.data.data) //存
            console.log(this.$store.state.userInfo)
            // this.setToken()
            this.$message({
              // 提示成功信息
              type: 'success',
              message: res.data.msg,
            })
          } else {
            this.$message({
              // 提示失败信息
              type: 'error',
              message: res.data.msg,
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //退出
    quitLogin() {
      // location.reload()
      localStorage.clear()
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>
<style scoped lang='scss'>
.header {
  background-color: rgb(26, 141, 236);
  color: #fff;
  font-size: 20px;
  .info {
    font-size: 14px;
    display: flex;
    gap: 0 10px;
  }
}
.container {
  height: calc(100vh - 60px);
  & .aside {
    background-color: #0b1b34;
  }
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.bg-purple-dark {
  background: #2676e7;
  display: flex;
  &:last-child {
    font-size: 20px;
    color: #fff;
    padding: 10px 150px;
    line-height: 50px;
    justify-content: flex-start;
    align-items: center;
  }
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 50px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
