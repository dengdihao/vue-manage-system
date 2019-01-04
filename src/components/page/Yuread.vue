<template>
  <div>
    <el-dialog
      id="completeDialog"
      title="预览文件"
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
  </div>
</template>

<script>
import Axios from 'axios';
import { _getFile } from '../../services/service';

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
        ""
   ,img:''
   };
  },
  methods: {
    open() {
      this.completeTask =
        "http://view.officeapps.live.com/op/view.aspx?src="+res;
    },
    complete(index, row) {
      console.info(11);
      // this.completeTask =
      //   "http://view.officeapps.live.com/op/view.aspx?src=http://172.16.6.228:7104/case/file/group1/M00/00/07/rBAFmlwnKZuAQvX9AAK6bBrVowo493.jpg";

      // console.info(this.$refs.completeDiv);
      /* group1/M00/00/07/rBAFmlwt8WaAMGMdAAl6sGucaHQ846.pdf
      group1/M00/00/07/rBAFmlwt8VqAGFASAABnOi7HiRQ76.xlsx 
      group1/M00/00/08/rBAFmlwt9JuAaFnLAAAxvU39Vqo62.docx*/
      this.completeTask="http://172.16.5.240:8083/fileConventer?filePath=http://172.16.6.228:7104/case/file/group1/M00/00/07/rBAFmlwt8WaAMGMdAAl6sGucaHQ846.pdf"; 
        this.dialogComplete = true;
      
      // var obj={file:"group1/M00/00/07/rBAFmlwnKZuAQvX9AAK6bBrVowo493.jpg"}
      // _getFile(obj).then(res=>{
      //   console.info(res)
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
