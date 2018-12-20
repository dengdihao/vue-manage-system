<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm ms-content"
      >
        <!-- :model="formLabelAlign" -->
        <el-form-item label="用户名：" autocomplete="off"
            hide-required-asterisk="true" prop="userName">
          <el-input v-model="ruleForm2.userName"></el-input>
          <!-- v-model="formLabelAlign.name" -->
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            type="password"
            v-model="ruleForm2.password"
            autocomplete="off"
            hide-required-asterisk="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkpassword">
          <el-input
            type="password"
            v-model="ruleForm2.checkpassword"
            autocomplete="off"
            hide-required-asterisk="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="userPhone">
          <el-input v-model.number="ruleForm2.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model.number="ruleForm2.email"></el-input>
        </el-form-item>
        <el-form-item label="角色：" autocomplete="off"
            hide-required-asterisk="true" prop="role">
          <el-select v-model="ruleForm2.role" placeholder="请选择角色" >
            <el-option v-for="(item,index) in seselects"
      :key="index"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"></el-option>
            
          </el-select>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model.number="ruleForm2.userAddress"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input v-model.number="ruleForm2.realName"></el-input>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input v-model.number="ruleForm2.unit"></el-input>
        </el-form-item>
        <el-form-item label="职位：">
          <el-input v-model.number="ruleForm2.position"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { _register } from "../../services/service.js";
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      let regphone = /0?(13|14|15|17|18|19)[0-9]{9}/;
      if (!regphone.test(value) === true) {
        callback(new Error("请输入正确的电话"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkpassword !== "") {
          this.$refs.ruleForm2.validateField("checkpassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      let regemail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!regemail.test(value) === true) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        userName: "11122", //用户名
        password: "111111", //密码
        userPhone: "13488888888", //电话
        email: "xujakai11@163.com", //邮箱
        role: "Financial", //角色权限
        userAddress: "", // 地址
        realName: "", //真实姓名
        checkPass: "", // 部门
        unit: "", //部门
        position: "", // 职位
        checkpassword: "" //确认密码
      },
      seselects:[{
        value: 'Admin',
          label: '管理员',
          disabled:true
      },{
value: 'Financial',
          label: '财务',
      },{
value: 'FinancialController',
          label: '财务主管',
      },{
value: 'Supervisor',
          label: '主管',
      },{
value: 'ReportingStaff',
          label: '报告员',
      }],
      rules2: {
        userName:[{required:true,trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkpassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        userPhone: [{ required: true, validator: checkphone, trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        role:[{required: true,trigger: "blur"}]
      },
      required: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // if (valid) {
        //   alert(this.ruleForm2);
        //   console.info(this.ruleForm2)
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
        if (valid) {
          delete this.ruleForm2.checkpassword;
          _register(this.ruleForm2)
            .then(res => {
              console.info(res);
              if (res.status === 200) {
                this.$message({
                  message: "注册成功",
                  type: "success"
                });
                this.$router.push("/login");
              }
            })
            .catch(err => {
              console.info(err);
            });
        } else {
          console.log("error submit!!");
          console.info(this.checkpassword);

          console.info(this.ruleForm2);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: black;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 35%;
  width: 350px;
  margin: -210px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px 0px 0;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>