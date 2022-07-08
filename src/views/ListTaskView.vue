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
                     @click="editTasks(scope.row)"
                     size="small"> 编辑任务

          </el-button>

          <el-button type="text"
                     size="small">
            <el-button @click="drawer = true;detailTask(scope.row)"
                       type="primary"
                       style="margin-left: 16px;">
              任务详情
            </el-button>
          </el-button>

          <el-button type="text"
                     size="small"
                     @click="taskReleaase(scope.row)"
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
    <!-- 弹层 -->
    <el-dialog title="修改任务"
               :visible.sync="dialogVisible"
               width="50%"
               :before-close="handleClose">
      <create-task-component v-on:sbumit="taskUpdate"
                             :data="selectedData"
                             ref="taskchild">
      </create-task-component>

    </el-dialog>
  </div>
</template>

<script>
import { listTask, taskUpdateApi, taskReleaseApi } from '@/api/api'
import CreateTaskComponent from '../components/CreateTaskComponent.vue'
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
      direction: '', //任务
      userIds: [],
      taskId: '',
      dialogVisible: false, //弹层
      selectedData: '', //当前选中的行
    }
  },
  components: { 'create-task-component': CreateTaskComponent },
  created() {
    this.listTask()
  },
  methods: {
    open2(a) {
      console.log(a)
      this.$message({
        message: '恭喜你，修改成功',
        type: 'success',
      })
    },
    editTasks(row) {
      console.log('父组件', row)
      this.id = row.id

      this.selectedData = row //给selectedData赋值
      this.dialogVisible = true

      this.$nextTick(() => {
        this.$refs.taskchild.init()
      })
    },
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
          //   this.$message({
          //     type: 'success',
          //     message: '任务修改成功!',
          //   })

          this.listTask()
        })
        .catch(() => {})
    },

    //编辑任务
    async taskUpdate(form) {
      console.log(form)
      let { name, duration, level, desc, userIds } = form
      let res = await taskUpdateApi({
        id: this.id, //任务id
        name, //任务名称
        desc, //任务描述
        duration: Number(duration), //任务时长
        level: Number(level), // 任务等级  1：紧急  0：普通任务
      })
      console.log(res)
      if (res.data.status == 1) {
        console.log('编译成功')
        //    this.$refs.form.clearlist()
        this.$message({
          message: '恭喜你，修改成功',
          type: 'success',
        })
        this.dialogVisible = false

        // //发布任务
        let res2 = await taskReleaseApi({
          userIds,
          taskId: this.id,
        })
        console.log(res2)
      }
      this.listTask()
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
      //   console.log(res)
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
}
</script>

<style lang="scss" scoped>
</style>