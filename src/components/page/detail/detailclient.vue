<template>
  <div>
    <el-card>
      <form action :model="clientInfo" v-if="clientInfo">
        <div class="clearfix btn-border">
          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="updateC(clientInfo)"
          >更新信息</el-button>
        </div>
        <table class="ntable">
          <p v-show="false" v-if="clientInfo.id"></p>
          <tr>
            <td class="tb" width="20%">客户案件号</td>
            <td width="30%">
              <el-input v-model="clientInfo.clientCaseNo"></el-input>
            </td>
            <td class="tb" width="20%">客户品牌</td>
            <td width="30%">
              <el-input v-model="clientInfo.brands"></el-input>
            </td>
          </tr>
          <tr>
            <td class="tb" width="20%">客户指示</td>
            <td width="30%">
              <el-input v-model="clientInfo.instructions"></el-input>
            </td>
            <td class="tb" width="20%">授权日期</td>
            <td width="30%">
              <el-date-picker
                v-model="clientInfo.authorizeDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td class="tb" width="20%">上传文书</td>
            <td width="30%">
              <span>
                名称:{{clientInfo.documents[0].documentName}}
                <el-button @click="readPath(clientInfo.documents[0].documentPath)" size="mini">预览文件</el-button>
                <el-button @click="diaClientDoc=true" size="mini">添加</el-button>
              </span>
              <el-popover trigger="click" width="800" placement="right">
                <table class="ntable" v-for="(item,index) in clientInfo.documents" :key="index">
                  <tr>
                    <td width="35%">文书名称</td>
                    <td width="65%">
                      <el-input v-model="item.documentName"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td width="35%">出具时间</td>
                    <td width="65%">
                      <el-date-picker
                        v-model="item.issueDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%;"
                      ></el-date-picker>
                    </td>
                  </tr>
                  <tr>
                    <td width="35%">扫描文件</td>
                    <td width="65%">
                      <el-button @click="readPath(item.documentPath)" size="mini">预览</el-button>
                    </td>
                  </tr>
                  <tr>
                    <td width="35%">文书内容</td>
                    <td width="65%">
                      <el-input v-model="item.content"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td width="35%">收到时间</td>
                    <td width="65%">
                      <el-date-picker
                        v-model="item.receiveDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%;"
                      ></el-date-picker>
                    </td>
                  </tr>
                  <tr>
                    <td width="35%">邮寄时间</td>
                    <td width="65%">
                      <el-date-picker
                        v-model="item.sendDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%;"
                      ></el-date-picker>
                    </td>
                  </tr>

                  <tr>
                    <td width="35%">附件</td>
                    <td width="65%">
                      <div class="ntable" v-for="(items,index) in item.attachments" :key="index">
                        <div>
                          {{index+1}} {{items.attachmentName}}
                          <el-button @click="readPath(items.attachmentPath)" size="mini">预览文件</el-button>
                        </div>
                      </div>

                      <el-button @click="diaClient=true" size="mini">添加</el-button>
                      <el-dialog title="添加附件" :visible.sync="diaClient" append-to-body>
                        <div>
                          <el-form :model="clientAttCon">
                            <table class="ntable">
                              <tr>
                                <td width="35%">附件名称</td>
                                <td width="65%">
                                  <el-input v-model="clientAttCon.attachmentName"></el-input>
                                </td>
                              </tr>
                              <tr>
                                <td width="35%">附件类型</td>
                                <td width="65%">
                                  <el-select
                                    placeholder="请选择"
                                    v-model="clientAttCon.attachmentType"
                                    style="width: 100%;"
                                  >
                                    <el-option label="请输入" value></el-option>
                                    <el-option label="音频" value="音频"></el-option>
                                    <el-option label="视频" value="视频"></el-option>
                                    <el-option label="文档" value="文档"></el-option>
                                    <el-option label="照片" value="照片"></el-option>
                                    <el-option label="其他" value="其他"></el-option>
                                  </el-select>
                                </td>
                              </tr>
                              <tr>
                                <td width="35%">附件路径</td>
                                <td width="65%">
                                  <p>{{clientAttCon.attachmentPath}}</p>
                                  <input type="file" @change="uploadf($event)" ref="pathClear">
                                </td>
                              </tr>
                              <tr>
                                <td width="35%">备注</td>
                                <td width="65%">
                                  <el-input v-model="clientAttCon.note"></el-input>
                                </td>
                              </tr>
                            </table>
                          </el-form>
                        </div>
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="diaClient = false">取 消</el-button>
                          <el-button type="primary" @click="addCliAtt(clientAttCon)">添 加</el-button>
                        </div>
                      </el-dialog>
                    </td>
                  </tr>
                  <tr>
                    <td width="35%">备注</td>
                    <td width="65%">
                      <el-input v-model="item.note"></el-input>
                    </td>
                  </tr>
                </table>
                <el-button slot="reference" size="mini">详情</el-button>
              </el-popover>

              <el-dialog title="添加法律文书" :visible.sync="diaClientDoc">
                <div>
                  <el-form :model="documentForm" ref="documentForm">
                    <table class="ntable">
                      <tr>
                        <td width="35%">文书名称</td>
                        <td width="65%">
                          <el-input v-model="documentForm.documentName"></el-input>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">出具时间</td>
                        <td width="65%">
                          <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="documentForm.issueDate"
                            style="width: 100%;"
                          ></el-date-picker>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">文件路径</td>
                        <td width="65%">
                          <p>{{documentForm.documentPath}}</p>
                          <input type="file" @change="uploadz($event)" ref="pathClear">
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">文书内容</td>
                        <td width="65%">
                          <el-input v-model="documentForm.content"></el-input>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">收到时间</td>
                        <td width="65%">
                          <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="documentForm.receiveDate"
                            style="width: 100%;"
                          ></el-date-picker>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">附件</td>
                        <td>
                          <table
                            class="ntable"
                            v-for="(item,index) in documentForm.attachments"
                            :key="index"
                          >
                            <tr>
                              <td>附件名称</td>
                              <td>{{item.attachmentName}}</td>
                            </tr>
                            <tr>
                              <td>附件类型</td>
                              <td>{{item.attachmentType}}</td>
                            </tr>
                            <tr>
                              <td>附件路径</td>
                              <td>{{item.attachmentPath}}</td>
                            </tr>
                            <tr>
                              <td>备注</td>
                              <td>{{item.note}}</td>
                            </tr>
                            <el-button @click="delAtt(index)">删除以上信息</el-button>
                          </table>
                          <el-button @click="dialogAtt = true">添加附件</el-button>

                          <el-dialog title="添加附件" :visible.sync="dialogAtt" append-to-body>
                            <div>
                              <el-form :model="attForm">
                                <table class="ntable">
                                  <tr>
                                    <td width="35%">附件名称</td>
                                    <td width="65%">
                                      <el-input v-model="attForm.attachmentName"></el-input>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">附件类型</td>
                                    <td width="65%">
                                      <el-select
                                        placeholder="请选择"
                                        v-model="attForm.attachmentType"
                                        style="width: 100%;"
                                      >
                                        <el-option label="请输入" value></el-option>
                                        <el-option label="音频" value="音频"></el-option>
                                        <el-option label="视频" value="视频"></el-option>
                                        <el-option label="文档" value="文档"></el-option>
                                        <el-option label="照片" value="照片"></el-option>
                                        <el-option label="其他" value="其他"></el-option>
                                      </el-select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">附件路径</td>
                                    <td width="65%">
                                      <p>{{attForm.attachmentPath}}</p>
                                      <input type="file" @change="uploadf($event)" ref="pathClear">
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="35%">备注</td>
                                    <td width="65%">
                                      <el-input v-model="attForm.note"></el-input>
                                    </td>
                                  </tr>
                                </table>
                              </el-form>
                            </div>
                            <div slot="footer" class="dialog-footer">
                              <el-button @click="dialogAtt = false">取 消</el-button>
                              <el-button type="primary" @click="attFormadd(attForm)">添 加</el-button>
                            </div>
                          </el-dialog>
                        </td>
                      </tr>

                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="documentForm.note"></el-input>
                        </td>
                      </tr>
                    </table>
                  </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click=" diaClientDoc = false">取 消</el-button>
                  <el-button type="primary" @click="documentadd(documentForm)">添 加</el-button>
                </div>
              </el-dialog>
            </td>
            <td class="tb" width="20%"></td>
            <td width="30%"></td>
          </tr>
        </table>
      </form>
    </el-card>
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
    <el-button @click="getObj"></el-button>
  </div>
</template>


<script>
import {
  _postUpload,
  _updateCaseS,
  _updateCaseA,
  _updateCaseR
} from "../../../services/service.js";

export default {
  data() {
    return {
      clientInfo: null,
      completeTask: null,
      diaClient: false,
      diaClientDoc: false,
      dialogComplete: false,
      dialogAtt: false,

      documentForm: {
        documentNo: null,
        documentName: null,
        documentType: null,
        issueDate: null,
        documentPath: null,
        content: null,
        receiveDate: null,
        sendDate: null,
        attachments: [],
        note: null
      },

      attForm: {
        attachmentName: null,
        attachmentType: null,
        attachmentPath: null,
        note: null
      },

      clientAttCon: {
        attachmentPath: null,
        attachmentType: null,
        id: null,
        note: null
      },
      takeObj: {
        case_id: null,
        case_type: null
      }
    };
  },
  created() {
    this.clientInfo = this.$route.params.obj;
    this.user_role = sessionStorage.user_role;
    this.takeObj = this.$route.params.takeObj;
  },
  methods: {
    getObj() {
      console.info(this.$route.params.obj);
      console.info(this.$route.params.takeObj);
    },
    readPath(src) {
      this.completeTask =
        "http://172.16.5.240:8083/fileConventer?filePath=http://172.16.6.228:7104/case/file/" +
        src;
      this.dialogComplete = true;
    },
    updateC(item) {
      debugger;
      if (this.user_role === "Admin") {
        _updateCaseA(this.takeObj, item)
          .then(res => {
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.$router.push({
              name: "detailpages",
              params: {
                takeObj: this.takeObj
              }
            });
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "更新有误，回到首页",
              type: "error"
            });
          });
      } else if (this.user_role === "Supervisor") {
        _updateCaseS(this.takeObj, item)
          .then(res => {
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.$router.push({ name: "detailpages" });
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "更新有误，回到首页",
              type: "error"
            });
          });
      } else if (this.user_role === "ReportingStaff") {
        _updateCaseR(this.takeObj, item)
          .then(res => {
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.$router.push({ name: "detailpages" });
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "更新有误，回到首页",
              type: "error"
            });
          });
      }
    },
    /* 上传 */
    uploadz(event) {
      this.$confirm("是否上传文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var obj = { file: event.target.files[0] };
          _postUpload(obj).then(res => {
            this.documentForm.documentPath = res;
            this.$refs.pathClear.value = null;
            this.$message({
              type: "success",
              message: "上传成功"
            });
          });
        })
        .catch(() => {
          this.$refs.pathClear.value = null;
          this.$message({
            type: "info",
            message: "取消上传"
          });
        });
    },
    uploadf(event) {
      this.$confirm("是否上传文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var obj = { file: event.target.files[0] };
          _postUpload(obj).then(res => {
            this.attForm.attachmentPath = res;
            this.$refs.pathClear.value = null;
            this.$message({
              type: "success",
              message: "上传成功"
            });
          });
        })
        .catch(() => {
          this.$refs.pathClear.value = null;
          this.$message({
            type: "info",
            message: "取消上传"
          });
        });
    },
    attFormadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.documentForm.attachments.push(obj);
      //   this.dialogAtt = false;
    },
    documentadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.clientInfo.documents.push(obj);
      //   this.dialogFormVisible = false;
    },
    addCliAtt(item) {
      console.info(item);
    }
  }
};
</script>

<style lang="less" scoped>
.ntable {
  width: 100%;
  margin: 0 auto;
  margin: 10px 0;
  td {
    padding: 5px;
    border: #e4eef6 1px solid;
    word-break: break-all;
    font-size: 14px;
    line-height: 19px;
    color: #222;
  }
  .tb {
    background: #f2f9fc;
  }
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}

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
</style>


