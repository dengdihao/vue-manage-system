<template>
  <div class="person">
    <el-card>
      <div class="user-main">
        <div class="user-title">我的账户</div>
        <div class="user-content">
          <p>基本信息</p>
          <el-form label-width="100px">
            <el-form-item label="账号">
              <el-input disabled></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <el-upload
                action
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
              <el-button style="margin-top: 20px;">上传</el-button>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="账户类型">
              <el-input disabled></el-input>
              <!-- 主管 报告员 管理员 财务人员 财务主管 -->
            </el-form-item>
            <el-form-item>
              <el-button>修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personUl: [
        { topath: "user", content: "个人简介", name: "user" },
        { topath: "edituser", content: "编辑信息", name: "edituser" }
      ],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    topath(name) {
      console.info(1);
      console.info(this.personUl);
      console.info(name);
      this.$router.push({
        name: name,
        qurey: {
          id: "123456"
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.person-left-sidebar {
  padding: 10px 0;
  
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.user-main {
  padding: 10px 0;
  background: #fff;
  font-size: 14px;
      background: #fff;
    font-size: 14px;
    width: 800px;
    margin: 0 auto;
}
  .user-title {
    margin-top: -10px;
    margin-bottom: 30px;
    color: #409eff;
    font-size: 20px;
    line-height: 25px;
    border-left: 12px solid #409eff;
    padding-left: 21px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }
  .user-content {
    p {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }
    .el-form {
      margin: 20px 0;
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
    }
  }

</style>
