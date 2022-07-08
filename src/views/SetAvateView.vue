<template>
  <div>
    <el-upload class="avatar-uploader"
               action="/api/upload/image"
               :data="{type:2}"
               :show-file-list="false"
               :on-success="handleAvatarSuccess">

      <img v-if="imageUrl"
           :src="imageUrl"
           class="avatar">
      <i v-else
         class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <template>
      <el-button type="primary"
                 @click="getuserupdate">修改</el-button>
    </template>
  </div>

</template>
<script>
import { getuserupdateApi, getUserInfoApi } from '@/api/api'
export default {
  data() {
    return {
      imageUrl: '',
      image: '',
    }
  },

  methods: {
    //修改个人信息
    async getUserInfo() {
      let res = await getUserInfoApi({
        avatarImg: this.image,
      })
      this.$store.commit('saveUserInfo', res) //存
      console.log(res)
    },

    //弹层
    getuserupdate() {
      this.$confirm('是否确认修改当前头像?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })

        .then(() => {
          getuserupdateApi({ avatarImg: this.image }).then((res) => {
            console.log(res)
            getUserInfoApi().then((res) => {
              if (res.data.status == 1) {
                console.log(res.data.data)
                this.$store.commit('saveUserInfo', res.data.data)
                console.log(this.$store.state.userInfo)
                console.log(1)
              }
            })
          })
          this.$message({
            type: 'success',
            message: '修改成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改',
          })
        })
    },
    //文件上传成功时的钩子
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.image = res.data
      console.log(file)
      console.log(this.image)
    },

    //修改头像
    // async beforeAvatarUpload(file) {
    //   let formData = new FormData()
    //   formData.append('file', file)
    //   formData.append('type', 2)
    //   let res = await uploadImageApi({
    //     file: '', //上传的图片  type:2,[number] ,file:file[file],
    //   })
    //   console.log(res)
    // },

    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。

    // beforeAvatarUpload(file) {
    //   const ispng = file.type === 'image/png'
    //   const isLt200kb = file.size / 1024 < 200
    //   console.log(isLt200kb)
    //   if (!ispng) {
    //     this.$message.error('上传头像图片只能是 png 格式!')
    //   }
    //   if (!isLt200kb) {
    //     this.$message.error('上传头像图片大小不能超过 200kb!')
    //   }
    //   return ispng && isLt200kb
    // },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
