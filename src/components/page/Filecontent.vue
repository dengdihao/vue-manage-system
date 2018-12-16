<template>
  <div>
    <div>
      <el-card class="box-card-header">
        <div class="file-card-header">
          <span>xxxx标题</span>
          <el-dropdown trigger="click" style="float: right;">
            <el-button type="primary">
              更多菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <a @click="toPath('fileredact')">
                <el-dropdown-item>编辑文档</el-dropdown-item>
              </a>
              <a href>
                <el-dropdown-item>删除文档</el-dropdown-item>
              </a>
              <a href>
                <el-dropdown-item>新建文档</el-dropdown-item>
              </a>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="file-card-foot">测试数据1112312</div>
      </el-card>
      <el-card class="box-card-content">
        <div class="file-content">
          <h2>文档目录</h2>
          <h3>内容</h3>
        </div>
      </el-card>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    toPath (name, item) {
      console.info();
      this.$router.push({
        name: name,
        query: {}
      });
    }
  }
}
</script>


<style lang="less" scoped>
a {
  color: blue;
}
a:hover {
  color: red;
}
.box-card-header {
  .file-card-header {
    font-size: 24px;
    text-align: center;
    font-weight: 700;
    max-width: 800px;
    margin: 0px auto;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .file-card-foot {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 10px;
    font-size: 16px;
  }
}

.box-card-content {
  margin-top: 20px;
  .file-content {
    max-width: 800px;
    margin: 0 auto;
    h2 {
      padding-bottom: 20px;
    }
  }
}

.remarkup-list {
  list-style: disc;
  margin-left: 20px;
}
</style>
