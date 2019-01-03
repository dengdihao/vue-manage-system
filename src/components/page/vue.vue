<template>
  <div>
    <div class="el-card box-card table_container">
      <div class="el-card__header">
        <div class="header clearfix">
          <span>{{ title }}</span>
          <el-button size="small" type="primary" @click="onEdit" class="btn_right" v-if="!isShow">编辑</el-button>
          <el-button
            size="small"
            type="primary"
            @click="onComplete"
            class="btn_right"
            v-if="isFinish"
          >完成</el-button>
        </div>
      </div>
      <div class="el-card__body">
        <table class="gridtable" border>
          <tbody>
            <tr v-for="item in tableData" :key="item.id">
              <td :rowspan="item.idspan" :class="{hidden: item.iddis}">{{ item.id }}</td>
              <td :rowspan="item.projectspan" :class="{hidden: item.projectdis}">{{ item.project }}</td>
              <td :rowspan="item.typespan" :class="{hidden: item.typedis}">{{ item.type }}</td>
              <td>{{ item.subentry }}</td>
              <td class="w">
                <el-input v-model="item.nowManage" v-if="isShow"></el-input>
                <span v-else>{{ item.nowManage }}</span>
              </td>
              <td class="w">
                <el-input v-model="item.Hidden" v-if="isShow"></el-input>
                <div v-else>{{ item.Hidden }}</div>
              </td>
              <td class="w">
                <el-input v-model="item.Total" v-if="isShow"></el-input>
                <span v-else>{{ item.Total }}</span>
              </td>
              <td class="w">
                <el-input v-model="item.remark" v-if="isShow"></el-input>
                <span v-else>{{ item.remark }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-button >按钮</el-button>
    <button @click="get">aaaa</button>
  </div>
</template>
<script>
import { _loginpost } from '../../services/service';
import Axios from 'axios';

export default {

  data() {
    return {
      ruleForm: {
        username: "111",
        password: "pwd123"
      },
      title: "风险评估",
      isShow: false,
      isFinish: false,
      tableData: [
        {
          id: 1,
          project: "企业性质分类",
          type: "针对企业类别",
          subentry: "生产（危险化学品生产企业）Ⅰ类A、B、C、级",
          nowManage: "3.2",
          Hidden: "是",
          Total: "",
          remark: "备注备注"
        },
        {
          id: 2,
          project: "企业性质分类",
          type: "针对企业类别",
          subentry: "使用（兰炭及配套企业）Ⅱ类A、B、C、级",
          nowManage: "3.2",
          Hidden: "是",
          Total: "",
          remark: ""
        },
        {
          id: 3,
          project: "企业性质分类",
          type: "针对企业类别",
          subentry: "储存、经营（加油站）Ⅲ类A、B、C、级C、级",
          nowManage: "3.2",
          Hidden: "是",
          Total: "",
          remark: ""
        },
        {
          id: 4,
          project: "三同时执行情况",
          type: "针对改扩",
          subentry: "改扩建未执行",
          nowManage: "3.2",
          Hidden: "是",
          Total: "",
          remark: ""
        }
      ]
    };
  },
  created() {
    this.getData(this.tableData);
  },
  methods: {
    onEdit() {
      this.isShow = true;
      this.isFinish = true;
    },
    onComplete() {
      this.isShow = false;
      this.isFinish = false;
    },
    getData(list) {
      //console.log(list[0]);
      for (let field in list[0]) {
        var k = 0;
        while (k < list.length) {
          list[k][field + "span"] = 1;
          list[k][field + "dis"] = false;
          for (var i = k + 1; i <= list.length - 1; i++) {
            if (list[k][field] == list[i][field] && list[k][field] != "") {
              list[k][field + "span"]++;
              list[k][field + "dis"] = false;
              list[i][field + "span"] = 1;
              list[i][field + "dis"] = true;
            } else {
              break;
            }
          }
          k = i;
        }
      }
      return list;
    },
    get(){
      var url='http://172.16.8.21:7104/case/admin/case/detail'/* 6f57c09a-7263-4bcd-b7fa-5cab456ef136/client */
      Axios.defaults.headers['Authorization'] = localStorage.getItem("token")
      // Axios.get(url).then(res=>{
      //   console.info(res)
      // })
      Axios({
        method:'get',
        url:url,
        data:{
          case_id:'6f57c09a-7263-4bcd-b7fa-5cab456ef136',
          case_name:'client'
        }
      }).then(res=>{
        console.info(res)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.mybtn {
  margin: 10px 0px 0px 10px;
}
.btn_right {
  float: right;
}
.gridtable {
  border-collapse: collapse;
  width: 100%;
  thead > tr {
    background: #eef1f6;
    height: 40px;
    line-height: 40px;
  }
  th,
  td {
    border: 1px solid #dfe6ec;
    font-size: 14px;
    font-weight: normal;
  }
  .w {
    width: 120px;
  }
  tbody > tr {
    height: 50px;
    line-height: 50px;
    &:hover {
      background: #eef1f6;
    }
    td {
      padding: 0 10px;
    }
  }
}
.hidden {
  display: none;
}
</style>