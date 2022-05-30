<template>
  <div>
    <div>
      <h2>基本信息</h2>
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px"
               class="demo-form">
        <el-form-item label="账号昵称"
                      prop="nickname ">
          <el-input v-model="form.nickname "></el-input>
        </el-form-item>
        <el-form-item label="真实姓名"
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio :label=1>男</el-radio>
            <el-radio :label=0>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所在地"
                      prop="locality ">
          <!-- 省 -->
          <el-select name="provinceNo"
                     v-model="form.provinceNo"
                     @change="getAllCity">
            <el-option v-for="item in provincedata"
                       :key="item.code"
                       :value="item.code"
                       :label="item.name">
              <span>{{item.name}}</span>
              <span>{{item.code}}</span>
            </el-option>
          </el-select>
          <!-- 市 -->
          <el-select name="cityNo"
                     v-model="form.cityNo"
                     @change="getArea">
            <el-option v-for="item in citydata"
                       :key="item.code"
                       :value="item.code"
                       :label="item.name">
              <span>{{item.name}}</span>
              <span>{{item.code}}</span>
            </el-option>
          </el-select>
          <!-- 区 -->
          <el-select name="areaNo"
                     v-model="form.areaNo">
            <el-option v-for="item in areadata"
                       :key="item.code"
                       :value="item.code"
                       :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="简介"
                      prop="intro">
          <el-input type="textarea"
                    v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="UpdateUserInfo">保存</el-button>
          <el-button type="primary">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserInfoApi, getuserupdateApi } from '@/api/api'
import data from '../json/citydata.json'
export default {
  data() {
    //存放数据
    return {
      // 创建对象
      form: {
        nickname: '', //昵称
        name: '', //姓名
        locality: '', //所在地
        sex: '', //性别
        intro: '', //简介
        provinceNo: '', //省编号
        cityNo: '', //市编号
        areaNo: '', //区编号
      },

      provincedata: [],
      citydata: [],
      areadata: [],
      //   params: '',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
        locality: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change',
          },
        ],

        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        intro: [{ required: true, message: '请填写简介', trigger: 'blur' }],
      },
      datas: '',
    }
  },
  //生命周期  创建完成（访问this实例）
  async created() {
    this.getProvince()
    let res = await getUserInfoApi()
    if (res.data.status == 1) {
      this.datas = res.data.data[0]
      console.log(this.datas)
      this.form.nickname = this.datas.avatarName //昵称
      this.form.name = this.datas.name //真是姓名
      this.form.sex = this.datas.sex //性别
      this.form.intro = this.datas.desc //简介
      this.form.provinceNo = this.datas.provinceNo //省
      this.form.cityNo = this.datas.cityNo //市
      this.form.areaNo = this.datas.areaNo //县
    }
    this.getAllCity()
    this.getArea()
    console.log(this.form)
    // this.form.cityNo =
    //   this.citydata && this.citydata.code ? this.citydata.code : ''
    // this.form.areaNo =
    //   this.areadata && this.areadata.code ? this.areadata.code : ''
  },

  mounted() {},
  //方法集合
  methods: {
    //省份
    getProvince() {
      this.provincedata = data
    },
    //城市
    getAllCity() {
      this.citydata = this.provincedata.find(
        (item) => item.code == this.form.provinceNo
      ).children
      console.log(this.citydata)
    },
    //县区
    getArea() {
      this.areadata = this.citydata.find(
        (item) => item.code == this.form.cityNo
      ).children

      console.log(this.areadata)
    },
    //保存
    async UpdateUserInfo() {
      let params = {
        avatarName: this.form.nickname, //昵称
        name: this.form.name, //真是姓名
        sex: this.form.sex, //性别
        desc: this.form.intro, //简介
        provinceNo: this.form.provinceNo, //省
        cityNo: this.form.cityNo, //市
        areaNo: this.form.areaNo, //县
      }
      let res = await getuserupdateApi(params)
      console.log(res)
    },
    //取消
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },

  //监听属性，类似于data概念
  watch: {},
}
</script>
<style lang='scss' scoped>
h2 {
  border-bottom: 1px rgb(204, 204, 204) solid;
  padding: 0px 30px;
}
</style>