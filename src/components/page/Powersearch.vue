<template>
  <div class="power">
    <div class="power-header">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: 700;">搜索案件</span>
        </div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="关键词：">
            <el-input v-model="form.keyword"></el-input>
          </el-form-item>
          <el-form-item label="网址：">
            <el-input v-model="form.website"></el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="优先级：">
            <el-select placeholder="请选择" v-model="form.priority">
              <el-option label="紧急" value="紧急"></el-option>
              <el-option label="高" value="高"></el-option>
              <el-option label="一般" value="一般"></el-option>
              <el-option label="低" value="低"></el-option>
              <el-option label="不重要" value="不重要"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="案件状态：">
            <el-select placeholder="请选择" v-model="form.status">
              <el-option label="进行中" value="进行中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="未开始" value="未开始"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="打开时间范围：">
            <el-date-picker
              v-model="form.open"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
            {{form.open}}
          </el-form-item>
          <el-form-item label="关闭时间范围：">
            <el-date-picker
              v-model="form.close"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
            {{form.close}}
          </el-form-item>
          <el-form-item label="打开时间点：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.openDate"
              style="width: 100%;"
              value-format="timestamp"
            ></el-date-picker>
            {{form.date1}}
          </el-form-item>
          <el-form-item label="关闭时间点：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.closeDate"
              style="width: 100%;"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="display:flex;justify-content:flex-end">
            <el-button type="primary" @click="onSubmit">立即搜索</el-button>
            <el-button>取消</el-button>
          </el-form-item>
          <el-form-item></el-form-item>
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
            <el-table
              :data="currentPageData"
              border
              class="table"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              :default-sort="{prop: 'openDate'}"
              @row-click="openDetails"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="caseNo" label="案件号" sortable width="150"></el-table-column>
              <el-table-column prop="caseName" label="案件名称" width="120"></el-table-column>
              <el-table-column prop="openDate" label="立案时间" width="200"></el-table-column>
              <el-table-column prop="brands" label="客户品牌"></el-table-column>
              <el-table-column prop="clientCaseNo" label="客户案件号" width="120"></el-table-column>
              <!-- <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-edit" @click="toPathid()">查看</el-button>
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
              </el-table-column> -->
            </el-table>
            <div class="pagination">
              <el-button @click="prevPage()">上一页</el-button>
              <span>第 {{currentPage}} 页/共 {{totalPages}} 页</span>
              <el-button @click="nextPage()">下一页</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { _postsearchA,_postsearchS,_postsearchR } from "../../services/service.js";
export default {
  data() {
    return {
      // startOpen:122222222222,
      // endOpen:null,
      form: {
        keyword: null,
        website: null,
        phone: null,
        email: null,
        priority: null,
        status: null,
        open: null,
        close: null,
        openDate: null,
        closeDate: null
      },
      user_role:'',//角色信息
      /* 表单 */
      tableData: [],
      totalPage: null, // 统共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 10, // 每页显示数量
      currentPageData: [], //当前页显示内容
      cur_page: 1
    };
  },
  created() {
    this.getUserRole();
    this.user_role=sessionStorage.getItem("user_role")
  },
  computed: {
    totalPages() {
      // 计算一共有几页
      (this.totalPage = Math.ceil(this.tableData.length / this.pageSize)),
        // 计算得0时设置为1
        (this.totalPage = this.totalPage == 0 ? 1 : this.totalPage),
        this.getCurrentPageData();
      return this.totalPage;
    }
  },
  methods: {
    /* 获取用户权限 */
    getUserRole() {
      const user_role = sessionStorage.getItem("user_role");
      if (!user_role) {
        this.$message({
          showClose: true,
          message: "你没有权限，请重新登陆",
          type: "error"
        });
        this.$router.push("/login");
      }
      if (user_role === "FinancialController" || user_role === "Financial") {
        this.$message({
          showClose: true,
          message: "你权限不够",
          type: "error"
        });
        this.$router.push("/");
      }
    },
    onSubmit() {
      var obj = new Object();
      obj = this.form;
      if (!obj.open) {
        obj.startOpen = null;
        obj.endOpen = null;
        delete obj.open;
      } else if (obj.open) {
        obj.startOpen = obj.open[0];
        obj.endOpen = obj.open[1];
        delete obj.open;
      }
      if (!obj.close) {
        obj.startClose = null;
        obj.endClose = null;
        delete obj.open;
      } else {
        obj.startClose = obj.close[0];
        obj.endClose = obj.close[1];
        delete obj.close;
      }
      if (this.user_role === "Admin") {
        _postsearchA(obj)
        .then(res => {
          this.tableData = res.data;
          console.info(res);
          if (res.msg === "查询成功") {
            if (res.data.length === 0) {
              this.$message({
                showClose: true,
                message: "查询null",
                type: "err"
              });
            } else {
              this.$message({
                showClose: true,
                message: "恭喜你，查询成功",
                type: "success"
              });
            }
          } else {
            this.$message({
              showClose: true,
              message: "查询失败",
              type: "err"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          });
        });
      }else if (this.user_role === "Supervisor") {
        _postsearchS(obj)
        .then(res => {
          this.tableData = res.data;
          console.info(res);
          if (res.msg === "查询成功") {
            if (res.data.length === 0) {
              this.$message({
                showClose: true,
                message: "查询null",
                type: "err"
              });
            } else {
              this.$message({
                showClose: true,
                message: "恭喜你，查询成功",
                type: "success"
              });
            }
          } else {
            this.$message({
              showClose: true,
              message: "查询失败",
              type: "err"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          });
        });
      }else if (this.user_role === "ReportingStaff") {
        _postsearchR(obj)
        .then(res => {
          this.tableData = res.data;
          console.info(res);
          if (res.msg === "查询成功") {
            if (res.data.length === 0) {
              this.$message({
                showClose: true,
                message: "查询null",
                type: "err"
              });
            } else {
              this.$message({
                showClose: true,
                message: "恭喜你，查询成功",
                type: "success"
              });
            }
          } else {
            this.$message({
              showClose: true,
              message: "查询失败",
              type: "err"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          });
        });
      }
      
    },
    getCurrentPageData() {
      this.currentPageData = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    //上一页
    prevPage() {
      console.log(this.currentPage);
      if (this.currentPage == 1) {
        return false;
      } else {
        this.currentPage--;
        this.getCurrentPageData();
      }
    },
    // 下一页
    nextPage() {
      if (this.currentPage == this.totalPage) {
        return false;
      } else {
        this.currentPage++;
        this.getCurrentPageData();
      }
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

    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
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
    },

    /* 点击跳转 */
    openDetails(row) {
      console.info(row.id);
      this.$router.push({
        name: "detailpages",
        params: {
          id: row.id
        }
      });
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
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
