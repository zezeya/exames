<template>
  <div class="rolezu">
    <div class="header align">
      <span class="el-icon-user"></span>
      <h1>角色管理</h1>
    </div>
    <div class="main">
      <div class="left">
        <div class="head align">
          <div class="ml-10"><span class="el-icon-user"></span>新增角色</div>
          <div class="ml-45"><span class="el-icon-user"></span>新建分组</div>
        </div>
        <div class="conter">
          <el-menu default-active="1"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   text-color="#666666"
                   active-text-color="#6cd6bf">
            <el-submenu :index="item.id+''"
                        v-for="(item,index) in list"
                        :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.groupName }}</span>
              </template>
              <el-menu-item v-for="(menu_item,index) in item.renyuan"
                            :index="menu_item.id+''"
                            :key="index">{{ menu_item.roleName }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="right mt-10">
        <div class="head">
          <h1 class="head">所有者<span class="roledefault">系统默认角色，默认具有企业所有功能权限和全部数据可见范围</span></h1>
        </div>
        <div class="menu">
          <el-menu :default-active="activeIndex"
                   class="el-menu-demo"
                   mode="horizontal"
                   @select="handleSelect">
            <el-menu-item index="1">角色成员</el-menu-item>
            <el-menu-item index="2">功能权限</el-menu-item>
            <el-menu-item index="3">数据范围</el-menu-item>
          </el-menu>
        </div>
        <div class=""
             v-if="activeIndex == 1">
          1
        </div>
        <!-- 功能权限 -->
        <div class="functionalAuthority"
             v-else-if="activeIndex == 2">

        </div>
        <div class=""
             v-else>
          3
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { listRoleApi, listRoleGroupApi } from '@/api/api'
export default {
  data() {
    return {
      activeIndex: '2',
      // 列表内容
      list: [],
      // 组的列表
      zuList: [],
      // 人员的列表
      perporList: [],
    }
  },
  created() {
    this.listRoleGroup()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key) {
      this.activeIndex = key
    },
    // 角色分组列表
    async listRoleGroup() {
      var res = await listRoleGroupApi({
        pagination: false,
      })
      if (res.data.status == 1) {
        this.zuList = res.data.data.rows
        this.listRole()
      }
    },
    // 角色列表
    async listRole() {
      var res = await listRoleApi({
        pagination: false,
      })
      if (res.data.status == 1) {
        this.perporList = res.data.data.rows
        this.chuliList()
      }
    },
    // 处理列表数据
    chuliList() {
      this.zuList.forEach((item) => {
        var renyuan = this.perporList.filter((el) => {
          if (el.groupId == item.id) return el
        })
        this.list.push({
          id: item.id, //分组id
          groupName: item.groupName, // 分组的名字
          renyuan: renyuan,
        })
      })
      console.log(this.list)
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
}
.roledefault {
  font-weight: 400;
}
</style>