<template>
  <div>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="id"
                       label="个人Id"
                       width="80">
      </el-table-column>
      <el-table-column prop="userId"
                       label=" 手机号"
                       width="100">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       width="100">
      </el-table-column>
      <el-table-column prop="sex"
                       label="性别"
                       width="100">
      </el-table-column>
      <el-table-column prop="avatarName"
                       label="昵称 "
                       width="100">
      </el-table-column>
      <el-table-column prop="name  "
                       label="真实姓名"
                       width="100">
      </el-table-column>
      <el-table-column prop="provinceNo"
                       label="省编号"
                       width="100">
      </el-table-column>
      <el-table-column prop="cityNo"
                       label="市编号">
      </el-table-column>
      <el-table-column prop="areaNo"
                       label="区编号">
      </el-table-column>
      <el-table-column prop="townNo"
                       label="镇编号">
      </el-table-column>
      <el-table-column prop="desc"
                       label="个人介绍">
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
import { listuser } from '@/api/api'
export default {
  data() {
    return {
      tableData: [],
      count: 1,
      pageCount: 1,
      pageNum: 1,
      pageSize: 5,
      totalCount: 0, //总页数
    }
  },

  methods: {
    async listuser() {
      let res = await listuser({
        pagination: true,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      })
      console.log(res.data.data.data.count)
      this.tableData = res.data.data.data.rows
      console.log(this.tableData)
      this.count = res.data.data.data.count
      console.log(this.count)
      this.pageCount = res.data.data.data.pageCount
      console.log(res)
    },

    //分页
    handleSizeChange(val) {
      this.pageSize = val
      this.listuser()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.listuser()
    },
  },
  created() {
    this.listuser()
  },
}
</script>
<style lang="scss" scoped>
</style>