<template>
  <div class="power">
    <div class="power-header">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: 700;">卡片名称</span>
        </div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="查询：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="案件状态：">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">进行中</el-radio>
              <el-radio :label="2">已完成</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="案件类型：">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="案件参与人：">
            <el-select
              v-model="value10"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户品牌：">
            <el-select
              v-model="value10"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="案件时间：">
            <el-col :span="6">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item class="display:flex;justify-content:flex-end">
            <el-button type="primary" @click="onSubmit">立即搜索</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="power-footer">
      <el-card>
        <div class="table">
          <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 案件列表
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="container">
            <div class="handle-box">
              <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
              <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
              </el-select>
              <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
              <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table
              :data="tableData"
              border
              class="table"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              :default-sort = "{prop: 'openDate'}"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="caseNo" label="案件号" sortable width="150"></el-table-column>
              <el-table-column prop="caseName" label="案件名称" width="120"></el-table-column>
              <el-table-column prop="openDate" label="立案时间" width="120" :formatter="formatter"></el-table-column>
              <el-table-column prop="brands" label="客户品牌" width="120"></el-table-column>
              <el-table-column prop="clientCaseNo" label="客户案件号" width="120"></el-table-column>
              <el-table-column prop="participants" label="案件参与人" ></el-table-column>
              <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="toPathid()"
                  >查看</el-button>
                  <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
                  <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="1000"
              ></el-pagination>
            </div>
          </div>

          <!-- 编辑弹出框 -->
          <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
              <el-form-item label="日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
          </el-dialog>

          <!-- 删除提示框 -->
          <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="delVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="tab-div" style="display:none">
          <div>
            <el-table
              ref="multipleTable"
              :data="data1"
              style="width:240px;border: 1px solid #ebeef5;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column label="基本信息" width="119px" prop="name" align="center"></el-table-column>
              <el-table-column type="selection" width="119px" align="center"></el-table-column>
            </el-table>
          </div>
          <div>
            <el-table
              ref="multipleTable"
              :data="data1"
              style="width:240px;border: 1px solid #ebeef5;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column label="基本信息" width="119px" prop="name" align="center"></el-table-column>
              <el-table-column type="selection" width="119px" align="center"></el-table-column>
            </el-table>
          </div>
          <div>
            <el-table
              ref="multipleTable"
              :data="data1"
              style="width:240px;border: 1px solid #ebeef5;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column label="基本信息" width="119px" prop="name" align="center"></el-table-column>
              <el-table-column type="selection" width="119px" align="center"></el-table-column>
            </el-table>
          </div>
          <div>
            <el-table
              ref="multipleTable"
              :data="data1"
              style="width:240px;border: 1px solid #ebeef5;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column label="基本信息" width="119px" prop="name" align="center"></el-table-column>
              <el-table-column type="selection" width="119px" align="center"></el-table-column>
            </el-table>
          </div>
          <div>
            <el-table
              ref="multipleTable"
              :data="data1"
              style="width:240px;border: 1px solid #ebeef5;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column label="基本信息" width="119px" prop="name" align="center"></el-table-column>
              <el-table-column type="selection" width="119px" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        status: 1,
        input: "12311"
      },
      options5: [
        {
          value: "HTML",
          label: "HTML"
        },
        {
          value: "CSS",
          label: "CSS"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        }
      ],
      data1: [
        {
          date: "2016-05-03",
          name: "案件ID",
          val: "id"
        },
        {
          date: "2016-05-02",
          name: "案件状态",
          address: "status"
        },
        {
          date: "2016-05-04",
          name: "优先级",
          address: "priority"
        },
        {
          date: "2016-05-01",
          name: "案件类型",
          address: "type"
        },
        {
          date: "2016-05-08",
          name: "案件号",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "案件名称",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "当前参与人",
          address: "currentParticipants"
        }
      ],
      value10: [],
      tags: [
        "denghao",
        "xiaowang",
        "zhangsan"
        // { name: "标签一" },
        // { name: "标签二" },
        // { name: "标签三" },
        // { name: "标签四" },
        // { name: "标签五" }
      ],

      /* 表单 */
      url: "./static/vuetable.json",
      tableData: [{
        caseNo:'T168',caseName:'21313',openDate:131213000,brands:'Cat',clientCaseNo:'你好',participants:'张三，王宇'
      },{
        caseNo:'T168',caseName:'21313',openDate:131213000,brands:'Cat',clientCaseNo:'你好',participants:'张三，王宇'
      }],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1
    };
  },
  created() {
    this.getData();
  },
  computed: {
    getinput() {
      this.$route.query.input;
    },
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClose(index) {
      this.tags.splice(this.tags.indexOf(this.tags[index]), 1);
    },
    addUser() {
      console.info(111);
    },
    onEnter(val) {
      this.tags.push(val);
    },
    handleSelectionChange(val) {
      console.info(val);
    },
    /* 表单 */
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      //开发环境使用 easy-mock 数据，正式环境使用 json 文件
      // if (process.env.NODE_ENV === "development") {
      //   this.url = "/ms/table/list";
      // }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          console.info(res)
          this.tableData = res.data.list;
        });
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      console.info(index)
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  }
};
</script>


<style lang="less" scoped>
.el-input-group__prepend {
  padding: 5px !important;
}
.el-input-group {
  padding: 0px;
}
.tag {
  box-sizing: border-box;
  display: flex;
  background: #fff;
  & > div {
    padding: 0px;
  }
}
.power {
  padding: 10px;
  .power-header {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 40px;
  }
  .power-footer {
    text-align: center;
    width: 80%;
    margin: 0 auto;
  }
}
.tab-div {
  display: flex;
  justify-content: space-around;
}

/* 表单 */
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.el-input__inner {
     border: 1px solid #dcdfe6;border-radius: 4px;
  }
</style>
