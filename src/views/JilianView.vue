<template>
  <div>
    级联
    <div>

      <el-select name="provinceNo"
                 v-model="form.provinceNo"
                 @change="getAllCity">
        <!-- <el-option value
                   disabled>所在省{{data.name}}</el-option> -->
        <el-option v-for="item in provincedata"
                   :key="item.code"
                   :value="item.code"
                   :label="item.name">
          <span>{{item.name}}</span>
          <span>{{item.code}}</span>
        </el-option>
      </el-select>
      <el-select name="cityNo"
                 v-model="form.cityNo"
                 @change="getArea">
        <!-- <el-option value
                   disabled>所在市</el-option> -->
        <el-option v-for="item in citydata"
                   :key="item.code"
                   :value="item.code"
                   :label="item.name">
          <span>{{item.name}}</span>
          <span>{{item.code}}</span>
        </el-option>
      </el-select>
      <el-select name="areaNo"
                 v-model="form.areaNo">
        <el-option v-for="item in areadata"
                   :key="item.code"
                   :value="item.code"
                   :lable="item.name">
          <span>{{item.name}}</span>
          <span>{{item.code}}</span>
        </el-option>
      </el-select>

    </div>
  </div>
</template>

<script>
import data from '../json/citydata.json'
export default {
  data() {
    return {
      form: {
        provinceNo: '', //省编号
        cityNo: '', //市编号
        areaNo: '', //区编号
      },
      provincedata: [],
      citydata: [],
      areadata: [],
    }
  },
  created() {
    this.getProvince()
  },
  methods: {
    getProvince() {
      this.provincedata = data
    },
    getAllCity() {
      this.citydata = this.provincedata.find(
        (item) => item.code == this.form.provinceNo
      ).children
      console.log(this.citydata)
    },
    getArea() {
      this.areadata = this.citydata.find(
        (item) => item.code == this.form.cityNo
      ).children
      console.log(this.areadata)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>