<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16" style="margin-bottom: 20px;">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>案件基本信息</span>
            <el-button
              style="float: right; padding: 3px 0;font-size: 20px;"
              type="text"
              class="el-icon-search"
              @click="toSerch()"
            ></el-button>
          </div>
          <div class="dash-content">
            <el-table
              :data="caseLists"
              style="width: 100%"
              :default-sort="{prop: 'priority', order: 'ascending'}"
              :border="true"
              @row-click="getId"
            >
              <el-table-column prop="brands" label="客户品牌" sortable ></el-table-column>
              <el-table-column prop="caseName" label="案件名称" sortable ></el-table-column>
              <el-table-column prop="caseNo" label="案件号" sortable ></el-table-column>
              <el-table-column prop="clientCaseNo" label="客户案件号" ></el-table-column>
              <el-table-column prop="openDate" label="立案日期" sortable >
                <!-- :formatter="formatter" -->
              </el-table-column>
              <el-table-column prop="priority" label="优先级" sortable >
                <template slot-scope="scope">
                  <p>{{scope.row.priority|show}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="案件状态" sortable ></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="margin-bottom: 20px;">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>最近参与</span>
            <el-button
              style="float: right; padding: 3px 0;font-size: 20px;"
              type="text"
              class="el-icon-search"
              @click="toSerch()"
            ></el-button>
          </div>
          <div class="dash-content">
            <p>时间</p>
            <keep-alive>
              <ul>
                <li v-for="(item,index) in phui" :key="index">
                  <div class="phui-box">
                    <div class="phui-header">
                      <!-- <router-link to>
                      <img>头像
                      </router-link>-->
                      <span>{{item.updateUserName}}</span>
                      <span>{{item.type}}</span>
                      
                      <a>
                        <b @click="toDeta(item.caseId)">{{item.caseName}}</b>
                      </a>
                      <span class="phui-item"></span>
                      <router-link to>
                        <span class="phui-cassname"></span>
                      </router-link>
                    </div>
                    <div class="phui-content"></div>
                    <div class="phui-footer">
                      <i class="el-icon-time"></i>
                      <span>{{item.updateTime}}</span>
                    </div>
                  </div>
                </li>
                <el-button @click="prevPage">上一页</el-button>
                <el-button @click="nextPage">下一页</el-button>
              </ul>
            </keep-alive>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from "../common/bus";

import {
  _postoperationA,
  _postoperationFc,
  _postoperationR,
  _postoperationF,
  _postoperationS,
  _getCaseListA,
  _getCaseListR,
  _getCaseListS
} from "../../services/service.js";

export default {
  name: "dashboard",
  data() {
    return {
      obj: {
        pageIndex: 1,
        pageSize: 10
      },
      phui: [],
      user_role: "",
      caseList: []
    };
  },
  activated() {
    this.postoperation(this.obj);
    this.getCase()
  },
  created() {
    this.user_role = sessionStorage.getItem("user_role");
    this.getRole()
    this.postoperation(this.obj);
    this.getCase();
  },
  computed: {
    caseLists: function() {
      this.caseList.forEach(item => {
        if (item.priority == "紧急") {
          item.priority = 1;
        }
        if (item.priority == "高") {
          item.priority = 2;
        }
        if (item.priority === "低") {
          item.priority = 3;
        }
      });
      return this.caseList;
    }
  },
  methods: {
    getRole(){
      // debugger
      const role= sessionStorage.getItem("user_role")
      if (!role) {
        this.$message({
          showClose: true,
          message: "你没有身份信息，请重新登陆",
          type: "error"
        });
        this.$router.push("/login");
      }
},
    postoperation(obj) {
      if (this.user_role === "Admin") {
        //管理员
        _postoperationA(obj).then(res => {
          this.phui = res.data.data.concat();
        });
      } else if (this.user_role === "FinancialController") {
        //财务主管
        _postoperationFc(obj).then(res => {
          this.phui = res.data.data.concat();
        });
      } else if (this.user_role === "Supervisor") {
        // 主管
        _postoperationS(obj).then(res => {
          this.phui = res.data.data.concat();
        });
      } else if (this.user_role === "Financial") {
        // 财务
        _postoperationF(obj).then(res => {
          this.phui = res.data.data.concat();
        });
      } else if (this.user_role === "ReportingStaff") {
        // 报告员
        _postoperationR(obj).then(res => {
          this.phui = res.data.data.concat();
        });
      }
    },
    getCase() {
      if (this.user_role === "Admin") {
        _getCaseListA().then(res => {
          console.info(res);
          this.caseList = res.data;
        });
      } else if (this.user_role === "Supervisor") {
        _getCaseListS().then(res => {
          this.caseList = res.data;
        });
      } else if (this.user_role === "ReportingStaff") {
        _getCaseListR().then(res => {
          this.caseList = res.data;
        });
      }
    },
    tocasedetail(id) {
      console.info(id);
      this.$router.push({
        name: "casedetail",
        query: {
          id: id
        }
      });
    this.$store.commit("set_id",id)
    },
    toSerch() {
      this.$router.push({ path: "powersearch" });
    },
    prevPage() {
      this.obj.pageIndex--;
      if (this.obj.pageIndex < 1) {
        this.obj.pageIndex = 1;
      }
      this.postoperation(this.obj);
    },
    nextPage() {
      this.obj.pageIndex++;
      this.postoperation(this.obj);
    },
    toDeta(id) {
      console.info(id);
      this.$router.push({
        name: "detailpages",
        params: {
          id: id
        }
      });
    this.$store.commit("set_id",id)
    },
    /* 获取id */
    getId(row){
      this.toDeta(row.id)
    }
  },
  filters: {
    show: function(value) {
      if (value == "1") {
        return (value = "紧急");
      } else if (value == "2") {
        return (value = "高");
      } else if (value == "3") {
        return (value = "低");
      }
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
}

.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

/* 内容 */
.dash-content {
  p {
    margin: 0;
    padding: 4px 8px;
    background-color: #f7f7f7;
  }
  .phui-oi-frame {
    overflow: hidden;
    clear: both;
    content: "";
    padding: 3px;
    height: 50px;
    border-bottom: 1px solid #dde8ef;
    .phui-oi-div1 {
      float: left;
      margin-left: 10px;
      span {
        line-height: 50px;
        transform: rotate(90deg);
      }
    }
    .phui-oi-div2 {
      float: left;
      margin-left: 10px;
      span {
        line-height: 50px;
      }
    }
    .phui-oi-div3 {
      float: left;
      margin-left: 10px;
      font-size: 13px;
      line-height: 25px;
      .phui-oi-div3-title {
        a {
          text-decoration: none;
          color: #136cb2;
          cursor: pointer;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
    .phui-oi-div4 {
      font-size: 13px;
      line-height: 25px;
      float: right;
      width: 140px;
    }
  }
}

.phui-box {
  font-size: 13px;
  padding: 5px;
  .phui-header {
    a {
      color: black;
    }
    a:hover {
      text-decoration: underline;
    }

    .phui-item {
      color: #999;
    }
    .phui-cassname {
      color: blue;
    }
  }
}

.el-card {
  margin-bottom: 20px;
}
</style>
