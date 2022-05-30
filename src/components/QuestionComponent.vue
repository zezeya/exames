<template>
  <div>
    <div class="herder">
      <el-row>
          <span>所属类型：</span>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary"
                   round>主要按钮</el-button>
        <el-button type="success"
                   round>成功按钮</el-button>
        <el-button type="info"
                   round>信息按钮</el-button>
        <el-button type="warning"
                   round>警告按钮</el-button>
        <el-button type="danger"
                   round>危险按钮</el-button>
      </el-row>
        <el-row>
          <span>难易程度：</span>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary"
                   round>主要按钮</el-button>
        <el-button type="success"
                   round>成功按钮</el-button>
        <el-button type="info"
                   round>信息按钮</el-button>
        <el-button type="warning"
                   round>警告按钮</el-button>
        <el-button type="danger"
                   round>危险按钮</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
