<template>
  <div>
    <el-card class="box-card">
      <el-dropdown trigger="click">
        <el-button>
          更多菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="todialog(index)"
            v-for="(item,index) in casestatus"
            :key="index"
          >{{item.content}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button>提交</el-button>
      <img :src="status" alt>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :index="index">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toPath(index)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      casestatus: [
        {
          content: "接洽阶段"
        },
        {
          content: "调查阶段"
        },
        {
          content: "报告阶段"
        },
        {
          content: "法务阶段"
        },
        {
          content: "诉讼阶段"
        }
      ],
      status: "../../../static/img/errstatus.png",
      dialogVisible: false,
      index: ""
    };
  },
  methods: {
    todialog(param) {
      this.dialogVisible = true;
      console.info(param);
      this.index = param;
    },
    toPath(index) {
      console.info(index);
      this.$router.push({
        name: "detailpages",
        query: {
          id: index
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  position: relative;
  img {
    position: absolute;
    top: -30px;
    right: -30px;
  }
}
</style>
