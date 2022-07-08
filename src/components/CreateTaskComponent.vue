<template>
  <div>

    <el-form ref="form"
             :model="form"
             label-width="80px"
             style="width:400px;magin-top:20px">
      <el-form-item label="任务名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="任务时长">
        <el-input v-model="form.duration"
                  style="width:80px"></el-input><span>小时</span>
      </el-form-item>

      <el-form-item label="任务描述">
        <el-input type="textarea"
                  v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item label="执行人">
        <el-select v-model="form.userIds"
                   multiple
                   placeholder="请选择">
          <el-option v-for="item in receivedUserList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否紧急">
        <el-switch v-model="form.level"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="onSbumit">确定</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { listuser, detailTaskApi } from '@/api/api'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        duration: '',
        desc: '',
        level: 1,
        userIds: [],
      },
      receivedUserList: [],

      taskId: '',
    }
  },
  //   watch: {
  //     data: function () {
  //       const { taskName, duration, desc, level } = this.data
  //       this.form = {
  //         name: taskName,
  //         desc,
  //         duration,
  //         level: level == 1 ? true : false,
  //       }
  //     },
  //   },
  props: ['data'], //父组件传值
  //   created() {
  //     this.init()
  //   },
  methods: {
    init() {
      console.log('子组件', this.data)
      console.log(this.form)

      //赋显
      if (this.data != undefined) {
        console.log('编辑页面')
        const { taskName, duration, desc, level, userIds } = this.data
        this.form = {
          name: taskName,
          desc,
          duration,
          level: level == 1 ? true : false,
          userIds,
        }
        this.getUnReceivedUser() //8
      } else {
        console.log('创建页面')
        this.listuser() //18
      }
    },

    onSbumit() {
      this.$emit('sbumit', this.form)
    },
    clearlist() {
      this.form.name = ''
      this.form.duration = ''
      this.form.desc = ''
      this.form.level = false
      this.form.userIds = ''

      this.dialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
          this.$message({
            type: 'success',
            message: '任务修改成功!',
          })

          this.listTask()
        })
        .catch(() => {})
    },
    // //任务详情
    async getUnReceivedUser() {
      let [userList, detailTask] = await Promise.all([
        await listuser({
          pagination: false,
        }),
        detailTaskApi({
          taskId: Number(this.data.id),
        }),
      ])
      console.log(userList, detailTask)
      let userLists = userList.data.data.data.rows //总人
      console.log(userLists)
      let receivedData = detailTask.data.data.receivedData //领取人
      console.log(receivedData)
      var unReceivedUser = JSON.parse(JSON.stringify(userLists)) //未领取的人
      receivedData.forEach((el) => {
        console.log(el)
        console.log(unReceivedUser)
        unReceivedUser = unReceivedUser.filter(
          (receivedUser) => el.userId != receivedUser.id
        )
      })
      userLists.push(unReceivedUser)

      console.log('----------')
      console.log(unReceivedUser)
      this.receivedUserList = unReceivedUser
    },
    async listuser() {
      let res = await listuser({
        pagination: false,
      })
      if (res.data.status == 1) {
        this.receivedUserList = res.data.data.data.rows
        console.log(this.receivedUserList)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>