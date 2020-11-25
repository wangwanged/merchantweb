<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name fl">{{ customerList.name }}</span>
        <el-button style="margin:0 20px" type="primary" circle
          ><div style="width:12px;height:12px;">
            {{ customerList.level }}
          </div></el-button
        >
        <!-- <div class="circle fl" style="margin-right:10px">
          {{ customerList.level }}
        </div> -->
        <el-button size="small" type="primary">{{
          customerList.status
        }}</el-button>
        <el-button size="small" type="primary" @click="dialogNewsign = true"
          >新签合同</el-button
        >
        <el-button size="small" @click="handleUpdate" type="primary"
          >编辑</el-button
        >
        <el-button size="small" @click="dialogTransfor = true" type="primary"
          >转移</el-button
        >
        <el-button size="small" @click="dialogeInvalid = true" type="primary"
          >失效</el-button
        >
      </div>
      <div class="header_bottom">
        <span>{{ customerList.phonenumber }}</span>
      </div>
    </div>
    <div class="main">
      <div class="main_left">
        <div class="tab_style">
          客户信息
        </div>
        <div class="main_content_top">
          <p class="main_content_name">
            <span class="main_content_firstname">客户等级：</span>
            <span>{{ customerList.level }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户需求：</span>
            <span>{{ customerList.customerNeeds }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">地区：</span>
            <span
              >{{ customerList.province }} {{ customerList.city }}
              {{ customerList.district }}</span
            >
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">公司：</span>
            <span>{{ customerList.companyName }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">店面地址：</span>
            <span>{{ customerList.dianmianAddress }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">中介经验：</span>
            <span>{{ customerList.experience }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户来源：</span>
            <span>{{ customerList.resource }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">备注：</span>
            <span>{{ customerList.remark }}</span>
          </p>
          <div class="line_between"></div>
          <div class="main_title">合同信息</div>
          <el-table border :data="contractList" style="width: 100%">
            <el-table-column prop="num" label="关联合同" width="120">
            </el-table-column>
            <el-table-column prop="type" label="合同类型" width="120">
            </el-table-column>
            <el-table-column
              prop="dianmianName"
              label="店面、区域名称"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="signDate" label="签约日期" width="120">
            </el-table-column>
            <el-table-column prop="beginDate" label="合同开始日期" width="120">
            </el-table-column>
            <el-table-column prop="endDate" label="合同结束日期" width="120">
            </el-table-column>
            <el-table-column prop="manager" label="负责人"> </el-table-column>
          </el-table>
          <div class="main_title">系统信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">录入人：</span>
            <span>{{ customerList.luruName }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">负责人：</span>
            <span>{{ customerList.username }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">录入时间：</span>
            <span>{{ customerList.inputDate }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">最新跟进：</span>
            <span>{{ customerList.genjinDate }}</span>
          </p>
        </div>
      </div>
      <div class="main_right">
        <div class="main_right_top" style="overflow:hidden">
          <div class="tab_style fl">
            客户跟进
          </div>
          <el-button
            type="primary"
            class="fr"
            @click="$store.state.sosoitem.customer.dialogfollow = true"
            >写跟进</el-button
          >
        </div>
        <Follow></Follow>
      </div>
    </div>
    <!-- 新签合同弹框 -->
    <el-dialog title="新签合同" :visible.sync="dialogNewsign" width="40%">
      <el-form label-position="left" label-width="80px">
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          客户信息
        </div>
        <el-form-item label="客户姓名">
          <el-input v-model="customerList.name"></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input v-model="customerList.phone"></el-input>
        </el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          签约信息
        </div>
        <el-form-item label="合同类型">
          <el-button size="small" type="primary" plain>新签</el-button>
        </el-form-item>
        <el-form-item label="签约产品">
          <el-select v-model="newsigninfo.produce" @change="showdianmian">
            <el-option
              v-for="dict in customerNeedsOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input placeholder="请输入" v-model="newsigninfo.num"></el-input>
        </el-form-item>
        <el-form-item label="签约日期">
          <el-date-picker
            v-model="newsigninfo.signDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同开始时间">
          <el-date-picker
            v-model="newsigninfo.beginDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同结束时间">
          <el-date-picker
            v-model="newsigninfo.endDate"
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          店面/区域信息
        </div>
        <div v-if="showDianmian">
          <el-form-item label="店面名称">
            <el-input
              v-model="newsigninfo.dianmianName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属省">
            <el-input
              v-model="newsigninfo.dianmianProvince"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属市">
            <el-input
              v-model="newsigninfo.dianmianCity"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属区">
            <el-input
              v-model="newsigninfo.dianmianDistrict"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="店面名称">
            <el-input
              v-model="newsigninfo.dianmianName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属省">
            <el-input
              v-model="newsigninfo.dianmianProvince"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属市">
            <el-input
              v-model="newsigninfo.dianmianCity"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属区">
            <el-input
              v-model="newsigninfo.dianmianDistrict"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="详细地址">
          <el-input
            v-model="newsigninfo.dianmianAddress"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="店面经度">
          <el-input
            placeholder="请输入"
            v-model="newsigninfo.dianmianLongitude"
          ></el-input>
        </el-form-item>
        <el-form-item label="店面纬度">
          <el-input
            v-model="newsigninfo.dianmianLatitide"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          费用信息
        </div>
        <el-form-item label="履约保证金">
          <el-input
            placeholder="请输入"
            v-model="newsigninfo.fee.lvyue"
          ></el-input>
        </el-form-item>
        <el-form-item label="运营管理费">
          <el-input
            placeholder="请输入"
            v-model="newsigninfo.fee.yunyingManage"
          ></el-input>
        </el-form-item>
        <el-form-item label="系统使用费">
          <el-input
            placeholder="请输入"
            v-model="newsigninfo.fee.systemUse"
          ></el-input>
        </el-form-item>
        <el-form-item label="系统维护费">
          <el-input
            placeholder="请输入"
            v-model="newsigninfo.fee.systemGuard"
          ></el-input>
        </el-form-item>
        <el-form-item label="过户费">
          <el-input
            placeholder="请输入"
            v-model="newsigninfo.fee.guohu"
          ></el-input>
        </el-form-item>
        <el-form-item label="代办费">
          <el-input
            placeholder="请输入"
            v-model="newsigninfo.fee.daiban"
          ></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          备注信息
        </div>
        <el-input
          style="margin-bottom:20px"
          type="textarea"
          v-model="newsigninfo.remark"
        ></el-input>
        <el-form-item label="签约人员">
          <el-input
            placeholder="请输入"
            v-model="newsigninfo.manager"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input placeholder="请输入" v-model="newsigninfo.fee"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNewsign = false">取 消</el-button>
        <el-button type="primary" @click="handlecontrast()">保存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑我的客户 -->
    <el-dialog
      title="编辑客户"
      :visible.sync="dialogedit"
      width="500px"
      append-to-body
    >
      <el-form label-width="80px">
        <el-form-item required label="客户姓名">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item required label="客户电话">
          <el-input v-model="form.phone" placeholder="请输入客户电话" />
        </el-form-item>
        <el-form-item required label="客户等级">
          <el-select v-model="form.level" placeholder="请选择客户等级">
            <el-option
              v-for="dict in dict.levelOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="客户需求">
          <el-select v-model="form.customerNeeds" placeholder="请选择客户需求">
            <el-option
              v-for="dict in dict.customerNeedsOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="客户地区">
          <avue-form v-model="location" :option="option">
            <template slot="cascader3Type" slot-scope="{ node, data }">
              <span>{{ (data || {}).label }}</span>
              <span v-if="!node.isLeaf">
                ({{ ((data || {}).children || []).length }})
              </span>
            </template>
          </avue-form>
        </el-form-item>
        <el-form-item required label="客户公司">
          <el-input v-model="form.companyName" placeholder="请输入公司和部门" />
        </el-form-item>
        <el-form-item required label="店面地址">
          <el-input
            v-model="form.dianmianAddress"
            placeholder="请输入公司和部门"
          />
        </el-form-item>
        <el-form-item required label="中介经验">
          <el-input v-model="form.experience" placeholder="请输入中介经验" />
        </el-form-item>
        <el-form-item required label="客户来源">
          <el-select v-model="form.resource" placeholder="请选择客户来源">
            <el-option
              v-for="dict in dict.resourceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="备注">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="UpdataSubmit">确 定</el-button>
        <el-button @click="dialogTransfor = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 客户转移弹框 -->
    <el-dialog title="客户转移" :visible.sync="dialogTransfor" width="500px">
      <!-- <el-select
        v-model="this.transforinfo.keywords"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
      <div class="searchinfo"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTransfor = false"
          >确 定</el-button
        >
        <el-button @click="dialogTransfor = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 客户失效弹框 -->
    <el-dialog title="失效" :visible.sync="dialogeInvalid" width="500px">
      <tr>
        <td><i class="el-icon-message-solid" style="font-size:70px"></i></td>
        <td>
          <strong>是否确定把所选的1条客户失效？</strong>
          <p>
            客户失效后，此客户将转移至线索池，原负责人不能再维护跟进和更新此客户数据。
          </p>
        </td>
      </tr>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleinvlid()">确 定</el-button>
        <el-button @click="dialogeInvalid = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Liandong from "@/components/Liandong/liandong.vue";
import Follow from "@/views/components/Sosoitem/follow";
import {
  listCustomer,
  getCustomer,
  delCustomer,
  addCustomer,
  updateCustomer,
  exportCustomer,
  transforCustomer,
  invalidCustomer,
  newSignContrast
} from "@/api/system/customer";
import { getContractInfo } from "@/api/contract/contractManager";
export default {
  data() {
    return {
      //   新签合同信息
      newsigninfo:[],
      //   编辑按钮
      editinfo: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        phone: null,
        level: null,
        customerNeeds: null,
        companyName: null,
        province: null,
        dianmianAddress: null,
        city: null,
        district: null,
        resource: null,
        username: null,
        inputDateStart: null,
        inputDateEnd: null
      },
      form: {},
      // 失效信息
      invalidinfo: {
        ids: [this.$route.query.id],
        status: "0"
      },
      //   转移信息
      transforinfo: {
        transforlist: [], //   转移获取信息
        keywords: "" //   关键字
      },
      //  详情新签合同弹框
      dialogNewsign: false,
      // 详情编辑弹框
      dialogedit: false,
      // 详情转移弹框
      dialogTransfor: false,
      //  失效弹框
      dialogeInvalid: false,

      // 当前详情页id
      id: this.$route.query.id,
      // 总条数
      total: 0,
      // 我的客户表格数据
      customerList: [],
      //   当前客户合同信息
      contractList: [],
      //   跟进状态
      genjinStatus: [],
      //   显示的跟进状态
      showGenjin: "跟进",
      dict: {
        //字典
        customerNeedsOptions: [],
        levelOptions: [],
        resourceOptions: []
      },
      showDianmian: false, //新签合同按钮中显示店面或区域信息
      location: {
        //地址
        "cascader4": ["110000", "110100", "110101"]
      }
    };
  },
  components: {
    Follow,
    Liandong
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:rgb(242, 242, 242)");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  created() {
    this.getList();
    // 客户需求字典
    this.getDicts("sys_user_need").then(response => {
      this.dict.customerNeedsOptions = response.data;
    });
    // 客户等级字典
    this.getDicts("customer_level").then(response => {
      this.dict.levelOptions = response.data;
    });
    // 客户来源
    this.getDicts("sys_customer_resource").then(response => {
      this.dict.resourceOptions = response.data;
    });
  },
  methods: {
    //   新签合同按钮店面或区域显示控制
    showdianmian(i) {
      if (i === "0") {
        this.showDianmian = true;
      } else {
        this.showDianmian = false;
      }
      console.log(this.showDianmian);
    },
    reset() {
      this.form = {
        id: null,
        name: null,
        phone: null,
        level: null,
        customerNeeds: null,
        companyName: null,
        province: null,
        dianmianAddress: null,
        city: null,
        district: null,
        resource: null,
        userId: null,
        username: null,
        luruId: null,
        luruName: null,
        experience: null,
        remark: null,
        status: "0",
        inputDate: null,
        updateDate: null
      };
      this.resetForm("form");
    },
    //   获取省市区的地址
    getPlace(i) {
      this.queryParams.province = i[0];
      this.queryParams.city = i[1];
      this.queryParams.district = i[2];
      this.form.province = i[0];
      this.form.city = i[1];
      this.form.district = i[2];
    },
    // 新签合同按钮操作
    handlecontrast() {
        const data= {
            num: this.newsigninfo.num, //合同编号，手动录入
            customerName: this.newsigninfo.customerName, //客户username
            customerId: this.$route.query.id, //客户id
            customerPhone: this.newsigninfo.customerPhone, //客户手机号
            type: this.newsigninfo.type, //合同类型
            produce: this.newsigninfo.produce, //产品类型
            dianmianName: this.newsigninfo.dianmianName, // 店面名称
            dianmianNum: this.newsigninfo.dianmianNum, // 店面数量
            guarantee: this.newsigninfo.guarantee, // 保证金
            fee: {
            lvyue: this.newsigninfo.lvyue,
            yunyingManage: this.newsigninfo.yunyingManage,
            systemUse: this.newsigninfo.systemUse,
            systemGuard: this.newsigninfo.systemGuard,
            guohu: this.newsigninfo.guohu,
            daiban: this.newsigninfo.daiban,
            jingyingManage: {},
            }, // 费用
            operation: this.newsigninfo.operation,
            status: this.newsigninfo.status, //合同状态
            managerId: this.newsigninfo.managerId, //负责人id
            manager: this.newsigninfo.manager, // 负责人username
            signDate: this.newsigninfo.signDate, //签约日期
            checkDate: this.newsigninfo.checkDate, //审核日期
            beginDate: this.newsigninfo.beginDate,
            endDate: this.newsigninfo.endDate,
            remark: this.newsigninfo.remark,
            dianmianAddress: this.newsigninfo.dianmianAddress,
            dianmianCity: this.newsigninfo.dianmianCity,
            dianmianDistrict: this.newsigninfo.dianmianDistrict,
            dianmianLatitude: this.newsigninfo. dianmianLatitude,
            dianmianLongitude: this.newsigninfo.dianmianLongitude,
            dianmianProvince: this.newsigninfo.dianmianProvince
      };
      // this.newsigninfo.fee = JSON.stringify(this.newsigninfo.fee);
      newSignContrast(data)
        .then(response => {
          this.$message.success("操作成功");
        })
        .catch(error => {
          this.$message.error("操作失败");
        });
    },
    // 点击编辑按钮
    handleUpdate() {
      this.dialogedit = true;
      this.reset();
      getCustomer(this.id).then(response => {
        this.form = response.data;
      });
    },
    // 编辑按钮提交
    UpdataSubmit() {
      updateCustomer(this.form)
        .then(res => {
          this.$message.success("操作成功");
          this.dialogedit = false;
        })
        .catch(error => {
          this.$message.error("操作成功");
        });
    },
    // 失效按钮操作
    handleinvlid() {
      this.dialogeInvalid = true;
      invalidCustomer(this.invalidinfo)
        .then(response => {
          this.$message.success("转移成功");
          this.$router.push("/customer/customer");
          this.getList();
        })
        .catch(error => {
          this.$message.error("转移失败");
        });
    },
    // 转移按钮操作
    handleTransfor() {
      this.dialogTransfor = true;
      transforCustomer(this.transforinfo.keywords).then(response => {
        this.transforinfo.transforlist = response.rows;
      });
      //   var len = list.length;
      //   var arr = [];
      //   for (var i = 0; i < len; i++) {
      //     //如果字符串中不包含目标字符会返回-1
      //     if (list[i].indexOf(keyWord) >= 0) {
      //       arr.push(list[i]);
      //     }
      //   }
      //   return arr;
    },
    getList() {
      // 获取当前页客户信息
      getCustomer(this.id).then(response => {
        this.customerList = response.data;
      });
      //   获取当前页合同信息
      getContractInfo(this.id).then(response => {
        this.contractList = response.rows;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
  width: 34px;
  height: 34px;
  background-color: #1890ff;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 34px;
  font-size: 12px;
}
</style>
