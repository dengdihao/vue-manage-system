
<template>
  <el-card>
    <div class="detail-header clearfix" slot="header">
      <div class="border-bottom"></div>
      <ul class="detail-div">
        <li v-for="(item,index) in stage" :key="index">
          <div class="detail-ul-content">{{item.stagename}}</div>
          <!-- div 锚点跳转 -->
          <div
            class="detail-ul-icon"
            :class="{colorred:item.isshow,colorgreen:item.isshowg}"
            @click="returnTop(item.id)"
          ></div>
        </li>
      </ul>
    </div>

    <el-tabs>
      <el-dialog title="消息提醒" :visible.sync="dialogFormVisible">
        <el-form :model="news" class="news">
          <el-form-item label="消息内容" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="消息时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="news.date"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitnews(news)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 案件基本信息 -->
      <el-tab-pane label="案件流程">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="接洽阶段" name="1" v-model="discoverer" v-if="discoverer">
            <div class="clearfix btn-border">
              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="bianji()"
              >编辑</el-button>

              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="add()"
              >新建</el-button>

              <!-- 消息对话框 -->
              <el-button
                class="detail-btn"
                @click="dialogFormVisible = true"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
              >新建消息</el-button>
            </div>
            <table class="ntable">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">{{discoverer[0].name}}</td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">{{discoverer[0].progress}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">汇报日期</td>
                <td width="30%">{{discoverer[0].reportDate}}</td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">{{discoverer[0].contacts}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="400" placement="right">
                    <table class="ntable">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">{{discoverer[0].reports[0].submitDate}}</td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">{{discoverer[0].reports[0].reportType}}</td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">{{discoverer[0].reports[0].reportContent}}</td>
                      </tr>
                      <tr>
                        <td width="35%">文件</td>
                        <td width="65%">{{discoverer[0].reports[0].reportPath}}</td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">{{discoverer[0].reports[0].note}}</td>
                      </tr>
                    </table>
                    <el-button slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">附件</td>
                <td width="30%">
                  <el-popover trigger="click" width="400" placement="right">
                    <table class="ntable">
                      <tr>
                        <td width="35%">附件名称</td>
                        <td width="65%">{{discoverer[0].attachments[0].attachmentName}}</td>
                      </tr>
                      <tr>
                        <td width="35%">附件类型</td>
                        <td width="65%">{{discoverer[0].attachments[0].attachmentType}}</td>
                      </tr>
                      <tr>
                        <td width="35%">附件路径</td>
                        <td width="65%">{{discoverer[0].attachments[0].attachmentPath}}</td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">{{discoverer[0].attachments[0].note}}</td>
                      </tr>
                    </table>
                    <el-button slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">备注</td>
                <td width="30%">{{discoverer[0].note}}</td>
                <td class="tb" width="20%"></td>
                <td width="30%"></td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="调查阶段" name="2" v-model="investigator" v-if="investigator">
            <div class="clearfix btn-border">
              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="bianji()"
              >编辑</el-button>

              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="add()"
              >新建</el-button>

              <!-- 消息对话框 -->
              <el-button
                class="detail-btn"
                @click="dialogFormVisible = true"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
              >新建消息</el-button>
            </div>
            <table class="ntable">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">{{investigator[0].name}}</td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">{{investigator[0].progress}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">汇报日期</td>
                <td width="30%">{{investigator[0].appointDate}}</td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">{{investigator[0].contacts}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="400" placement="right">
                    <table class="ntable">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">{{investigator[0].reports[0].submitDate}}</td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">{{investigator[0].reports[0].reportType}}</td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">{{investigator[0].reports[0].reportContent}}</td>
                      </tr>
                      <tr>
                        <td width="35%">文件</td>
                        <td width="65%">{{investigator[0].reports[0].reportPath}}</td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">{{investigator[0].reports[0].note}}</td>
                      </tr>
                    </table>
                    <el-button slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">附件</td>
                <td width="30%">
                  <el-popover trigger="click" width="400" placement="right">
                    <table class="ntable">
                      <tr>
                        <td width="35%">附件名称</td>
                        <td width="65%">{{investigator[0].attachments[0].attachmentName}}</td>
                      </tr>
                      <tr>
                        <td width="35%">附件类型</td>
                        <td width="65%">{{investigator[0].attachments[0].attachmentType}}</td>
                      </tr>
                      <tr>
                        <td width="35%">附件路径</td>
                        <td width="65%">{{investigator[0].attachments[0].attachmentPath}}</td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">{{investigator[0].attachments[0].note}}</td>
                      </tr>
                    </table>
                    <el-button slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">备注</td>
                <td width="30%">{{investigator[0].note}}</td>
                <td class="tb" width="20%"></td>
                <td width="30%"></td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="报告阶段" name="3" v-model="reports" v-if="reports">
            <div class="clearfix btn-border">
              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="bianji()"
              >编辑</el-button>

              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="add()"
              >新建</el-button>

              <!-- 消息对话框 -->
              <el-button
                class="detail-btn"
                @click="dialogFormVisible = true"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
              >新建消息</el-button>
            </div>
            <table class="ntable">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">{{reports[0].name}}</td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">{{reports[0].progress}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">汇报日期</td>
                <td width="30%">{{reports[0].appointDate}}</td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">{{reports[0].contacts}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="400" placement="right">
                    <table class="ntable">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">{{reports[0].report.submitDate}}</td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">{{reports[0].report.reportType}}</td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">{{reports[0].report.reportContent}}</td>
                      </tr>
                      <tr>
                        <td width="35%">文件</td>
                        <td width="65%">{{reports[0].report.reportPath}}</td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">{{reports[0].report.note}}</td>
                      </tr>
                    </table>
                    <el-button slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">附件</td>
                <td width="30%">
                  <el-popover trigger="click" width="400" placement="right">
                    <table class="ntable">
                      <tr>
                        <td width="35%">附件名称</td>
                        <td width="65%">{{reports[0].attachments[0].attachmentName}}</td>
                      </tr>
                      <tr>
                        <td width="35%">附件类型</td>
                        <td width="65%">{{reports[0].attachments[0].attachmentType}}</td>
                      </tr>
                      <tr>
                        <td width="35%">附件路径</td>
                        <td width="65%">{{reports[0].attachments[0].attachmentPath}}</td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">{{reports[0].attachments[0].note}}</td>
                      </tr>
                    </table>
                    <el-button slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">备注</td>
                <td width="30%">{{reports[0].note}}</td>
                <td class="tb" width="20%"></td>
                <td width="30%"></td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="法务阶段" name="4" v-model="raider" v-if="raider">
            <div class="clearfix btn-border">
              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="bianji()"
              >编辑</el-button>

              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="add()"
              >新建</el-button>

              <!-- 消息对话框 -->
              <el-button
                class="detail-btn"
                @click="dialogFormVisible = true"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
              >新建消息</el-button>
            </div>
            <table class="ntable">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">{{raider[0].name}}</td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">{{raider[0].progress}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">汇报日期</td>
                <td width="30%">{{raider[0].appointDate}}</td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">{{raider[0].contacts}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="400" placement="right">
                    <table class="ntable">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">{{raider[0].reports[0].submitDate}}</td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">{{raider[0].reports[0].reportType}}</td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">{{raider[0].reports[0].reportContent}}</td>
                      </tr>
                      <tr>
                        <td width="35%">文件</td>
                        <td width="65%">{{raider[0].reports[0].reportPath}}</td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">{{raider[0].reports[0].note}}</td>
                      </tr>
                    </table>
                    <el-button slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">附件</td>
                <td width="30%">
                  <el-popover trigger="click" width="400" placement="right">
                    <table class="ntable">
                      <tr>
                        <td width="35%">附件名称</td>
                        <td width="65%">{{raider[0].attachments[0].attachmentName}}</td>
                      </tr>
                      <tr>
                        <td width="35%">附件类型</td>
                        <td width="65%">{{raider[0].attachments[0].attachmentType}}</td>
                      </tr>
                      <tr>
                        <td width="35%">附件路径</td>
                        <td width="65%">{{raider[0].attachments[0].attachmentPath}}</td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">{{raider[0].attachments[0].note}}</td>
                      </tr>
                    </table>
                    <el-button slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">备注</td>
                <td width="30%">{{raider[0].note}}</td>
                <td class="tb" width="20%"></td>
                <td width="30%"></td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="诉讼阶段" name="5" v-model="litigator" v-if="litigator">
            <div class="clearfix btn-border">
              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="bianji()"
              >编辑</el-button>

              <el-button
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="add()"
              >新建</el-button>

              <!-- 消息对话框 -->
              <el-button
                class="detail-btn"
                @click="dialogFormVisible = true"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
              >新建消息</el-button>
            </div>
            <table class="ntable">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">{{litigator[0].name}}</td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">{{litigator[0].progress}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">汇报日期</td>
                <td width="30%">{{litigator[0].appointDate}}</td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">{{litigator[0].contacts}}</td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="400" placement="right">
                    <table class="ntable">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">{{litigator[0].reports[0].submitDate}}</td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">{{litigator[0].reports[0].reportType}}</td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">{{litigator[0].reports[0].reportContent}}</td>
                      </tr>
                      <tr>
                        <td width="35%">文件</td>
                        <td width="65%">{{litigator[0].reports[0].reportPath}}</td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">{{litigator[0].reports[0].note}}</td>
                      </tr>
                    </table>
                    <el-button slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">备注</td>
                <td width="30%">{{litigator[0].note}}</td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <!-- 案件信息 -->
      <el-tab-pane label="案件信息">
        <form :model="baseInfo" v-if="baseInfo">
          <div class="clearfix btn-border">
            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="bianji()"
            >编辑</el-button>

            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="add()"
            >新建</el-button>

            <!-- 消息对话框 -->
            <el-button
              class="detail-btn"
              @click="dialogFormVisible = true"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >新建消息</el-button>
          </div>
          <table class="ntable">
            <tr>
              <td class="tb" width="20%">案件ID</td>
              <td width="30%">{{baseInfo[0].id}}</td>
              <td class="tb" width="20%">案件状态</td>
              <td width="30%">{{baseInfo[0].status}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">优先级</td>
              <td width="30%">{{baseInfo[0].priority}}</td>
              <td class="tb" width="20%">案件类型</td>
              <td width="30%">{{baseInfo[0].type}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">案件号</td>
              <td width="30%">{{baseInfo[0].caseNo}}</td>
              <td class="tb" width="20%">案件名称</td>
              <td width="30%">{{baseInfo[0].caseName}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">当前参与人</td>
              <td width="30%">{{baseInfo[0].currentParticipants}}</td>
              <td class="tb" width="20%">案由</td>
              <td width="30%">{{baseInfo[0].reason}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">立案日期</td>
              <td width="30%">{{baseInfo[0].openDate}}</td>
              <td class="tb" width="20%">结案方式</td>
              <td width="30%">{{baseInfo[0].closeMode}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">结案日期</td>
              <td width="30%">{{baseInfo[0].closeDate}}</td>
              <td class="tb" width="20%">更新信息</td>
              <td width="30%">
                <el-popover trigger="click" width="400" placement="right">
                  <table class="ntable">
                    <tr>
                      <td width="35%">更新时间</td>
                      <td width="65%">{{baseInfo[0].updateInfo[0].updateTime}}</td>
                    </tr>
                    <tr>
                      <td width="35%">更新人</td>
                      <td width="65%">{{baseInfo[0].updateInfo[0].updatePerson}}</td>
                    </tr>
                    <tr>
                      <td width="35%">更新项目</td>
                      <td width="65%">{{baseInfo[0].updateInfo[0].item}}</td>
                    </tr>
                    <tr>
                      <td width="35%">更新内容</td>
                      <td width="65%">{{baseInfo[0].updateInfo[0].content}}</td>
                    </tr>
                    <tr>
                      <td width="35%">版本</td>
                      <td width="65%">{{baseInfo[0].updateInfo[0].version}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">备注</td>
              <td width="30%">{{baseInfo[0].note}}</td>
            </tr>
          </table>
        </form>
      </el-tab-pane>

      <!-- 客户信息 -->
      <el-tab-pane label="客户信息">
        <form action :model="clientInfo" v-if="clientInfo">
          <div class="clearfix btn-border">
            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="bianji()"
            >编辑</el-button>

            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="add()"
            >新建</el-button>

            <!-- 消息对话框 -->
            <el-button
              class="detail-btn"
              @click="dialogFormVisible = true"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >新建消息</el-button>
          </div>
          <table class="ntable">
            <tr>
              <td class="tb" width="20%">客户案件号</td>
              <td width="30%">{{clientInfo[0].clientCaseNo}}</td>
              <td class="tb" width="20%">客户品牌</td>
              <td width="30%">{{clientInfo[0].brands}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">客户指示</td>
              <td width="30%">{{clientInfo[0].instructions}}</td>
              <td class="tb" width="20%">授权日期</td>
              <td width="30%">{{clientInfo[0].authorizeDate}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">出具法律文书</td>
              <td width="30%">
                <el-popover trigger="click" width="400" placement="right">
                  <table class="ntable">
                    <tr>
                      <td width="35%">文书名称</td>
                      <td width="65%">{{clientInfo[0].documents[0].documentName}}</td>
                    </tr>
                    <tr>
                      <td width="35%">文书类型</td>
                      <td width="65%">{{clientInfo[0].documents[0].documentType}}</td>
                    </tr>
                    <tr>
                      <td width="35%">出具时间</td>
                      <td width="65%">{{clientInfo[0].documents[0].issueDate}}</td>
                    </tr>
                    <tr>
                      <td width="35%">扫描文件</td>
                      <td width="65%">{{clientInfo[0].documents[0].documentPath}}</td>
                    </tr>
                    <tr>
                      <td width="35%">文书内容</td>
                      <td width="65%">{{clientInfo[0].documents[0].content}}</td>
                    </tr>
                    <tr>
                      <td width="35%">收到时间</td>
                      <td width="65%">{{clientInfo[0].documents[0].receiveDate}}</td>
                    </tr>
                    <tr>
                      <td width="35%">邮寄时间</td>
                      <td width="65%">{{clientInfo[0].documents[0].sendDate}}</td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">{{clientInfo[0].documents[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%"></td>
              <td width="30%"></td>
            </tr>
          </table>
        </form>
      </el-tab-pane>

      <el-tab-pane label="目标信息">
        <form action :model="targetInfo" v-if="targetInfo">
          <div class="clearfix btn-border">
            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="bianji()"
            >编辑</el-button>

            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="add()"
            >新建</el-button>

            <!-- 消息对话框 -->
            <el-button
              class="detail-btn"
              @click="dialogFormVisible = true"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >新建消息</el-button>
          </div>
          <table class="ntable">
            <tr>
              <td class="tb" width="20%">目标名称</td>
              <td width="30%">{{targetInfo[0].targetName}}</td>
              <td class="tb" width="20%">目标类型</td>
              <td width="30%">{{targetInfo[0].targetType}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">工商注册号</td>
              <td width="30%">{{targetInfo[0].regNo}}</td>
              <td class="tb" width="20%">统一社会信用代码</td>
              <td width="30%">{{targetInfo[0].creditNo}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">目标地址</td>
              <td width="30%">{{targetInfo[0].targetAdd}}</td>
              <td class="tb" width="20%">目标联系方式</td>
              <!-- 目标网址	website		
目标电话	phone		
目标邮箱	email		
社交号	networks	社交工具	networkName
		号码	networkNo
		备注	note
备注	note		
              -->
              <td width="30%">
                <el-popover trigger="click" width="400" placement="right">
                  <table class="ntable">
                    <tr>
                      <td width="35%">目标网址</td>
                      <td width="65%" colspan="2">{{targetInfo[0].targetContacts[0].website}}</td>
                    </tr>
                    <tr>
                      <td width="35%">目标电话</td>
                      <td width="65%" colspan="2">{{targetInfo[0].targetContacts[0].phone}}</td>
                    </tr>
                    <tr>
                      <td width="35%">目标邮箱</td>
                      <td width="65%" colspan="2">{{targetInfo[0].targetContacts[0].email}}</td>
                    </tr>
                    <tr>
                      <td width="35%" rowspan="3">社交号</td>
                      <td>社交工具</td>
                      <td>{{targetInfo[0].targetContacts[0].networks[0].networkName}}</td>
                    </tr>
                    <tr>
                      <td>号码</td>
                      <td>{{targetInfo[0].targetContacts[0].networks[0].networkNo}}</td>
                    </tr>
                    <tr>
                      <td>备注</td>
                      <td>{{targetInfo[0].targetContacts[0].networks[0].note}}</td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%" colspan="2">{{targetInfo[0].targetContacts[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">目标人员</td>
              <td width="30%">{{targetInfo[0].targetPrincipal[0]}}</td>
              <td class="tb" width="20%">关联公司</td>
              <td width="30%">{{targetInfo[0].affiliateCompany[0]}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">目标产品信息</td>
              <td width="30%">{{targetInfo[0].productInfo[0]}}</td>
              <td class="tb" width="20%">备注</td>
              <td width="30%">{{targetInfo[0].note}}</td>
            </tr>
          </table>
        </form>
      </el-tab-pane>
      <el-tab-pane label="财务信息">
        <form :model="accounting" v-if="accounting">
          <div class="clearfix btn-border">
            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="bianji()"
            >编辑</el-button>

            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="add()"
            >新建</el-button>

            <!-- 消息对话框 -->
            <el-button
              class="detail-btn"
              @click="dialogFormVisible = true"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >新建消息</el-button>
          </div>
          <table class="ntable">
            <tr>
              <td class="tb" width="20%">保证金</td>
              <td width="30%">{{accounting[0].deposit}}</td>
              <td class="tb" width="20%">预付款</td>
              <td width="30%">{{accounting[0].advancePayment}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">退款</td>
              <td width="30%">{{accounting[0].refund}}</td>
              <td class="tb" width="20%">报销</td>
              <td width="30%">{{accounting[0].repay}}</td>
            </tr>
            <tr>
              <td class="tb" width="20%">发票</td>
              <td width="30%">{{accounting[0].invoice}}</td>
              <td class="tb" width="20%">备注</td>
              <td width="30%">{{accounting[0].note}}</td>
            </tr>
          </table>
        </form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>



<script>
import {
  _getpaticipants,
  _getbaseInfo,
  _getclientInfo,
  _gettargetInfo,
  _getaccounting
} from "../../services/service";

export default {
  data () {
    return {
      stage: [
        {
          stagename: "接洽阶段",
          isshow: false,
          isshowg: false,
          obj: "",
          id: "discoverer"
        },
        {
          stagename: "调查阶段",
          isshow: false,
          isshowg: false,
          obj: "",
          id: "investigator"
        },
        {
          stagename: "报告阶段",
          isshow: false,
          isshowg: false,
          obj: "",
          id: "reports"
        },
        {
          stagename: "法务阶段",
          isshow: false,
          isshowg: false,
          obj: "",
          id: "raider"
        },
        {
          stagename: "诉讼阶段",
          isshow: false,
          isshowg: false,
          obj: "",
          id: "litigator"
        }
      ],
      paticipants: null,
      discoverer: null,
      investigator: null,
      reports: null,
      raider: null,
      litigator: null,

      baseInfo: null, // 案件信息
      clientInfo: null, //客户信息
      targetInfo: null, //目标信息
      accounting: null, // 财务信息


      activeNames: ["1"],
      /* 消息提醒 */
      dialogFormVisible: false,
      formLabelWidth: "120px",
      news: {
        content: '',
        date: ''
      }
    }
  },
  methods: {
    /* 获取案件流程数据 */
    getPaticipants () {
      _getpaticipants().then(res => {
        console.info(res)
        this.paticipants = res;

        /* 分别获取子表内容 */
        this.discoverer = res.discoverer;
        this.investigator = res.investigator;
        this.reports = res.reports;
        this.raider = res.raider;
        this.litigator = res.litigator;

        /* 判断其状态 */
        this.stage.forEach(item => {
          // this.$set(item, 'obj', res[item.id])
          // console.info(item.obj[0].progress)
          if (res[item.id][0].progress === "进行中") {
            item.isshow = true;
          } else if (res[item.id][0].progress === "已完成") {
            item.isshowg = true;
          }
        });
      })
    },
    getbaseInfo () {
      _getbaseInfo().then(res => {
        this.baseInfo = res;
      });
    },
    getclientInfo () {
      _getclientInfo().then(res => {
        this.clientInfo = res;
      });
    },
    gettargetInfo () {
      _gettargetInfo().then(res => {
        this.targetInfo = res;
      });
    },
    getaccounting () {
      _getaccounting().then(res => {
        this.accounting = res;
      });
    },

    /* 锚点跳转 */
    returnTop: function (item) {
      // this.data = this[item];
      let tomao = "#" + item; // 锚点跳转
      console.info(item + " " + tomao);
      this.activename = "4";
      /* $ref 当前文档流 */

      let t;
      clearTimeout(t);
      t = setTimeout(function () {
        document.querySelector(tomao).scrollIntoView(true);
      }, 100);
    },
    /* 编辑 */
    edit () {

    },
    /* 提交 */
    submit () {

    },
    /* 新建 */
    add () {

    },
    commitnews (item) {
      alert("提交成功" + item)
      this.dialogFormVisible = false
    }
  },
  created () {
    this.getPaticipants();
    this.getbaseInfo()
    this.getclientInfo()
    this.gettargetInfo()
    this.getaccounting()
  }
}
</script>


<style lang="less" scoped>
.detail-header {
  position: relative;
  .border-bottom {
    width: 100%;
    // position: absolute;
    border-bottom: 5px solid #d4d4d4;
    position: absolute;
    top: 39px;
  }
  .detail-div {
    display: flex;
    justify-content: center;
    list-style: none;
    text-align: center;
    & > li {
      flex: 1;
      z-index: 99;
    }

    .detail-ul-content {
      margin-bottom: 10px;
      font-weight: 600;
      color: #222222;
    }
    .detail-ul-icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: 0 auto;
      background-color: #bcbcbc;
    }
    div.colorred {
      background: #9e1c1c !important;
      z-index: 100;
    }
    div.colorgreen {
      background: #1c9e2b;
    }
  }
}

.btn-border {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}

.ntable {
  width: 100%;
  margin: 0 auto;
  margin: 10px 0;
  td {
    padding: 12px 10px 12px 10px;
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
</style>
