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
            <p>Needs Triage (2)</p>
            <ul>
              <li v-for="(item,index) in baseInfoList" :key="index">
                {{item.caseName}}
                <div class="phui-oi-frame">
                  <div class="phui-oi-div1">
                    <span class="el-icon-more">{{item.caseName}}</span>
                  </div>
                  <div class="phui-oi-div2">
                    <span class="el-icon-warning" style="color: purple;">{{item.caseName}}</span>
                  </div>
                  <div class="phui-oi-div3">
                    <div class="phui-oi-div3-title">
                      <b>{{item.caseNo}}</b>
                      <a @click="tocasedetail(item.id)">
                        <span>{{item.caseName}}</span>
                      </a>
                    </div>
                    <div class="phui-oi-div3-title">
                      <span></span>
                    </div>
                  </div>
                  <div class="phui-oi-div4">
                    <div class="phui-oi-div4-title">{{item.updateInfo[0].updateTime}}</div>
                    <div class="phui-oi-div4-title">参与人：{{item.currentParticipants.join(' ')}}</div>
                  </div>
                </div>
              </li>
            </ul>
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
            <ul>
              <li v-for="(item,index) in phui" :key="index">
                <div class="phui-box">
                  <div class="phui-header">
                    <router-link to>
                      <img>头像
                    </router-link>
                    <span>{{item.clientName}}</span>
                    <span>{{item.type}}</span>
                    <router-link to>
                      <b>{{item.caseName}}</b>
                    </router-link>
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
              <button @click="obj.pageIndex ++">下一页</button>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from "../common/bus";

import { _postoperation } from "../../services/service.js";

export default {
  name: "dashboard",
  data() {
    return {
      baseInfoList: "",
      obj: {
        pageIndex: 1,
        pageSize: 10
      },
      phui:[]
    };
  },
  components: {},
  computed: {
  },
  created() {
    this.handleListener();
    this.changeDate();
    this.postoperation();
  },
  activated() {
    this.handleListener();
  },
  deactivated() {},
  methods: {
    changeDate() {},
    handleListener() {},

    postoperation() {
      _postoperation(this.obj).then(res => {
        console.info(res);
        this.phui=res.data.data.concat()
      });
    },
    tocasedetail(id) {
      console.info(id);
      this.$router.push({
        name: "casedetail",
        query: {
          id: id
        }
      });
    },
    toSerch(){
      this.$router.push({ path:'powersearch'})
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
