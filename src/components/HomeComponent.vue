<template>
  <div>
    <!-- <div class="main-right ">
      <div class=" mt-10">
        <el-row>
          <span>适用考试：</span>
          <el-button round>全部<span>(34)</span></el-button>
          <el-button round>期中考试<span>(14)</span></el-button>
          <el-button round>期末考试<span>(18)</span></el-button>
          <el-button round>其他考试<span>(2)</span></el-button>
        </el-row>
      </div>
      <div class="mt-10">
        <el-row>
          <span>试卷形式：</span>
          <el-button round>全部</el-button>
          <el-button round>考生同卷</el-button>
          <el-button round>随机顺序</el-button>
          <el-button round>考生异卷</el-button>
        </el-row>
      </div>
      <div class="mt-10">
        <el-row>
          <el-button type="primary">策略组卷</el-button>
          <el-button type="primary">手动组卷</el-button>
          <el-button type="primary">导入试卷</el-button>
          <input type="text">
        </el-row>
      </div>
    </div> -->

    <!-- <div class=" item "
         v-for="(item,index) in data"
         :key="index">
      <div class="kuang flex-between ">
        <div class="flex-between">
          <div class="mr-10">创建时间:{{item.createdAt}}</div>
          <div class="flex-between">
            <div class="singleMany mr-10">单</div>
            <div class="difficulty">{{level}}</div>
          </div>
          <div>满分:100</div>
          <div>使用次数:18次</div>
        </div>
        <div>
          <el-button type="info"
                     icon="el-icon-message"
                     circle></el-button>
          <el-button type="warning"
                     icon="el-icon-star-off"
                     circle></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle></el-button>
        </div>
      </div>
      <div class="mt-20">
        <div>
          <input type="checkbox"
                 id="inputK">
          <label for="inputK">{{item.title}}</label>
        </div>
        <form action="">
          <div class="mt-20">
            <div>
              <input type="radio"
                     name="option"
                     :value="item. questionA"
                     :id="item. questionA+item.id" />
              <label :for="item. questionA+item.id"></label>
            </div>
          </div>
        </form>
      </div>
    </div> -->
  </div>
</template>

 <script>
// import axios from 'axios'
export default {
//   data() {
//     return {
//       id: 1, //题目标识
//       type: 1, //题目类型
//       title: '单选题', //题目标题
//       questionA: '7', // 选项a,
//       questionB: '8', // 选项b,
//       questionC: '9', // 选项c,
//       questionD: '10', // 选项d,
//       answer: 'B', // 答案
//       level: 1, // 难度系数  1：简单  2：普通 3：困难
//       createdAt: '2021-12-12', // 创建时间
//       updatedAt: '18:30:33', // 更新时间
//     }
//   },
//  mounted() {
//     this.getUserList()
//   },
//   method: {
//     getUserList() {
//       axios
//         .post(
//           '/api/question/list',
//           {
//             data: {
//               id: 1, //题目标识
//               type: 1, //题目类型
//               title: '单选题', //题目标题
//               questionA: '7', // 选项a,
//               questionB: '8', // 选项b,
//               questionC: '9', // 选项c,
//               questionD: '10', // 选项d,
//               answer: 'B', // 答案
//               level: 1, // 难度系数  1：简单  2：普通 3：困难
//               createdAt: '2021-12-12', // 创建时间
//               updatedAt: '18:30:33', // 更新时间
//             },
//           },
        
//         )
//         .then((res) => {
//           console.log(res)
//           if (res.data.status == 401) {
//             // 当接口状态为401时 说明本次请求是token失效导致的
//             // 那么就需要重新登录
//             // 这一步做的就是登录拦截 如果没有登录或者token失效

//             this.$message({
//               // 提示失败信息
//               type: 'error',
//               message: '登录超时请重新登录！',
//             })
//             // 1.先清除缓存中的token
//             sessionStorage.removeItem('token') //清除过期的token
//             // 2.跳转到login页面进行登录
//             this.$router.push('/login')
//           }
//           if (res.data.status == 1) {
//             this.userInfo = res.data.data[0]
//             sessionStorage.getItem('token') //结束
//             // this.setToken()
//             this.$message({
//               // 提示成功信息
//               type: 'success',
//               message: res.data.msg,
//             })
//           } else {
//             this.$message({
//               // 提示失败信息
//               type: 'error',
//               message: res.data.msg,
//             })
//           }
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     },
//   },
}
</script>

// <style lang="scss" scoped>
// .main-right {
//   border: 1px solid #f9f9f9;
//   background-color: #f9f9f9;
//   font-size: 14px;
//   font-weight: 500;
//   padding: 5px 10px;
// }
// </style>