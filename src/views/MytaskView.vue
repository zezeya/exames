<!--  -->
<template>
  <div class="task ">
    <div class="left">
      <!-- 日历 -->
      <div class="top">
        <h2>日历</h2>
        <el-calendar v-model="value">
        </el-calendar>
      </div>
      <!-- 工作进度 -->
      <div class="down ">
        <div class="tops flex">
          <h2> Today Task(3)</h2>
          <i class="el-icon-plus"></i>
        </div>
        <el-table ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="work"
                           label="工作内容"
                           width="120">
          </el-table-column>
          <el-table-column label="时间"
                           width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>

        </el-table>

      </div>
    </div>
    <div class="right">
      <!-- 推送 -->
      <div class="push">
        <h2>推送 </h2>
        <div class="work">
          <i class="el-icon-edit-outline"></i>
          <div class="works">
            <div class="works1">XXX给你发送了一条任务</div>
            <div class="works2">description-timer</div>
            <button class="works3">立即领取</button>
          </div>
          <i class="el-icon-eleme"></i>
        </div>
      </div>

      <!-- 聊天 -->
      <div class="chat">
        <div class="header">
          <h2> 团队聊天</h2>
          <div class="head flex-center1">
            (当前人数为：{{ peopleNum }})
          </div>

        </div>

        <div class="container  ">
          <div class="infoWindow"
               v-for="(item, index) in textArr"
               :key="index"
               ref="scoll">
            <div v-show="item.avatarName != jieshou.avatarName">
              <div class="item flex-center1 ">
                <div class="avatar-img mr-5">{{item.avatarName | name}} </div>
                <div class="name">{{ item.avatarName  }}</div>
              </div>
              <div class="msg ml-45 "
                   style=" padding: 5px 10px;
          background: rgb(31, 225, 86);
          border-radius: 8px;
          "> {{ item.msg }}</div>
            </div>
            <div></div>
            <div v-show="item.avatarName == jieshou.avatarName">

              <div class="item flex-center1 mine ">
                <div class="avatar-img ml-5">{{item.avatarName | name}}</div>
                <div class="name  ">{{ item.avatarName }}</div>
              </div>
              <div class="msg mr-45"
                   style=" padding: 5px 10px;
          background: rgb(31, 225, 86);
          border-radius: 8px;
          margin-left: 20px;">{{ item.msg }}</div>
            </div>
          </div>
        </div>
        <div class="foot flex-between"
             style="margin-top: 15px; ">
          <el-input placeholder="请输入内容"
                    v-model="input1"
                    style="margin-left:10px">
          </el-input>
          <el-button type="success"
                     @click="sendSocketMsg">发送</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getUserInfoApi } from '@/api/api'
export default {
  data() {
    return {
      value: new Date(),
      tableData: [
        {
          date: '08:00-10:00 AM',
          work: '工作',
        },
        {
          date: '11:00-12:00 AM',
          work: '工作1',
        },
        {
          date: '11:00-16:00 PM',
          work: '工作2',
        },
      ],
      multipleSelection: [],
      textArr: [], //
      input1: '',
      jieshou: {}, //input框
      peopleNum: '', //人数
    }
  },
  created() {
    this.getinfo()
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      console.log('socket connected...')
    },
    //服务端返回的信息//online 是接口名   res这个就是服务端定义的接口名
    receiveMsg: function (message) {
      console.log('服务的返回的信息', message)
      this.textArr.push(message)
      //事件环机制
      this.$nextTick(() => {
        var msg = this.$refs.scoll
        console.log(msg[msg.length - 1])
        msg[msg.length - 1].scrollIntoView(false)
      })
    },
    userCount: function (message) {
      this.peopleNum = message
      console.log('当前共有：', message + '人')
    },

    //断开时调用的函数
    disconnect: function () {
      console.log('disconnect!')
    },
  },
  filters: {
    name(val) {
      var name = String(val)
      return name.substring(0, 1)
    },
  },
  methods: {
    //回车监听
    keyDown(e) {
      if (e.keyCode === 13) {
        this.sendSocketMsg() //登录方法
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async getinfo() {
      let res = await getUserInfoApi()
      console.log(res)
      if (res.data.status == 1) {
        this.jieshou = res.data.data[0]
        console.log(this.jieshou)
      }
      let params = {
        userId: this.jieshou.id,
        avatarName: this.jieshou.avatarName,
        name: this.jieshou.name,
      }
      this.$socket.emit('addUser', params)
    },
    sendSocketMsg() {
      //向服务端发送消息
      this.$socket.emit('sendMsg', {
        userId: 1,
        type: 1,
        avatarName: 'L',
        msg: this.input1,
      })
      this.input1 = ''
      //接收服务端相对应的webdata数据
      //   this.obj.msg = null
    },
  },
  mounted() {
    //绑定监听事件
    window.addEventListener('keydown', this.keyDown)
  },

  destroyed() {
    //销毁事件
    window.removeEventListener('keydown', this.keyDown, false)
    this.$socket.emit('removeUser', {
      userId: '', //用户ID
      avatarName: '', //用户昵称
    })
    console.log('过帅气，已离开')
  },
}
</script>
<style lang='scss' scoped>
.task {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  ::v-deep .el-main {
    padding: 20px;
  }

  & .left {
    padding: 0 20px;
    display: grid;
    grid-template-rows: 65% 1fr;

    & .top {
      background-color: #fff;

      ::v-deep .el-calendar__header {
        padding: 20px 20px;
        // bottom: 300px;
      }
      ::v-deep .el-calendar__body {
        padding: 12px 20px 35px;
      }

      ::v-deep .el-calendar-table .el-calendar-day {
        height: 35px !important;
        text-align: center;
      }

      ::v-deep .el-calendar-table thead th {
        padding: 15px 0;
      }
    }

    & .down {
      margin-top: 5px;
      & .tops {
        height: 30px;

        & .el-icon-plus {
          line-height: 30px;
          font-size: 25px;
          margin-left: 220px;
        }
      }
      ::v-deep .el-table::before {
        width: 100%;
      }
    }
  }

  & .right {
    display: grid;
    grid-template-rows: 30% auto;

    & .push {
      //   & h2 {
      //     margin-left: 20px;
      //   }
      & .work {
        background: #58419b;
        display: grid;
        grid-template-columns: 1fr 260px 1fr;
        border-radius: 10px;
        margin: 20px;
        padding: 20px;

        & .el-icon-edit-outline {
          font-size: 40px;
          background-color: #7c68b0;
          width: 40px;
          height: 40px;
          color: #ccc;
          margin: 20px 30px;
        }

        & .works {
          color: #fff;
          padding: 20px;

          & .works3 {
            background: #fdcc7f;
            border: 1px solid #fff;
            border-radius: 5px;
          }
        }

        & .el-icon-eleme {
          font-size: 80px;
          margin: 10px 30px;
          width: 80px;
          height: 80px;
          color: #8a7ab9;
        }
      }
    }

    & .chat {
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      word-break: break-all;
      //   margin: 20px 0;
      & .header {
        display: flex;
        line-height: 30px;
        margin: 30px 0;
        & .head {
          height: 40px;
          font-size: 16px;
          font-weight: 700;
          padding-left: 6px;
        }
      }

      & .container {
        background-color: #fafafc;
        width: 100%;
        padding: 10px 20px;
        position: absolute;
        height: calc(100% - 180px);
        overflow-y: scroll;
        word-wrap: break-all; //换行终段
        box-sizing: border-box;
        // margin-top: 10;
        & .infoWindow {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }

        & .item {
          & .avatar-img {
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            background: rgb(31, 238, 217);
            text-align: center;
          }

          & .msg {
            margin-left: 45px;
          }

          & .flex-center {
            display: flex;
            align-items: center;
          }

          & .name {
            font-size: 12px;
            float: right;
          }
        }
      }

      & .foot {
        position: absolute;
        bottom: 0px;
        width: 100%;

        color: #11db4ade;
        display: flex;
        align-items: center;
        border-radius: 10px;
      }

      ::-webkit-scrollbar {
        width: 0;
      }
    }
  }
}
</style>
