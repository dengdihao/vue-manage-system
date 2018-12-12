<template>
  <div>
    <el-dialog
      id="completeDialog"
      title="办理任务"
      :visible.sync="dialogComplete"
      width="95%"
      height="100%"
      top="5px"
      fullscreen
    >
      <div id="completeDiv" ref="completeDiv" class="completeDiv">
        <iframe :src="completeTask" class="iframe" height="100%"></iframe>
      </div>
    </el-dialog>
    <el-button @click="complete()">预览</el-button>
    <!-- http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf -->
    <!-- https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc -->
    <!-- http://view.officeapps.live.com/op/view.aspx?src=http://video.ch9.ms/build/2011/slides/TOOL-532T_Sutter.pptx -->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      dialogComplete: false,
      completeTask:
        "http://view.officeapps.live.com/op/view.aspx?src=http://video.ch9.ms/build/2011/slides/TOOL-532T_Sutter.pptx&embedded=true"
    };
  },
  methods: {
    open() {
      this.completeTask =
        "http://view.officeapps.live.com/op/view.aspx?src=http://video.ch9.ms/build/2011/slides/TOOL-532T_Sutter.pptx";
    },
    complete(index, row) {
      console.info(11);
      this.completeTask =
        "http://view.officeapps.live.com/op/view.aspx?src=http://video.ch9.ms/build/2011/slides/TOOL-532T_Sutter.pptx&embedded=true";

      console.info(this.$refs.completeDiv);

      this.dialogComplete = true;
    },
    /* val tab 里面的每一个对象 */
    handleSelectionChange(val) {
      console.info(val);
    }
  }
};
</script>

<style lang="less" scoped>
.iframe {
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.completeDiv {
  position: absolute;
  top: 54px;
  bottom: 0px;
  left: 0;
  right: 0;
  height: 90%;
  padding: 5px;
}
.tab-div {
  display: flex;
  justify-content: space-around;
}
</style>
