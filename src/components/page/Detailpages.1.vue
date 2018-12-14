<template>
  <el-card class="box-card">
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

    <!-- <div>{{data}}</div> -->
    <el-tabs type="border-card" @tab-click="handleClick" v-model="activename">
      <el-tab-pane label="案件基本信息">
        <div class="clearfix btn-border">
          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="bianji()"
          >
            <i class="el-icon-edit-outline"></i>编辑该信息模块
          </el-button>
        </div>
        <el-form :model="baseInfo[0]" v-if="baseInfo" label-width="100px">
          <el-form-item label="案件ID">
            <el-input
              type="text"
              v-model="baseInfo[0].id"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="案件状态">
            <el-input
              type="text"
              v-model="baseInfo[0].status"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="优先级">
            <el-input
              type="text"
              v-model="baseInfo[0].priority"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="案件类型">
            <el-input
              type="text"
              v-model="baseInfo[0].type"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="案件号">
            <el-input
              type="text"
              v-model="baseInfo[0].caseNo"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="案件名称">
            <el-input
              type="text"
              v-model="baseInfo[0].caseName"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="当前参与人">
            <el-input
              type="text"
              v-model="currentParticipants"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="案由">
            <el-input
              type="text"
              v-model="baseInfo[0].reason"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="立案日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="baseInfo[0].openDate"
              :class="{showborder:true, border:!isread}"
              :readonly="isread"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="结案日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="baseInfo[0].closeDate"
              :class="{showborder:true, border:!isread}"
              :readonly="isread"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="案件号">
            <el-input
              type="text"
              v-model="baseInfo[0].caseNo"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="更新信息">
            <el-popover trigger="click">
              <el-form-item label="更新时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="baseInfo[0].updateInfo[0].updateTime"
                  style="border: none;width: 100%;"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="更新人">
                <el-input
                  v-model="baseInfo[0].updateInfo[0].updatePerson"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="更新项目">
                <el-input
                  v-model="baseInfo[0].updateInfo[0].item"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="更新内容">
                <el-input
                  v-model="baseInfo[0].updateInfo[0].content"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="版本">
                <el-input
                  v-model="baseInfo[0].updateInfo[0].version"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="baseInfo[0].note"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="tab-div-btn">
          <el-button @click="submit(baseInfo)">提交</el-button>
          <el-button @click="disbianji()">取消</el-button>
          <el-button>选择阶段</el-button>
          <el-button @click="newupdate(baseInfo[0])">新建</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="客户信息">
        <div class="clearfix btn-border">
          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="bianji()"
          >
            <i class="el-icon-edit-outline"></i>编辑该信息模块
          </el-button>
        </div>
        <el-form :model="clientInfo[0]" v-if="clientInfo" label-width="100px">
          <el-form-item label="客户案件号">
            <el-input
              type="text"
              v-model="clientInfo[0].clientCaseNo"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="客户品牌">
            <el-input
              type="text"
              v-model="clientInfo[0].brands"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="客户指示">
            <el-input
              type="text"
              v-model="clientInfo[0].instructions"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="授权日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="clientInfo[0].authorizeDate"
              style="border: none;width: 100%;"
              :readonly="isread"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="出具法律文书">
            <el-popover trigger="click">
              <el-form-item label="更新时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="clientInfo[0].documents[0].issueDate"
                  style="border: none;width: 100%;"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="文书名称">
                <el-input
                  v-model="clientInfo[0].documents[0].documentName"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="文书类型">
                <el-input
                  v-model="clientInfo[0].documents[0].documentType"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="出具时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="clientInfo[0].documents[0].issueDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="扫描文件">
                <el-input
                  v-model="clientInfo[0].documents[0].documentPath"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="文书内容">
                <el-input
                  v-model="clientInfo[0].documents[0].content"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="收到时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="clientInfo[0].documents[0].receiveDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="邮寄时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="clientInfo[0].documents[0].sendDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="clientInfo[0].documents[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="clientInfo[0].note"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="tab-div-btn">
          <el-button @click="submit(clientInfo)">提交</el-button>
          <el-button @click="disbianji()">取消</el-button>
          <el-button>选择阶段</el-button>
          <el-button>新建</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="财务信息">
        <div class="clearfix btn-border">
          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="bianji()"
          >
            <i class="el-icon-edit-outline"></i>编辑该信息模块
          </el-button>
        </div>
        <el-form :model="accounting[0]" v-if="accounting" label-width="100px">
          <el-form-item label="保证金">
            <el-popover trigger="click">
              <el-form-item label="保证金"></el-form-item>
              <el-form-item label="提交日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].deposit[0].paidDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="是否缴纳">
                <el-radio-group
                  v-model="accounting[0].deposit[0].isPaid"
                  :disabled="isread"
                  :class="{showborder:true, border:!isread}"
                >
                  <el-radio :label="true">已缴纳</el-radio>
                  <el-radio :label="false">未缴纳</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="金额">
                <el-input
                  v-model="accounting[0].deposit[0].amount"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="缴纳人">
                <el-input
                  v-model="accounting[0].deposit[0].paidPerson"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].deposit[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="预付款">
            <el-popover trigger="click">
              <el-form-item label="预付款"></el-form-item>
              <el-form-item label="提交日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].advancePayment[0].paidDate"
                  :class="{showborder:true, border:!isread}"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="是否缴纳">
                <el-radio-group
                  v-model="accounting[0].advancePayment[0].isPaid"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                >
                  <el-radio :label="true">已缴纳</el-radio>
                  <el-radio :label="false">未缴纳</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="金额">
                <el-input
                  v-model="accounting[0].advancePayment[0].amount"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="缴纳人">
                <el-input
                  v-model="accounting[0].advancePayment[0].paidPerson"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].advancePayment[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="退款">
            <el-popover trigger="click">
              <el-form-item label="保证金"></el-form-item>

              <el-form-item label="是否申请">
                <el-radio-group
                  v-model="accounting[0].refund[0].isApplyRefund"
                  :disabled="isread"
                  :class="{showborder:true, border:!isread}"
                >
                  <el-radio :label="true">已申请</el-radio>
                  <el-radio :label="false">未申请</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="申请人">
                <el-input
                  v-model="accounting[0].refund[0].applyPerson"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="申请事由">
                <el-input
                  v-model="accounting[0].refund[0].applyReason"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="申请日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].refund[0].applyDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].refund[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="发票">
            <el-popover trigger="click">
              <el-form-item label="报销"></el-form-item>

              <el-form-item label="申请人">
                <el-input
                  v-model="accounting[0].repay[0].applyPerson"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="申请事由">
                <el-input
                  v-model="accounting[0].repay[0].applyReason"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="申请日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].repay[0].applyDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].repay[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>
          <el-form-item label="发票">
            <el-popover trigger="click">
              <el-form-item label="报销"></el-form-item>

              <el-form-item label="抬头">
                <el-input
                  v-model="accounting[0].invoice[0].name"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="出票日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].invoice[0].issueDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="销账日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].invoice[0].cancelDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].invoice[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="accounting[0].note"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="tab-div-btn">
          <el-button @click="submit(accounting)">提交</el-button>
          <el-button @click="disbianji()">取消</el-button>
          <el-button>选择阶段</el-button>
          <el-button>新建</el-button>
          <!-- <el-button type="primary">选择阶段</el-button> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="财务信息">
        <div class="clearfix btn-border">
          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="bianji()"
          >
            <i class="el-icon-edit-outline"></i>编辑该信息模块
          </el-button>
        </div>
        <el-form :model="accounting[0]" v-if="accounting" label-width="100px">
          <el-form-item label="保证金">
            <el-popover trigger="click">
              <el-form-item label="保证金"></el-form-item>
              <el-form-item label="提交日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].deposit[0].paidDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="是否缴纳">
                <el-radio-group
                  v-model="accounting[0].deposit[0].isPaid"
                  :disabled="isread"
                  :class="{showborder:true, border:!isread}"
                >
                  <el-radio :label="true">已缴纳</el-radio>
                  <el-radio :label="false">未缴纳</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="金额">
                <el-input
                  v-model="accounting[0].deposit[0].amount"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="缴纳人">
                <el-input
                  v-model="accounting[0].deposit[0].paidPerson"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].deposit[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="预付款">
            <el-popover trigger="click">
              <el-form-item label="预付款"></el-form-item>
              <el-form-item label="提交日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].advancePayment[0].paidDate"
                  :class="{showborder:true, border:!isread}"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="是否缴纳">
                <el-radio-group
                  v-model="accounting[0].advancePayment[0].isPaid"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                >
                  <el-radio :label="true">已缴纳</el-radio>
                  <el-radio :label="false">未缴纳</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="金额">
                <el-input
                  v-model="accounting[0].advancePayment[0].amount"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="缴纳人">
                <el-input
                  v-model="accounting[0].advancePayment[0].paidPerson"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].advancePayment[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="退款">
            <el-popover trigger="click">
              <el-form-item label="保证金"></el-form-item>

              <el-form-item label="是否申请">
                <el-radio-group
                  v-model="accounting[0].refund[0].isApplyRefund"
                  :disabled="isread"
                  :class="{showborder:true, border:!isread}"
                >
                  <el-radio :label="true">已申请</el-radio>
                  <el-radio :label="false">未申请</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="申请人">
                <el-input
                  v-model="accounting[0].refund[0].applyPerson"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="申请事由">
                <el-input
                  v-model="accounting[0].refund[0].applyReason"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="申请日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].refund[0].applyDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].refund[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="发票">
            <el-popover trigger="click">
              <el-form-item label="报销"></el-form-item>

              <el-form-item label="申请人">
                <el-input
                  v-model="accounting[0].repay[0].applyPerson"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="申请事由">
                <el-input
                  v-model="accounting[0].repay[0].applyReason"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="申请日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].repay[0].applyDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].repay[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>
          <el-form-item label="发票">
            <el-popover trigger="click">
              <el-form-item label="报销"></el-form-item>

              <el-form-item label="抬头">
                <el-input
                  v-model="accounting[0].invoice[0].name"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="出票日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].invoice[0].issueDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="销账日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="accounting[0].invoice[0].cancelDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="accounting[0].invoice[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="accounting[0].note"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="tab-div-btn">
          <el-button @click="submit(accounting)">提交</el-button>
          <el-button @click="disbianji()">取消</el-button>
          <el-button>选择阶段</el-button>
          <el-button>新建</el-button>
          <!-- <el-button type="primary">选择阶段</el-button> -->
        </div>
      </el-tab-pane>

      <el-tab-pane label="案件流程">
        <div class="clearfix btn-border">
          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="bianji()"
          >
            编辑该信息模块
          </el-button>

          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="submit(paticipants)"
          >
            提交
          </el-button>

          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="bianji()"
          >
            阶段选择
          </el-button>

          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="disbianji()"
          >
            取消
          </el-button>

          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="add()"
          >
            新建
          </el-button>

          <!-- 消息对话框 -->
          <el-button
            class="detail-btn"
            @click="dialogFormVisible = true"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
          >新建消息</el-button>
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
        </div>
        <!-- 接洽阶段 -->
        <el-form :model="discoverer[0]" v-if="discoverer" ref="discovererForm" label-width="100px" id="discoverer">
          <el-button
            class="detail-btn"
            style="color:#409EFF;font-size:14px;cursor: pointer;"
            @click="add('discoverer[0]')"
          >
            新建
          </el-button>
          <el-form-item style="background: #f1f1fa;">
            <h2>接洽阶段</h2>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              type="text"
              v-model="discoverer[0].name"
              :readonly="isread"
              :class=" {showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="进行情况">
            <el-input
              type="text"
              v-model="discoverer[0].progress"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="汇报日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="discoverer[0].reportDate"
              :readonly="isread"
              clear-icon="''"
              :class="{showborder:true, border:!isread}"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="联系方式">
            <el-input
              type="text"
              v-model="discoverercontacts"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="报告">
            <div class="popover-div">
              <el-popover trigger="click">
                <el-form-item label="提交日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="discoverer[0].reports[0].submitDate"
                    :class="{showborder:true, border:!isread}"
                    :readonly="isread"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="类型">
                  <el-input
                    v-model="discoverer[0].reports[0].reportType"
                    :readonly="isread"
                    :class="{showborder:true, border:!isread}"
                  ></el-input>
                </el-form-item>
                <el-form-item label="内容">
                  <el-input
                    v-model="discoverer[0].reports[0].reportContent"
                    :readonly="isread "
                    :class="{showborder:true, border:!isread}"
                  ></el-input>
                </el-form-item>
                <el-form-item label="文件">
                  <el-input
                    v-model="discoverer[0].reports[0].reportPath"
                    :readonly="isread"
                    :class="{showborder:true, border:!isread}"
                  ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    v-model="discoverer[0].reports[0].note"
                    :readonly="isread"
                    :class="{showborder:true, border:!isread}"
                  ></el-input>
                </el-form-item>
                <el-button slot="reference">详情</el-button>
              </el-popover>
            </div>
          </el-form-item>

          <el-form-item label="附件">
            <el-popover trigger="click">
              <el-form-item label="提交日期">
                <el-input
                  v-model="discoverer[0].attachments[0].attachmentName"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件类型">
                <el-input
                  v-model="discoverer[0].attachments[0].attachmentType"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件路径">
                <el-input
                  v-model="discoverer[0].attachments[0].attachmentPath"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input
                  v-model="discoverer[0].reports[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="discoverer[0].note"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 调查阶段 -->
        <el-form :model="investigator[0]" v-if="investigator" label-width="100px" id="investigator">
          <el-form-item style="background: #f1f1fa;">
            <h2>调查阶段</h2>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              type="text"
              v-model="investigator[0].name"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="进行情况">
            <el-input
              type="text"
              v-model="investigator[0].progress"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="汇报日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="investigator[0].appointDate"
              :class="{showborder:true, border:!isread}"
              :readonly="isread"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="联系方式">
            <el-input
              type="text"
              v-model="discoverercontacts"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="报告">
            <el-popover trigger="click">
              <el-form-item label="提交日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="investigator[0].reports[0].submitDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="类型">
                <el-input
                  v-model="investigator[0].reports[0].reportType"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input
                  v-model="investigator[0].reports[0].reportContent"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="文件">
                <el-input
                  v-model="investigator[0].reports[0].reportPath"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="investigator[0].reports[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="附件">
            <el-popover trigger="click">
              <el-form-item label="提交日期">
                <el-input
                  v-model="investigator[0].attachments[0].attachmentName"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件类型">
                <el-input
                  v-model="investigator[0].attachments[0].attachmentType"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件路径">
                <el-input
                  v-model="investigator[0].attachments[0].attachmentPath"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input
                  v-model="investigator[0].reports[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="investigator[0].note"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 报告阶段 -->
        <el-form :model="reports[0]" v-if="reports" label-width="100px" id="reports">
          <el-form-item style="background: #f1f1fa;">
            <h2>报告阶段</h2>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              type="text"
              v-model="reports[0].name"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="进行情况">
            <el-input
              type="text"
              v-model="reports[0].progress"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="汇报日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="reports[0].appointDate"
              :class="{showborder:true, border:!isread}"
              :readonly="isread"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="联系方式">
            <el-input
              type="text"
              v-model="reportscontacts"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="报告">
            <el-popover trigger="click">
              <el-form-item label="提交日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="reports[0].reports.submitDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="类型">
                <el-input
                  v-model="reports[0].reports.reportType"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input
                  v-model="reports[0].reports.reportContent"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="文件">
                <el-input
                  v-model="reports[0].reports.reportPath"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="reports[0].reports.note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="其他附件">
            <el-popover trigger="click">
              <el-form-item label="类型名称">
                <el-input
                  v-model="reports[0].attachments[0].attachmentName"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="附件类型">
                <el-input
                  v-model="reports[0].attachments[0].attachmentType"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="附件路径">
                <el-input
                  v-model="reports[0].attachments[0].attachmentPath"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input
                  v-model="reports[0].attachments[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="reports[0].note"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 法务阶段 -->
        <el-form :model="raider[0]" v-if="raider" label-width="100px" id="raider">
          <el-form-item style="background: #f1f1fa;">
            <h2>法务阶段</h2>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              type="text"
              v-model="raider[0].name"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="进行情况">
            <el-input
              type="text"
              v-model="raider[0].progress"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="汇报日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="raider[0].appointDate"
              :class="{showborder:true, border:!isread}"
              :readonly="isread"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="联系方式">
            <el-input
              type="text"
              v-model="raidercontacts"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="报告">
            <el-popover trigger="click">
              <el-form-item label="提交日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="raider[0].reports[0].submitDate"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="类型">
                <el-input
                  v-model="raider[0].reports[0].reportType"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input
                  v-model="raider[0].reports[0].reportContent"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="文件">
                <el-input
                  v-model="raider[0].reports[0].reportPath"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="raider[0].reports[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="附件">
            <el-popover trigger="click">
              <el-form-item label="提交日期">
                <el-input
                  v-model="raider[0].attachments[0].attachmentName"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件类型">
                <el-input
                  v-model="raider[0].attachments[0].attachmentType"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件路径">
                <el-input
                  v-model="raider[0].attachments[0].attachmentPath"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input
                  v-model="raider[0].reports[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="raider[0].note"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 诉讼阶段 -->
        <el-form :model="litigator[0]" v-if="litigator" label-width="100px" id="litigator">
          <el-form-item style="background: #f1f1fa;">
            <h2>诉讼阶段</h2>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              type="text"
              v-model="litigator[0].name"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="进行情况">
            <el-input
              type="text"
              v-model="litigator[0].progress"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="代理机构">
            <el-input
              type="text"
              v-model="litigator[0].agency"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="身份">
            <el-input
              type="text"
              v-model="litigator[0].role"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="汇报日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="litigator[0].appointDate"
              style="border: none;width: 100%;"
              :readonly="isread"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="联系方式">
            <el-input
              type="text"
              v-model="raidercontacts"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>

          <el-form-item label="报告">
            <el-popover trigger="click">
              <el-form-item label="提交日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="litigator[0].reports[0].submitDate"
                  style="border: none;width: 100%;"
                  :class="{showborder:true, border:!isread}"
                  :readonly="isread"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="类型">
                <el-input
                  v-model="litigator[0].reports[0].reportType"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input
                  v-model="litigator[0].reports[0].reportContent"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="文件">
                <el-input
                  v-model="litigator[0].reports[0].reportPath"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="litigator[0].reports[0].note"
                  :readonly="isread"
                  :class="{showborder:true, border:!isread}"
                ></el-input>
              </el-form-item>
              <el-button slot="reference">详情</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="litigator[0].note"
              :readonly="isread"
              :class="{showborder:true, border:!isread}"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="tab-div-btn">
          <el-button @click="submit(paticipants)">提交</el-button>
          <el-button @click="disbianji()">取消</el-button>
          <el-button>选择阶段</el-button>
          <el-button>新建</el-button>
          <!-- <el-button type="primary">选择阶段</el-button> -->
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>


<script>
/* api 接口 */
import {
  _getpaticipants,
  _getbaseInfo,
  _getclientInfo,
  _gettargetInfo,
  _getaccounting
} from "../../services/service";

export default {
  data() {
    return {
      isread: true,
      data: {},
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

      baseInfo: null, // 案件信息
      clientInfo: null, //客户信息
      targetInfo: null, //目标信息
      accounting: null, // 财务信息

      paticipants: null, // 案件流程表
      discoverer: null, // 接洽
      investigator: null, // 调查
      reports: null, // 报告
      raider: null, // 法务
      litigator: null, // 诉讼

      activename: "0", // tab 切换的角标

      /* 对话框 */
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",

      /* 消息提醒 */
      news:{
        content:'',
        date:''
      }
    };
  },
  created() {
    this.getPaticipants();
    this.getbaseInfo();
    this.getclientInfo();
    this.gettargetInfo();
    this.getaccounting();
  },
  computed: {
    discoverercontacts: {
      get() {
        return this.discoverer[0].contacts.toString();
      },
      set(val) {
        this.discoverer[0].contacts = val.split(",");
      }
    },
    investigatorcontacts: {
      get() {
        return this.investigator[0].contacts.toString();
      },
      set(val) {
        this.investigator[0].contacts = val.split(",");
      }
    },
    reportscontacts: {
      get() {
        return this.reports[0].contacts.toString();
      },
      set(val) {
        this.reports[0].contacts = val.split(",");
      }
    },
    raidercontacts: {
      get() {
        return this.raider[0].contacts.toString();
      },
      set(val) {
        this.raider[0].contacts = val.split(",");
      }
    },
    currentParticipants: {
      get() {
        return this.baseInfo[0].currentParticipants.toString();
      },
      set(val) {
        this.baseInfo[0].currentParticipants = val.split(",");
      }
    }
  },
  methods: {
    /* 获取案件流程数据 */
    getPaticipants() {
      _getpaticipants().then(res => {
        console.info(res);

        // /* 分别获取子表内容 */
        this.discoverer = res.discoverer;
        this.investigator = res.investigator;
        this.reports = res.reports;
        this.raider = res.raider;
        this.litigator = res.litigator;
        this.paticipants = res;

        // 判断其状态
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

    // 获取各个表接口 赋值
    getbaseInfo() {
      _getbaseInfo().then(res => {
        this.baseInfo = res;
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
    returnTop: function(item) {
      // this.data = this[item];
      let tomao = "#" + item; // 锚点跳转
      console.info(item + " " + tomao);
      this.activename = "4";
      /* $ref 当前文档流 */

      let t;
      clearTimeout(t);
      t = setTimeout(function() {
        document.querySelector(tomao).scrollIntoView(true);
      }, 100);
    },

    /* tab切换事件 */
    handleClick(tab, event) {
      // console.info(tab + " " + event);
      // console.info(tab);
    },

    /* 编辑 */
    bianji() {
      this.isread = false;
    },

    /* 取消 */
    disbianji() {
      this.isread = false;
    },

    /* 提交 */
    submit(item) {
      this.isread = true;
      console.info(item);
      alert("提交成功！");
    },
    /* 新建 */
    add(discovererForm){
      console.info(discovererForm)
      console.info(this.$refs.discovererForm)

      this.$nextTick(()=>{
        this.$refs[discovererForm].resetFields()
      })
      this.$refs[discovererForm].resetFields()
    },
    /* 提交消息 */
    commitnews(item){
      console.info(item)
      this.dialogFormVisible = false
    },
    /* 处理数组字符串 */
    /* 新建 */
    newupdate(item){
      for (const key in item) {
        // console.info(key)
        console.info(item[key])
        item[key]=''
      }
    }
  },
  
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
      div.colorred {
        background: #9e1c1c !important;
        z-index: 100;
      }
      div.colorgreen {
        background: #1c9e2b;
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
    }
  }
}
.tab-div-btn {
  display: flex;
  justify-content: center;
  margin: 20px 0px;
}

.btn-border {
  display: flex;
  justify-content: flex-end;
  .detail-btn {
    margin-bottom: 15px;
  }
}
.showborder {
  border: 1px solid transparent;
  border-radius: 4px;
}
.border {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>

