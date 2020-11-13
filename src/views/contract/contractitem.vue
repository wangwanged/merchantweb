<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name fl">aaa</span>
        <span class="title_name fl">aaa</span>
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
        <el-button size="small" @click="dialog.dialogedit = true"
          >编辑</el-button
        >
        <el-button size="small" @click="dialog.dialogtransfor = true"
          >转移</el-button
        >
        <el-button size="small" @click="dialog.dialogbreakoff = true"
          >解约</el-button
        >
        <el-button size="small" @click="dialog.dialoginvalid = true"
          >失效</el-button
        >
      </div>
      <div class="header_bottom">
        <el-button size="small">单店加盟</el-button>
        <el-button size="small" style="margin-right:15px">待审核</el-button>
        <span style="font-size:13px">负责人：某某某</span>
      </div>
    </div>
    <el-tabs v-model="showTabs" type="card">
      <el-tab-pane label="合同信息" name="first">
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
                <el-table-column prop="num" label="关联合同" min-width="160">
                </el-table-column>
                <el-table-column prop="type" label="合同类型" min-width="70">
                </el-table-column>
                <el-table-column prop="dianmianName" label="店面名称" min-width="180">
                </el-table-column>
                <el-table-column prop="signDate" label="签约日期" min-width="90">
                </el-table-column>
                <el-table-column prop="beginDate" label="合同开始日期" min-width="90">
                </el-table-column>
                <el-table-column prop="endDate" label="合同结束日期" min-width="90">
                </el-table-column>
                <el-table-column prop="manager" label="负责人" min-width="70">
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
        <el-row type="flex" justify="space-around" style="margin-top:30px">
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
          <el-col :span="3" v-for="(item, index) in feeList" :key="index">
            <p>{{ item.amount }}</p>
            <p>{{ item.type }}</p>
          </el-col>
        </el-row>
        <el-table
          :data="feeList"
          border
          style="width: 100%;margin-top:40px;text-align:center"
        >
          <el-table-column prop="shoukuanDate" label="收费时间" min-width="100">
          </el-table-column>
          <el-table-column prop="num" label="费用编号" min-width="120">
          </el-table-column>
          <el-table-column prop="type" label="汇款类型" min-width="100">
          </el-table-column>
          <el-table-column prop="amount" label="费用金额(元)" min-width="100">
          </el-table-column>
          <el-table-column prop="payMethod" label="付款方式" min-width="100">
          </el-table-column>
          <el-table-column prop="reciever" label="收款人" min-width="100">
          </el-table-column>
          <el-table-column prop="checkStatus" label="状态" min-width="100">
          </el-table-column>
        </el-table>
        <!-- 新增费用弹框 -->
        <el-dialog title="新增费用" width="40%" :visible.sync="dialogaddFee">
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
            <el-button @click="dialog.dialogaddFee = false">取 消</el-button>
            <el-button type="primary" @click="dialog.dialogaddFee = false"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="合同附件" name="third">
        <div class="attachment">
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
              <el-input type="textarea" :rows="4" placeholder="请输入内容"
                ></el-input>
            </el-form-item>
            <el-form-item required label="上传附件">
              <el-button size="small" type="primary">上传</el-button>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.dialogAddattachement = false">取 消</el-button>
                <el-button type="primary" @click="dialog.dialogAddattachement = false">确 定</el-button>
            </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="开店信息" name="fourth"
        ><el-button @click="getRelatedcontract">sss</el-button></el-tab-pane
      >
    </el-tabs>
    <!-- 审核弹框 -->
    <el-dialog title="合同审核" width="30%" :visible.sync="dialog.dialogcheck">
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
        <el-button type="primary" @click="dialog.dialogcheck = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 续签弹框 -->
    <el-dialog title="合同续签" width="40%" :visible.sync="dialog.dialogextend">
      <el-form label-width="100px">
        <div class="main_title">客户信息</div>
        <el-form-item required label="选择客户">
          <el-input placeholder="aaa"></el-input>
        </el-form-item>
        <el-form-item required label="客户姓名">
          <el-input placeholder="aaa"></el-input>
        </el-form-item>
        <el-form-item required label="客户电话">
          <el-input placeholder="aaa"></el-input>
        </el-form-item>
        <div class="main_title">签约信息</div>
        <el-form-item required label="合同类型">
          <el-button size="small">续签</el-button>
        </el-form-item>
        <el-form-item required label="签约产品">
          <el-input placeholder="aaa"></el-input>
        </el-form-item>
        <el-form-item required label="关联合同">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="合同编号">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="签约日期">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="合同开始时间">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="合同结束时间">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <div class="main_title">店面信息</div>
        <el-form-item required label="店面名称">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="所属区域">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="详细地址">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="地址坐标">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <div class="main_title">费用信息</div>
        <el-form-item required label="加盟费">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="运营管理费">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="系统使用费">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="系统维护费">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="办件费">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="履约保证金">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="经营管理费">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <div class="main_title">备注信息</div>
        <el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
        <el-form-item required label="签约人员" style="margin-top:30px">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="所属部门">
          <el-input placeholder="xxx"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogextend = false">取 消</el-button>
        <el-button type="primary" @click="dialog.dialogextend = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑合同" width="40%" :visible.sync="dialog.dialogedit">
      <el-form label-width="110px">
        <div class="main_title">客户信息</div>
        <el-form-item required label="客户姓名">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="客户电话">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <div class="main_title">签约信息</div>
        <el-form-item required label="合同类型">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="签约产品">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="合同编号">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="签约日期">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="合同开始时间">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="合同结束时间">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <div class="main_title">店面信息</div>
        <el-form-item required label="店面名称">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="所属区域">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="详细信息">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="地址坐标">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <div class="main_title">费用信息</div>
        <el-form-item required label="加盟费">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="运营管理费">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="系统使用费">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="系统维护费">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="办件费">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="履约保证金">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="经营管理费">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <div class="main_title">备注信息</div>
        <el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
        <el-form-item required label="签约人员" style="margin-top:30px">
          <el-input place="xxx"></el-input>
        </el-form-item>
        <el-form-item required label="所属部门">
          <el-input place="xxx"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogedit = false">取 消</el-button>
        <el-button type="primary" @click="dialog.dialogedit = false"
          >确 定</el-button
        >
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
        <el-button type="primary" @click="dialog.dialogtransfor = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 解约弹框 -->
    <el-dialog title="解约" width="40%" :visible.sync="dialog.dialogbreakoff">
      <el-form label-width="80px">
        <el-form-item required label="解约类型">
          <el-radio label="1">到期解约</el-radio>
          <el-radio label="2">未到期解约</el-radio>
        </el-form-item>
        <el-form-item required label="解约时间">
          <el-input placeholder="xxx"></el-input>
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
        <el-button type="primary" @click="dialog.dialogbreakoff = false"
          >确 定</el-button
        >
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
        <el-button type="primary" @click="dialog.dialoginvalid = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
  contractAttachment
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
      showTabs: "first"
    };
  },
  created() {
    this.getList(
      this.getRelatedcontract,
      this.getcontractFee,
      this.getcontractAttachment
    );
  },
  methods: {
    //   获取合同列表
    getList(aa = () => {}, bb = () => {}, cc = () => {}) {
      getContractManager(this.id).then(response => {
        this.contractList = response.data;
        this.rootNum = response.data.rootNum;
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
    // 审核按钮操作
    handlecheck(){

    },
    // 下载模板
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
.el-tabs--top {
  width: 50%;
}
.el-tabs__nav {
  width: 50%;
}
</style>
