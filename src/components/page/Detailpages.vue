<template>
  <el-card>
    <div class="detail-header clearfix" slot="header">
      <div class="border-bottom"></div>
      <ul class="detail-div">
        <li v-for="(item,index) in stage" :key="index">
          <div class="detail-ul-content">{{item.stagename}}</div>
          <div
            class="detail-ul-icon"
            :class="{colorred:item.isshow,colorgreen:item.isshowg}"
            @click="returnTop(index)"
          ></div>
        </li>
      </ul>
    </div>

    <el-tabs type="border-card" v-model="activename" @tab-click="handleClick">
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
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="commitnews(news)">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 案件信息 -->
      <el-tab-pane label="案件信息" id="caseBase">
        <form :model="baseInfo" v-if="baseInfo">
          <div class="clearfix btn-border">
            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editB()"
            >编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editBno()"
            >取消编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="updateB(baseInfo)"
            >更新信息</el-button>

            <!-- 消息对话框 -->
            <el-button size="mini"
              class="detail-btn"
              @click="dialogFormVisible = true"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >新建消息</el-button>
          </div>
          <table class="ntable">
            <p v-show="false" v-if="baseInfo">{{baseInfo.id}}</p>
            <tr>
              <td class="tb" width="20%">案件号</td>
              <td width="30%">
                <el-input v-model="baseInfo.caseNo" v-if="bisShow"></el-input>
                <div v-else>{{baseInfo.caseNo}}</div>
              </td>
              <td class="tb" width="20%">案件类型</td>
              <td width="30%">
                <el-select
                  v-model="baseInfo.type"
                  placeholder="请选择"
                  v-if="bisShow"
                  style="width: 100%;"
                >
                  <el-option label="行政" value="行政"></el-option>
                  <el-option label="调查" value="调查"></el-option>
                  <el-option label="诉讼" value="诉讼"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
                <div v-else>{{baseInfo.type}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">立案日期</td>
              <td width="30%">
                <el-date-picker
                  v-model="baseInfo.openDate"
                  type="date"
                  placeholder="选择日期"
                  v-if="bisShow"
                  style="width: 100%;"
                  format="yyyy 年 MM 月 dd 日"
                ></el-date-picker>
                <div v-else>{{baseInfo.openDate}}</div>
              </td>
              <td class="tb" width="20%">案件名称</td>
              <td width="30%">
                <el-input v-model="baseInfo.caseName" v-if="bisShow"></el-input>
                <div v-else>{{baseInfo.caseName}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">结案日期</td>

              <td width="30%">
                <el-date-picker
                  v-model="baseInfo.closeDate"
                  type="date"
                  placeholder="选择日期"
                  v-if="bisShow"
                  style="width: 100%;"
                  format="yyyy 年 MM 月 dd 日"
                ></el-date-picker>
                <div v-else>{{baseInfo.closeDate}}</div>
              </td>
              <td class="tb" width="20%">案由</td>
              <td width="30%">
                <el-input v-model="baseInfo.reason" v-if="bisShow"></el-input>
                <div v-else>{{baseInfo.reason}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">结案方式</td>
              <td width="30%">
                <el-select
                  v-model="baseInfo.closeMode"
                  placeholder="请选择"
                  v-if="bisShow"
                  style="width: 100%;"
                >
                  <el-option label="和解" value="和解"></el-option>
                  <el-option label="中止" value="中止"></el-option>
                  <el-option label="终止" value="终止"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
                <div v-else>{{baseInfo.closeMode}}</div>
              </td>
              <td class="tb" width="20%">备注</td>
              <td width="30%">
                <el-input v-model="baseInfo.note" v-if="bisShow"></el-input>
                <div v-else>{{baseInfo.note}}</div>
              </td>
            </tr>
          </table>
        </form>
      </el-tab-pane>
      <!-- 客户信息 -->
      <el-tab-pane label="客户信息">
        <form action :model="clientInfo" v-if="clientInfo">
          <div class="clearfix btn-border">
            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editC()"
            >编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editCno()"
            >取消编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="updateC(clientInfo)"
            >更新信息</el-button>

            <el-button size="mini"
              class="detail-btn"
              @click="dialogFormVisible = true"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >新建消息</el-button>
          </div>
          <table class="ntable">
            <p v-show="false" v-if="clientInfo.id"></p>
            <tr>
              <td class="tb" width="20%">客户案件号</td>
              <td width="30%">
                <el-input v-model="clientInfo.clientCaseNo" v-if="cisShow"></el-input>
                <div v-else>{{clientInfo.clientCaseNo}}</div>
              </td>
              <td class="tb" width="20%">客户品牌</td>
              <td width="30%">
                <el-input v-model="clientInfo.brands" v-if="cisShow"></el-input>
                <div v-else>{{clientInfo.brands}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">客户指示</td>
              <td width="30%">
                <el-input v-model="clientInfo.instructions" v-if="cisShow"></el-input>
                <div v-else>{{clientInfo.instructions}}</div>
              </td>
              <td class="tb" width="20%">授权日期</td>
              <td width="30%">
                <el-date-picker
                  v-model="clientInfo.authorizeDate"
                  type="date"
                  placeholder="选择日期"
                  v-if="cisShow"
                  style="width: 100%;"
                ></el-date-picker>
                <div v-else>{{clientInfo.authorizeDate}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">出具法律文书</td>
              <td width="30%">
                <span>名称:{{clientInfo.documents[0].documentName}} <el-button size="mini" @click="readPath(clientInfo.documents[0].documentPath)">预览文件</el-button></span>
                <el-popover trigger="click" width="800" placement="right">
                  <table class="ntable" v-for="(item,index) in clientInfo.documents" :key="index">
                    <tr>
                      <td width="35%">文书名称</td>
                      <td width="65%">
                        <el-input v-model="item.documentName" v-if="cisShow"></el-input>
                        <div v-else>{{item.documentName}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">出具时间</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="item.issueDate"
                          type="date"
                          placeholder="选择日期"
                          v-if="cisShow"
                          style="width: 100%;"
                          value-format="timestamp"
                        ></el-date-picker>
                        <div v-else>{{item.issueDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      
                      <td width="35%">扫描文件</td>
                      <td width="65%">
                        <el-button size="mini" @click="readPath(item.documentPath)">预览</el-button>
                        <!-- <el-input v-model="item.documentPath" v-if="cisShow"></el-input>
                        <div v-else @click="readPath(item.documentPath)">{{item.documentPath}}</div> -->
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">文书内容</td>
                      <td width="65%">
                        <el-input v-model="item.content" v-if="cisShow"></el-input>
                        <div v-else>{{item.content}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">收到时间</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="item.receiveDate"
                          type="date"
                          placeholder="选择日期"
                          v-if="cisShow"
                          style="width: 100%;"
                          value-format="timestamp"
                        ></el-date-picker>
                        <div v-else>{{item.receiveDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">邮寄时间</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="item.sendDate"
                          type="date"
                          placeholder="选择日期"
                          v-if="cisShow"
                          style="width: 100%;"
                          value-format="timestamp"
                        ></el-date-picker>
                        <div v-else>{{item.sendDate}}</div>
                      </td>
                    </tr>

                    <tr>
                      <td width="35%">附件</td>
                      <td width="65%">
                        <div
                          class="ntable"
                          v-for="(items,index) in item.attachments"
                          :key="index"
                        >
                        <div>{{index+1}} {{items.attachmentName}} <el-button size="mini" @click="readPath(items.attachmentPath)" >预览</el-button></div>
                        </div>

                        <el-button size="mini" @click="diaClient=true" v-if="cisShow" >添加</el-button>
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
                            <el-button size="mini" @click="diaClient = false">取 消</el-button>
                            <el-button size="mini" type="primary" @click="addCliAtt(clientAttCon)">添 加</el-button>
                          </div>
                        </el-dialog>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <el-input v-model="item.note" v-if="cisShow"></el-input>
                        <div v-else>{{item.note}}</div>
                      </td>
                    </tr>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
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
            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editT()"
            >编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editTno()"
            >取消编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="updateT(targetInfo)"
            >更新信息</el-button>
            <!-- 消息对话框 -->
            <el-button size="mini"
              class="detail-btn"
              @click="dialogFormVisible = true"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >新建消息</el-button>
          </div>
          <div class="dtable" v-for="(item,index) in targetInfo" :key="index">
            <p>{{index+1}}</p>
            <p>{{item.targetName}}</p>
            <table class="ntable" v-for="(titem,index) in targetInfo" :key="index">
            <tr>
              <td class="tb" width="20%">目标名称</td>
              <td width="30%">
                <div>{{titem.targetName}}</div>
              </td>
              <td class="tb" width="20%">目标类型</td>
              <td width="30%">
                <div>{{titem.targetType}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">工商注册号</td>
              <td width="30%">
                <div >{{titem.regNo}}</div>
              </td>
              <td class="tb" width="20%">统一社会信用代码</td>
              <td width="30%">
                <div>{{titem.creditNo}}</div>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">目标地址</td>
              <td width="30%">
                <div>{{titem.targetAdd}}</div>
              </td>
              <td class="tb" width="20%">目标联系方式</td>
              <td width="30%">
                <span v-if="titem.contacts">电话:{{titem.contacts[0].phone}}</span>                
                <el-popover trigger="click" width="800" placement="right">
                  <table class="ntable" v-for="(item,index) in titem.contacts" :key="index">
                    <p v-show="false" v-if="item.id">{{item.id}}</p>
                    <tr>
                      <td width="35%">目标网址</td>
                      <td width="65%">
                        <div>{{item.website}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">目标电话</td>
                      <td width="65%">
                        <div >{{item.phone}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">目标邮箱</td>
                      <td width="65%">
                        <div>{{item.email}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">社交号</td>
                      <td>
                        <table class="ntable" v-for="(nitem,index) in item.networks" :key="index">
                          <tr>
                            <td>社交工具</td>
                            <td>
                              <div>{{nitem.networkName}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>号码</td>
                            <td>
                              <div>{{nitem.networkNo}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>备注</td>
                            <td>
                              <div>{{nitem.note}}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <div>{{item.note}}</div>
                      </td>
                    </tr>
                    <p v-show="false" v-if="item.id">{{item.id}}</p>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">目标人员</td>
              <td width="30%">
                <span v-if="titem.principal">{{titem.principal[0].name}} {{titem.principal[0].position}}</span>
                <el-popover trigger="click" width="800" placement="right">
                  <table class="ntable" v-for="(item,index) in titem.principal" :key="index">
                    <tr>
                      <td width="35%">姓名</td>
                      <td width="65%">
                        <div>{{item.name}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">职位</td>
                      <td width="65%">
                        <div>{{item.position}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">证件号码</td>
                      <td width="65%">
                        <div>{{item.iDCard}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">联系方式</td>
                      <td>
                        <table class="ntable" v-for="(citem,index) in item.contacts" :key="index">
                          <p v-show="false" v-if="citem.id">{{citem.id}}</p>
                          <tr>
                            <td>目标电话</td>
                            <td>
                              <div >{{citem.phone}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>目标邮箱</td>
                            <td>
                              <div >{{citem.email}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>社交号</td>
                            <td>
                              <table
                                class="ntable"
                                v-for="(item,index) in citem.networks"
                                :key="index"
                              >
                                <tr>
                                  <td>社交工具</td>
                                  <td>
                                    <div>{{item.networkName}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>号码</td>
                                  <td>
                                    <div>{{item.networkNo}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>备注</td>
                                  <td>
                                    <div>{{item.note}}</div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">是否为累犯</td>
                      <td width="65%">
                        <div>{{item.isRecidivism === true ? '是':'否' }}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <div>{{item.note}}</div>
                      </td>
                    </tr>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">关联公司</td>
              <td width="30%">
                <span>{{titem.affiliateCompany[0].companyName}} </span>
                <el-popover trigger="click" width="800" placement="right">
                  <table
                    class="ntable"
                    v-for="(aitem,index) in titem.affiliateCompany"
                    :key="index"
                  >
                    <p v-show="false" v-if="aitem.id">{{aitem.id}}</p>
                    <tr>
                      <td width="35%">公司名称</td>
                      <td width="65%">
                        <div>{{aitem.companyName}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">主要成员</td>
                      <td>
                        <table class="ntable" v-for="(pitem,index) in aitem.principal" :key="index">
                          <p v-show="false" v-if="pitem.id"></p>
                          <tr>
                            <td>姓名</td>
                            <td>
                              <div>{{pitem.name}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>职位</td>
                            <td>
                              <div>{{pitem.position}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>证件号码</td>
                            <td>
                              <div>{{pitem.iDCard}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>联系方式</td>
                            <td>
                              <table
                                class="ntable"
                                style="margin: 0px 0;"
                                v-for="(citem, index) in pitem.contacts"
                                :key="index"
                              >
                                <p v-show="false" v-if="citem.id">{{citem.id}}</p>
                                <tr>
                                  <td>目标电话</td>
                                  <td>
                                    <div>{{citem.phone}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>目标邮箱</td>
                                  <td>
                                    <div>{{citem.email}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>社交号</td>
                                  <td>
                                    <table
                                      class="ntable"
                                      v-for="(nitem,index) in citem.networks"
                                      :key="index"
                                    >
                                      <tr>
                                        <td>社交工具</td>
                                        <td>
                                          <div>{{nitem.networkName}}</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>号码</td>
                                        <td>
                                          <div>{{nitem.networkNo}}</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>备注</td>
                                        <td>
                                          <div>{{nitem.note}}</div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>备注</td>
                                  <td>
                                    <div>{{citem.note}}</div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">目标产品信息</td>
              <td width="30%">
                <span>{{titem.productInfo[0].productName}}{{titem.productInfo[0].productNo}}</span>
                <el-popover trigger="click" width="800" placement="right">
                  <table class="ntable" v-for="(item,index) in titem.productInfo" :key="index">
                    <p v-show="false" v-if="item.id">{{item.id}}</p>
                    <tr>
                      <td width="35%">产品名称/服务</td>
                      <td width="65%">
                        <div>{{item.productName}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">产品型号</td>
                      <td width="65%">
                        <div>{{item.productNo}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">产品数量</td>
                      <td width="65%">
                        <div>{{item.productQty}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <div>{{item.note}}</div>
                      </td>
                    </tr>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">备注</td>
              <td width="30%">
                <div>{{titem.note}}</div>
              </td>
            </tr>
          </table>
          </div>
          
        </form>
      </el-tab-pane>

      <!-- 财务信息 -->
      <el-tab-pane label="财务信息" :disabled="roleShow">
        <form :model="accounting" v-if="accounting">
          <div class="clearfix btn-border">
            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editA()"
            >编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editAno()"
            >取消编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="updateA(accounting)"
            >更新信息</el-button>

            <!-- 消息对话框 -->
            <el-button size="mini"
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
                  <table class="ntable" v-for="(ditem,index) in accounting.deposit" :key="index">
                    <tr>
                      <td width="35%">是否缴纳</td>
                      <td width="65%">
                        <el-radio-group v-model="ditem.isPaid" v-if="aisShow">
                          <el-radio :label="true">是</el-radio>
                          <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                        <div v-else>{{ditem.isPaid === true ? '是':'否' }}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">金额</td>
                      <td width="65%">
                        <el-input v-model="ditem.amount" v-if="aisShow"></el-input>
                        <div v-else>{{ditem.amount}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">缴纳人</td>
                      <td width="65%">
                        <el-input v-model="ditem.paidPerson" v-if="aisShow"></el-input>
                        <div v-else>{{ditem.paidPerson}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">提交日期</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="ditem.paidDate"
                          type="date"
                          placeholder="选择日期"
                          v-if="aisShow"
                          style="width: 100%;"
                          value-format="timestamp"
                        ></el-date-picker>
                        <div v-else>{{ditem.paidDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <el-input v-model="ditem.note" v-if="aisShow"></el-input>
                        <div v-else>{{ditem.note}}</div>
                      </td>
                    </tr>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">预付款</td>
              <td width="30%">
                <el-popover>
                  <table
                    class="ntable"
                    v-for="(aitem,index) in accounting.advancePayment"
                    :key="index"
                  >
                    <tr>
                      <td width="35%">是否缴纳</td>
                      <td width="65%">
                        <el-radio-group v-model="aitem.isPaid" v-if="aisShow">
                          <el-radio :label="true">是</el-radio>
                          <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                        <div v-else>{{aitem.isPaid === true ? '是':'否' }}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">金额</td>
                      <td width="65%">
                        <el-input v-model="aitem.amount" v-if="aisShow"></el-input>
                        <div v-else>{{aitem.amount}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">缴纳人</td>
                      <td width="65%">
                        <el-input v-model="aitem.paidPerson" v-if="aisShow"></el-input>
                        <div v-else>{{aitem.paidPerson}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">提交日期</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="aitem.paidDate"
                          type="date"
                          placeholder="选择日期"
                          v-if="aisShow"
                          style="width: 100%;"
                          value-format="timestamp"
                        ></el-date-picker>
                        <div v-else>{{aitem.paidDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <el-input v-model="aitem.note" v-if="aisShow"></el-input>
                        <div v-else>{{aitem.note}}</div>
                      </td>
                    </tr>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">退款</td>
              <td width="30%">
                <el-popover>
                  <table class="ntable" v-for="(ritem,index) in accounting.refund" :key="index">
                    <tr>
                      <td width="35%">是否申请</td>
                      <td width="65%">
                        <el-radio-group v-model="ritem.isApplyRefund" v-if="aisShow">
                          <el-radio :label="true">是</el-radio>
                          <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                        <div v-else>{{ritem.isApplyRefund === true ? '是':'否' }}</div>
                      </td>
                    </tr>

                    <tr>
                      <td width="35%">申请人</td>
                      <td width="65%">
                        <el-input v-model="ritem.applyPerson" v-if="aisShow"></el-input>
                        <div v-else>{{ritem.applyPerson}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">申请事由</td>
                      <td width="65%">
                        <el-input v-model="ritem.applyReason" v-if="aisShow"></el-input>
                        <div v-else>{{ritem.applyReason}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">申请日期</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="ritem.applyDate"
                          type="date"
                          placeholder="选择日期"
                          v-if="aisShow"
                          style="width: 100%;"
                          value-format="timestamp"
                        ></el-date-picker>
                        <div v-else>{{ritem.applyDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <el-input v-model="ritem.note" v-if="aisShow"></el-input>
                        <div v-else>{{ritem.note}}</div>
                      </td>
                    </tr>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">报销</td>
              <td width="30%">
                <el-popover>
                  <table class="ntable" v-for="(reitem,index) in accounting.repay" :key="index">
                    <tr>
                      <td width="35%">申请人</td>
                      <td width="65%">
                        <el-input v-model="reitem.applyPerson" v-if="aisShow"></el-input>
                        <div v-else>{{reitem.applyPerson}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">申请事由</td>
                      <td width="65%">
                        <el-input v-model="reitem.applyReason" v-if="aisShow"></el-input>
                        <div v-else>{{reitem.applyReason}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">申请日期</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="reitem.applyDate"
                          type="date"
                          placeholder="选择日期"
                          v-if="aisShow"
                          style="width: 100%;"
                          value-format="timestamp"
                        ></el-date-picker>
                        <div v-else>{{reitem.applyDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <el-input v-model="reitem.note" v-if="aisShow"></el-input>
                        <div v-else>{{reitem.note}}</div>
                      </td>
                    </tr>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
                </el-popover>
              </td>
            </tr>
            <tr>
              <td class="tb" width="20%">发票</td>
              <td width="30%">
                <el-popover>
                  <table class="ntable" v-for="(item,index) in accounting.invoice" :key="index">
                    <tr>
                      <td width="35%">抬头</td>
                      <td width="65%">
                        <el-input v-model="item.name" v-if="aisShow"></el-input>
                        <div v-else>{{item.name}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">出票日期</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="item.issueDate"
                          type="date"
                          placeholder="选择日期"
                          v-if="aisShow"
                          style="width: 100%;"
                          value-format="timestamp"
                        ></el-date-picker>
                        <div v-else>{{item.issueDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">销账日期</td>
                      <td width="65%">
                        <el-date-picker
                          v-model="item.cancelDate"
                          type="date"
                          placeholder="选择日期"
                          v-if="aisShow"
                          style="width: 100%;"
                          value-format="timestamp"
                        ></el-date-picker>
                        <div v-else>{{item.cancelDate}}</div>
                      </td>
                    </tr>

                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <el-input v-model="item.note" v-if="aisShow"></el-input>
                        <div v-else>{{item.note}}</div>
                      </td>
                    </tr>
                  </table>
                  <el-button size="mini" slot="reference">详情</el-button>
                </el-popover>
              </td>
              <td class="tb" width="20%">备注</td>
              <td width="30%">
                <el-input v-model="accounting.note" v-if="aisShow"></el-input>
                <div v-else>{{accounting.note}}</div>
              </td>
            </tr>
          </table>
        </form>
      </el-tab-pane>

      <!-- 案件基本信息 -->
      <el-tab-pane label="案件流程">
        <el-collapse v-model="activeNames">
          <div class="clearfix btn-border">
            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editP()"
            >编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="editPno()"
            >取消编辑</el-button>

            <el-button size="mini"
              class="detail-btn"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
              @click="updateP()"
            >更新信息</el-button>

            <!-- 消息对话框 -->
            <el-button size="mini"
              class="detail-btn"
              @click="dialogFormVisible = true"
              style="color:#409EFF;font-size:14px;cursor: pointer;"
            >新建消息</el-button>
          </div>
          <el-collapse-item
            title="接洽阶段"
            name="0"
            v-model="discoverer"
            v-if="discoverer"
            ref="discoverer"
          >
            <table class="ntable" v-for="(disc,index) in discoverer" :key="index">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">
                  <el-input v-model="disc.name" v-if="pisShow"></el-input>
                  <div v-else>{{disc.name}}</div>
                </td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">
                  <el-select placeholder="请选择" v-model="disc.progress" v-if="pisShow">
                    <el-option label="进行中" value="进行中"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="未开始" value="未开始"></el-option>
                  </el-select>
                  <div v-else>{{disc.progress}}</div>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">汇报日期</td>
                <td width="30%">
                  <el-date-picker
                    v-model="disc.appointDate"
                    type="date"
                    placeholder="选择日期"
                    v-if="pisShow"
                    style="width: 100%;"
                    value-format="timestamp"
                  ></el-date-picker>
                  <div v-else>{{disc.appointDate}}</div>
                </td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">
                  <el-popover>
                    <table class="ntable" v-for="(disCon,index) in  disc.contacts" :key="index">
                      <tr>
                        <td>网址</td>
                        <td>
                          <el-input v-model="disCon.website" v-if="pisShow"></el-input>
                          <div v-else>{{disCon.website}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>电话</td>
                        <td>
                          <el-input v-model="disCon.phone" v-if="pisShow"></el-input>
                          <div v-else>{{disCon.phone}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>邮箱</td>
                        <td>
                          <el-input v-model="disCon.email" v-if="pisShow"></el-input>
                          <div v-else>{{disCon.email}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>社交号</td>
                        <td>
                          <table
                            class="ntable"
                            v-for="(disNet,index) in disCon.networks"
                            :key="index"
                          >
                            <tr>
                              <td>社交工具</td>
                              <td>
                                <el-input v-model="disNet.networkName" v-if="pisShow"></el-input>
                                <div v-else>{{disNet.networkName}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>社交号</td>
                              <td>
                                <el-input v-model="disNet.networkNo" v-if="pisShow"></el-input>
                                <div v-else>{{disNet.networkNo}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>备注</td>
                              <td>
                                <el-input v-model="disNet.note" v-if="pisShow"></el-input>
                                <div v-else>{{disNet.note}}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(disRep,index) in disc.report" :key="index">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">
                          <el-date-picker
                            v-model="disRep.submitDate"
                            type="date"
                            placeholder="选择日期"
                            v-if="pisShow"
                            style="width: 100%;"
                            value-format="timestamp"
                          ></el-date-picker>
                          <div v-else>{{disRep.submitDate}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">
                          <el-select
                            placeholder="请选择"
                            v-model="disRep.reportType"
                            style="width: 100%;"
                            v-if="pisShow"
                          >
                            <el-option label="请输入" value></el-option>
                            <el-option label="音频" value="音频"></el-option>
                            <el-option label="视频" value="视频"></el-option>
                            <el-option label="文档" value="文档"></el-option>
                            <el-option label="照片" value="照片"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                          </el-select>
                          <div v-else>{{disRep.reportType}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">
                          <el-input v-model="disRep.reportContent" v-if="pisShow"></el-input>
                          <div v-else>{{disRep.reportContent}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">文件路径</td>
                        <td width="65%">
                          <el-input v-model="disRep.reportPath" v-if="pisShow"></el-input>
                          <div v-else>{{disRep.reportPath}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="disRep.note" v-if="pisShow"></el-input>
                          <div v-else>{{disRep.note}}</div>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">附件</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(disAtt,index) in  disc.attachments" :key="index">
                      <tr>
                        <td width="35%">附件名称</td>
                        <td width="65%">
                          <el-input v-model="disAtt.attachmentName" v-if="pisShow"></el-input>
                          <div v-else>{{disAtt.attachmentName}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">附件类型</td>
                        <td width="65%">
                          <el-select
                            placeholder="请选择"
                            v-model="disAtt.attachmentType"
                            style="width: 100%;"
                            v-if="pisShow"
                          >
                            <el-option label="请输入" value></el-option>
                            <el-option label="音频" value="音频"></el-option>
                            <el-option label="视频" value="视频"></el-option>
                            <el-option label="文档" value="文档"></el-option>
                            <el-option label="照片" value="照片"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                          </el-select>
                          <div v-else>{{disAtt.attachmentType}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">附件路径</td>
                        <td width="65%">
                          <el-input v-model="disAtt.attachmentPath" v-if="pisShow"></el-input>
                          <div v-else>{{disAtt.attachmentPath}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="disAtt.note" v-if="pisShow"></el-input>
                          <div v-else>{{disAtt.note}}</div>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">备注</td>
                <td width="30%">
                  <el-input v-model="disc.note" v-if="pisShow"></el-input>
                  <div v-else>{{disc.note}}</div>
                </td>
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
            <table class="ntable" v-for="(inve,index) in investigator" :key="index">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">
                  <el-input v-model="inve.name" v-if="pisShow">222</el-input>
                  <div v-else>{{inve.name}}</div>
                </td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">
                  <el-select placeholder="请选择" v-model="inve.progress" v-if="pisShow">
                    <el-option label="进行中" value="进行中"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="未开始" value="未开始"></el-option>
                  </el-select>
                  <div v-else>{{inve.progress}}</div>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">汇报日期</td>
                <td width="30%">
                  <el-date-picker
                    v-model="inve.appointDate"
                    type="date"
                    placeholder="选择日期"
                    v-if="pisShow"
                    style="width: 100%;"
                    value-format="timestamp"
                  ></el-date-picker>
                  <div v-else>{{inve.appointDate}}</div>
                </td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(inveCon,index) in  inve.contacts" :key="index">
                      <tr>
                        <td>网址</td>
                        <td>
                          <el-input v-model="inveCon.website" v-if="pisShow"></el-input>
                          <div v-else>{{inveCon.website}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>电话</td>
                        <td>
                          <el-input v-model="inveCon.website" v-if="pisShow"></el-input>
                          <div v-else>{{inveCon.website}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>邮箱</td>
                        <td>
                          <el-input v-model="inveCon.website" v-if="pisShow"></el-input>
                          <div v-else>{{inveCon.website}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>社交号</td>
                        <td>
                          <table
                            class="ntable"
                            v-for="(inveNet,index) in inveCon.networks"
                            :key="index"
                          >
                            <tr>
                              <td>社交工具</td>
                              <td>
                                <el-input v-model="inveNet.networkName" v-if="pisShow"></el-input>
                                <div v-else>{{inveNet.networkName}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>社交号</td>
                              <td>
                                <el-input v-model="inveNet.networkNo" v-if="pisShow"></el-input>
                                <div v-else>{{inveNet.networkNo}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>备注</td>
                              <td>
                                <el-input v-model="inveNet.note" v-if="pisShow"></el-input>
                                <div v-else>{{inveNet.note}}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(inveRep,index) in inve.report" :key="index">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">
                          <el-date-picker
                            v-model="inveRep.submitDate"
                            type="date"
                            placeholder="选择日期"
                            v-if="pisShow"
                            style="width: 100%;"
                            value-format="timestamp"
                          ></el-date-picker>
                          <div v-else>{{inveRep.submitDate}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">
                          <el-select
                            placeholder="请选择"
                            v-model="inveRep.reportType"
                            style="width: 100%;"
                            v-if="pisShow"
                          >
                            <el-option label="请输入" value></el-option>
                            <el-option label="音频" value="音频"></el-option>
                            <el-option label="视频" value="视频"></el-option>
                            <el-option label="文档" value="文档"></el-option>
                            <el-option label="照片" value="照片"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                          </el-select>
                          <div v-else>{{inveRep.reportType}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">
                          <el-input v-model="inveRep.reportContent" v-if="pisShow"></el-input>
                          <div v-else>{{inveRep.reportContent}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">文件</td>
                        <td width="65%">
                          <el-input v-model="inveRep.reportPath" v-if="pisShow"></el-input>
                          <div v-else>{{inveRep.reportPath}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="inveRep.note" v-if="pisShow"></el-input>
                          <div v-else>{{inveRep.note}}</div>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">附件</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(inveAtt,index) in inve.attachments" :key="index">
                      <tr>
                        <td width="35%">附件名称</td>
                        <td width="65%">
                          <el-input v-model="inveAtt.attachmentName" v-if="pisShow"></el-input>
                          <div v-else>{{inveAtt.attachmentName}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">附件类型</td>
                        <td width="65%">
                          <el-select
                            placeholder="请选择"
                            v-model="inveAtt.attachmentType"
                            style="width: 100%;"
                            v-if="pisShow"
                          >
                            <el-option label="请输入" value></el-option>
                            <el-option label="音频" value="音频"></el-option>
                            <el-option label="视频" value="视频"></el-option>
                            <el-option label="文档" value="文档"></el-option>
                            <el-option label="照片" value="照片"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                          </el-select>
                          <div v-else>{{inveAtt.attachmentType}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">附件路径</td>
                        <td width="65%">
                          <el-input v-model="inveAtt.attachmentPath" v-if="pisShow"></el-input>
                          <div v-else>{{inveAtt.attachmentPath}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="inveAtt.note" v-if="pisShow"></el-input>
                          <div v-else>{{inveAtt.note}}</div>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">备注</td>
                <td width="30%">
                  <el-input v-model="inve.note" v-if="pisShow"></el-input>
                  <div v-else>{{inve.note}}</div>
                </td>
                <td class="tb" width="20%"></td>
                <td width="30%"></td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="报告阶段" name="2" v-model="reports" v-if="reports" ref="reports">
            <table class="ntable" v-for="(rep,index) in reports" :key="index">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">
                  <el-input v-model="rep.name" v-if="pisShow"></el-input>
                  <div v-else>{{rep.name}}</div>
                </td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">
                  <el-select placeholder="请选择" v-model="rep.progress" v-if="pisShow">
                    <el-option label="进行中" value="进行中"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="未开始" value="未开始"></el-option>
                  </el-select>
                  <div v-else>{{rep.progress}}</div>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">指派日期</td>
                <td width="30%">
                  <el-date-picker
                    v-model="rep.appointDate"
                    type="date"
                    placeholder="选择日期"
                    v-if="pisShow"
                    style="width: 100%;"
                    value-format="timestamp"
                  ></el-date-picker>
                  <div v-else>{{rep.appointDate}}</div>
                </td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(repCon,index) in  rep.contacts" :key="index">
                      <tr>
                        <td>网址</td>
                        <td>
                          <el-input v-model="repCon.website" v-if="pisShow"></el-input>
                          <div v-else>{{repCon.website}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>电话</td>
                        <td>
                          <el-input v-model="repCon.phone" v-if="pisShow"></el-input>
                          <div v-else>{{repCon.phone}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>邮箱</td>
                        <td>
                          <el-input v-model="repCon.email" v-if="pisShow"></el-input>
                          <div v-else>{{repCon.email}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>社交号</td>
                        <td>
                          <table
                            class="ntable"
                            v-for="(repNet,index) in repCon.networks"
                            :key="index"
                          >
                            <tr>
                              <td>社交工具</td>
                              <td>
                                <el-input v-model="repNet.networkName" v-if="pisShow"></el-input>
                                <div v-else>{{repNet.networkName}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>社交号</td>
                              <td>
                                <el-input v-model="repNet.networkNo" v-if="pisShow"></el-input>
                                <div v-else>{{repNet.networkNo}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>备注</td>
                              <td>
                                <el-input v-model="repNet.note" v-if="pisShow"></el-input>
                                <div v-else>{{repNet.note}}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(repRep,index) in rep.report" :key="index">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">
                          <el-date-picker
                            v-model="repRep.submitDate"
                            type="date"
                            placeholder="选择日期"
                            v-if="pisShow"
                            style="width: 100%;"
                            value-format="timestamp"
                          ></el-date-picker>
                          <div v-else>{{repRep.submitDate}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">
                          <el-select
                            placeholder="请选择"
                            v-model="repRep.reportType"
                            style="width: 100%;"
                            v-if="pisShow"
                          >
                            <el-option label="请输入" value></el-option>
                            <el-option label="音频" value="音频"></el-option>
                            <el-option label="视频" value="视频"></el-option>
                            <el-option label="文档" value="文档"></el-option>
                            <el-option label="照片" value="照片"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                          </el-select>
                          <div v-else>{{repRep.reportType}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">
                          <el-input v-model="repRep.reportContent" v-if="pisShow"></el-input>
                          <div v-else>{{repRep.reportContent}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">文件</td>
                        <td width="65%">
                          <el-input v-model="rep.report.reportPath" v-if="pisShow"></el-input>
                          <div v-else>{{repRep.reportPath}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="rep.report.note" v-if="pisShow"></el-input>
                          <div v-else>{{repRep.note}}</div>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">附件</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(repAtt,index) in rep.attachments" :key="index">
                      <tr>
                        <td width="35%">附件名称</td>
                        <td width="65%">
                          <el-input v-model="repAtt.attachmentName" v-if="pisShow"></el-input>
                          <div v-else>{{repAtt.attachmentName}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">附件类型</td>
                        <td width="65%">
                          <el-select
                            placeholder="请选择"
                            v-model="repAtt.attachmentType"
                            style="width: 100%;"
                            v-if="pisShow"
                          >
                            <el-option label="请输入" value></el-option>
                            <el-option label="音频" value="音频"></el-option>
                            <el-option label="视频" value="视频"></el-option>
                            <el-option label="文档" value="文档"></el-option>
                            <el-option label="照片" value="照片"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                          </el-select>
                          <div v-else>{{repAtt.attachmentType}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">附件路径</td>
                        <td width="65%">
                          <el-input v-model="repAtt.attachmentPath" v-if="pisShow"></el-input>
                          <div v-else>{{repAtt.attachmentPath}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="repAtt.note" v-if="pisShow"></el-input>
                          <div v-else>{{repAtt.note}}</div>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">备注</td>
                <td width="30%">
                  <el-input v-model="rep.note" v-if="pisShow"></el-input>
                  <div v-else>{{rep.note}}</div>
                </td>
                <td class="tb" width="20%"></td>
                <td width="30%"></td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="法务阶段" name="3" v-model="raider" v-if="raider" ref="raider">
            <table class="ntable" v-for="(rai,index) in raider" :key="index">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">
                  <el-input v-model="rai.name" v-if="pisShow"></el-input>
                  <div v-else>{{rai.name}}</div>
                </td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">
                  <el-select placeholder="请选择" v-model="rai.progress" v-if="pisShow">
                    <el-option label="进行中" value="进行中"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="未开始" value="未开始"></el-option>
                  </el-select>
                  <div v-else>{{rai.progress}}</div>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">指派日期</td>
                <td width="30%">
                  <el-date-picker
                    v-model="rai.appointDate"
                    type="date"
                    placeholder="选择日期"
                    v-if="pisShow"
                    style="width: 100%;"
                    value-format="timestamp"
                  ></el-date-picker>
                  <div v-else>{{rai.appointDate}}</div>
                </td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(raiCon,index) in  rai.contacts" :key="index">
                      <tr>
                        <td>网址</td>
                        <td>
                          <el-input v-model="raiCon.website" v-if="pisShow"></el-input>
                          <div v-else>{{raiCon.website}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>电话</td>
                        <td>
                          <el-input v-model="raiCon.phone" v-if="pisShow"></el-input>
                          <div v-else>{{raiCon.phone}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>邮箱</td>
                        <td>
                          <el-input v-model="raiCon.email" v-if="pisShow"></el-input>
                          <div v-else>{{raiCon.email}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>社交号</td>
                        <td>
                          <table
                            class="ntable"
                            v-for="(raiNet,index) in raiCon.networks"
                            :key="index"
                          >
                            <tr>
                              <td>社交工具</td>
                              <td>
                                <el-input v-model="raiNet.networkName" v-if="pisShow"></el-input>
                                <div v-else>{{raiNet.networkName}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>社交号</td>
                              <td>
                                <el-input v-model="raiNet.networkNo" v-if="pisShow"></el-input>
                                <div v-else>{{raiNet.networkNo}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>备注</td>
                              <td>
                                <el-input v-model="raiNet.note" v-if="pisShow"></el-input>
                                <div v-else>{{raiNet.note}}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(raiRep,index) in rai.report" :key="index">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">
                          <el-date-picker
                            v-model="raiRep.submitDate"
                            type="date"
                            placeholder="选择日期"
                            v-if="pisShow"
                            style="width: 100%;"
                            value-format="timestamp"
                          ></el-date-picker>
                          <div v-else>{{raiRep.submitDate}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">
                          <el-select
                            placeholder="请选择"
                            v-model="raiRep.reportType"
                            style="width: 100%;"
                            v-if="pisShow"
                          >
                            <el-option label="请输入" value></el-option>
                            <el-option label="音频" value="音频"></el-option>
                            <el-option label="视频" value="视频"></el-option>
                            <el-option label="文档" value="文档"></el-option>
                            <el-option label="照片" value="照片"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                          </el-select>
                          <div v-else>{{raiRep.reportType}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">
                          <el-input v-model="raiRep.reportContent" v-if="pisShow"></el-input>
                          <div v-else>{{raiRep.reportContent}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">文件</td>
                        <td width="65%">
                          <el-input v-model="raiRep.reportPath" v-if="pisShow"></el-input>
                          <div v-else>{{raiRep.reportPath}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="raiRep.note" v-if="pisShow"></el-input>
                          <div v-else>{{raiRep.note}}</div>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">附件</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(raiAtt,index) in rai.attachments" :key="index">
                      <tr>
                        <td width="35%">附件名称</td>
                        <td width="65%">
                          <el-input v-model="raiAtt.attachmentName" v-if="pisShow"></el-input>
                          <div v-else>{{raiAtt.attachmentName}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">附件类型</td>
                        <td width="65%">
                          <el-select
                            placeholder="请选择"
                            v-model="raiAtt.attachmentType"
                            style="width: 100%;"
                            v-if="pisShow"
                          >
                            <el-option label="请输入" value></el-option>
                            <el-option label="音频" value="音频"></el-option>
                            <el-option label="视频" value="视频"></el-option>
                            <el-option label="文档" value="文档"></el-option>
                            <el-option label="照片" value="照片"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                          </el-select>
                          <div v-else>{{raiAtt.attachmentType}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">附件路径</td>
                        <td width="65%">
                          <el-input v-model="raiAtt.attachmentPath" v-if="pisShow"></el-input>
                          <div v-else>{{raiAtt.attachmentPath}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="raiAtt.note" v-if="pisShow"></el-input>
                          <div v-else>{{raiAtt.note}}</div>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">备注</td>
                <td width="30%">
                  <el-input v-model="rai.note" v-if="pisShow"></el-input>
                  <div v-else>{{rai.note}}</div>
                </td>
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
            <table class="ntable" v-for="(lit,index) in litigator" :key="index">
              <tr>
                <td class="tb" width="20%">姓名</td>
                <td width="30%">
                  <el-input v-model="lit.name" v-if="pisShow"></el-input>
                  <div v-else>{{lit.name}}</div>
                </td>
                <td class="tb" width="20%">进行情况</td>
                <td width="30%">
                  <el-select placeholder="请选择" v-model="lit.progress" v-if="pisShow">
                    <el-option label="进行中" value="进行中"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="未开始" value="未开始"></el-option>
                  </el-select>
                  <div v-else>{{lit.progress}}</div>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">指派日期</td>
                <td width="30%">
                  <el-date-picker
                    v-model="lit.appointDate"
                    type="date"
                    placeholder="选择日期"
                    v-if="pisShow"
                    style="width: 100%;"
                    value-format="timestamp"
                  ></el-date-picker>
                  <div v-else>{{lit.appointDate}}</div>
                </td>
                <td class="tb" width="20%">联系方式</td>
                <td width="30%">
                  <el-popover trigger="click" width="600" placement="right">
                    <table class="ntable" v-for="(litCon,index) in  lit.contacts" :key="index">
                      <tr>
                        <td>网址</td>
                        <td>
                          <el-input v-model="litCon.website" v-if="pisShow"></el-input>
                          <div v-else>{{litCon.website}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>电话</td>
                        <td>
                          <el-input v-model="litCon.phone" v-if="pisShow"></el-input>
                          <div v-else>{{litCon.phone}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>邮箱</td>
                        <td>
                          <el-input v-model="litCon.email" v-if="pisShow"></el-input>
                          <div v-else>{{litCon.email}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>社交号</td>
                        <td>
                          <table
                            class="ntable"
                            v-for="(litNet,index) in litCon.networks"
                            :key="index"
                          >
                            <tr>
                              <td>社交工具</td>
                              <td>
                                <el-input v-model="litNet.networkName" v-if="pisShow"></el-input>
                                <div v-else>{{litNet.networkName}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>社交号</td>
                              <td>
                                <el-input v-model="litNet.networkNo" v-if="pisShow"></el-input>
                                <div v-else>{{litNet.networkNo}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>备注</td>
                              <td>
                                <el-input v-model="litNet.note" v-if="pisShow"></el-input>
                                <div v-else>{{litNet.note}}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
              </tr>
              <tr>
                <td class="tb" width="20%">报告</td>
                <td width="30%">
                  <el-popover trigger="click" width="1000" placement="right">
                    <table class="ntable" v-for="(litRep,index) in lit.report" :key="index">
                      <tr>
                        <td width="35%">提交日期</td>
                        <td width="65%">
                          <el-select
                            placeholder="请选择"
                            v-model="litRep.submitDate"
                            style="width: 100%;"
                            v-if="pisShow"
                            value-format="timestamp"
                          >
                            <el-option label="请输入" value></el-option>
                            <el-option label="音频" value="音频"></el-option>
                            <el-option label="视频" value="视频"></el-option>
                            <el-option label="文档" value="文档"></el-option>
                            <el-option label="照片" value="照片"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                          </el-select>
                          <div v-else>{{litRep.submitDate}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">类型</td>
                        <td width="65%">
                          <el-input v-model="litRep.reportType" v-if="pisShow"></el-input>
                          <div v-else>{{litRep.reportType}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">内容</td>
                        <td width="65%">
                          <el-input v-model="litRep.reportContent" v-if="pisShow"></el-input>
                          <div v-else>{{litRep.reportContent}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">文件</td>
                        <td width="65%">
                          <el-input v-model="litRep.reportPath" v-if="pisShow"></el-input>
                          <div v-else>{{litRep.reportPath}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%">备注</td>
                        <td width="65%">
                          <el-input v-model="litRep.note" v-if="pisShow"></el-input>
                          <div v-else>{{litRep.note}}</div>
                        </td>
                      </tr>
                    </table>
                    <el-button size="mini" slot="reference">详情</el-button>
                  </el-popover>
                </td>
                <td class="tb" width="20%">备注</td>
                <td width="30%">
                  <el-input v-model="lit.note" v-if="pisShow"></el-input>
                  <div v-else>{{lit.note}}</div>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <!-- 预览文件 -->
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
  </el-card>
</template>



<script>
import {
  _detailCaseA,
  _detailCaseFc,
  _detailCaseS,
  _detailCaseF,
  _detailCaseR,
  _updateCaseA,
  _updateCaseS,
  _updateCaseR,
  _postUpload
} from "../../services/service";

import { mytoString, mytimeFormat } from "../../../static/js/common.js";
import Axios from "axios";

export default {
  data() {
    return {
      stage: [
        {
          stagename: "接洽阶段",
          isshow: false,
          isshowg: false,
          id: "discoverer"
        },
        {
          stagename: "调查阶段",
          isshow: false,
          isshowg: false,
          id: "investigator"
        },
        {
          stagename: "报告阶段",
          isshow: false,
          isshowg: false,
          id: "reports"
        },
        {
          stagename: "法务阶段",
          isshow: false,
          isshowg: false,
          id: "raider"
        },
        {
          stagename: "诉讼阶段",
          isshow: false,
          isshowg: false,
          id: "litigator"
        }
      ],
      takeObj: {
        case_id: "",
        case_type: "caseBase"
      },
      paticipants: {
        id: null
      },
      discoverer: [
        {
          id: null,
          name: null,
          progress: null,
          appointDate: null,
          contacts: [
            {
              id: null,
              website: null,
              phone: null,
              email: null,
              note: null,
              networks: [
                {
                  networkName: null,
                  networkNo: null,
                  note: null
                }
              ]
            }
          ],
          report: [
            {
              id: null,
              reportType: null,
              submitDate: null,
              reportContent: null,
              reportPath: null,
              note: null
            }
          ],
          attachments: [
            {
              id: null,
              attachmentName: null,
              attachmentType: null,
              attachmentPath: null,
              note: null
            }
          ],
          note: null
        }
      ],
      investigator: [
        {
          id: null,
          name: null,
          progress: null,
          appointDate: null,
          contacts: [
            {
              id: null,
              website: null,
              phone: null,
              email: null,
              note: null,
              networks: [
                {
                  networkName: null,
                  networkNo: null,
                  note: null
                }
              ]
            }
          ],
          report: [
            {
              id: null,
              submitDate: null,
              reportType: null,
              reportContent: null,
              reportPath: null,
              note: null
            }
          ],
          attachments: [
            {
              id: null,
              attachmentName: null,
              attachmentType: null,
              attachmentPath: null,
              note: null
            }
          ],
          note: null
        }
      ],
      reports: [
        {
          id: null,
          name: null,
          progress: null,
          appointDate: null,
          contacts: [
            {
              id: null,
              website: null,
              phone: null,
              email: null,
              note: null,
              networks: [
                {
                  networkName: null,
                  networkNo: null,
                  note: null
                }
              ]
            }
          ],
          report: [
            {
              id: null,
              submitDate: null,
              reportType: null,
              reportContent: null,
              reportPath: null,
              note: null
            }
          ],
          attachments: [
            {
              id: null,
              attachmentName: null,
              attachmentType: null,
              attachmentPath: null,
              note: null
            }
          ],
          note: null
        }
      ],
      raider: [
        {
          id: null,
          name: null,
          progress: null,
          appointDate: null,
          contacts: [
            {
              id: null,
              website: null,
              phone: null,
              email: null,
              note: null,
              networks: [
                {
                  networkName: null,
                  networkNo: null,
                  note: null
                }
              ]
            }
          ],
          report: [
            {
              id: null,
              submitDate: null,
              reportType: null,
              reportContent: null,
              reportPath: null,
              note: null
            }
          ],
          note: null,
          attachments: [
            {
              id: null,
              attachmentName: null,
              attachmentType: null,
              attachmentPath: null,
              备注: null
            }
          ]
        }
      ],
      litigator: [
        {
          id: null,
          name: null,
          progress: null,
          agency: null,
          role: null,
          appointDate: null,
          contacts: [
            {
              id: null,
              website: null,
              phone: null,
              email: null,
              note: null,
              networks: [
                {
                  networkName: null,
                  networkNo: null,
                  note: null
                }
              ]
            }
          ],
          report: [
            {
              id: null,
              submitDate: null,
              reportType: null,
              reportContent: null,
              reportPath: null,
              note: null
            }
          ],
          note: null
        }
      ],

      baseInfo: {
        caseId: null,
        caseName: null,
        caseNo: null,
        closeDate: null,
        closeMode: null,
        id: null,
        openDate: null,
        priority: null,
        reason: null,
        status: null,
        type: null
      }, // 案件信息
      clientInfo: {
        authorizeDate: null,
        brands: null,
        clientCaseNo: null,
        documents: [
          {
            attachments: [
              {
                attachmentName: null,
                attachmentPath: null,
                attachmentType: null,
                id: null,
                note: null
              }
            ],
            content: null,
            documentName: null,
            documentPath: null,
            documentType: null,
            id: null,
            issueDate: null,
            note: null,
            receiveDate: null,
            sendDate: null
          }
        ],
        id: null,
        instructions: null,
        note: null
      },
      diaDocObj: {
        attachments: [
          {
            attachmentPath: null,
            attachmentType: null,
            id: null,
            note: null
          }
        ],
        content: null,
        documentName: null,
        documentPath: null,
        documentType: null,
        id: null,
        issueDate: null,
        note: null,
        receiveDate: null,
        sendDate: null
      },

      //客户信息null,
      targetInfo: [
        {
          affiliateCompany: [
            {
              companyName: null,
              id: null,
              note: null,
              principal: [
                {
                  contacts: [
                    {
                      email: null,
                      id: null,
                      networks: [
                        {
                          note: null,
                          networkName: null,
                          networkNo: null
                        }
                      ],
                      note: null,
                      phone: null
                    }
                  ],
                  iDCard: null,
                  id: null,
                  isRecidivism: true,
                  name: null,
                  note: null,
                  position: null
                }
              ]
            }
          ],
          contacts: [
            {
              email: null,
              id: null,
              networks: [
                {
                  note: null,
                  networkName: null,
                  networkNo: null
                }
              ],
              note: null,
              phone: null,
              website: null
            }
          ],
          creditNo: null,
          id: null,
          note: null,
          principal: [
            {
              contacts: [
                {
                  email: null,
                  id: null,
                  networks: [
                    { note: null, networkName: null, networkNo: null }
                  ],
                  note: null,
                  phone: null
                }
              ],
              iDCard: null,
              id: null,
              isRecidivism: true,
              name: null,
              note: null,
              position: null
            }
          ],
          productInfo: [{}],
          regNo: null,
          targetAdd: null,
          targetName: null,
          targetType: null
        }
      ], //目标信息
      accounting: {
        id: null,
        deposit: [
          {
            isPaid: true,
            amount: null,
            paidPerson: null,
            paidDate: null,
            note: null
          }
        ],
        advancePayment: [
          {
            isPaid: true,
            amount: null,
            paidPerson: null,
            paidDate: null,
            note: null
          }
        ],
        refund: [
          {
            isApplyRefund: true,
            applyPerson: null,
            applyReason: null,
            applyDate: null,
            note: null
          }
        ],
        repay: [
          {
            applyPerson: null,
            applyReason: null,
            applyDate: null,
            note: null
          }
        ],
        invoice: [
          {
            id: null,
            name: null,
            issueDate: null,
            cancelDate: null,
            note: null
          }
        ],
        note: null
      }, // 财务信息

      /* 案件信息 dia*/
      dia_base: false,
      activeNames: ["0"],
      activename: "0",
      /* 消息提醒 */
      dialogFormVisible: false,
      formLabelWidth: "120px",
      news: {
        content: null,
        date: null
      },

      isShow: true,
      bisShow: false,
      cisShow: false,
      aisShow: false,
      pisShow: false,

      pdisShow: false,
      /* dia */
      diaClient: false,
      diaCliDoc: false,
      dialogComplete: false,
      completeTask: "",
      user_role: "",
      roleShow: true,
      /* dia Content */
      clientAttCon: {
        attachmentPath: null,
        attachmentType: null,
        id: null,
        note: null
      }
    };
  },
  methods: {
    /* 获取用户权限 */
    getUserRole() {
      const user_role = sessionStorage.getItem("user_role");
      if (!user_role) {
        this.$message({
          showClose: true,
          message: "没有身份，请重新登陆",
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

    /* 获取案件流程数据 flowPath */
    getPaticipants() {
      if (this.user_role === "Admin") {
        this.takeObj.case_type = "flowPath";
        _detailCaseA(this.takeObj).then(res => {
          this.paticipants.id = res.data.id;
          if (res.data.discoverer.length === 0) {
            res.data.discoverer = null;
            this.discoverer = Object.assign(
              this.discoverer,
              res.data.discoverer
            );
          } else {
            this.discoverer = res.data.discoverer.concat();
          }

          if (res.data.investigator.length === 0) {
            res.data.investigator = null;
            this.investigator = Object.assign(
              this.investigator,
              res.data.investigator
            );
          } else {
            this.investigator = res.data.investigator.concat();
          }

          if (res.data.reports.length === 0) {
            res.data.reports = null;
            this.reports = Object.assign(this.reports, res.data.reports);
          } else {
            this.reports = res.data.reports.concat();
          }

          if (res.data.raider.length === 0) {
            res.data.raider = null;
            this.raider = Object.assign(this.raider, res.data.raider);
          } else {
            this.raider = res.data.raider.concat();
          }

          if (res.data.litigator.length === 0) {
            res.data.litigator = null;
            this.litigator = Object.assign(this.litigator, res.data.litigator);
          } else {
            this.litigator = res.data.litigator.concat();
          }
          if (res.data.organ.length === 0) {
            res.data.organ = null;
          }

          this.stage.forEach(item => {
            if (res.data[item.id] !== null) {
              if (res.data[item.id][0].progress === "进行中") {
                item.isshow = true;
                item.isshowg = false;
              } else if (res.data[item.id][0].progress === "已完成") {
                item.isshowg = true;
                item.isshow = false;
              } else if (res.data[item.id][0].progress === "未开始") {
                item.isshowg = false;
                item.isshow = false;
              }
            }
          });
        });
      } else if (this.user_role === "Supervisor") {
        this.takeObj.case_type = "flowPath";
        _detailCaseS(this.takeObj).then(res => {
          this.paticipants.id = res.data.id;
          if (res.data.discoverer != null) {
            if (res.data.discoverer.length === 0) {
              res.data.discoverer = null;
              this.discoverer = Object.assign(
                this.discoverer,
                res.data.discoverer
              );
            } else {
              this.discoverer = res.data.discoverer.concat();
            }
          }

          if (res.data.investigator.length === 0) {
            res.data.investigator = null;
            this.investigator = Object.assign(
              this.investigator,
              res.data.investigator
            );
          } else {
            this.investigator = res.data.investigator.concat();
          }

          if (res.data.reports.length === 0) {
            res.data.reports = null;
            this.reports = Object.assign(this.reports, res.data.reports);
          } else {
            this.reports = res.data.reports.concat();
          }

          if (res.data.raider.length === 0) {
            res.data.raider = null;
            this.raider = Object.assign(this.raider, res.data.raider);
          } else {
            this.raider = res.data.raider.concat();
          }

          if (res.data.litigator.length === 0) {
            res.data.litigator = null;
            this.litigator = Object.assign(this.litigator, res.data.litigator);
          } else {
            this.litigator = res.data.litigator.concat();
          }
          if (res.data.organ.length === 0) {
            res.data.organ = null;
          }

          debugger;
          this.stage.forEach(item => {
            if (res.data[item.id] !== null) {
              if (res.data[item.id][0].progress === "进行中") {
                item.isshow = true;
              } else if (res.data[item.id][0].progress === "已完成") {
                item.isshowg = true;
              }
            }
          });
        });
      } else if (this.user_role === "ReportingStaff") {
        this.takeObj.case_type = "flowPath";
        _detailCaseR(this.takeObj).then(res => {
          if (res.data.id) {
            this.paticipants.id = res.data.id;
          }
          if (res.data.discoverer != null) {
            if (res.data.discoverer.length === 0) {
              // res.data.discoverer = null;
              // this.discoverer = Object.assign(
              //   this.discoverer,
              //   res.data.discoverer
              // );
              // mergeJSON(this.discoverer,res.data.discoverer)
            } else {
              this.discoverer = res.data.discoverer.concat();
            }

            if (res.data.investigator.length === 0) {
              res.data.investigator = null;
              this.investigator = Object.assign(
                this.investigator,
                res.data.investigator
              );
            } else {
              this.investigator = res.data.investigator.concat();
            }

            if (res.data.reports.length === 0) {
              res.data.reports = null;
              this.reports = Object.assign(this.reports, res.data.reports);
            } else {
              this.reports = res.data.reports.concat();
            }

            if (res.data.raider.length === 0) {
              res.data.raider = null;
              this.raider = Object.assign(this.raider, res.data.raider);
            } else {
              this.raider = res.data.raider.concat();
            }

            if (res.data.litigator.length === 0) {
              res.data.litigator = null;
              this.litigator = Object.assign(
                this.litigator,
                res.data.litigator
              );
            } else {
              this.litigator = res.data.litigator.concat();
            }
            if (res.data.organ.length === 0) {
              res.data.organ = null;
            }

            this.stage.forEach(item => {
              if (res.data[item.id] !== null) {
                if (res.data[item.id][0].progress === "进行中") {
                  item.isshow = true;
                } else if (res.data[item.id][0].progress === "已完成") {
                  item.isshowg = true;
                }
              }
            });
          }
        });
      }
    },
    /* caseBase */
    getbaseInfo() {
      this.takeObj.case_type = "caseBase";
      this.takeObj.case_id=sessionStorage.getItem("id")
      if (this.user_role === "Admin") {
        _detailCaseA(this.takeObj).then(res => {
          this.baseInfo = Object.assign(this.baseInfo, res.data);
        });
      } else if (this.user_role === "Supervisor") {
        _detailCaseS(this.takeObj).then(res => {
          this.baseInfo = Object.assign(this.baseInfo, res.data);
        });
      } else if (this.user_role === "ReportingStaff") {
        _detailCaseR(this.takeObj).then(res => {
          this.baseInfo = Object.assign(this.baseInfo, res.data);
        });
      }
    },
    /* client */
    getclientInfo() {
      this.takeObj.case_type = "client";
      this.takeObj.case_id=sessionStorage.getItem("id")

      if (this.user_role === "Admin") {
        _detailCaseA(this.takeObj).then(res => {
          this.clientInfo = Object.assign(this.clientInfo, res.data);
        });
      } else if (this.user_role === "Supervisor") {
        _detailCaseS(this.takeObj).then(res => {
          this.clientInfo = Object.assign(this.clientInfo, res.data);
        });
      } else if (this.user_role === "ReportingStaff") {
        _detailCaseR(this.takeObj).then(res => {
          this.clientInfo = Object.assign(this.clientInfo, res.data);
        });
      }
    },
    /* target */
    gettargetInfo() {
      this.takeObj.case_type = "target";
      this.takeObj.case_id=sessionStorage.getItem("id")
      if (this.user_role === "Admin") {
        _detailCaseA(this.takeObj).then(res => {
          // this.targetInfo = Object.assign(this.targetInfo, res.data);
          this.targetInfo = res.data.concat();
        });
      } else if (this.user_role === "Supervisor") {
        _detailCaseS(this.takeObj).then(res => {
          // this.targetInfo = Object.assign(this.targetInfo, res.data);
          this.targetInfo = res.data.concat();
        });
      } else if (this.user_role === "ReportingStaff") {
        _detailCaseR(this.takeObj).then(res => {
          // this.targetInfo = Object.assign(this.targetInfo, res.data);
          this.targetInfo = res.data.concat();
        });
      }
    },
    /* finance 财务*/
    getaccounting() {
      this.takeObj.case_type = "finance";
      this.takeObj.case_id=sessionStorage.getItem("id")
      if (this.user_role === "Admin") {
        _detailCaseA(this.takeObj).then(res => {
          if (res.data.advancePayment != null) {
            if (res.data.advancePayment.length == 0) {
              res.data.advancePayment = this.accounting.advancePayment;
            }
            if (res.data.deposit.length == 0) {
              res.data.deposit = this.accounting.deposit;
            }
            if (res.data.invoice.length == 0) {
              res.data.invoice = this.accounting.invoice;
            }
            if (res.data.refund.length == 0) {
              res.data.refund = this.accounting.refund;
            }
            if (res.data.repay.length == 0) {
              res.data.repay = this.accounting.repay;
            }
            this.accounting = Object.assign(this.accounting, res.data);
          }
        });
      } else if (this.user_role === "Supervisor") {
        _detailCaseS(this.takeObj).then(res => {
          if (res.msg == "没有权限访问！") {
            this.$message({
              showClose: true,
              message: "没有访问权限",
              type: "error"
            });
          }
        });
      } else if (this.user_role === "ReportingStaff") {
        _detailCaseR(this.takeObj).then(res => {
          if (res.msg == "没有权限访问！") {
            this.$message({
              showClose: true,
              message: "没有访问权限",
              type: "error"
            });
          }
        });
      }
    },

    /* 锚点跳转 */
    returnTop: function(index) {
      index = index + "";
      this.activeNames = [index];
      /* $ref 当前文档流 */
      this.$nextTick().then(() => [(this.activename = "4")]);
    },
    /* 编辑 */
    editB() {
      this.bisShow = true;
    },
    editC() {
      this.$router.push({
        name:'detailclient',
        params: { obj : this.clientInfo ,
        takeObj:this.takeObj}
      })
    },
    editT() {
      this.tisShow = true;
      this.$router.push({
        name:'detailtarget',
        params: { obj : this.targetInfo ,
        takeObj:this.takeObj}
      })
    },
    editA() {
      this.aisShow = true;
    },
    editP() {
      debugger
      this.pisShow = true;
      this.$router.push({
        name:'detailcase',
        params: { 
          obj : this.paticipants ,
          id:this.takeObj.id
        }
      })
    },
    /* 取消编辑 */
    editCno() {
      this.cisShow = false;
    },
    editBno() {
      this.bisShow = false;
    },
    editTno() {
      this.tisShow = false;
    },
    editAno() {
      this.aisShow = false;
    },
    editPno() {
      this.pisShow = false;
    },
    /* 更新信息 */
    updateB(item) {
      debugger;
      console.info(item);

      if (this.user_role === "Admin") {
        _updateCaseA(this.takeObj, item)
          .then(res => {
            console.info(res);
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.bisShow = false;
            this.getbaseInfo();
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
            console.info(res);
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.bisShow = false;
            this.getbaseInfo();
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
            console.info(res);
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.bisShow = false;
            this.getbaseInfo();
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
    updateC(item) {
      debugger;
      if (this.user_role === "Admin") {
        _updateCaseA(this.takeObj, item)
          .then(res => {
            console.info(res);
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.cisShow = false;
            this.getclientInfo();
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
            console.info(res);
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.cisShow = false;
            this.getclientInfo();
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
            console.info(res);
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.cisShow = false;
            this.getclientInfo();
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
    updateT(item) {
      debugger;
      if (this.user_role === "Admin") {
        _updateCaseA(this.takeObj, item)
          .then(res => {
            this.$message({
              showClose: true,
              message: "恭喜你，更新成功！！",
              type: "success"
            });
            this.tisShow = false;
            this.gettargetInfo();
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
            this.tisShow = false;
            this.gettargetInfo();
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
            this.tisShow = false;
            this.gettargetInfo();
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
    updateA(item) {
      if (this.user_role === "Admin") {
        _updateCaseA(this.takeObj, item)
          .then(res => {
            if (res.status === 200) {
              this.$message({
                showClose: true,
                message: "恭喜你，更新成功！！",
                type: "success"
              });
              this.aisShow = false;
              this.getaccounting();
              console.info(this.accounting);
            }
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
            if (res.status === 200) {
              this.$message({
                showClose: true,
                message: "恭喜你，更新成功！！",
                type: "success"
              });
              this.aisShow = false;
              this.getaccounting();
              console.info(this.accounting);
            }
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
            if (res.status === 200) {
              this.$message({
                showClose: true,
                message: "恭喜你，更新成功！！",
                type: "success"
              });
              this.aisShow = false;
              this.getaccounting();
              console.info(this.accounting);
            }
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
    updateP() {
      var arr = "";
      this.stage.forEach(item => {
        if (this.paticipants[item.id] !== undefined) {
          if (this.paticipants[item.id][0].progress == null) {
            arr += item.id;
            delete this.paticipants[item.id];
          } else {
            this.paticipants[item.id] = this.paticipants[item.id];
          }
        }
        // console.info(this.paticipants)
      });
      if (arr != "") {
        this.$message({
          showClose: true,
          message: "请填写" + arr + "中的进行情况",
          type: "error"
        });
      } else {
        if (this.user_role === "Admin") {
          _updateCaseA(this.takeObj, this.paticipants)
            .then(res => {
              console.info(this.paticipants);
              this.getPaticipants();
              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: "恭喜你，更新成功！！",
                  type: "success"
                });
                this.pisShow = false;
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "更新有误，回到首页",
                type: "error"
              });
            });
        } else if (this.user_role === "Supervisor") {
          _updateCaseS(this.takeObj, this.paticipants)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: "恭喜你，更新成功！！",
                  type: "success"
                });
                this.pisShow = false;
                this.getPaticipants();
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "更新有误，回到首页",
                type: "error"
              });
            });
        } else if (this.user_role === "ReportingStaff") {
          _updateCaseR(this.takeObj, this.paticipants)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: "恭喜你，更新成功！！",
                  type: "success"
                });
                this.pisShow = false;
                this.getPaticipants();
                console.info(this.paticipants);
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "更新有误，回到首页",
                type: "error"
              });
            });
        }
      }
    },
    handleClick(tab, event) {
      var case_typeId = event.target.getAttribute("id");
      //获取到当前元素的id.getAttribute('id')
      if (case_typeId === "tab-0") {
        this.getbaseInfo();
      } else if (case_typeId === "tab-1") {
        this.getclientInfo();
      } else if (case_typeId === "tab-2") {
        this.gettargetInfo();
      } else if (case_typeId === "tab-3") {
        this.getaccounting();
      } else if (case_typeId === "tab-4") {
        this.getPaticipants();
      }
    },
    submit() {},
    /* 新建 */
    add() {},
    commitnews(item) {
      alert("提交成功" + item);
      this.dialogFormVisible = false;
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
            this.clientAttCon.attachmentPath = res;
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
    readPath(src) {
      this.completeTask =
        "http://172.16.5.240:8083/fileConventer?filePath=http://172.16.6.228:7104/case/file/" +
        src;
      this.dialogComplete = true;
    },
    /* 插入 */
    clientAttConadd(item) {
      console.info(item);
      this.clientInfo.documents[0].attachments.push(this.clientAttCon);
      this.diaClient = false;
    },
    delTar(index) {
      this.targetInfo.splice(index, 1);
      console.info(this.targetInfo);
    },
    /* 法律文书 附件 */
    delCliAtt(index) {
      console.info(index, this.attachments);
    },

    addCliAtt(item) {
      console.info(item);
    },
    /* 覆盖数组 */
    coverArr(obj1, obj2) {
      const result = obj1.map(item1 => {
        return Object.assign(
          item1,
          obj2.find(item2 => {
            return item2 && item1.value === item2.value;
          })
        );
      });
    }
  },
  created() {
    debugger
    console.info(this.$route.params.id);
    this.user_role = sessionStorage.getItem("user_role");
    if (this.user_role === "Admin") {
      this.roleShow = false;
    }
    this.takeObj.case_id = sessionStorage.getItem("id");
    this.getPaticipants();
    this.getUserRole();
    this.getbaseInfo();
  },

  mounted() {
    if (this.$route.query.id != null) {
      let index = this.$route.query.id;
      console.info(typeof index);
      this.returnTop(index);
    }
  },
  watch: {
    discoverer: {
      handler(val, oldVal) {
        this.paticipants.discoverer = this.discoverer.concat();
      },
      deep: true
    },
    investigator: {
      handler(val, oldVal) {
        this.paticipants.investigator = this.investigator.concat();
      },
      deep: true
    },
    reports: {
      handler(val, oldVal) {
        this.paticipants.reports = this.reports.concat();
      },
      deep: true
    },
    raider: {
      handler(val, oldVal) {
        this.paticipants.raider = this.raider.concat();
      },
      deep: true
    },
    litigator: {
      handler(val, oldVal) {
        this.paticipants.litigator = this.litigator.concat();
      },
      deep: true
    }
  }
};
</script>


<style lang="less" scoped>
.detail-header {
  position: relative;
  .border-bottom {
    width: 100%;
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
  margin: 15px 0px;
}

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
.dtable{
  display: flex;
    align-items: stretch;
    p{
margin: 10px 0;
    width: 50px;
    text-align: center;
    line-height: 11.5;
    }
}
</style>
