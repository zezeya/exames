<template>
  <div>
    <h3>创建任务</h3>
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
        <el-select v-model="userId"
                   multiple
                   placeholder="请选择">
          <el-option v-for="item in options"
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
                   @click="dialogVisible = true;createTask()">立即创建</el-button>
        <el-button>取消</el-button>
        <el-dialog title="提示"
                   :visible.sync="dialogVisible"
                   width="30%"
                   :before-close="handleClose">
          <span>创建成功</span>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="dialogVisible = false;gotolink()">查看创建列表</el-button>
            <el-button type="primary"
                       @click="dialogVisible = false;clearlist()">继续创建</el-button>
          </span>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createTask, taskReleaase, listuser } from '@/api/api'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        duration: '',
        desc: '',
        level: 1,
      },
      options: [],
      userId: [],
      //   userId: '',
      taskId: '',
    }
  },
  created() {
    this.listuser()
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    gotolink() {
      //点击跳转至上次浏览页面
      // this.$router.go(-1)

      //指定跳转地址
      this.$router.replace('/listTask')
    },
    clearlist() {
      this.form.name = ''
      this.form.duration = ''
      this.form.desc = ''
      this.form.level = false
      this.userId = ''
    },
    async createTask() {
      let res = await createTask(this.form)
      console.log(res)
      if (res.data.status == 1) {
        console.log(res)
        this.taskId = res.data.data[0].id
        this.taskReleaase()
      }
    },
    async taskReleaase() {
      const { userId, taskId } = this
      let res = await taskReleaase({
        userId,
        taskId,
      })

      if (res.data.status == 1) {
        console.log(res)
      }
    },
    async listuser() {
      let res = await listuser()
      if (res.data.status == 1) {
        this.options = res.data.data.data.rows
        console.log(this.options)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>