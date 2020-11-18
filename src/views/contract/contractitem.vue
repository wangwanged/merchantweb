<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name fl">{{ contractList.customerName }}</span>
        <span class="title_name fl">{{ contractList.dianmianName }}</span>
        <div>
          <el-button
            size="small"
            type="primary"
            @click="dialog.dialogcheck = true"
            >审核</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="dialog.dialogextend = true"
            >续签</el-button
          >
          <el-button size="small" type="primary" @click="handleEdit"
            >编辑</el-button
          >
          <el-button size="small" type="primary" @click="handleTransfer"
            >转移</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="dialog.dialogbreakoff = true"
            >解约</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="dialog.dialoginvalid = true"
            >失效</el-button
          >
        </div>
        <div>
          <el-button size="small" type="primary">反审核</el-button>
          <el-button size="small" type="primary">续签</el-button>
          <el-button size="small" type="primary">转移</el-button>
          <el-button size="small" type="primary">解约</el-button>
        </div>
      </div>
      <div class="header_bottom">
        <el-button type="primary" plain size="small">单店加盟</el-button>
        <el-button type="primary" plain size="small" style="margin-right:15px"
          >待审核</el-button
        >
        <span style="font-size:13px">负责人：某某某</span>
      </div>
    </div>
    <div class="main">
      <div class="main_left">
        <el-tabs v-model="showTabs" class="tabs">
          <el-tab-pane label="合同信息" name="first" class="is-top">
            <div class="main">
              <div class="main_left" style="width:100%">
                <div class="main_content_top">
                  <div class="main_title">客户信息</div>
                  <p class="main_content_name">
                    <span class="main_content_firstname">客户姓名：</span>
                    <span>{{ contractList.customerName }}</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">客户电话：</span>
                    <span>{{ contractList.customerPhone }}</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">合同类型：</span>
                    <el-button size="small">{{ contractList.type }}</el-button>
                  </p>
                  <el-table border :data="relatedList" style="width: 100%">
                    <el-table-column
                      prop="num"
                      label="关联合同"
                      min-width="170"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="合同类型"
                      min-width="70"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="dianmianName"
                      label="店面名称"
                      min-width="170"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="signDate"
                      label="签约日期"
                      min-width="90"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="beginDate"
                      label="合同开始日期"
                      min-width="90"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="endDate"
                      label="合同结束日期"
                      min-width="90"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="manager"
                      label="负责人"
                      min-width="70"
                    >
                    </el-table-column>
                  </el-table>
                  <div class="main_title">店面/区域信息</div>
                  <p class="main_content_name">
                    <span class="main_content_firstname">店面名称：</span>
                    <span>{{ contractList.dianmianName }}</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">所属区域：</span>
                    <span
                      >{{ contractList.dianmianProvince }}
                      {{ contractList.dianmianCity }}
                      {{ contractList.dianmianDistrict }}</span
                    >
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">详细地址：</span>
                    <span>{{ contractList.dianmianAddress }}</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">地址坐标：</span>
                    <span
                      >{{ contractList.dianmianLatitude }}
                      {{ contractList.dianmianLongitude }}</span
                    >
                  </p>
                  <div class="main_title">财务信息</div>
                  <p class="main_content_name">
                    <span class="main_content_firstname">加盟费：</span>
                    <span>xxx</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">运营管理费：</span>
                    <span>xxx</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">系统使用费：</span>
                    <span>xxx</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">系统维护费：</span>
                    <span>xxx</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">办件费：</span>
                    <span>xxx</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">履约保证见：</span>
                    <span>xxx</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">经营管理费：</span>
                    <span>xxx</span>
                  </p>
                  <div class="main_title">备注信息</div>
                  <p class="main_content_name">
                    <span class="main_content_firstname">备注信息：</span>
                    <span>{{ contractList.remark }}</span>
                  </p>
                  <div class="main_title">系统信息</div>
                  <p class="main_content_name">
                    <span class="main_content_firstname">备注信息：</span>
                    <span>xxx</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">负责人：</span>
                    <span>{{ contractList.manager }}</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">创建时间：</span>
                    <span>{{ contractList.signDate }}</span>
                  </p>
                  <p class="main_content_name">
                    <span class="main_content_firstname">审核时间：</span>
                    <span>xxx</span>
                  </p>
                </div>
              </div>
            </div></el-tab-pane
          >
          <el-tab-pane label="费用信息" name="second">
            <div class="main">
              <div class="main_left" style="width:100%">
                <div class="main_content_top">
                  <el-row
                    type="flex"
                    justify="space-around"
                    style="margin-top:30px"
                  >
                    <el-button size="small">收费汇总</el-button>
                    <el-button size="small" @click="dialog.dialogaddFee = true"
                      >新增费用</el-button
                    >
                  </el-row>
                  <el-row
                    :gutter="20"
                    type="flex"
                    justify="space-around"
                    style="margin-top:40px;font-size:13px;text-align:center"
                  >
                    <el-col
                      :span="3"
                      v-for="(item, index) in feeList"
                      :key="index"
                    >
                      <p>{{ item.amount }}</p>
                      <p>{{ item.type }}</p>
                    </el-col>
                  </el-row>
                  <el-table
                    :data="feeList"
                    border
                    style="width: 100%;margin-top:40px;text-align:center"
                  >
                    <el-table-column
                      prop="shoukuanDate"
                      label="收费时间"
                      min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="费用编号"
                      min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="汇款类型"
                      min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="费用金额(元)"
                      min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="payMethod"
                      label="付款方式"
                      min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="reciever"
                      label="收款人"
                      min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="checkStatus"
                      label="状态"
                      min-width="100"
                    >
                    </el-table-column>
                  </el-table>
                  <!-- 新增费用弹框 -->
                  <el-dialog
                    title="新增费用"
                    width="40%"
                    :visible.sync="dialog.dialogaddFee"
                  >
                    <el-form label-width="80px">
                      <el-form-item label="收费时间">
                        <el-input placeholder="aaa"></el-input>
                      </el-form-item>
                      <el-form-item label="费用编号">
                        <el-input placeholder="aaa"></el-input>
                      </el-form-item>
                      <el-form-item label="费用类型">
                        <el-input placeholder="aaa"></el-input>
                      </el-form-item>
                      <el-form-item label="费用金额">
                        <el-input placeholder="aaa"></el-input>
                      </el-form-item>
                      <el-form-item label="付款方式">
                        <el-input placeholder="aaa"></el-input>
                      </el-form-item>
                      <el-form-item label="费用类型">
                        <el-input placeholder="aaa"></el-input>
                      </el-form-item>
                      <el-form-item label="收款人">
                        <el-input placeholder="aaa"></el-input>
                      </el-form-item>
                      <el-form-item label="备注">
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialog.dialogaddFee = false"
                        >取 消</el-button
                      >
                      <el-button
                        type="primary"
                        @click="dialog.dialogaddFee = false"
                        >确 定</el-button
                      >
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="合同附件" name="third">
            <div class="main">
              <div class="main_left" style="width:100%">
                <div class="main_content_top">
                  <div class="main_title fl">客户附件</div>
                  <el-button
                    class="fr"
                    size="small"
                    type="primary"
                    style="margin-top:25px"
                    @click="dialog.dialogAddattachement = true"
                    >新增附件</el-button
                  >
                  <!-- <el-table :data="feeList" border style="width: 100%">
            <el-table-column prop="date" label="附件名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="附件说明" width="180">
            </el-table-column>
            <el-table-column prop="address" label="上传人"> </el-table-column>
            <el-table-column prop="date" label="上传时间" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table> -->
                </div>
              </div>
            </div>
            <!-- 新增附件弹框 -->
            <el-dialog
              title="合同审核"
              width="40%"
              :visible.sync="dialog.dialogAddattachement"
            >
              <el-form label-width="80px">
                <el-form-item required label="附件名称">
                  <el-input placeholder="aaa"></el-input>
                </el-form-item>
                <el-form-item label="附件说明">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item required label="上传附件">
                  <el-button size="small" type="primary">上传</el-button>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.dialogAddattachement = false"
                  >取 消</el-button
                >
                <el-button
                  type="primary"
                  @click="dialog.dialogAddattachement = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="开店信息" name="fourth">
            <div class="main">
              <div class="main_left" style="width:100%">
                <div class="main_content_top"></div>
              </div></div
          ></el-tab-pane>
        </el-tabs>
      </div>
      <!-- 审核弹框 -->
      <el-dialog
        title="合同审核"
        width="30%"
        :visible.sync="dialog.dialogcheck"
      >
        <tr>
          <td><i class="el-icon-message-solid" style="font-size:70px"></i></td>
          <td>
            <strong>确认要审核合同吗？</strong>
            <p>
              合同审核后将无法进行编辑、转移、失效操作！
            </p>
          </td>
        </tr>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialogcheck = false">取 消</el-button>
          <el-button type="primary" @click="handlecheck">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 续签弹框 -->
      <el-dialog
        title="合同续签"
        width="40%"
        :visible.sync="dialog.dialogextend"
      >
        <el-form label-width="120px">
          <div class="main_title">客户信息</div>
          <el-form-item required label="选择客户">
            <el-input v-model="contentRenew.customerNum"></el-input>
          </el-form-item>
          <el-form-item required label="客户姓名">
            <el-input v-model="contentRenew.customerName"></el-input>
          </el-form-item>
          <el-form-item required label="客户电话">
            <el-input v-model="contentRenew.customerPhone"></el-input>
          </el-form-item>
          <div class="main_title">签约信息</div>
          <el-form-item required label="合同类型">
            <el-button size="small">{{ contentRenew.type }}</el-button>
          </el-form-item>
          <el-form-item required label="签约产品">
            <el-input v-model="contentRenew.produce" disabled></el-input>
          </el-form-item>
          <el-form-item required label="关联合同">
            <el-input v-model="contentRenew.rootNum" disabled></el-input>
          </el-form-item>
          <el-form-item required label="合同编号">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item required label="签约日期">
            <el-date-picker
              v-model="contentRenew.signDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item required label="合同开始时间">
            <el-date-picker
              v-model="contentRenew.beginDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item required label="合同结束时间">
            <el-date-picker
              v-model="contentRenew.endDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <div class="main_title">店面信息</div>
          <el-form-item required label="店面名称">
            <el-input v-model="contentRenew.dianmianName"></el-input>
          </el-form-item>
          <el-form-item required label="所属区域">
            <el-input v-model="contentRenew.dianmianProvince"></el-input>
          </el-form-item>
          <el-form-item required label="详细地址">
            <el-input v-model="contentRenew.dianmianAddress"></el-input>
          </el-form-item>
          <el-form-item required label="地址坐标">
            <el-input v-model="contentRenew.dianmianLatitude"></el-input>
          </el-form-item>
          <div class="main_title">费用信息</div>
          <el-form-item required label="加盟费">
            <el-input
              v-model="contentRenew.fee.jiamengjiameng"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item required label="运营管理费">
            <el-input
              v-model="contentRenew.fee.yunying"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item required label="系统使用费">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item required label="系统维护费">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item required label="办件费">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item required label="履约保证金">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item required label="经营管理费">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <div class="main_title">备注信息</div>
          <el-input
            type="textarea"
            :rows="3"
            v-model="contentRenew.remark"
          ></el-input>
          <el-form-item required label="签约人员" style="margin-top:30px">
            <el-input v-model="contentRenew.signUser"></el-input>
          </el-form-item>
          <el-form-item required label="所属部门">
            <el-input v-model="contentRenew.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialogextend = false">取 消</el-button>
          <el-button type="primary" @click="handleRenew()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑弹框 -->
      <el-dialog title="编辑合同" width="40%" :visible.sync="dialog.dialogedit">
        <el-form label-width="110px">
          <div class="main_title">客户信息</div>
          <el-form-item required label="客户姓名">
            <el-input v-model="form.customerNum"></el-input>
          </el-form-item>
          <el-form-item required label="客户电话">
            <el-input v-model="form.customerPhone"></el-input>
          </el-form-item>
          <div class="main_title">签约信息</div>
          <el-form-item required label="合同类型">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item required label="签约产品">
            <el-input v-model="form.produce"></el-input>
          </el-form-item>
          <el-form-item required label="合同编号">
            <el-input v-model="form.num"></el-input>
          </el-form-item>
          <el-form-item required label="签约日期">
            <el-date-picker
              v-model="form.signDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item required label="合同开始时间">
            <el-date-picker
              v-model="form.beginDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item required label="合同结束时间">
            <el-date-picker
              v-model="form.endDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <div class="main_title">店面信息</div>
          <el-form-item required label="店面名称">
            <el-input v-model="form.dianmianName"></el-input>
          </el-form-item>
          <el-form-item required label="所属区域">
            <el-input v-model="form.dianmianProvince"></el-input>
          </el-form-item>
          <el-form-item required label="详细信息">
            <el-input v-model="form.dianmianAddress"></el-input>
          </el-form-item>
          <el-form-item required label="地址坐标">
            <el-input v-model="form.dianmianLatitude"></el-input>
          </el-form-item>
          <div class="main_title">费用信息</div>
          <el-form-item required label="加盟费">
            <el-input></el-input>
          </el-form-item>
          <el-form-item required label="运营管理费">
            <el-input></el-input>
          </el-form-item>
          <el-form-item required label="系统使用费">
            <el-input></el-input>
          </el-form-item>
          <el-form-item required label="系统维护费">
            <el-input></el-input>
          </el-form-item>
          <el-form-item required label="办件费">
            <el-input></el-input>
          </el-form-item>
          <el-form-item required label="履约保证金">
            <el-input></el-input>
          </el-form-item>
          <el-form-item required label="经营管理费">
            <el-input></el-input>
          </el-form-item>
          <div class="main_title">备注信息</div>
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
          ></el-input>
          <el-form-item required label="签约人员" style="margin-top:30px">
            <el-input v-model="form.signUser"></el-input>
          </el-form-item>
          <el-form-item required label="所属部门">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialogedit = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 转移弹框 -->
      <el-dialog
        title="合同转移"
        width="30%"
        :visible.sync="dialog.dialogtransfor"
      >
        <el-form label-width="100px">
          <el-form-item label="新负责人">
            <el-input place="xxx"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialogtransfor = false">取 消</el-button>
          <el-button type="primary" @click="transferSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 解约弹框 -->
      <el-dialog title="解约" width="40%" :visible.sync="dialog.dialogbreakoff">
        <el-form label-width="80px">
          <!-- <el-form-item required label="解约类型">
            <el-radio label="1">到期解约</el-radio>
            <el-radio label="2">未到期解约</el-radio>
          </el-form-item> -->
          <el-form-item required label="解约时间">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="解约说明">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-button size="small" type="primary">添加附件</el-button>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialogbreakoff = false">取 消</el-button>
          <el-button type="primary" @click="breakoffSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 失效弹框 -->
      <el-dialog title="失效" width="30%" :visible.sync="dialog.dialoginvalid">
        <tr>
          <td><i class="el-icon-message-solid" style="font-size:70px"></i></td>
          <td>
            <strong>确认要失效所选合同吗？</strong>
            <p>
              合同失效后，可重新再次录入合同。
            </p>
          </td>
        </tr>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialoginvalid = false">取 消</el-button>
          <el-button type="primary" @click="handleAbandon">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 右边合同跟进 -->
    <div class="main_right">
      <div class="tab_style">
        合同跟进
      </div>
      <div class="main_right_top" style="overflow:hidden">
        <div class="contract_genjin_top">
          <el-row :gutter="20">
            <el-col :span="6"
              ><el-button size="small" type="primary">解约</el-button></el-col
            >
            <el-col :span="6"><span>2020年3月6日</span></el-col>
            <el-col :span="6">到期解约</el-col>
            <el-col :span="6">下载</el-col>
          </el-row>
        </div>
        <!-- <div class="main_content_name" >
          <div
            class="main_content_firstname"
            style="margin-top:20px;font-size:15px"
            >aaa</div
          >
        </div> -->
        <!-- <div class="main_content_name" v-for="(item,index) in OperlogList"  :key="index">
          <div
            class="main_content_firstname"
            style="margin-top:20px;font-size:15px"
            >{{item.operTime}}</div
          >
          <div class='genjin-height' >
              <span style="color:orange">{{item.operName}}</span>
              <span>{{item.title}}</span>
              <span>{{item.description}}</span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  listContractManager,
  getContractManager,
  delContractManager,
  addContractManager,
  updateContractManager,
  exportContractManager,
  relatedContract,
  contractFee,
  contractAttachment,
  contractCheck,
  contractRenew,
  contractBreakoff,
  contractAbandon,
  contractOperlog
} from "@/api/contract/contractManager";
export default {
  data() {
    return {
      id: this.$route.query.id, //当前详情页id
      contractList: [], //当前合同列表
      rootNum: "", //合同根编号
      dialog: {
        dialogcheck: false, //合同审核弹框
        dialogextend: false, //合同续签弹框
        dialogedit: false, //合同编辑弹框
        dialogtransfor: false, //合同转移弹框
        dialogbreakoff: false, //合同解约弹框
        dialoginvalid: false, //合同失效弹框
        dialogaddFee: false, //费用信息中  新增费用弹框
        dialogAddattachement: false //合同附件中   新增附件弹框
      },
      relatedList: [], //关联合同列表
      feeList: [], //费用列表
      showTabs: "first", //tab栏显示
      form: {}, //表单数据
      contentBreakoff: {
        id: this.id
      },
      checkStatus:'',
      OperlogList:[]
    };
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:rgb(242, 242, 242)");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  computed: {
    //  合同审核按钮
    contentCheck() {
      return {
        id: this.$route.query.id,
        signDate: this.contractList.signDate
      };
    },
    //  合同续签按钮
    contentRenew() {
      return {
        customerNum: JSON.parse(JSON.stringify(this.contractList.customerNum)),
        customerName: JSON.parse(
          JSON.stringify(this.contractList.customerName)
        ),
        customerPhone: this.contractList.customerPhone,
        type: this.contractList.type,
        produce: this.contractList.produce,
        rootNum: this.contractList.rootNum,
        num: "",
        signDate: new Date(),
        beginDate: new Date(),
        endDate: "",
        dianmianName: this.contractList.dianmianName,
        dianmianAddress: this.contractList.dianmianAddress,
        dianmianProvince: this.contractList.dianmianProvince,
        dianmianCity: this.contractList.dianmianCity,
        dianmianDistrict: this.contractList.dianmianDistrict,
        dianmianLatitude: this.contractList.dianmianLatitude,
        dianmianLongitude: this.contractList.dianmianLongitude,
        dianmianNum: this.contractList.dianmianNum,
        fee: {
          jiameng: "",
          yunying: ""
        },
        remark: this.contractList.remark,
        signUser: this.contractList.signUser
      };
    }
  },
  created() {
    this.getList(
      this.getRelatedcontract,
      this.getcontractFee,
      this.getcontractAttachment
    );
    console.log(this.checkStatus)
    this.getcontractOperlog()
  },
  methods: {
    // 表单重置
    reset() {
      this.form = {
        id: null,
        num: null,
        customerName: null,
        customerId: null,
        customerPhone: null,
        type: null,
        produce: null,
        dianmianName: null,
        dianmianNum: null,
        guarantee: null,
        fee: null,
        operation: null,
        manager: null,
        signDate: null,
        signUser: null,
        beginDate: null,
        endDate: null,
        status: null,
        remark: null
      };
    },
    //   获取合同列表
    getList(aa = () => {}, bb = () => {}, cc = () => {}) {
      getContractManager(this.id).then(response => {
        this.contractList = response.data;
        this.rootNum = response.data.rootNum;
        this.checkStatus=response.data.checkStatus
        aa();
        bb();
        cc();
      });
    },
    // 获取关联合同
    getRelatedcontract() {
      relatedContract(this.rootNum).then(res => {
        this.relatedList = res.rows;
      });
    },
    // 获取费用信息
    getcontractFee() {
      contractFee(this.rootNum).then(res => {
        this.feeList = res.data;
      });
    },
    //获取附件合同信息
    getcontractAttachment() {
      contractAttachment(this.rootNum).then(res => {
        console.log(res);
      });
    },
    // 获取合同日志跟进
    getcontractOperlog(){
       contractOperlog().then(res=>{
          this.OperlogList=res.rows
       }).catch(error=>{

       })
    },
    // 审核按钮操作
    handlecheck() {
      contractCheck(this.contentCheck)
        .then(res => {
          this.$message.success("操作成功");
          this.dialog.dialogcheck = false;
        })
        .catch(error => {
          this.$message.error("操作失败");
        });
    },
    // 续签按钮操作
    handleRenew() {
      contractRenew(this.contentRenew, this.id)
        .then(res => {
          this.$message.success("操作成功");
          this.dialog.dialogextend = false;
        })
        .catch(error => {
          this.$message.error("操作失败");
        });
    },
    // 编辑按钮操作
    handleEdit() {
      this.dialog.dialogedit = true;
      this.reset();
      const id = this.id;
      getContractManager(id).then(res => {
        console.log("sssssssssssss", res);
        this.form = res.data;
      });
    },
    // 编辑提交按钮
    editSubmit() {
      updateContractManager(this.form)
        .then(res => {
          this.$message.success("操作成功");
          this.dialog.dialoginvalid = false;
        })
        .catch(error => {
          this.$message.error("操作失败");
        });
    },
    // 转移按钮操作
    handleTransfer() {
      this.dialog.dialogtransfor = true;
      this.reset();
      const id = this.id;
      getContractManager(id).then(res => {
        this.form.managerId = res.data.managerId;
      });
    },
    // 转移提交按钮
    transferSubmit() {
      const params = {
        id: this.id,
        managerId: this.form.managerId
      };
      contractTransfer(params).then(res => {});
    },
    // 解约按钮操作
    breakoffSubmit() {
      const params = {
        id: this.id
      };
      contractBreakoff(id).then(res => {});
    },
    // 失效提交按钮
    handleAbandon() {
      const id = this.id;
      contractAbandon(id)
        .then(res => {
          this.$message.success("操作成功");
          this.dialog.dialoginvalid = false;
        })
        .catch(error => {
          this.$message.error("操作失败");
        });
    },
    importTemplate: function() {
      table.set();
      $.get(table.options.importTemplateUrl, function(result) {
        if (result.code == web_status.SUCCESS) {
          window.location.href =
            ctx +
            "common/download?fileName=" +
            encodeURI(result.msg) +
            "&delete=" +
            true;
        } else if (result.code == web_status.WARNING) {
          $.modal.alertWarning(result.msg);
        } else {
          $.modal.alertError(result.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.genjin_top {
  border-bottom: 1px solid rgb(184, 181, 181);
}
/deep/ .el-tabs__item {
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: rgb(204, 204, 204);
}
/deep/ .el-tabs__item:hover {
  color: black;
}
/deep/ .is-active {
  width: 100px;
  height: 45px;
  border: 0px;
  border-top: 5px solid #409eff;
  text-align: center;
  line-height: 45px;
  background-color: #fff;
  color: black;
  padding: 0px;
}
/deep/ .is-scrollable {
}
/deep/ .el-tabs__nav {
    margin-bottom: -5px;
}
.genjin-height {
  height: 60px;
  line-height: 60px;
}
.main_right_top {
  background-color: #fff; 
  padding: 20px 20px;
}
.contract_genjin_top {
  height: 80px;
  line-height: 80px;
}
</style>
