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
            <el-col :span="4">
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
        <div class="tab-div">
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
      ]
    };
  },
  created() {},
  computed: {
    getinput() {
      this.$route.query.input;
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
</style>
