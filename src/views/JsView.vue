<template>
  <div class="question">
    <!-- 头部 -->
    <div class="conditaion ">
      <div class="align-center">
        <label class="title mr-15">所属题型</label>
        <div class="types flex">
          <div class="type active"> 全部</div>
          <div class="type">单选 </div>
          <div class="type">多选 </div>
          <div class="type">判断 </div>
        </div>
      </div>
      <div class="align-center">
        <label class="title mr-15">难易程度</label>
        <div class="types flex">
          <div class="type active"> 全部</div>
          <div class="type">简单 </div>
          <div class="type">普通 </div>
          <div class="type">困难 </div>
        </div>
      </div>
      <div class="operation">
        <div>
          <el-button type="primary"
                     @click="showDiaolog">

            添加习题</el-button>
          <el-button type="primary">批量导入</el-button>
          <el-button type="primary">加入公共习题库</el-button>
        </div>
        <el-input v-model="input"
                  placeholder="请输入搜索内容"
                  suffix-icon='el-icon-search'></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="search">搜索</el-button>
      </div>
    </div>
    <!-- 列表渲染 -->
    <div class="list">
      <div class="item"
           v-for="(item,index) in subjectList"
           :key="index">
        <div class="header flex-between">
          <div class="created-time">
            <span>创建时间：{{formatDate(item.createdAt )}}</span>
            <!-- <span>2022-05-12 14:15:16</span> -->
            <div class="types ml-50">
              <span class="type"> 单</span>
              <span class="type1"> 简单</span>
            </div>
          </div>
          <div class="operation">
            <span class="el-icon-edit-outline"
                  @click="showDiaolog(item) "></span>
            <span class="el-icon-delete"
                  @click="opentDelent(item)"></span>
          </div>
        </div>
        <div class="container">
          <div class="title">

            <el-checkbox v-model="checked"
                         disabled>{{item.title}}</el-checkbox>
            <!-- <span>1.建筑设计的来源于————？</span> -->
          </div>
          <div class="options">
            <el-radio-group v-model="radio"
                            disabled>
              <el-radio :label="1"
                        v-if="item.questionA">{{ item.questionA}}</el-radio>
              <el-radio :label="2"
                        v-if="item.questionB">{{ item.questionB}}</el-radio>
              <el-radio :label="3"
                        v-if="item.questionC">{{ item.questionC}}</el-radio>
              <el-radio :label="4"
                        v-if="item.questionD">{{ item.questionD}}</el-radio>
            </el-radio-group>
          </div>
          <div class="answer">
            <span>答案:{{item.answer}}</span>
          </div>

          <!-- <div>
          <span>所属知识点：</span>
          <el-tag>知识点一</el-tag>
          <el-tag type="success">知识点二</el-tag>
          <el-tag type="info">知识点三</el-tag>
          <div>解析：这是解析字段</div>
        </div> -->
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pageaction">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNum"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.totalCount">
      </el-pagination>
    </div>

    <!-- 弹层  项目中弹层在外层 -->

    <el-dialog title=""
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose"
               class='dialog'>

      <div class=" from">
        <div class="item ">
          <label>题目标题:</label>
          <el-input v-model="zujian.title"></el-input>
        </div>
        <div class="item"
             v-for="(zujians,index) in questions"
             :key="zujians.id">
          <label>{{zujians.label}}:</label>
          <el-input v-model="zujians.value"></el-input>
          <div>
            <span @click="addQuestions"
                  v-if="index==questions.length-1 && index<3"
                  class="btn el-icon-circle-plus-outline">
            </span>
            <span @click="removeQuestions"
                  v-if="index>1 && index==questions.length-1"
                  class="btn el-icon-remove-outline"></span>
          </div>
        </div>
        <div class="item">
          <label>答案:</label>
          <el-select v-model="answer"
                     placeholder="请选择">
            <el-option v-for="item in questions"
                       :key="item.key"
                       :label="item.label"
                       :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label for="">难易程度:</label>
          <el-select v-model="zujian.level"
                     placeholder="请选择">
            <el-option v-for="item in levelOption"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="jsCreateApi">确定</el-button>

      </span>
    </el-dialog>

  </div>

</template>

<script>
import { createApi } from '@/api/api' //创建
import { updateApi } from '@/api/api' //修改
import { jsApi } from '@/api/api' //增
import { deleteJsApi } from '@/api/api' //删
import formatDate from '@/mixins/formatDate' //时间
export default {
  mixins: [formatDate],
  //   props: {
  //     msg: String,
  //     subjectList: Array,
  //     count: Number, //数据库共多少条
  //     pageCount: Number, //共多少页
  //   },
  data() {
    return {
      subjectList: [],
      checked: true,
      radio: 3, //单选框
      input: '',
      zujian: {},
      answer: '',
      value: '',
      pageSize: 5, //每页记录的条数
      pageNum: 4, //当前所在第几页
      totalCount: 0, //总页数
      dialogVisible: false, //弹层
      levelOption: [
        {
          value: 1,
          label: '简单',
        },
        {
          value: 2,
          label: '普通',
        },
        {
          value: 3,
          label: '困难',
        },
      ],
      questions: [],
      questionOption: [],
      zujians: [
        {
          id: 1,
          key: 'A',
          label: '选项A',
          value: '',
        },
        {
          id: 2,
          key: 'B',
          label: '选项B',
          value: '',
        },
        {
          id: 3,
          key: 'C',
          label: '选项C',
          value: '',
        },
        {
          id: 4,
          key: 'D',
          label: '选项D',
          value: '',
        },
      ],
      isCreateEvent: true,
      selected: {}, //选中的哪一行
    }
  },

  watch: {
    questions(newvalue) {
      let res = newvalue.find((item) => item.key == this.answer)
      this.answer = !res ? '' : res.key
    },
  },
  created() {
    this.initFromPrams()
    this.getList()
  },
  methods: {
    //模糊查询
    search() {
      this.getList()
      let searchs = this.validateGetFormPrams()
      console.log(searchs)
      let tou = searchs.title
      console.log(tou)
      //获取到查询的值，并使用toLowerCase():把字符串转换成小写，让模糊查询更加清晰

      let search = this.value.toLowerCase()

      let newListData = [] // 用于存放搜索出来数据的新数组
      if (search) {
        //filter 过滤数组

        this.table.filter((item) => {
          // newListData中 没有查询的内容，就添加到newListData中

          if (
            item.name.toLowerCase().indexOf(search) !== -1 ||
            item.age.toLowerCase().indexOf(search) !== -1
          ) {
            newListData.push(item)
          }
        })
      }

      //查询后的表格 赋值过滤后的数据

      this.tableData = newListData
    },

    showDiaolog(data) {
      this.flag = true
      this.dialogVisible = true
      this.initFromPrams()
      console.log(data)
      let isCreateEvent = data instanceof PointerEvent
      if (isCreateEvent) {
        console.log('创建')
        this.isCreateEvent = true
      } else {
        console.log('编辑')
        this.isCreateEvent = false
        this.zujian.title = data.title
        this.selected = data
        this.zujian.id = data.id
        this.answer = data.answer
        this.zujian.level = data.level

        let questionOption = JSON.parse(JSON.stringify(this.zujians))
        // questionOption.index.value = '';
        questionOption[0].value = data.questionA
        questionOption[1].value = data.questionB
        questionOption[2].value = data.questionC
        questionOption[3].value = data.questionD
        this.questions = questionOption.filter((item) => item.value)
        console.log(questionOption)
        console.log(this.questions)
        // this.selected.questionD.value = ''
      }
    },
    //js题库
    async getList() {
      //调用服务端的接口
      let res = await jsApi({
        type: 1, // 必填项  题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选；
        pagination: true, //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
        pageSize: this.pageSize, //非必填  每页获取几条数据  如果不传 默认是获取10条；
        pageNum: this.pageNum,
      })
      this.subjectList = res.data.data.rows
      this.totalCount = res.data.data.count
    },
    //删除
    opentDelent(data) {
      this.$confirm('此操作将永久删除此道题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteJs(data)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    async deleteJs({ type, id }) {
      //调用服务端的接口
      let res = await deleteJsApi({
        id,
        type,
      })
      if (res.data.status == 1) {
        this.getList()
        this.$message({
          // 提示成功信息
          type: 'success',
          message: '删除成功',
        })
      } else {
        this.$message({
          // 提示失败信息
          type: 'warning',
          message: '删除失败',
        })
      }
    },

    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageNum = val
      this.getList()
    },

    //框后边+
    addQuestions() {
      if (this.questions.length === 4) return
      let zujians = [
        {
          id: 1,
          key: 'A',
          label: '选项A',
          value: '',
        },
        {
          id: 2,
          key: 'B',
          label: '选项B',
          value: '',
        },
        {
          id: 3,
          key: 'C',
          label: '选项C',
          value: '',
        },
        {
          id: 4,
          key: 'D',
          label: '选项D',
          value: '',
        },
      ]
      this.questions.push(zujians[this.questions.length])
    },
    //框后边-
    removeQuestions() {
      this.questions.pop()
    },
    //添加
    //创建/修改题目的入参
    getFormPrams() {
      let res = {}
      res.type = this.zujian.type
      res.title = this.zujian.title
      this.questions.forEach((item) => {
        res['question' + item.key] = item.value
      })
      res.answer = this.answer
      res.level = this.zujian.level

      if (!this.isCreateEvent) {
        res.id = this.selected.id
      }
      return res
    },
    initFromPrams() {
      this.zujian = {
        type: 1,
        title: '',
        questionA: '',
        questionB: '',
        // questionC: '',
        // questionD: '',
        answer: '',
        level: '',
      }
      this.questions = JSON.parse(JSON.stringify(this.zujians)).slice(0, 2)
      this.answer = ''
    },
    validateGetFormPrams(params) {
      let res = true
      let rule = {
        title: '题目标题',
        questionA: '选项A',
        questionB: '选项B',
        questionC: '选项C',
        questionD: '选项D',
        answer: '答案',
        level: '难易程度',
      }

      for (const key in params) {
        if (!params[key]) {
          this.$message({
            type: 'wraning',
            message: rule[key] + '不能为空',
          })
          res = false
          break
        }
      }
      return res
    },
    //js题库创建或修改题
    async jsCreateApi() {
      const params = this.getFormPrams()

      //   this.getFormPrams()
      //校验结果
      let validate = this.validateGetFormPrams(params)
      //修改问题时，如果删除C或D，页面清除，接口成空字符串
      if (!params.questionD) {
        params.questionD = ''
      }
      if (!params.questionC) {
        params.questionC = ''
      }

      if (!validate) return
      let successMsg = ''
      let res
      if (this.isCreateEvent) {
        //调用服务端的接口
        console.log(params)
        res = await createApi(params)
        successMsg = '创建成功'
      } else {
        res = await updateApi(params)
        successMsg = '修改成功'
      }

      if (res.data.status == 1) {
        this.getList()
        this.$message({
          // 提示成功信息
          type: 'success',
          message: successMsg,
        })
      }
      this.hiddenDialog()
    },

    //弹层取消  确认
    hiddenDialog() {
      this.dialogVisible = false
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// 头部
.conditaion {
  border-radius: 4px;
  background: #f9f9f9;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  & .title {
    font-weight: bold;
  }
  & .types {
    gap: 0 10px;
    color: #ccc;
    & .type {
      padding: 4px 20px;
      border-radius: 15px;
      border: 1px solid #b7b7b7;
    }
    & .active {
      color: #f25342;
      border: 1px solid #f25342;
    }
  }
  & .operation {
    display: grid;
    grid-template-columns: 2fr auto;
  }
}
//列表
.list {
  & .item {
    border: 1px solid #e2e5ea;
    border-radius: 4px;
    padding: 14px 20px;
    margin-top: 20px;
    .header {
      & .created-time {
        display: flex;
        color: #bababa;
        & .types {
          color: #fff;
          display: flex;
          gap: 0 15px;
          //   padding: 4px 0;
          & .type {
            padding: 4px;
            border-radius: 4px;
            background-image: linear-gradient(#f24a38, #fa7d65);
          }
          & .type1 {
            padding: 4px;
            border-radius: 4px;
            background-image: linear-gradient(#38f254, #97fa65);
          }
        }
      }
      & .operation {
        display: flex;
        gap: 0 14px;
      }
    }

    & .container {
      & .title {
        padding: 12px 0;
      }
      & .options {
        padding: 12px 24px;
      }
      & .answer {
        padding: 12px 24px;
      }
    }
  }
}
//分页
.pageaction {
  padding: 15px 0;
}
//弹层
.dialog {
  ::v-deep .el-dialog {
    min-width: 400px !important;
  }
  & .from {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    //    padding: 20px;
    & .item {
      display: grid;
      grid-template-columns: 70px 240px auto;
      gap: 0 10px;
      align-items: center;
    }
  }
}
</style>
