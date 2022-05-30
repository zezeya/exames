<template>
  <div>
    <!-- <div>
      <input type="checkbox"
             name=""
             id="list">
      <label for="list">ds</label>
    </div> -->

    <div class="main">
      <div style="font-size:24px">新增角色权限</div>
      <div class="top  ">
        <el-form :model="ruleForm"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm flex">
          <el-form-item label="新增角色"
                        prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="新建分组"
                        prop="groupName"
                        @click="createRoleRole()">
            <el-select v-model="ruleForm.groupName"
                       placeholder="请选择活动区域">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="jurisdiction">
        <input type="checkbox"
               name=""
               id="list">
        <label for="list">选择所有权限</label>
      </div>
      <div class="signature">
        <input type="checkbox"
               name=""
               id="list">
        <label for="list">签名管理</label>
        <div class="signature1 flex">
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">KEY种子写入</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">校验KEY密码</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">修改KEY密码</label>
          </div>
        </div>
        <div class="signature1 flex">
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">签名币种列表</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">新增签名币种</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">编辑签名币种</label>
          </div>
        </div>
      </div>
      <div class="signature">
        <input type="checkbox"
               name=""
               id="list">
        <label for="list">提币管理</label>
        <div class="signature1 flex">
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">提币地址管理</label>
          </div>
        </div>
        <div class="signature1 flex">
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">提币转账列表</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">手动拉去提币</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">手动签名转账</label>
          </div>
        </div>

      </div>
      <div class="signature">
        <input type="checkbox"
               name=""
               id="list">
        <label for="list">系统管理</label>
        <div class="signature1 flex">
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">组织成员列表</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">成员数据列表</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">新增成员</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">账号开关</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">查看成员</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">编辑成员</label>
          </div>
        </div>

        <div class="signature1 flex">
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">组织部门管理</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">部门数据列表</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">新增部门</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">查看部门</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">编辑部门</label>
          </div>
        </div>

        <div class="signature1 flex">
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">角色与权限</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">

            <label for="list">角色数据列表</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">新增角色权限</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">新增权限开关</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">角色权限开关</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">查看角色权限</label>
          </div>
          <div class="signatureList ">
            <input type="checkbox"
                   name=""
                   id="list">
            <label for="list">编辑角色权限</label>
          </div>
        </div>
      </div>
      <el-button type="primary"
                 @click="createRole()">确认新增</el-button>
    </div>
  </div>
</template>

<script>
import { createRoleApi, createRoleRoleApi } from '@/api/api'
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        roleName: '',
        groupId: '',
        userId: '',
        groupName: '',
      },
    }
  },
  methods: {
    async createRole() {
      let res = await createRoleApi({
        roleName: '',
        groupId: '',
        userId: '',
      })
      console.log(res)
    },
    async createRoleRole() {
      let res = await createRoleRoleApi({
        groupName: '教室编号', //分组名字
      })
      console.log(res)
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  height: 80vh;
  padding: 10px;
  width: 100%;
  overflow: hidden;
  & .top {
    padding: 10px 0;
    height: 30px;
    line-height: 30px;
  }
  ::v-deep .el-form-item__label {
    font-size: 16px;
  }
  & .jurisdiction {
    padding: 10px;
  }
  & .signature {
    padding: 10px;

    overflow: hidden;
    & .signatureList {
      width: 110px;
      font-size: 14px;
      margin: 10px;
    }
  }
}
</style>