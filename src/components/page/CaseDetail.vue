<template>
  <div style>
    <div class="phui-two-column-header">
      <div style="display: flex;justify-content: space-between;">
        <div><i class="el-icon-warning"></i>测试数据</div>
        <button>导出内容</button>
      </div>
    </div>

    <el-card>
      <div class="phui-main-column">
        <div class="phui-header-shell">信息</div>
        <div>
          <div class="phui-div-content">
            <div>案件状态</div>
            <div>测试数据</div>
            <div>案件类型</div>
            <div>测试数据测试数据</div>
          </div>
          <div class="phui-div-content div-active">
            <div>案件号</div>
            <div>测试数据测试数据</div>
            <div>案件名称</div>
            <div>测试数据测试数据</div>
          </div>
          <div class="phui-div-content">
            <div>当前参与人</div>
            <div>测试数据测试数据</div>
            <div>案由</div>
            <div>测试数据测试数据</div>
          </div>
          <div class="phui-div-content div-active">
            <div>立案时间</div>
            <div>测试数据测试数据</div>
            <div>结案方式</div>
            <div>测试数据测试数据</div>
          </div>
          <div class="phui-div-content">
            <div>结案日期</div>
            <div>测试数据</div>
            <div>更新信息</div>
            <div>测试数据</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  _getlunbo,
  _getnewslist,
  _getnewslistid
} from "../../services/service.js";

import api from "../../services/api.js";

export default {
  data() {
    return {
      id: ""
    };
  },
  created() {
    this.getRouterData();
    console.info(this.$route.qurey);
  },
  mounted() {
    
  },
  methods: {
    getRouterData() {
      this.id = this.$route.query.id;
      console.info(this.id);
    },

    getcaseList() {
      console.info(111);
      api
        ._getlist("/casedetail", this.id)
        .then(res => {
          console.info(res);
        })
        .catch(err => {
          console.info(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.phui-two-column-header {
  background-color: #fff;
  border-bottom: 1px solid rgba(55, 55, 55, 0.12);
  margin-bottom: 24px;
  padding: 24px 32px 28px;
  border: none;
}

.phui-main-column {
  border: 1px solid #dde8ef;
  overflow: hidden;
}
.phui-header-shell {
  background-color: #eff3fc;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  padding: 6px 16px;
  border-bottom: 1px solid #dde8ef;
  overflow: hidden;
}
.phui-div-content {
  display: flex;
  align-items: center;
  & > div {
    padding: 10px;
    flex: 1;
  }
}
.div-active {
  background: #f2f9fc;
}
</style>
