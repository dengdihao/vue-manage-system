<template>
  <div>
    <el-card class="box-card">
      <div class="detail-header clearfix" slot="header">
        <div class="border-bottom"></div>
        <ul class="detail-div">
          <li v-for="(item,index) in stage" :key="index">
            <div class="detail-ul-content">{{item.stagename}}</div>

            <a :href="'#'+item.id">
              <div
                class="detail-ul-icon"
                :class="{colorred:item.isshow,colorgreen:item.isshowg}"
                @mousemove="show(index)"
                @mouseout="disshow(index)"
                @click="toList()"
              ></div>
            </a>
          </li>
        </ul>
      </div>

      <el-tabs type="border-card">
        <el-tab-pane label="案件流程">
          <form action model>
            

            <!-- 接洽阶段 -->
            <div class="detail-btn-div">
              <div
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="bianji(discoverertab)"
              >
                <i class="el-icon-edit-outline"></i>编辑该信息模块
              </div>
            </div>
            <div id="discoverer">
              <div class="phui-main-header">接洽阶段</div>
              <div class="phui-main-column">
                <!-- <div class="phui-header-shell">信息</div> -->
                <div class="phui-div-content" v-for="(item,index) in discoverertab" :key="index">
                  <div class="div-active">{{item.title}}</div>
                  <div>
                    <input
                      autofocus
                      class="input-new-tag"
                      :class="{isboder:item.inputVisible}"
                      v-model="item.content"
                      :readonly="item.inputVisible ? false : 'readonly'"
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-div-btn">
              <el-button @click="submit(discoverertab,discoverer)">提交</el-button>
              <el-button @click="disbianji(discoverertab)">取消</el-button>
              <el-button>选择阶段</el-button>
              <el-button>新建</el-button>
              <!-- <el-button type="primary">选择阶段</el-button> -->
            </div>
            

            <!-- 调查阶段 -->
            <div id="investigator">
              <div class="detail-btn-div">
              <div
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="bianji(investigatortab)"
              >
                <i class="el-icon-edit-outline"></i>编辑该信息模块
              </div>
            </div>
              <div class="phui-main-header">调查阶段</div>
              <div class="phui-main-column">
                <!-- <div class="phui-header-shell">信息</div> -->
                <div class="phui-div-content" v-for="(item,index) in investigatortab" :key="index">
                  <div class="div-active">{{item.title}}</div>
                  <div>
                    <input
                      autofocus
                      class="input-new-tag"
                      :class="{isboder:item.inputVisible}"
                      v-model="item.content"
                      :readonly="item.inputVisible ? false : 'readonly'"
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-div-btn">
              <el-button @click="submit(investigatortab,investigator)">提交</el-button>
              <el-button @click="disbianji(investigatortab)">取消</el-button>
              <el-button>选择阶段</el-button>
              <el-button>新建</el-button>
              <!-- <el-button type="primary">选择阶段</el-button> -->
            </div>

            <!-- 报告阶段 -->
            
            <div id="reports">
              <div class="detail-btn-div">
              <div
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="bianji(reportstab)"
              >
                <i class="el-icon-edit-outline"></i>编辑该信息模块
              </div>
            </div>
              <div class="phui-main-header">报告阶段</div>
              <div class="phui-main-column">
                <!-- <div class="phui-header-shell">信息</div> -->
                <div class="phui-div-content" v-for="(item,index) in reportstab" :key="index">
                  <div class="div-active">{{item.title}}</div>
                  <div>
                    <input
                      autofocus
                      class="input-new-tag"
                      :class="{isboder:item.inputVisible}"
                      v-model="item.content"
                      :readonly="item.inputVisible ? false : 'readonly'"
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-div-btn">
              <el-button @click="submit(reportstab,reports)">提交</el-button>
              <el-button @click="disbianji(reportstab)">取消</el-button>
              <el-button>选择阶段</el-button>
              <el-button>新建</el-button>
              <!-- <el-button type="primary">选择阶段</el-button> -->
            </div>

            <!-- 法务阶段 -->
            
            <div id="raider">
              <div class="detail-btn-div">
              <div
                class="detail-btn"
                style="color:#409EFF;font-size:14px;cursor: pointer;"
                @click="bianji(raidertab)"
              >
                <i class="el-icon-edit-outline"></i>编辑该信息模块
              </div>
            </div>
              <div class="phui-main-header">法务阶段</div>
              <div class="phui-main-column">
                <!-- <div class="phui-header-shell">信息</div> -->
                <div class="phui-div-content" v-for="(item,index) in raidertab" :key="index">
                  <div class="div-active">{{item.title}}</div>
                  <div>
                    <input
                      autofocus
                      class="input-new-tag"
                      :class="{isboder:item.inputVisible}"
                      v-model="item.content"
                      :readonly="item.inputVisible ? false : 'readonly'"
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-div-btn">
              <el-button @click="submit(raidertab,raider)">提交</el-button>
              <el-button @click="disbianji(raidertab)">取消</el-button>
              <el-button>选择阶段</el-button>
              <el-button>新建</el-button>
              <!-- <el-button type="primary">选择阶段</el-button> -->
            </div>

            <!-- 诉讼阶段 -->
            <div id="litigator">
              <div class="detail-btn-div">
                <div
                  class="detail-btn"
                  style="color:#409EFF;font-size:14px;cursor: pointer;"
                  @click="bianji(litigatortab)"
                >
                  <i class="el-icon-edit-outline"></i>编辑该信息模块
                </div>
              </div>
              <div class="phui-main-header">诉讼阶段</div>
              <div class="phui-main-column">
                <!-- <div class="phui-header-shell">信息</div> -->
                <div class="phui-div-content" v-for="(item,index) in litigatortab" :key="index">
                  <div class="div-active">{{item.title}}</div>
                  <div>
                    <input
                      autofocus
                      class="input-new-tag"
                      :class="{isboder:item.inputVisible}"
                      v-model="item.content"
                      :readonly="item.inputVisible ? false : 'readonly'"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-div-btn">
              <el-button @click="submit(litigatortab,litigator)">提交</el-button>
              <el-button @click="disbianji(litigatortab)">取消</el-button>
              <!-- <el-button type="primary">选择阶段</el-button> -->
            </div>
          </form>
        </el-tab-pane>

        <el-tab-pane label="案件基本信息">
          <div class="detail-btn-div">
            <div
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="bianji(baseInfotab)"
            >
              <i class="el-icon-edit-outline"></i>编辑该信息模块
            </div>
          </div>
          <form action model>
            <div class="phui-main-column">
              <!-- <div class="phui-header-shell">信息</div> -->
              <div class="phui-div-content" v-for="(item,index) in baseInfotab" :key="index">
                <div class="div-active">{{item.title}}</div>
                <div>
                  <input
                    autofocus
                    class="input-new-tag"
                    :class="{isboder:item.inputVisible}"
                    v-model="item.content"
                    :readonly="item.inputVisible ? false : 'readonly'"
                  >
                </div>
              </div>
            </div>
            <div class="tab-div-btn">
              <el-button @click="submit(baseInfotab,baseInfo)">提交</el-button>
              <el-button @click="disbianji(baseInfotab)">取消</el-button>
              <!-- <el-button type="primary">选择阶段</el-button> -->
            </div>
          </form>
        </el-tab-pane>
        <el-tab-pane label="客户信息">
          <div class="detail-btn-div">
            <div
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="bianji(clientInfotab)"
            >
              <i class="el-icon-edit-outline"></i>编辑该信息模块
            </div>
          </div>
          <form action model>
            <div class="phui-main-column">
              <!-- <div class="phui-header-shell">信息</div> -->
              <div class="phui-div-content" v-for="(item,index) in clientInfotab" :key="index">
                <div class="div-active">{{item.title}}</div>
                <div>
                  <input
                    autofocus
                    class="input-new-tag"
                    :class="{isboder:item.inputVisible}"
                    v-model="item.content"
                    :readonly="item.inputVisible ? false : 'readonly'"
                  >
                </div>
              </div>
            </div>
            <div class="tab-div-btn">
              <el-button @click="submit(clientInfotab,clientInfo)">提交</el-button>
              <el-button @click="disbianji(clientInfotab)">取消</el-button>
              <!-- <el-button type="primary">选择阶段</el-button> -->
            </div>
          </form>
        </el-tab-pane>
        <el-tab-pane label="目标信息">
          <div class="detail-btn-div">
            <div
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="bianji(targetInfotab)"
            >
              <i class="el-icon-edit-outline"></i>编辑该信息模块
            </div>
          </div>
          <form action model>
            <div class="phui-main-column">
              <!-- <div class="phui-header-shell">信息</div> -->
              <div class="phui-div-content" v-for="(item,index) in targetInfotab" :key="index">
                <div class="div-active">{{item.title}}</div>
                <div>
                  <input
                    autofocus
                    class="input-new-tag"
                    :class="{isboder:item.inputVisible}"
                    v-model="item.content"
                    :readonly="item.inputVisible ? false : 'readonly'"
                  >
                </div>
              </div>
            </div>
            <div class="tab-div-btn">
              <el-button @click="submit(targetInfotab,targetInfo)">提交</el-button>
              <el-button @click="disbianji(targetInfotab)">取消</el-button>
              <!-- <el-button type="primary">选择阶段</el-button> -->
            </div>
          </form>
        </el-tab-pane>
        <el-tab-pane label="财务信息">
          <div class="detail-btn-div">
            <div
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="bianji(accountingtab)"
            >
              <i class="el-icon-edit-outline"></i>编辑该信息模块
            </div>
          </div>
          <form action model>
            <div class="phui-main-column">
              <!-- <div class="phui-header-shell">信息</div> -->
              <div class="phui-div-content" v-for="(item,index) in accountingtab" :key="index">
                <div class="div-active">{{item.title}}</div>
                <div>
                  <input
                    autofocus
                    class="input-new-tag"
                    :class="{isboder:item.inputVisible}"
                    v-model="item.content"
                    :readonly="item.inputVisible ? false : 'readonly'"
                  >
                </div>
              </div>
            </div>
            <div class="tab-div-btn">
              <el-button @click="submit(accountingtab,accounting)">提交</el-button>
              <el-button @click="disbianji(accountingtab)">取消</el-button>
              <!-- <el-button type="primary">选择阶段</el-button> -->
            </div>
          </form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {
  _getpaticipants,
  _getbaseInfo,
  _getclientInfo,
  _gettargetInfo,
  _getaccounting
} from "../../services/service";
// import common from '../../../static/js/common.js'
import { timeFormat } from "../../../static/js/common.js";
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
          id: "litigator"
        },
        {
          stagename: "诉讼阶段",
          isshow: false,
          isshowg: false,
          obj: "",
          id: "raider"
        }
      ],
      baseInfotab: [
        {
          title: "案件状态",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "status"
        },
        {
          title: "案由",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "reason"
        },
        {
          title: "客户案件号",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "caseNo"
        },
        {
          title: "立案日期",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "openDate"
        },
        {
          title: "案件优先级",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "priority"
        },
        {
          title: "结案方式",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "closeMode"
        },
        {
          title: "案件类型",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "type"
        },
        {
          title: "结案时间",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "closeDate"
        },
        {
          title: "案件号",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "caseNo"
        },
        {
          title: "更新时间",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "updateInfo"
        },
        {
          title: "案件名称",
          inputValue: "",
          content: "111",
          inputVisible: false,
          key: "caseName"
        },
        {
          title: "当前参与人",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "currentParticipants"
        }
      ],
      clientInfotab: [
        {
          title: "客户案件号",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "clientCaseNo"
        },
        {
          title: "客户品牌",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "brands"
        },
        {
          title: "客户指示",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "instructions"
        },
        {
          title: "授权日期",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "authorizeDate"
        },
        {
          title: "出具法律文书",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "documents"
        }
      ],
      targetInfotab: [
        {
          title: "目标名称",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "targetName"
        },
        {
          title: "目标类型",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "targetType"
        },
        {
          title: "工商注册号",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "regNo"
        },
        {
          title: "统一社会信用代码",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "creditNo"
        },
        {
          title: "目标地址",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "targetAdd"
        },
        {
          title: "目标联系方式",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "targetContacts"
        },
        {
          title: "目标人员",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "targetPrincipal"
        },
        {
          title: "关联公司",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "affiliateCompany"
        },
        {
          title: "目标产品信息",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "productInfo"
        }
      ],
      accountingtab: [
        {
          title: "保证金",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "deposit"
        },
        {
          title: "预付款",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "advancePayment"
        },
        {
          title: "退款",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "refund"
        },
        {
          title: "报销",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "repay"
        },
        {
          title: "发票",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "invoice"
        }
      ],
      discoverertab: [
        {
          title: "姓名",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "name"
        },
        {
          title: "进行情况",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "progress"
        },
        {
          title: "汇报日期",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "reportDate"
        },
        {
          title: "联系方式",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "contacts"
        },
        {
          title: "报告",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "report"
        },
        {
          title: "附件",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "attachments"
        },
        {
          title: "备注",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "note"
        }
      ],
      investigatortab: [
        {
          title: "姓名",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "name"
        },
        {
          title: "进行情况",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "progress"
        },
        {
          title: "指派日期",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "appointDate"
        },
        {
          title: "联系方式",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "contacts"
        },
        {
          title: "报告",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "report"
        },
        {
          title: "附件",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "attachments"
        },
        {
          title: "备注",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "note"
        }
      ],
      reportstab: [
        {
          title: "姓名",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "name"
        },
        {
          title: "进行情况",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "progress"
        },
        {
          title: "指派日期",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "appointDate"
        },
        {
          title: "联系方式",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "contacts"
        },
        {
          title: "报告",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "report"
        },
        {
          title: "附件",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "attachments"
        },
        {
          title: "备注",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "note"
        }
      ],
      raidertab: [
        {
          title: "姓名",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "name"
        },
        {
          title: "进行情况",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "progress"
        },
        {
          title: "指派日期",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "appointDate"
        },
        {
          title: "联系方式",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "contacts"
        },
        {
          title: "报告",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "report"
        },
        {
          title: "附件",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "attachments"
        },
        {
          title: "备注",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "note"
        }
      ],
      raidertab: [
        {
          title: "姓名",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "name"
        },
        {
          title: "进行情况",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "progress"
        },
        {
          title: "指派日期",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "appointDate"
        },
        {
          title: "联系方式",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "contacts"
        },
        {
          title: "报告",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "report"
        },
        {
          title: "附件",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "attachments"
        },
        {
          title: "备注",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "note"
        }
      ],
      litigatortab: [
        {
          title: "姓名",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "name"
        },
        {
          title: "进行情况",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "progress"
        },
        {
          title: "代理机构",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "agency"
        },
        {
          title: "身份",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "role"
        },

        {
          title: "指派日期",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "appointDate"
        },
        {
          title: "联系方式",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "contacts"
        },
        {
          title: "报告",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "report"
        },
        {
          title: "附件",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "attachments"
        },
        {
          title: "备注",
          inputValue: "",
          content: "",
          inputVisible: false,
          key: "note"
        }
      ],
      baseInfo: "", // 案件基本信息
      clientInfo: "", // 客户信息
      targetInfo: "", // 目标信息
      accounting: "", // 财务信息
      paticipants: "", // 流程
      discoverer: "", // 接洽
      investigator: "", // 调查
      reports: "", //报告
      raider: "", // 法务
      litigator: "" // 诉讼
    };
  },
  created() {
    this.getpaticipants(); // 案件流程
    this.getbaseInfo(); // 基本信息
    this.getclientInfo(); //客户信息
    this.gettargetInfo(); // 目标信息
    this.getaccounting(); // 财务信息
  },
  computed: {
    content: {
      get: function() {
        return this.content;
      },
      set: function(val) {
        if (typeof val === Number) {
          console.info("数字");
        }
      }
    }
  },

  methods: {
    show(index) {
      // this.stage[index].isshow = true;
    },

    disshow(index) {
      // this.stage[index].isshow = false;
    },

    /* 获取流程信息判断完成情况 */
    getpaticipants() {
      _getpaticipants()
        .then(res => {
          /* 接洽阶段 */
          if (res.discoverer[0].progress === "进行中") {
            this.stage[0].isshow = true;
          } else if (res.discoverer[0].progress === "已完成") {
            this.stage[0].isshowg = true;
          }

          /* 调查 */
          if (res.investigator[0].progress === "进行中") {
            this.stage[1].isshow = true;
          } else if (res.investigator[0].progress === "已完成") {
            this.stage[1].isshowg = true;
          }

          /* 报告 */
          if (res.reports[0].progress === "进行中") {
            this.stage[2].isshow = true;
          } else if (res.reports[0].progress === "已完成") {
            this.stage[2].isshowg = true;
          }

          /* 法务 */
          if (res.litigator[0].progress === "进行中") {
            this.stage[3].isshow = true;
          } else if (res.litigator[0].progress === "已完成") {
            this.stage[3].isshowg = true;
          }

          /* 诉讼 */
          if (res.raider[0].progress === "进行中") {
            this.stage[4].isshow = true;
          } else if (res.raider[0].progress === "已完成") {
            this.stage[4].isshowg = true;
          }
          this.paticipants = res;
          console.info(res);
          this.discoverer = this.paticipants.discoverer[0]; //接洽
          this.investigator = this.paticipants.investigator[0]; //调查
          this.reports = this.paticipants.reports[0]; //报告
          this.litigator = this.paticipants.litigator[0]; //法务
          this.raider = this.paticipants.raider[0]; //诉讼
          console.info("接洽");
          console.info(this.discoverer);
          this.discoverertab.forEach(item => {
            item.content = this.discoverer[item.key];
          });
          console.info("调查");
          console.info(this.investigator);
          this.investigatortab.forEach(item => {
            item.content = this.investigator[item.key];
          });

          console.info("报告");
          console.info(this.reports);
          this.reportstab.forEach(item => {
            item.content = this.reports[item.key];
          });

          console.info("法务");
          console.info(this.raider);
          this.raidertab.forEach(item => {
            item.content = this.raider[item.key];
          });

          console.info("诉讼");
          console.info(this.litigator);
          this.litigatortab.forEach(item => {
            item.content = this.litigator[item.key];
          });
        })
        .catch(err => {
          console.info("错误");
        });
    },
    /* 获取案子基本信息 */
    getbaseInfo() {
      _getbaseInfo().then(res => {
        this.baseInfo = res[0];

        this.baseInfotab.forEach(item => {
          item.content = this.baseInfo[item.key];
        });

        for (let index = 0; index < this.baseInfotab.length; index++) {
          if (this.baseInfotab[index].key === "openDate") {
            this.baseInfotab[index].content = timeFormat(
              this.baseInfo.updateInfo[0].updateTime
            );
          }

          if (this.baseInfotab[index].key === "closeDate") {
            this.baseInfotab[index].content = timeFormat(
              this.baseInfo.updateInfo[0].updateTime
            );
          }

          if (this.baseInfotab[index].key === "updateInfo") {
            this.baseInfotab[index].content = timeFormat(
              this.baseInfo.updateInfo[0].updateTime
            );
          }
        }
      });
    },
    /* 获取客户信息 */
    getclientInfo() {
      _getclientInfo().then(res => {
        this.clientInfo = res[0];

        this.clientInfotab.forEach(item => {
          item.content = this.clientInfo[item.key];
        });
      });
    },
    /* 获取目标信息 */
    gettargetInfo() {
      _gettargetInfo().then(res => {
        this.targetInfo = res[0];
        this.targetInfotab.forEach(item => {
          item.content = this.targetInfo[item.key];
        });
      });
    },

    getaccounting() {
      _getaccounting().then(res => {
        this.accounting = res[0];
        this.accountingtab.forEach(item => {
          item.content = this.accounting[item.key];
        });
      });
    },

    toList() {
      console.info(1);
    },

    /* 编辑按钮 */
    bianji(obj) {
      obj.forEach(item => {
        item.inputVisible = true;
      });
    },
    /* 取消编辑 */
    disbianji(obj) {
      obj.forEach(item => {
        item.inputVisible = false;
      });
    },
    /* 提交按钮 */
    submit(obj, postobj) {
      obj.forEach(item => {
        item.inputVisible = false;
      });
      alert("提交成功");
    }
  },
  filters: {
    manage: function(val) {
      if (typeof val === Number) {
        console.info("数字");
      }
    }
  }
};
</script>


<style lang="less" scoped>
.phui-main-header {
  padding: 10px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: 700;
  background: #ccc;
}
.phui-main-column {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.phui-div-content {
  display: flex;
  align-items: center;
  width: 50%;
  & > div {
    flex: 1;
  }
  .div-active {
    background: #f2f9fc;
    flex: 0.3;
    padding: 10px;
    // padding: 0 2px;
    padding-left: 20px;
  }
}

.detail-header {
  position: relative;
  .border-bottom {
    width: 100%;
    // position: absolute;
    border-bottom: 5px solid #d4d4d4;
    position: absolute;
    top: 39px;
  }
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
.detail-btn-div {
  display: flex;
  justify-content: flex-end;
  .detail-btn {
    padding: 0 15px 15px 0;
    color: #bfbfbf;
    & > i {
      margin-right: 2px;
    }
  }
}

.input-new-tag {
  border: 1px solid transparent;
  padding: 0 10px;
  width: 95%;
  font-size: 14px;
  height: 35px;
}

.button-new-tag {
  margin-left: 10px;
}
.isboder {
  border: 1px solid rgb(64, 158, 255);
}

.tab-div-btn {
  display: flex;
  justify-content: center;
  margin: 20px 0px;
}
</style>
