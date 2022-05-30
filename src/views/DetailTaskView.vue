<template>
  <div class="detail">
    <div class="main">
      <div class="taskTest">
        <h3>任务测试</h3>
        <el-row>
          <el-button><i class="el-icon-edit"> 编辑描述</i></el-button>
          <el-button><i class="el-icon-upload2">上传附件</i></el-button>
          <el-button><i class="el-icon-cherry">关联代码仓库</i> </el-button>
          <el-button><i class="el-icon-scissors"> 阻塞关系</i></el-button>
          <el-button><i class="el-icon-headset">引用资源</i></el-button>
        </el-row>

        <div class="activityLog">
          <div>123</div>
          <h3>活动日志</h3>
          <div class="block">
            <div class="radio">
              全部
              <el-radio-group v-model="reverse">
                <el-radio :label="true">只看日志</el-radio>
                <el-radio :label="false">只看评论</el-radio>
              </el-radio-group>
            </div>

            <div class="block">
              <el-timeline>
                <el-timeline-item :timestamp=" item.completedAt "
                                  placement="top"
                                  v-for="(item,index) in abc"
                                  :key="index">
                  <el-card>
                    <h4>{{ item.userName }}已被执行{{item.userId}}</h4>

                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailTaskApi } from '@/api/api'
export default {
  data() {
    return {
      userId: [],
      taskId: '',
      drawer: false,
      reverse: true,
      receivedData: {
        taskId: '', //任务d,
        userId: '', //用户id,
        userName: '', //用户名称
        completedAt: '', //任务完成时间
      },
      abc: [],
    }
  },
  created() {
    var receivedData = this.$route.query.id
    console.log(receivedData)

    this.detailTask()
  },
  methods: {
    // //任务详情
    async detailTask() {
      //   var taskId = row.id
      let res = await detailTaskApi({
        taskId: '529',
      })
      this.abc = res.data.data.receivedData
      console.log(this.abc)
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  display: grid;
  grid-template-columns: 4fr 1fr;
  & .main {
    display: grid;
    grid-template-rows: 1fr 4fr;
    & .taskTest {
      padding: 20px 0;
    }
    & .activityLog {
      padding: 20px 0;
      margin: 10px 0;
    }
  }
}
</style>