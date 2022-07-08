<template>
  <div>
    <h1>创建任务</h1>
    <create-task-component v-on:sbumit="createTask"
                           ref="form"></create-task-component>

    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <span>创建 成功</span>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="gotolink">查看创建列表</el-button>
        <!-- <el-button type="primary"
                   @click="clearlist">继续创建</el-button> -->

      </span>
    </el-dialog>

  </div>

</template>

<script>
import CreateTaskComponent from '../components/CreateTaskComponent.vue'
import { createTaskApi, taskReleaseApi } from '@/api/api'
export default {
  data() {
    return {
      dialogVisible: false,
      taskId: '',
      userIds: [],
    }
  },
  components: { CreateTaskComponent },
  created() {
    this.$nextTick(() => {
      this.$refs.form.init()
    })
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
      this.dialogVisible = true
      this.$router.replace('/listTask') //指定跳转地址
    },

    async createTask(form) {
      this.dialogVisible = true

      console.log(form)
      let { name, duration, level, desc, userIds } = form

      let res = await createTaskApi({
        name,
        duration: Number(duration),
        desc,
        level: Number(level),
      })
      console.log(res)
      this.taskId = res.data.data[0].id
      console.log(this.taskId)
      if (res.data.status == 1) {
        console.log('创建成功')

        this.$refs.form.clearlist()
        // //发布任务
      }

      if (userIds.length > 0) {
        console.log('发布成功')
        const { taskId } = this
        let res2 = await taskReleaseApi({
          userIds,
          taskId,
        })
        console.log(res2)
      } else {
        console.log('发布失败')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>