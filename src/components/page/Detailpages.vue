
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
            @click="returnTop(index)"
          ></div>
        </li>
      </ul>
    </div>

    <el-tabs type="border-card" v-model="activename">
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

      <!-- 案件信息 -->
      <el-tab-pane label="案件信息">
        <form :model="baseInfo">
          <div class="clearfix btn-border">
            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="edit()"
            >编辑</el-button>

            <el-button
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="dia_base = true"
            >新建</el-button>

            <el-button
              class="detail-btn"
              @click="edit()"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >提交</el-button>

            <!-- 消息对话框 -->
            <el-button
              class="detail-btn"
              @click="dialogFormVisible = true"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >新建消息</el-button>
          </div>
          <table class="ntable" v-for="(item,index) in baseInfo" :key="index">
            <tr>
              <td class="tb" width="20%">案件ID</td>
              <td width="30%">
                <el-input v-model="baseInfo[0].id" v-if="isShow"></el-input>
                <div v-else>{{baseInfo[0].id}}</div>
              </td>
              <td class="tb" width="20%">案件状态</td>
              <td width="30%">
                <el-select
                  v-model="baseInfo[0].status"
                  placeholder="请选择"
                  v-if="isShow"
                  style="width: 100%;"
                >
                  <el-option label="接洽" value="接洽"></el-option>
                  <el-option label="调查" value="调查"></el-option>
                  <el-option label="报告" value="报告"></el-option>
                  <el-option label="法务" value="法务"></el-option>
                  <el-option label="诉讼" value="诉讼"></el-option>
                </el-select>
                <div v-else>{{baseInfo[0].status}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">优先级</td>
              <td width="30%">
                <el-select
                  v-model="baseInfo[0].priority"
                  placeholder="请选择"
                  v-if="isShow"
                  style="width: 100%;"
                >
                  <el-option label="高级" value="高级"></el-option>
                  <el-option label="普通" value="普通"></el-option>
                  <el-option label="低级" value="低级"></el-option>
                </el-select>
                <div v-else>{{baseInfo[0].priority}}</div>
              </td>
              <td class="tb" width="20%">案件类型</td>
              <td width="30%">
                <el-select
                  v-model="baseInfo[0].type"
                  placeholder="请选择"
                  v-if="isShow"
                  style="width: 100%;"
                >
                  <el-option label="行政" value="行政"></el-option>
                  <el-option label="调查" value="调查"></el-option>
                  <el-option label="诉讼" value="诉讼"></el-option>

                  <el-option label="其他" value="其他"></el-option>
                </el-select>
                <div v-else>{{baseInfo[0].type}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">案件号</td>
              <td width="30%">
                <el-input v-model="baseInfo[0].caseNo" v-if="isShow"></el-input>
                <div v-else>{{baseInfo[0].caseNo}}</div>
              </td>
              <td class="tb" width="20%">案件名称</td>
              <td width="30%">
                <el-input v-model="baseInfo[0].caseName" v-if="isShow"></el-input>
                <div v-else>{{baseInfo[0].caseName}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">当前参与人</td>
              <td width="30%">
                <el-input v-model="baseInfo[0].currentParticipants" v-if="isShow"></el-input>
                <div v-else>{{baseInfo[0].currentParticipants}}</div>
              </td>
              <td class="tb" width="20%">案由</td>
              <td width="30%">
                <el-input v-model="baseInfo[0].reason" v-if="isShow"></el-input>
                <div v-else>{{baseInfo[0].reason}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">立案日期</td>
              <td width="30%">
                <el-date-picker
                  v-model="baseInfo[0].openDate"
                  type="date"
                  placeholder="选择日期"
                  v-if="isShow"
                  style="width: 100%;"
                ></el-date-picker>
                <div v-else>{{baseInfo[0].openDate}}</div>
              </td>
              <td class="tb" width="20%">结案方式</td>
              <td width="30%">
                {{baseInfo[0].closeMode}}
                <el-select
                  v-model="baseInfo[0].priority"
                  placeholder="请选择"
                  v-if="isShow"
                  style="width: 100%;"
                >
                  <el-option label="高级" value="高级"></el-option>
                  <el-option label="普通" value="普通"></el-option>
                  <el-option label="低级" value="低级"></el-option>
                </el-select>
                <div v-else>{{baseInfo[0].priority}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">结案日期</td>
              <td width="30%">
                <el-date-picker
                  v-model="baseInfo[0].closeDate"
                  type="date"
                  placeholder="选择日期"
                  v-if="isShow"
                  style="width: 100%;"
                ></el-date-picker>
                <div v-else>{{baseInfo[0].closeDate}}</div>
              </td>
              <td class="tb" width="20%">更新信息</td>
              <td width="30%">
                <el-popover trigger="click" width="400" placement="right">
                  <table class="ntable">
                    <tr>
                      <td width="35%">更新时间</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="baseInfo[0].updateInfo[0].updateTime"
                          type="date"
                          placeholder="选择日期"
                          v-if="isShow"
                          style="width: 100%;"
                        ></el-date-picker>
                        <div v-else>{{baseInfo[0].updateInfo[0].updateTime}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">更新人</td>
                      <td width="65%">
                        <el-input v-model="baseInfo[0].updateInfo[0].updatePerson" v-if="isShow"></el-input>
                        <div v-else>{{baseInfo[0].updateInfo[0].updatePerson}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">更新项目</td>
                      <td width="65%">
                        <el-input v-model="baseInfo[0].updateInfo[0].item" v-if="isShow"></el-input>
                        <div v-else>{{baseInfo[0].updateInfo[0].item}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">更新内容</td>
                      <td width="65%">
                        <el-input v-model="baseInfo[0].updateInfo[0].content" v-if="isShow"></el-input>
                        <div v-else>{{baseInfo[0].updateInfo[0].content}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">版本</td>
                      <td width="65%">
                        <el-input v-model="baseInfo[0].updateInfo[0].version" v-if="isShow"></el-input>
                        <div v-else>{{baseInfo[0].updateInfo[0].version}}</div>
                      </td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">备注</td>
              <td width="30%">
                <el-input v-model="baseInfo[0].note" v-if="isShow"></el-input>
                <div v-else>{{baseInfo[0].note}}</div>
              </td>
            </tr>
          </table>
        </form>
      </el-tab-pane>
      <!-- 模态框 -->
      <el-dialog title="编辑案件信息" :visible.sync="dia_base">
        <el-form :model="news" class="news">
          <el-form-item label="案件ID" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="案件状态" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="优先级" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="案件类型" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="案件号" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="案件名称" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="当前参与人" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="案由" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="立案日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="news.date"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结案方式" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="结案日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="news.date"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="更新信息" :label-width="formLabelWidth">
            <el-input v-model="news.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="commitnews(news)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

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
              <td width="30%">
                <el-input v-model="clientInfo[0].clientCaseNo" v-if="isShow"></el-input>
                <div v-else>{{clientInfo[0].clientCaseNo}}</div>
              </td>
              <td class="tb" width="20%">客户品牌</td>
              <td width="30%">
                <el-input v-model="clientInfo[0].brands" v-if="isShow"></el-input>
                <div v-else>{{clientInfo[0].brands}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">客户指示</td>
              <td width="30%">
                <el-input v-model="clientInfo[0].instructions" v-if="isShow"></el-input>
                <div v-else>{{clientInfo[0].instructions}}</div>
              </td>
              <td class="tb" width="20%">授权日期</td>
              <td width="30%">
                <el-date-picker
                  v-model="clientInfo[0].authorizeDate"
                  type="date"
                  placeholder="选择日期"
                  v-if="isShow"
                  style="width: 100%;"
                ></el-date-picker>
                <div v-else>{{clientInfo[0].authorizeDate}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">出具法律文书</td>
              <td width="30%">
                <el-popover trigger="click" width="400" placement="right">
                  <table class="ntable">
                    <tr>
                      <td width="35%">文书名称</td>
                      <td width="65%">{{clientInfo[0].documents[0].documentName}}
                        <el-input v-model="clientInfo[0].documents[0].documentName" v-if="isShow"></el-input>
                <div v-else>{{clientInfo[0].documents[0].documentName}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">文书类型</td>
                      <td width="65%">{{clientInfo[0].documents[0].documentType}}
                        <el-select
                  v-model="clientInfo[0].documents[0].documentType"
                  placeholder="请选择"
                  v-if="isShow"
                  style="width: 100%;"
                >
                  <el-option label="高级" value="高级"></el-option>
                  <el-option label="普通" value="普通"></el-option>
                  <el-option label="低级" value="低级"></el-option>
                </el-select>
                <div v-else>{{clientInfo[0].documents[0].documentType}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">出具时间</td>
                      <td width="65%">{{clientInfo[0].documents[0].issueDate}}
                        <el-date-picker
                  v-model="clientInfo[0].documents[0].issueDate"
                  type="date"
                  placeholder="选择日期"
                  v-if="isShow"
                  style="width: 100%;"
                ></el-date-picker>
                <div v-else>{{clientInfo[0].documents[0].issueDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">扫描文件</td>
                      <td width="65%">{{clientInfo[0].documents[0].documentPath}}
                        <el-input v-model="clientInfo[0].documents[0].documentPath" v-if="isShow"></el-input>
                <div v-else>{{clientInfo[0].documents[0].documentPath}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">文书内容</td>
                      <td width="65%">{{clientInfo[0].documents[0].content}}
                        <el-input v-model="clientInfo[0].documents[0].content" v-if="isShow"></el-input>
                <div v-else>{{clientInfo[0].documents[0].content}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">收到时间</td>
                      <td width="65%">{{clientInfo[0].documents[0].receiveDate}}
                        <el-date-picker
                  v-model="clientInfo[0].documents[0].receiveDate"
                  type="date"
                  placeholder="选择日期"
                  v-if="isShow"
                  style="width: 100%;"
                ></el-date-picker>
                <div v-else>{{clientInfo[0].documents[0].receiveDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">邮寄时间</td>
                      <td width="65%">{{clientInfo[0].documents[0].sendDate}}
                        <el-date-picker
                  v-model="clientInfo[0].documents[0].sendDate"
                  type="date"
                  placeholder="选择日期"
                  v-if="isShow"
                  style="width: 100%;"
                ></el-date-picker>
                <div v-else>{{clientInfo[0].documents[0].sendDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">{{clientInfo[0].documents[0].note}}
                        <el-input v-model="clientInfo[0].documents[0].note" v-if="isShow"></el-input>
                <div v-else>{{clientInfo[0].documents[0].note}}</div>
                      </td>
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

      <!-- 目标信息 -->
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
              <td width="30%">
                <el-popover trigger="click" width="400" placement="right">
                  <table class="ntable">
                    <tr>
                      <td width="35%">姓名</td>
                      <td width="65%" colspan="5">{{targetInfo[0].targetPrincipal[0].name}}</td>
                    </tr>
                    <tr>
                      <td width="35%">职位</td>
                      <td width="65%" colspan="5">{{targetInfo[0].targetPrincipal[0].position}}</td>
                    </tr>
                    <tr>
                      <td width="35%">证件号码</td>
                      <td width="65%" colspan="5">{{targetInfo[0].targetPrincipal[0].ID}}</td>
                    </tr>
                    <tr>
                      <td width="35%" rowspan="5">联系方式</td>
                      <td>目标电话</td>
                      <td colspan="3">{{targetInfo[0].targetPrincipal[0].contacts[0].phone}}</td>
                    </tr>
                    <tr>
                      <td>目标邮箱</td>
                      <td colspan="3">{{targetInfo[0].targetPrincipal[0].contacts[0].email}}</td>
                    </tr>
                    <tr>
                      <td rowspan="3">社交号</td>
                      <td>社交工具</td>
                      <td>{{targetInfo[0].targetPrincipal[0].contacts[0].networks[0].networkName}}</td>
                    </tr>
                    <tr>
                      <td>号码</td>
                      <td>{{targetInfo[0].targetPrincipal[0].contacts[0].networks[0].networkNo}}</td>
                    </tr>
                    <tr>
                      <td>备注</td>
                      <td>{{targetInfo[0].targetPrincipal[0].contacts[0].networks[0].note}}</td>
                    </tr>
                    <tr>
                      <td width="35%">是否为累犯</td>
                      <td width="65%" colspan="4">{{targetInfo[0].targetContacts[0].isRecidivism}}</td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%" colspan="4">{{targetInfo[0].targetContacts[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">关联公司</td>
              <td width="30%">
                <el-popover trigger="click" width="500" placement="right">
                  <table class="ntable">
                    <tr>
                      <td width="35%">公司名称</td>
                      <td width="65%" colspan="5">{{targetInfo[0].affiliateCompany[0].companyName}}</td>
                    </tr>
                    <tr>
                      <td width="35%" rowspan="9">主要成员</td>
                      <td>姓名</td>
                      <td colspan="3">{{targetInfo[0].affiliateCompany[0].principal[0].name}}</td>
                    </tr>
                    <tr>
                      <td>职位</td>
                      <td colspan="3">{{targetInfo[0].affiliateCompany[0].principal[0].position}}</td>
                    </tr>
                    <tr>
                      <td>证件号码</td>
                      <td colspan="3">{{targetInfo[0].affiliateCompany[0].principal[0].ID}}</td>
                    </tr>
                    <tr>
                      <td rowspan="6">联系方式</td>
                      <td>目标电话</td>
                      <td
                        colspan="2"
                      >{{targetInfo[0].affiliateCompany[0].principal[0].contacts[0].phone[0]}}</td>
                    </tr>
                    <tr>
                      <td>目标邮箱</td>
                      <td
                        colspan="2"
                      >{{targetInfo[0].affiliateCompany[0].principal[0].contacts[0].email[0]}}</td>
                    </tr>
                    <tr>
                      <td rowspan="3">社交号</td>
                      <td>社交工具</td>
                      <td>{{targetInfo[0].affiliateCompany[0].principal[0].contacts[0].networks[0].networkName}}</td>
                    </tr>
                    <tr>
                      <td>号码</td>
                      <td>{{targetInfo[0].affiliateCompany[0].principal[0].contacts[0].networks[0].networkNo}}</td>
                    </tr>
                    <tr>
                      <td>备注</td>
                      <td>{{targetInfo[0].affiliateCompany[0].principal[0].contacts[0].networks[0].note}}</td>
                    </tr>
                    <tr>
                      <td>备注</td>
                      <td
                        colspan="2"
                      >{{targetInfo[0].affiliateCompany[0].principal[0].contacts[0].note}}</td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%" colspan="5">{{targetInfo[0].affiliateCompany[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">目标产品信息</td>
              <td width="30%">
                <el-popover trigger="click" width="400" placement="right">
                  <table class="ntable">
                    <tr>
                      <td width="35%">产品名称/服务</td>
                      <td width="65%">{{targetInfo[0].productInfo[0].productName}}</td>
                    </tr>
                    <tr>
                      <td width="35%">产品型号</td>
                      <td width="65%">{{targetInfo[0].productInfo[0].productNo}}</td>
                    </tr>
                    <tr>
                      <td width="35%">产品数量</td>
                      <td width="65%">{{targetInfo[0].productInfo[0].productQty}}</td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">{{targetInfo[0].productInfo[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">备注</td>
              <td width="30%">{{targetInfo[0].note}}</td>
            </tr>
          </table>
        </form>
      </el-tab-pane>

      <!-- 财务信息 -->
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
              <td width="30%">
                <el-popover>
                  <table class="ntable">
                    <tr>
                      <td width="35%">是否缴纳</td>
                      <td width="65%">{{accounting[0].deposit[0].isPaid}}</td>
                    </tr>
                    <tr>
                      <td width="35%">金额</td>
                      <td width="65%">{{accounting[0].deposit[0].amount}}</td>
                    </tr>
                    <tr>
                      <td width="35%">缴纳人</td>
                      <td width="65%">{{accounting[0].deposit[0].paidPerson}}</td>
                    </tr>
                    <tr>
                      <td width="35%">提交日期</td>
                      <td width="65%">{{accounting[0].deposit[0].paidDate}}</td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">{{accounting[0].deposit[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">预付款</td>
              <td width="30%">
                <el-popover>
                  <table class="ntable">
                    <tr>
                      <td width="35%">是否缴纳</td>
                      <td width="65%">{{accounting[0].advancePayment[0].isPaid}}</td>
                    </tr>
                    <tr>
                      <td width="35%">金额</td>
                      <td width="65%">{{accounting[0].advancePayment[0].amount}}</td>
                    </tr>
                    <tr>
                      <td width="35%">缴纳人</td>
                      <td width="65%">{{accounting[0].advancePayment[0].paidPerson}}</td>
                    </tr>
                    <tr>
                      <td width="35%">提交日期</td>
                      <td width="65%">{{accounting[0].advancePayment[0].paidDate}}</td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">{{accounting[0].advancePayment[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">退款</td>
              <td width="30%">
                <el-popover>
                  <table class="ntable">
                    <tr>
                      <td width="35%">是否申请</td>
                      <td width="65%">{{accounting[0].refund[0].isApplyRefund}}</td>
                    </tr>
                    <tr>
                      <td width="35%">金额</td>
                      <td width="65%">{{accounting[0].refund[0].applyPerson}}</td>
                    </tr>
                    <tr>
                      <td width="35%">缴纳人</td>
                      <td width="65%">{{accounting[0].refund[0].applyReason}}</td>
                    </tr>
                    <tr>
                      <td width="35%">提交日期</td>
                      <td width="65%">{{accounting[0].refund[0].applyDate}}</td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">{{accounting[0].refund[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">报销</td>
              <td width="30%">
                <el-popover>
                  <table class="ntable">
                    <tr>
                      <td width="35%">申请人</td>
                      <td width="65%">{{accounting[0].repay[0].applyPerson}}</td>
                    </tr>
                    <tr>
                      <td width="35%">申请事由</td>
                      <td width="65%">{{accounting[0].repay[0].applyReason}}</td>
                    </tr>
                    <tr>
                      <td width="35%">申请日期</td>
                      <td width="65%">{{accounting[0].repay[0].applyDate}}</td>
                    </tr>

                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">{{accounting[0].repay[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">发票</td>
              <td width="30%">
                <el-popover>
                  <table class="ntable">
                    <tr>
                      <td width="35%">抬头</td>
                      <td width="65%">{{accounting[0].invoice[0].name}}</td>
                    </tr>
                    <tr>
                      <td width="35%">出票日期</td>
                      <td width="65%">{{accounting[0].invoice[0].issueDate}}</td>
                    </tr>
                    <tr>
                      <td width="35%">销账日期</td>
                      <td width="65%">{{accounting[0].invoice[0].cancelDate}}</td>
                    </tr>

                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">{{accounting[0].invoice[0].note}}</td>
                    </tr>
                  </table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">备注</td>
              <td width="30%">{{accounting[0].note}}</td>
            </tr>
          </table>
        </form>
      </el-tab-pane>

      <!-- 案件基本信息 -->
      <el-tab-pane label="案件流程">
        <el-collapse v-model="activeNames">
          <el-collapse-item
            title="接洽阶段"
            name="0"
            v-model="discoverer"
            v-if="discoverer"
            ref="discoverer"
          >
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
          <el-collapse-item
            title="调查阶段"
            name="1"
            v-model="investigator"
            v-if="investigator"
            ref="investigator"
          >
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
          <el-collapse-item title="报告阶段" name="2" v-model="reports" v-if="reports" ref="reports">
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
          <el-collapse-item title="法务阶段" name="3" v-model="raider" v-if="raider" ref="raider">
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
          <el-collapse-item
            title="诉讼阶段"
            name="4"
            v-model="litigator"
            v-if="litigator"
            ref="litigator"
          >
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

import { mytoString, mytimeFormat } from "../../../static/js/common.js";

export default {
  data() {
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

      /* 案件信息 dia*/
      dia_base: false,
      activeNames: ["0"],
      activename: "0",
      /* 消息提醒 */
      dialogFormVisible: false,
      formLabelWidth: "120px",
      news: {
        content: "",
        date: ""
      },

      isShow: true
    };
  },
  methods: {
    /* 获取案件流程数据 */
    getPaticipants() {
      _getpaticipants().then(res => {
        console.info(res);
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
      });
    },
    getbaseInfo() {
      _getbaseInfo().then(res => {
        this.baseInfo = res;
        this.baseInfo[0].currentParticipants = mytoString(
          this.baseInfo[0].currentParticipants
        );
      });
    },
    getclientInfo() {
      _getclientInfo().then(res => {
        this.clientInfo = res;
      });
    },
    gettargetInfo() {
      _gettargetInfo().then(res => {
        this.targetInfo = res;
      });
    },
    getaccounting() {
      _getaccounting().then(res => {
        this.accounting = res;
      });
    },

    /* 锚点跳转 */
    returnTop: function(index) {
      index = index + "";
      this.activeNames = [index];
      /* $ref 当前文档流 */
      this.$nextTick().then(() => [(this.activename = "4")]);
    },
    /* 编辑 */
    edit() {
      this.$router.push({
        name: "editdetailpages",
        query: {}
      });
    },
    /* 提交 */
    submit() {},
    /* 新建 */
    add() {},
    commitnews(item) {
      alert("提交成功" + item);
      this.dialogFormVisible = false;
    }
  },
  created() {
    this.getPaticipants();
    this.getbaseInfo();
    this.getclientInfo();
    this.gettargetInfo();
    this.getaccounting();
  },
  mounted() {
    if (this.$route.query.id != null) {
      let index = this.$route.query.id;
      console.info(typeof index);
      this.returnTop(index);
    }
  }
};
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
