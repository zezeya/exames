<template>
  <div>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="id"
                       label="任务Id"
                       width="60">
      </el-table-column>
      <el-table-column prop="isReceived"
                       label=" 是否领取"
                       width="60"
                       @click="handleEdit(scope.row)">
        <template slot-scope="scope">
          <el-link :type="scope.row.isReceived==1?'danger':'success'">{{scope.row.isReceived==1?'已领取':'未领取'}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="userId"
                       label=" 创建任务的人Id"
                       width="60">
      </el-table-column>
      <el-table-column prop="userName"
                       label="创建任务人的真实姓名"
                       width="80">
      </el-table-column>
      <el-table-column prop="taskName"
                       label="任务名称"
                       width="100">
      </el-table-column>
      <el-table-column prop="level"
                       label="紧急程度 "
                       width="100">
        <template slot-scope="scope">

          <el-link :type="scope.row.level==1?'danger':'success'">{{scope.row.level==1?'紧急':'普通'}}</el-link>
        </template>

      </el-table-column>
      <el-table-column prop="desc"
                       label="任务描述"
                       width="100">
      </el-table-column>
      <el-table-column prop="duration"
                       label="任务时长范围"
                       width="80">
      </el-table-column>
      <el-table-column prop="createdAt"
                       label="创建时间"
                       width="100">
      </el-table-column>

      <el-table-column label="操作"
                       width="320">
        <template slot-scope="scope">

          <el-button @click="handleClick(scope.row)"
                     type="text"
                     size="small">发布任务
          </el-button>
          <el-button type="text"
                     size="small">
            <!-- 从右往左的抽屉 -->
            <el-radio-group v-model="direction">
            </el-radio-group>

            <el-button @click="drawer = true;detailTask(scope.row)"
                       type="primary"
                       style="margin-left: 16px;">
              任务详情
            </el-button>

            <!-- <el-drawer title="我是标题"
                       :visible.sync="drawer"
                       :direction="direction"
                       :before-close="handleClose">
              <span>我来啦!</span>
            </el-drawer> -->

          </el-button>

          <el-button type="text"
                     size="small"
                     @click="open(scope.row)"
                     v-if='scope.row.isReceived !=1'>领取任务
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pageaction">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNum"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="50"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  listTask,
  taskReleaase,
  getUserInfoApi,
  detailTaskApi,
} from '@/api/api'
export default {
  data() {
    return {
      tableData: [],
      count: 1,
      pageCount: 1,
      pageNum: 1,
      pageSize: 5,
      totalCount: 0, //总页数
      drawer: false, //任务
      direction: 'rtl', //任务
      userId: [],
      taskId: '',
    }
  },

  methods: {
    handleClick(row) {
      console.log(row)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    //任务列表
    async listTask() {
      let res = await listTask({
        pagination: true,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      })
      this.tableData = res.data.data.rows
      this.count = res.data.data.count
      this.pageCount = res.data.data.pageCount
      console.log(res)
    },
    // //任务详情
    async detailTask(row) {
      var taskId = row.id
      let res = await detailTaskApi({
        taskId,
      })
      this.taskId = res.data.data.taskId
      console.log(res)
      console.log(this.taskId)
      this.$router.push({
        name: 'detailTask',
        query: {
          id: taskId,
        },
      })
      this.receivedData = res.data.data.receivedData
      var receivedData = this.receivedData
      console.log(receivedData)
      console.log(this.taskId)
      console.log(receivedData[0].userId)
      console.log(receivedData[0].userName)
      console.log(receivedData[0].completedAt)
    },
    //领取任务
    async open(row) {
      console.log(row)
      var taskId = row.id
      const { userId } = this
      let res = await taskReleaase({
        userId,
        taskId,
      })

      console.log(res)
      if (res.data.status == 1) {
        console.log(res)
        this.$confirm('任务领取成功, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '任务领取成功!',
            })
            this.listTask()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消领取',
            })
          })
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val
      this.listTask()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.listTask()
    },
  },
  async created() {
    this.listTask()
    let res = await getUserInfoApi()
    if (res.data.status == 1) {
      this.userId = [res.data.data[0].id]
    }
  },
}
</script>

<style lang="scss" scoped>
</style>