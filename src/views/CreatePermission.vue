<template>
  <div>

    <div class="custom-tree-container">
      <div class="block">
        <p>权限管理</p>
        <el-button type="text"
                   @click="createRoot">创建角色</el-button>
        <!-- default-expand-all -->
        <el-tree :data="tableData"
                 show-checkbox
                 node-key="id"
                 :expand-on-click-node="false">
          <span class="custom-tree-node"
                slot-scope="{ data }">
            <span>{{ data.title }}</span>
            <span>
              <el-button type="text"
                         size="mini"
                         @click="edit(data)">
                编辑

              </el-button>
              <el-button type="text"
                         size="mini"
                         @click=" append(data)">
                增加

              </el-button>

              <el-button v-if='data.children.length==0'
                         type="text"
                         size="mini"
                         @click=" remove(data)"
                         slot="reference">
                删除

              </el-button>

            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <!-- 弹层 -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose"
               ref='list'>
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.type"
                     placeholder="请选择活动区域">
            <el-option label="左侧栏"
                       :value="1"></el-option>
            <el-option label="页面"
                       :value="2"></el-option>
            <el-option label="功能"
                       :value="3"></el-option>
          </el-select>
        </el-form-item>

        <template>
          <el-form-item label="所在目录"
                        v-if="dialogTitle=='change'">
            <el-select v-model="form.pid"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.id"
                         :label="item.title "
                         :value="item.pid">
              </el-option>
            </el-select>
          </el-form-item>
        </template>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>

        <el-button type="primary"
                   v-if="dialogTitle=='add'"
                   @click="onCreateSubmit">确定</el-button>

        <el-button type="primary"
                   v-else
                   @click="updatePermission">确定修改</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  createPermissionApi,
  listPermissionApi,
  deletePermissionApi,
  updatePermissionApi,
} from '@/api/api'

export default {
  data() {
    return {
      //   data: JSON.parse(JSON.stringify(data)),
      dialogVisible: false, //弹层
      form: {},
      children: [],
      tableData: [],
      count: '',
      pageCount: 1,
      pageNum: 1,
      pageSize: 5,
      ifMaterialEdit: 2, // 1表示编辑，2表示新增
      dialogTitle: '',
      options: [],
    }
  },
  created() {
    this.initForm()
    this.getlistPermission()
    this.deletePermission()

    // this.updatePermission()
  },
  methods: {
    // 新增和编辑按钮
    editAndAddMaterial(row) {
      console.log(row)
      if (row) {
        this.ifMaterialEdit = 1
        this.dialogVisible = true
        this.dialogTitle = '编辑'
        this.form = row

        this.updatePermission()
      } else {
        this.ifMaterialEdit = 2
        this.dialogVisible = true
        this.dialogTitle = '新增'
        this.tableData = {}

        this.onCreateSubmit()
      }
    },
    //编辑
    edit(data) {
      console.log(data)
      const { id, title, type, pid } = data
      this.dialogTitle = 'change'
      this.form = {
        id,
        title,
        type,
        pid,
      }
      console.log(this.form)
      this.dialogVisible = true
      //   this.createRoot()
      //   this.updatePermission()
    },
    //修改权限
    async updatePermission() {
      //   this.createRoot()
      const { id, title, type, pid } = this.form
      let res = await updatePermissionApi({
        id,
        title, //标题
        type, //类型   1代表左侧栏  2代表页面  3代表功能
        pid, //pid如果为空就是最大的一级  如果等于某项的id就是它的子级
      })

      //   this.options = res.data.data.rows
      //   console.log(this.options)
      console.log(res)
      if (res.data.status == 1) {
        console.log('修改成功')
        this.getlistPermission()
      }
      this.dialogVisible = false
    },
    //增加
    append(data) {
      console.log(data)
      this.initForm()
      this.dialogTitle = 'add'
      this.form.pid = data.id || null //获取pid的值
      console.log(this.form.pid)
      this.dialogVisible = true
    },
    //创建角色
    createRoot(data) {
      console.log(data)
      this.initForm()
      this.dialogTitle = 'add'
      this.form.pid = data.id || null //获取pid的值
      console.log(this.form.pid)
      this.dialogVisible = true
    },
    //删除
    remove(data) {
      console.log(data)
      this.form.id = data.id //获取pid的值
      this.deletePermission()
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.getlistPermission()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //删除权限
    async deletePermission() {
      let res = await deletePermissionApi({
        id: this.form.id, // 必填项 权限的id
      })

      console.log(res)
    },
    renderContent(h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.edit(data)}>
              Edit
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      )
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    //弹层
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.createRoot()
          done()
        })
        .catch(() => {})
    },
    //初始化创建角色
    initForm() {
      this.form = {
        id: null,
        title: '',
        type: '',
        pid: null,
      }
    },
    //非空校验
    verifyEmptyAdd() {
      if (this.form.id == '') {
        this.$message({
          showClose: true,
          message: '警告哦，id不能为空',
          type: 'warning',
        })
        return false
      }
      if (this.form.title == '') {
        this.$message({
          showClose: true,
          message: '警告哦，title不能为空',
          type: 'warning',
        })
        return false
      }
      if (this.form.type == '') {
        this.$message({
          showClose: true,
          message: '警告哦，type不能为空',
          type: 'warning',
        })
        return false
      }
      this.$message({
        showClose: true,
        message: '恭喜你，创建成功',
        type: 'success',
      })
      return true
    },

    //创建权限
    async onCreateSubmit() {
      //   const { title, type, pid } = this.form
      this.verifyEmptyAdd()
      let res = await createPermissionApi({
        title: this.form.title, //标题
        type: this.form.type, //类型   1代表左侧栏  2代表页面  3代表功能
        pid: this.form.pid, //pid如果为空就是最大的一级  如果等于某项的id就是它的子级
      })
      console.log(res)

      if (res.data.status == 1) {
        this.dialogVisible = false
        console.log('创建成功')
      }

      this.getlistPermission()
    },
    //获取权限列表
    async getlistPermission() {
      let res = await listPermissionApi({
        pagination: false,
      })
      this.options = JSON.parse(JSON.stringify(res.data.data.rows))
      this.tableData = JSON.parse(JSON.stringify(res.data.data.rows))
      console.log(res)
      this.tableData.forEach((el) => {
        // console.log(el)
        el.children = this.tableData.filter((children) => {
          return children.pid == el.id
        })
      })
      console.log(this.tableData)
      this.tableData = this.tableData.filter((el) => !el.pid)
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

