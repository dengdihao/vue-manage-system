<template>
  <div>
    <div>
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
          style="font-size: 24px;
    text-align: center;font-weight: 700;"
        >
          <span>文件管理</span>

          <el-dropdown trigger="click" style="float: right;">
            <el-button type="primary">
              更多菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>编辑文档</el-dropdown-item>
              <el-dropdown-item>删除文档</el-dropdown-item>
              <el-dropdown-item>新建文档</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-card>
        <ul>
            <li>
               1、内容
            </li>
            <li>2、内容</li>
            <li>3、内容</li>
            <li>4、内容</li>
            <li>5、内容</li>
        </ul>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "Foo",
      lastName: "Bar",
      names: ""
    };
  },
  filters: {
    num(val) {
      return val.toUpperCase();
    }
  },
  computed: {
    fullName: {
      // getter
      get: function() {
        return this.firstName + " " + this.lastName;
      },
      // setter
      set: function(newValue) {
        var names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      }
    },
    num: {
      //getter
      get: function() {
        return this.names;
      },
      set: function(val) {
        this.names = val.toUpperCase();
      }
    }
  }
};
</script>