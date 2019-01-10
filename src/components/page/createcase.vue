<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>新建案件</span>
      </div>
      <el-form label-width="150px" :model="ruleForm" ref="ruleForm">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <div>
              <el-form-item
                label="优先级"
                :rules="[
      { required: true, message: '请输入优先级', trigger: 'blur' },
    ]"
              >
                <!--  紧急,高,一般,低,不重要; -->
                <el-select placeholder="请选择" v-model="ruleForm.baseInfo.priority">
                  <el-option label="紧急" value="紧急"></el-option>
                  <el-option label="高" value="高"></el-option>
                  <el-option label="一般" value="一般"></el-option>
                  <el-option label="低" value="低"></el-option>
                  <el-option label="不重要" value="不重要"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="案件状态"
                :rules="[
      { required: true, message: '请输入案件状态', trigger: 'blur' },
    ]"
              >
                <el-select placeholder="请选择" v-model="ruleForm.baseInfo.status">
                  <el-option label="进行中" value="进行中"></el-option>
                  <el-option label="已完成" value="已完成"></el-option>
                  <el-option label="未开始" value="未开始"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="立案日期"
                :rules="[
      { required: true, message: '请输入日期', trigger: 'blur' },
    ]"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  v-model="ruleForm.baseInfo.openDate"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="结案日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  v-model="ruleForm.baseInfo.closeDate"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="结案方式">
                <el-select placeholder="请选择" v-model="ruleForm.baseInfo.closeMode">
                  <el-option label="和解" value="和解"></el-option>
                  <el-option label="中止" value="中止"></el-option>
                  <el-option label="终止" value="终止"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                label="案件号"
                :rules="[
      { required: true, message: '请输入案件号', trigger: 'blur' },
    ]"
              >
                <el-input placeholder="请输入" v-model="ruleForm.caseInfo.caseNo"></el-input>
              </el-form-item>
              <el-form-item
                label="案件名称"
                :rules="[
      { required: true, message: '请输入案件名称', trigger: 'blur' },
    ]"
              >
                <el-input placeholder="请输入" v-model="ruleForm.caseInfo.caseName"></el-input>
              </el-form-item>
              <el-form-item
                label="案由"
                :rules="[
      { required: true, message: '请输入案由', trigger: 'blur' },
    ]"
              >
                <el-input placeholder="请输入" v-model="ruleForm.caseInfo.reason"></el-input>
              </el-form-item>
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="clearfix">
              <span>客户信息</span>
            </div>
            <div>
              <el-form-item label="客户案件号">
                <el-input placeholder="请输入" v-model="ruleForm.clientInfo.clientCaseNo"></el-input>
              </el-form-item>
              <el-form-item label="客户品牌">
                <el-input placeholder="请输入" v-model="ruleForm.clientInfo.brands"></el-input>
              </el-form-item>
              <el-form-item label="客户指示">
                <el-input placeholder="请输入" v-model="ruleForm.clientInfo.instructions"></el-input>
              </el-form-item>
              <el-form-item label="授权日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  v-model="ruleForm.clientInfo.authorizeDate"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input placeholder="请输入" v-model="ruleForm.clientInfo.note"></el-input>
              </el-form-item>
              <el-form-item label="上传文书">
                <div v-for="(item,index) in ruleForm.clientInfo.documents" :key="index">
                  <table class="ntable">
                    <tr>
                      <td width="35%">文书名称</td>
                      <td width="65%">
                        <div v-text="item.documentName"></div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">出具时间</td>
                      <td width="65%">
                        <div>{{item.issueDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">文件路径</td>
                      <td width="65%">
                        <div>{{item.documentPath}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">文书内容</td>
                      <td width="65%">
                        <div>{{item.content}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">收到时间</td>
                      <td width="65%">
                        <div>{{item.receiveDate}}</div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">附件</td>
                      <td>
                        <table
                          class="ntable"
                          v-for="(attitem,index) in item.attachments"
                          :key="index"
                        >
                          <tr>
                            <td width="35%">附件名称</td>
                            <td width="65%">{{attitem.attachmentName}}</td>
                          </tr>
                          <tr>
                            <td width="35%">附件类型</td>
                            <td width="65%">{{attitem.attachmentType}}</td>
                          </tr>
                          <tr>
                            <td width="35%">附件路径</td>
                            <td width="65%">{{attitem.attachmentPath}}</td>
                          </tr>
                          <tr>
                            <td width="35%">备注</td>
                            <td width="65%">{{attitem.note}}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">{{item.note}}</td>
                    </tr>
                  </table>
                  <el-button @click="deleteattitem(index)">删除上面信息</el-button>
                </div>

                <el-button @click="dialogFormVisible = true">添加</el-button>
                <el-dialog title="添加法律文书" :visible.sync="dialogFormVisible ">
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
                                        <input
                                          type="file"
                                          @change="uploadf($event)"
                                          ref="pathClear"
                                        >
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
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="documentadd(documentForm)">添 加</el-button>
                  </div>
                </el-dialog>
              </el-form-item>
            </div>
          </el-card>

          <el-card>
            <div slot="header" class="clearfix">
              <span>目标信息</span>
            </div>
            <div>
              <el-form-item
                label="目标名称"
                :rules="[
      { required: true, message: '请输入目标名称', trigger: 'blur' },
    ]"
              >
                <el-input placeholder="请输入" v-model="ruleForm.targetInfo[0].targetName" required></el-input>
              </el-form-item>
              <el-form-item
                label="目标类型"
                :rules="[
      { required: true, message: '请输入目标类型', trigger: 'blur' },
    ]"
              >
                <el-input placeholder="请输入" v-model="ruleForm.targetInfo[0].targetType" required></el-input>
              </el-form-item>

              <el-form-item label="工商注册号">
                <el-input placeholder="请输入" v-model="ruleForm.targetInfo[0].regNo"></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                <el-input placeholder="请输入" v-model="ruleForm.targetInfo[0].creditNo"></el-input>
              </el-form-item>
              <el-form-item label="目标地址">
                <el-input placeholder="请输入" v-model="ruleForm.targetInfo[0].targetAdd"></el-input>
              </el-form-item>
              <el-form-item label="目标联系方式">
                <div v-for="(item,index) in ruleForm.targetInfo[0].contacts" :key="index">
                  <table class="ntable">
                    <tr>
                      <td width="35%">目标网址</td>
                      <td width="65%">
                        <div v-text="item.website"></div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">目标电话</td>
                      <td width="65%">
                        <div v-text="item.phone"></div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">目标邮箱</td>
                      <td width="65%">
                        <div v-text="item.email"></div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">社交号</td>
                      <td width="65%">
                        <div v-for="(items,index) in item.networks" :key="index">
                          <table class="ntable">
                            <tr>
                              <td>社交工具</td>
                              <td>{{items.networkName}}</td>
                            </tr>
                            <tr>
                              <td>号码</td>
                              <td>{{items.networkNo}}</td>
                            </tr>
                            <tr>
                              <td>备注</td>
                              <td>{{items.note}}</td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <el-button @click="deletecontacts(index)">删除上面信息</el-button>
                </div>
                <!-- 目标联系方式对话框 -->
                <el-dialog title="目标联系方式" :visible.sync="dialogFormContacts">
                  <div>
                    <el-form :model="contactsForm">
                      <table class="ntable">
                        <tr>
                          <td>目标网址</td>
                          <td>
                            <el-input v-model="contactsForm.website"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>目标电话</td>
                          <td>
                            <el-input v-model="contactsForm.phone"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>目标邮箱</td>
                          <td>
                            <el-input v-model="contactsForm.email"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>备注</td>
                          <td>
                            <el-input v-model="contactsForm.note"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>社交号</td>
                          <td>
                            <div>
                              <table v-for="(items,index) in contactsForm.networks" :key="index">
                                <!-- v-if="contactsForm.networks" -->
                                <tr>
                                  <td>社交工具</td>
                                  <td>{{items.networkName}}</td>
                                </tr>
                                <tr>
                                  <td>号码</td>
                                  <td>{{items.networkNo}}</td>
                                </tr>
                                <tr>
                                  <td>备注</td>
                                  <td>{{items.note}}</td>
                                </tr>
                                <el-button @click="delNetWork(index)">删除上面信息</el-button>
                              </table>
                            </div>
                            <!-- dialogNetworks = true -->
                            <el-button @click="dialogNetworks = true">添加社交号</el-button>
                            <el-dialog title="增加社交号" :visible.sync="dialogNetworks" append-to-body>
                              <div>
                                <table class="ntable">
                                  <tr>
                                    <td>社交工具</td>
                                    <td>
                                      <el-input v-model="network.networkName"></el-input>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>号码</td>
                                    <td>
                                      <el-input v-model="network.networkNo"></el-input>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>备注</td>
                                    <td>
                                      <el-input v-model="network.note"></el-input>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormContacts = false">取 消</el-button>
                                <el-button type="primary" @click="networksAdd(network)">添 加</el-button>
                              </div>
                            </el-dialog>
                          </td>
                        </tr>
                      </table>
                    </el-form>
                  </div>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormContacts = false">取 消</el-button>
                    <el-button type="primary" @click="contactsAdd(contactsForm)">添 加</el-button>
                  </div>
                </el-dialog>
                <el-button @click="dialogFormContacts = true">添加目标联系方式</el-button>
              </el-form-item>
              <el-form-item label="目标人员">
                <div v-for="(item,index) in ruleForm.targetInfo[0].principal" :key="index">
                  <table class="ntable">
                    <tr>
                      <td>姓名</td>
                      <td>{{item.name}}</td>
                    </tr>
                    <tr>
                      <td>职位</td>
                      <td>{{item.position}}</td>
                    </tr>
                    <tr>
                      <td>证件号码</td>
                      <td>{{item.ID}}</td>
                    </tr>
                    <tr>
                      <td>是否为累犯</td>
                      <td>{{item.isRecidivism?'是':'否'}}</td>
                    </tr>
                    <tr>
                      <td>备注</td>
                      <td>{{item.note}}</td>
                    </tr>
                    <tr>
                      <td>联系方式</td>
                      <td>
                        <div v-for="(items,index) in item.contacts" :key="index">
                          <table class="ntable">
                            <tr>
                              <td>目标电话</td>
                              <td>{{items.phone}}</td>
                            </tr>
                            <tr>
                              <td>目标邮箱</td>
                              <td>{{items.email}}</td>
                            </tr>
                            <tr>
                              <td>社交号</td>
                              <td>
                                <div v-for="(itemes,index) in items.networks" :key="index">
                                  <table class="ntable">
                                    <tr>
                                      <td>社交工具</td>
                                      <td>{{itemes.networkName}}</td>
                                    </tr>
                                    <tr>
                                      <td>号码</td>
                                      <td>{{itemes.networkNo}}</td>
                                    </tr>
                                    <tr>
                                      <td>备注</td>
                                      <td>{{itemes.note}}</td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <el-button @click="deleteprincipal(index)">删除上面信息</el-button>
                </div>

                <!-- 目标人员对话框 -->
                <el-dialog title="目标人员" :visible.sync="dialogFormPrincipal">
                  <div>
                    <el-form :model="principalForm">
                      <table class="ntable">
                        <tr>
                          <td>姓名</td>
                          <td>
                            <el-input v-model="principalForm.name" placeholder="请输入"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>职位</td>
                          <td>
                            <el-input v-model="principalForm.position" placeholder="请输入"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>证件号码</td>
                          <td>
                            <el-input v-model="principalForm.ID" placeholder="请输入"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>是否为累犯</td>
                          <td>
                            <el-radio-group v-model="principalForm.isRecidivism">
                              <el-radio :label="true">是</el-radio>
                              <el-radio :label="false">否</el-radio>
                            </el-radio-group>
                          </td>
                        </tr>
                        <tr>
                          <td>备注</td>
                          <td>
                            <el-input v-model="principalForm.note" placeholder="请输入"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>联系方式</td>
                          <td>
                            <div>
                              <table v-for="(items,index) in principalForm.contacts" :key="index">
                                <tr>
                                  <td>目标电话</td>
                                  <td>{{items.phone}}</td>
                                </tr>
                                <tr>
                                  <td>目标邮箱</td>
                                  <td>{{items.email}}</td>
                                </tr>
                                <tr>
                                  <td>社交号</td>
                                  <td>
                                    <table v-for="(itemss,index) in items.networks" :key="index">
                                      <!-- v-if="items.networks" -->
                                      <tr>
                                        <td>社交工具</td>
                                        <td>{{itemss.networkName}}</td>
                                      </tr>
                                      <tr>
                                        <td>号码</td>
                                        <td>{{itemss.networkNo}}</td>
                                      </tr>
                                      <tr>
                                        <td>备注</td>
                                        <td>{{itemss.note}}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <el-button @click="deleteprincipalContacts(index)">删除以上信息</el-button>
                              </table>
                            </div>
                            <el-button @click="dialogPrincipalContacts = true">添加联系方式</el-button>
                          </td>
                        </tr>
                      </table>
                    </el-form>
                    <el-dialog
                      title="添加联系方式"
                      :visible.sync="dialogPrincipalContacts"
                      append-to-body
                    >
                      <div>
                        <el-form :model="PrincipalContacts">
                          <table class="ntable">
                            <tr>
                              <td>目标电话</td>
                              <td>
                                <el-input v-model="PrincipalContacts.phone"></el-input>
                              </td>
                            </tr>
                            <tr>
                              <td>目标邮箱</td>
                              <td>
                                <el-input v-model="PrincipalContacts.email"></el-input>
                              </td>
                            </tr>
                            <tr>
                              <td>备注</td>
                              <td>
                                <el-input v-model="PrincipalContacts.note"></el-input>
                              </td>
                            </tr>
                            <tr>
                              <td>社交号</td>
                              <td>
                                <div>
                                  <table
                                    v-for="(items,index) in PrincipalContacts.networks"
                                    :key="index"
                                  >
                                    <!-- v-if="PrincipalContacts.networks" -->
                                    <tr>
                                      <td>社交工具</td>
                                      <td>{{items.networkName}}</td>
                                    </tr>
                                    <tr>
                                      <td>号码</td>
                                      <td>{{items.networkNo}}</td>
                                    </tr>
                                    <tr>
                                      <td>备注</td>
                                      <td>{{items.note}}</td>
                                    </tr>
                                    <el-button @click="deleteprincipalContactsNetWork(index)">删除以上信息</el-button>
                                  </table>
                                </div>
                                <!-- dialogNetworks = true -->
                                <el-button @click="dialogPrincipalNetwork = true">添加社交号</el-button>
                                <el-dialog
                                  title="增加社交号"
                                  :visible.sync="dialogPrincipalNetwork"
                                  append-to-body
                                >
                                  <div>
                                    <table class="ntable">
                                      <tr>
                                        <td>社交工具</td>
                                        <td>
                                          <el-input v-model="PrincipalNetwork.networkName"></el-input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>号码</td>
                                        <td>
                                          <el-input v-model="PrincipalNetwork.networkNo"></el-input>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>备注</td>
                                        <td>
                                          <el-input v-model="PrincipalNetwork.note"></el-input>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                  <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogPrincipalNetwork = false">取 消</el-button>
                                    <el-button
                                      type="primary"
                                      @click="principalNetworkadd(PrincipalNetwork)"
                                    >添 加</el-button>
                                  </div>
                                </el-dialog>
                              </td>
                            </tr>
                          </table>
                        </el-form>
                      </div>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogPrincipalContacts = false">取 消</el-button>
                        <el-button
                          type="primary"
                          @click="principalContactsadd(PrincipalContacts)"
                        >添 加</el-button>
                      </div>
                    </el-dialog>
                  </div>

                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormPrincipal = false">取 消</el-button>
                    <el-button type="primary" @click="principalFormsadd(principalForm)">添 加</el-button>
                  </div>
                </el-dialog>
                <el-button @click="dialogFormPrincipal = true">添加目标人员</el-button>
              </el-form-item>
              <el-form-item label="关联公司">
                <div v-for="(item,index) in ruleForm.targetInfo[0].affiliateCompany" :key="index">
                  <table class="ntable">
                    <tr>
                      <td>公司名称</td>
                      <td>{{item.companyName}}</td>
                    </tr>
                    <tr>
                      <td>主要成员</td>
                      <td>
                        <div v-for="(item,index) in item.principal" :key="index">
                          <table class="ntable">
                            <tr>
                              <td>姓名</td>
                              <td>{{item.name}}</td>
                            </tr>
                            <tr>
                              <td>职位</td>
                              <td>{{item.position}}</td>
                            </tr>
                            <tr>
                              <td>证件号码</td>
                              <td>{{item.ID}}</td>
                            </tr>
                            <tr>
                              <td>是否为累犯</td>
                              <td>{{item.isRecidivism?'是':'否'}}</td>
                            </tr>
                            <tr>
                              <td>备注</td>
                              <td>{{item.note}}</td>
                            </tr>
                            <tr>
                              <td>联系方式</td>
                              <td>
                                <div v-for="(items,index) in item.contacts" :key="index">
                                  <table class="ntable">
                                    <tr>
                                      <td>目标电话</td>
                                      <td>{{items.phone}}</td>
                                    </tr>
                                    <tr>
                                      <td>目标邮箱</td>
                                      <td>{{items.email}}</td>
                                    </tr>
                                    <tr>
                                      <td>社交号</td>
                                      <td>
                                        <div v-for="(itemes,index) in items.networks" :key="index">
                                          <table class="ntable">
                                            <tr>
                                              <td>社交工具</td>
                                              <td>{{itemes.networkName}}</td>
                                            </tr>
                                            <tr>
                                              <td>号码</td>
                                              <td>{{itemes.networkNo}}</td>
                                            </tr>
                                            <tr>
                                              <td>备注</td>
                                              <td>{{itemes.note}}</td>
                                            </tr>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                    <el-button @click="delAffiliateCompany(index)">删除上面信息</el-button>
                  </table>
                </div>

                <el-dialog title="添加公司信息" :visible.sync="dialogAff">
                  <div>
                    <el-form :model="affForm" ref="affForm">
                      <table class="ntable">
                        <tr>
                          <td>公司名称</td>
                          <td>
                            <el-input v-model="affForm.companyName"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>主要成员</td>
                          <td>
                            <table
                              class="ntable"
                              v-for="(item,index) in affForm.principal"
                              :key="index"
                            >
                              <tr>
                                <td>姓名</td>
                                <td>{{item.name}}</td>
                              </tr>
                              <tr>
                                <td>职位</td>
                                <td>{{item.position}}</td>
                              </tr>
                              <tr>
                                <td>证件号码</td>
                                <td>{{item.ID}}</td>
                              </tr>
                              <tr>
                                <td>是否为累犯</td>
                                <td>{{item.isRecidivism?'是':'否'}}</td>
                              </tr>
                              <tr>
                                <td>备注</td>
                                <td>{{item.note}}</td>
                              </tr>
                              <tr>
                                <td>联系方式</td>
                                <td>
                                  <div v-for="(items,index) in item.contacts" :key="index">
                                    <table class="ntable">
                                      <tr>
                                        <td>目标电话</td>
                                        <td>{{items.phone}}</td>
                                      </tr>
                                      <tr>
                                        <td>目标邮箱</td>
                                        <td>{{items.email}}</td>
                                      </tr>
                                      <tr>
                                        <td>社交号</td>
                                        <td>
                                          <div
                                            v-for="(itemes,index) in items.networks"
                                            :key="index"
                                          >
                                            <table class="ntable">
                                              <tr>
                                                <td>社交工具</td>
                                                <td>{{itemes.networkName}}</td>
                                              </tr>
                                              <tr>
                                                <td>号码</td>
                                                <td>{{itemes.networkNo}}</td>
                                              </tr>
                                              <tr>
                                                <td>备注</td>
                                                <td>{{itemes.note}}</td>
                                              </tr>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                              <el-button @click="delaffPricForm(index)">删除以上信息</el-button>
                            </table>
                            <el-button @click="dialogAffPrincipal = true">添 加</el-button>
                            <el-dialog title="添加主要成员" :visible="dialogAffPrincipal" append-to-body>
                              <div>
                                <el-form :model="affprincipalForm">
                                  <table class="ntable">
                                    <tr>
                                      <td>姓名</td>
                                      <td>
                                        <el-input v-model="affprincipalForm.name" placeholder="请输入"></el-input>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>职位</td>
                                      <td>
                                        <el-input
                                          v-model="affprincipalForm.position"
                                          placeholder="请输入"
                                        ></el-input>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>证件号码</td>
                                      <td>
                                        <el-input v-model="affprincipalForm.ID" placeholder="请输入"></el-input>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>是否为累犯</td>
                                      <td>
                                        <el-radio-group v-model="affprincipalForm.isRecidivism">
                                          <el-radio :label="true">是</el-radio>
                                          <el-radio :label="false">否</el-radio>
                                        </el-radio-group>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>备注</td>
                                      <td>
                                        <el-input v-model="affprincipalForm.note" placeholder="请输入"></el-input>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>联系方式</td>
                                      <td>
                                        <div>
                                          <table
                                            v-for="(items,index) in affprincipalForm.contacts"
                                            :key="index"
                                          >
                                            <tr>
                                              <td>目标电话</td>
                                              <td>{{items.phone}}</td>
                                            </tr>
                                            <tr>
                                              <td>目标邮箱</td>
                                              <td>{{items.email}}</td>
                                            </tr>
                                            <tr>
                                              <td>社交号</td>
                                              <td>
                                                <table
                                                  v-for="(itemss,index) in items.networks"
                                                  :key="index"
                                                >
                                                  <!-- v-if="items.networks" -->
                                                  <tr>
                                                    <td>社交工具</td>
                                                    <td>{{itemss.networkName}}</td>
                                                  </tr>
                                                  <tr>
                                                    <td>号码</td>
                                                    <td>{{itemss.networkNo}}</td>
                                                  </tr>
                                                  <tr>
                                                    <td>备注</td>
                                                    <td>{{itemss.note}}</td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <el-button @click="delaffContacts(index)">删除以上信息</el-button>
                                          </table>
                                        </div>
                                        <el-button @click="dialogaffContacts = true">添加联系方式</el-button>
                                      </td>
                                    </tr>
                                  </table>
                                </el-form>
                                <el-dialog
                                  title="添加联系方式"
                                  :visible.sync="dialogaffContacts"
                                  append-to-body
                                >
                                  <div>
                                    <el-form :model="affContacts">
                                      <table class="ntable">
                                        <tr>
                                          <td>目标电话</td>
                                          <td>
                                            <el-input v-model="affContacts.phone"></el-input>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>目标邮箱</td>
                                          <td>
                                            <el-input v-model="affContacts.email"></el-input>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>备注</td>
                                          <td>
                                            <el-input v-model="affContacts.note"></el-input>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>社交号</td>
                                          <td>
                                            <div>
                                              <table
                                                v-for="(items,index) in affContacts.networks"
                                                :key="index"
                                              >
                                                <!-- v-if="affContacts.networks" -->
                                                <tr>
                                                  <td>社交工具</td>
                                                  <td>{{items.networkName}}</td>
                                                </tr>
                                                <tr>
                                                  <td>号码</td>
                                                  <td>{{items.networkNo}}</td>
                                                </tr>
                                                <tr>
                                                  <td>备注</td>
                                                  <td>{{items.note}}</td>
                                                </tr>
                                                <el-button @click="delaffNetWork(index)">删除以上信息</el-button>
                                              </table>
                                            </div>
                                            <!-- dialogNetworks = true -->
                                            <el-button @click="dialogaffNetwork = true">添加社交号</el-button>
                                            <el-dialog
                                              title="增加社交号"
                                              :visible.sync="dialogaffNetwork"
                                              append-to-body
                                            >
                                              <div>
                                                <table class="ntable">
                                                  <tr>
                                                    <td>社交工具</td>
                                                    <td>
                                                      <el-input v-model="affNetwork.networkName"></el-input>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>号码</td>
                                                    <td>
                                                      <el-input v-model="affNetwork.networkNo"></el-input>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>备注</td>
                                                    <td>
                                                      <el-input v-model="affNetwork.note"></el-input>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </div>
                                              <div slot="footer" class="dialog-footer">
                                                <el-button @click="dialogaffNetwork = false">取 消</el-button>
                                                <el-button
                                                  type="primary"
                                                  @click="affNetworkadd(affNetwork)"
                                                >添 加</el-button>
                                              </div>
                                            </el-dialog>
                                          </td>
                                        </tr>
                                      </table>
                                    </el-form>
                                  </div>
                                  <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogaffContacts = false">取 消</el-button>
                                    <el-button
                                      type="primary"
                                      @click="affContactsadd(affContacts)"
                                    >添 加</el-button>
                                  </div>
                                </el-dialog>
                              </div>
                              <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogAffPrincipal = false">取 消</el-button>
                                <el-button
                                  type="primary"
                                  @click="affprincipaladd(affprincipalForm)"
                                >添 加</el-button>
                              </div>
                            </el-dialog>
                          </td>
                        </tr>
                      </table>
                    </el-form>
                  </div>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogAff = false">取 消</el-button>
                    <el-button type="primary" @click="affadd(affForm)">添 加</el-button>
                  </div>
                </el-dialog>

                <el-button @click="dialogAff = true">添加公司信息</el-button>
              </el-form-item>
              <el-form-item label="目标产品信息">
                <div>
                  <table
                    class="ntable"
                    v-for="(item,index) in ruleForm.targetInfo[0].productInfo"
                    :key="index"
                  >
                    <tr>
                      <td width="35%">产品名称/服务</td>
                      <td width="65%">
                        <div v-text="item.productName"></div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">产品型号</td>
                      <td width="65%">
                        <div v-text="item.productNo"></div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">产品数量</td>
                      <td width="65%">
                        <div v-text="item.productQty"></div>
                      </td>
                    </tr>
                    <tr>
                      <td width="35%">备注</td>
                      <td width="65%">
                        <div v-text="item.note"></div>
                      </td>
                    </tr>
                    <el-button @click="deleteProductInfo(index)">删除以上信息</el-button>
                  </table>
                </div>
                <el-button @click="dialogProductInfo =true">添加产品信息</el-button>

                <el-dialog title="添加产品信息" :visible.sync="dialogProductInfo">
                  <div>
                    <el-form :model="productInfoForm" ref="productInfoForm">
                      <table class="ntable">
                        <tr>
                          <td width="35%">产品名称/服务</td>
                          <td width="65%">
                            <!-- <div v-text="item.productName"></div> -->
                            <el-input v-model="productInfoForm.productName"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td width="35%">产品型号</td>
                          <td width="65%">
                            <!-- <div v-text="item.productNo"></div> -->
                            <el-input v-model="productInfoForm.productNo"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td width="35%">产品数量</td>
                          <td width="65%">
                            <!-- <div v-text="item.productQty"></div> -->
                            <el-input v-model="productInfoForm.productQty" type="number"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td width="35%">备注</td>
                          <td width="65%">
                            <!-- <div v-text="item.note"></div> -->
                            <el-input v-model="productInfoForm.note"></el-input>
                          </td>
                        </tr>
                      </table>
                    </el-form>
                  </div>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogProductInfo = false">取 消</el-button>
                    <el-button type="primary" @click="productInfoAdd(productInfoForm)">添 加</el-button>
                  </div>
                </el-dialog>
              </el-form-item>
              <el-form-item label="暂无">
                <el-input></el-input>
              </el-form-item>
            </div>
          </el-card>
        </div>
        <div>
          <el-button @click="submit('ruleForm')">提交</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  _createcaseA,
  _postUpload,
  _createcaseS,
  _createcaseR
} from "../../services/service";

export default {
  data() {
    return {
      ruleForm: {
        name: null,
        baseInfo: {
          priority: null, //优先级
          status: null, //案件状态
          openDate: null, //立案日期
          closeDate: null, //结案日期
          closeMode: null //结案方式
        },
        caseInfo: {
          caseNo: null,
          caseName: null,
          // type: null,
          reason: null
        },
        clientInfo: {
          clientCaseNo: null,
          brands: null,
          instructions: null,
          authorizeDate: null,
          note: null,
          documents: []
        },
        targetInfo: [
          {
            targetName: null,
            targetType: null,
            regNo: null,
            creditNo: null,
            targetAdd: null,
            contacts: [],
            principal: [],
            affiliateCompany: [],
            productInfo: [],
            note: null
          }
        ]
      },
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

      contactsForm: {
        website: null,
        phone: null,
        email: null,
        note: null,
        networks: []
      },
      network: {
        networkName: null,
        networkNo: null,
        note: null
      },
      principalForm: {
        name: null,
        position: null,
        ID: null,
        contacts: [],
        isRecidivism: false,
        note: null
      },
      PrincipalContacts: {
        phone: null,
        email: null,
        networks: [],
        note: null
      },
      PrincipalNetwork: {
        networkName: null,
        networkNo: null,
        note: null
      },

      affForm: {
        companyName: null,
        principal: [],
        note: null
      },
      affprincipalForm: {
        name: null,
        position: null,
        ID: null,
        contacts: [],
        isRecidivism: true,
        note: null
      },
      affContacts: {
        phone: null,
        email: null,
        networks: [],
        note: null
      },
      affNetwork: {
        networkName: null,
        networkNo: null,
        note: null
      },

      productInfoForm: {
        productName: null,
        productNo: null,
        productQty: null,
        note: null
      },
      dialogFormVisible: false,
      dialogAtt: false,
      dialogFormContacts: false,
      dialogNetworks: false,

      dialogFormPrincipal: false,
      dialogPrincipalContacts: false,
      dialogPrincipalNetwork: false,

      dialogAff: false,
      dialogAffPrincipal: false,
      dialogaffContacts: false,
      dialogaffNetwork: false,

      dialogProductInfo: false,

      user_role: null //角色信息
    };
  },
  methods: {
    attFormadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.documentForm.attachments.push(obj);
      this.dialogAtt = false;
    },
    delAtt(index) {
      this.documentForm.attachments.splice(index, 1);
    },
    documentadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.ruleForm.clientInfo.documents.push(obj);
      this.dialogFormVisible = false;
    },
    deleteattitem(index) {
      this.ruleForm.clientInfo.documents.splice(index, 1);
    },
    contactsAdd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.ruleForm.targetInfo[0].contacts.push(obj);
      this.dialogFormContacts = false;
    },
    networksAdd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.contactsForm.networks.push(obj);
      Object.keys(item).forEach(key => (item[key] = null));
      this.dialogNetworks = false;
    },
    deletecontacts(index) {
      this.ruleForm.targetInfo[0].contacts.splice(index, 1);
    },
    delNetWork(index) {
      this.contactsForm.networks.splice(index, 1);
    },
    deleteprincipal(index) {
      this.ruleForm.targetInfo[0].principal.splice(index, 1);
    },
    principalNetworkadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.PrincipalContacts.networks.push(obj);
      this.dialogPrincipalNetwork = false;
    },
    principalContactsadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.principalForm.contacts.push(obj);
      this.dialogPrincipalContacts = false;
    },
    principalFormsadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.ruleForm.targetInfo[0].principal.push(obj);
      this.dialogFormPrincipal = false;
    },
    deleteprincipalContactsNetWork(index) {
      this.PrincipalContacts.networks.splice(index, 1);
    },
    deleteprincipalContacts(index) {
      this.principalForm.contacts.splice(index, 1);
    },

    delAffiliateCompany(index) {
      this.ruleForm.targetInfo[0].affiliateCompany.splice(index, 1);
    },

    delaffPricForm(index) {
      this.affForm.principal.splice(index, 1);
    },
    delaffContacts(index) {
      this.affprincipalForm.contacts.splice(index, 1);
    },
    delaffNetWork(index) {
      this.affContacts.networks.splice(index, 1);
    },
    affNetworkadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.affContacts.networks.push(obj);
      this.dialogaffNetwork = false;
    },
    affContactsadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.affprincipalForm.contacts.push(obj);
      this.dialogaffContacts = false;
    },
    affprincipaladd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.affForm.principal.push(obj);
      this.dialogAffPrincipal = false;
    },
    affadd(item) {
      let obj = JSON.parse(JSON.stringify(item));
      this.ruleForm.targetInfo[0].affiliateCompany.push(obj);
      this.dialogAff = false;
    },

    productInfoAdd(item) {
      console.info(item);
      let obj = JSON.parse(JSON.stringify(item));
      this.ruleForm.targetInfo[0].productInfo.push(obj);
      this.dialogProductInfo = false;
    },
    deleteProductInfo(index) {
      this.ruleForm.targetInfo[0].productInfo.splice(index, 1);
    },

    submit(item) {
      this.$refs[item].validate(valid => {
        if (valid) {
          if (
            this.ruleForm.baseInfo.priority === null ||
            this.ruleForm.baseInfo.openDate === null ||
            this.ruleForm.baseInfo.status === null ||
            this.ruleForm.caseInfo.caseNo === null ||
            this.ruleForm.caseInfo.caseName === null ||
            this.ruleForm.caseInfo.reason === null ||
            this.ruleForm.targetInfo[0].targetName === null ||
            this.ruleForm.targetInfo[0].targetType === null
            /* this.ruleForm.caseInfo.type === null || */
          ) {
            this.$message({
              showClose: true,
              message: "请输入必填字段",
              type: "error"
            });
          } else {
            console.info(this.ruleForm.baseInfo.priority);
            debugger;
            if (this.ruleForm.clientInfo.documents.length == 0) {
              this.ruleForm.clientInfo.documents.push(this.documentForm);
              if (this.documentForm.attachments.length == 0) {
                this.documentForm.attachments.push(this.attForm);
              }
            }
            if (this.ruleForm.targetInfo[0].contacts.length == 0) {
              this.ruleForm.targetInfo[0].contacts.push(this.contactsForm);
              if (this.contactsForm.networks.length == 0) {
                this.contactsForm.networks.push(this.network);
              }
            }
            if (this.ruleForm.targetInfo[0].principal.length == 0) {
              this.ruleForm.targetInfo[0].principal.push(this.principalForm);
              if (this.principalForm.contacts.length == 0) {
                this.principalForm.contacts.push(this.PrincipalContacts);
                if (this.PrincipalContacts.networks.length === 0) {
                  this.PrincipalContacts.networks.push(this.PrincipalNetwork);
                }
              }
            }

            if (this.ruleForm.targetInfo[0].affiliateCompany.length == 0) {
              this.ruleForm.targetInfo[0].affiliateCompany.push(this.affForm);
              if (this.affForm.principal.length === 0) {
                this.affForm.principal.push(this.affprincipalForm);
                if (this.affprincipalForm.contacts.length === 0) {
                  this.affprincipalForm.contacts.push(this.affContacts);
                  if (this.affContacts.networks.length === 0) {
                    this.affContacts.networks.push(this.affNetwork);
                  }
                }
              }
            }
            if (this.ruleForm.targetInfo[0].productInfo.length === 0) {
              this.ruleForm.targetInfo[0].productInfo.push(
                this.productInfoForm
              );
            }
            console.info(this.ruleForm);
            if (this.user_role === "Admin") {
              _createcaseA(this.ruleForm)
                .then(res => {
                  console.info(res);
                  this.$message({
                    message: "恭喜你，这是一条成功消息",
                    type: "success"
                  });
                  this.$router.push({ path: "/" });
                })
                .catch(err => {
                  this.$message.error("创建有误，请核对信息");
                });
            } else if (this.user_role === "Supervisor") {
              _createcaseS(this.ruleForm)
                .then(res => {
                  console.info(res);
                  this.$message({
                    message: "恭喜你，这是一条成功消息",
                    type: "success"
                  });
                  this.$router.push({ path: "/" });
                })
                .catch(err => {
                  this.$message.error("创建有误，请核对信息");
                });
            } else if (this.user_role === "ReportingStaff") {
              console.info(this.ruleForm);
              _createcaseR(this.ruleForm)
                .then(res => {
                  console.info(res);
                  this.$message({
                    message: "恭喜你，这是一条成功消息",
                    type: "success"
                  });
                  this.$router.push({ path: "/" });
                })
                .catch(err => {
                  this.$message.error("创建有误，请核对信息");
                });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    }
  },
  created() {
    this.user_role = sessionStorage.getItem("user_role");
    this.getUserRole();
  }
};
</script>


<style lang="less" scoped>
.el-select {
  width: 100%;
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
