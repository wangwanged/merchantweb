<template>
  <div class="container">

    <div class="header">
      <div class="header_top">
        <span class="title_name fl">{{ customerList.name }}</span>
        <el-button style="margin:0 20px" type="primary" circle
        >
          <div style="width:12px;height:12px;">
            {{ level }}
          </div>
        </el-button
        >
        <!-- <div class="circle fl" style="margin-right:10px">
          {{ customerList.level }}
        </div> -->
        <el-button v-if="this.editinfo.genjinStatus" size="small" type="primary">{{
            this.editinfo.genjinStatus
          }}
        </el-button>
        <el-button size="small" type="primary" @click="handlecontrast"
        >新签合同
        </el-button
        >
        <el-button size="small" @click="handleUpdate()" type="primary"
        >编辑
        </el-button
        >
        <el-button size="small" @click="dialogTransfor = true" type="primary"
        >转移
        </el-button
        >
        <el-button size="small" @click="dialogeInvalid = true" type="primary"
        >失效
        </el-button
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
        <GeminiScrollbar
          class="my-scroll-bar">
          <div class="main_content_top">
            <p class="main_content_name">
              <span class="main_content_firstname">客户等级：</span>
              <span>{{ level + '(' + editinfo.level + ')' }}</span>
            </p>
            <p class="main_content_name">
              <span class="main_content_firstname">客户需求：</span>
              <span>{{ editinfo.customerNeeds }}</span>
            </p>
            <p class="main_content_name">
              <span class="main_content_firstname">地区：</span>
              <span
              >{{ customerList.province + ' ' + customerList.city + ' ' + customerList.district }}</span
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
              <span>{{ editinfo.experience }}</span>
            </p>
            <p class="main_content_name">
              <span class="main_content_firstname">客户来源：</span>
              <span>{{ editinfo.resource }}</span>
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
              <el-table-column prop="type" label="合同类型" :formatter="contractTypeFormat" width="120">
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
              <el-table-column prop="manager" label="负责人"></el-table-column>
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
        </GeminiScrollbar>
      </div>
      <div class="main_right">
        <div class="main_right_top" style="overflow:hidden">
          <div class="tab_style fl">
            客户跟进
          </div>
          <el-button type="primary" class="fr" @click="goSecond()"
          >写跟进
          </el-button
          >
        </div>
        <Follow ref="follow" :tofollow="customerList"></Follow>
      </div>
    </div>
    <!-- 新签合同弹框 -->
    <el-dialog title="新签合同" :visible.sync="dialogNewsign" width="650px">
      <el-form label-position="left" label-width="120px">
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          客户信息
        </div>
        <el-form-item required label="客户姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item required label="客户电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          签约信息
        </div>
        <el-form-item required label="合同类型">
          <el-button size="small" type="primary" plain>新签</el-button>
        </el-form-item>
        <el-form-item required label="签约产品">
          <el-select v-model="form.produce">
            <el-option
              v-for="dict in customerNeedsOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item required label="合同编号">
          <el-input placeholder="请输入" v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item required label="签约日期">
          <el-date-picker
            v-model="form.signDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item required label="合同开始时间">
          <el-date-picker
            v-model="form.beginDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item required label="合同结束时间">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          店面/区域信息
        </div>
        <!-- <div v-if="showDianmian"> -->
        <el-form-item required label="店面名称">
          <el-input
            v-model="form.dianmianName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item required label="所属区域">
          <Area @place-info="getPlace" :toSon="toplace"/>
        </el-form-item>
        <!-- </div> -->
        <!-- <div v-else>
          <el-form-item required label="店面名称">
            <el-input
              v-model="form.dianmianName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
           <el-form-item required label="所属区域">
            <Area  @place-info="getPlace" :toSon="toplace"/>
          </el-form-item>
        </div> -->
        <el-form-item required label="详细地址">
          <el-input
            v-model="form.dianmianAddress"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item required label="店面经度">
          <el-input
            placeholder="请输入"
            v-model="form.dianmianLongitude"
          ></el-input>
        </el-form-item>
        <el-form-item required label="店面纬度">
          <el-input
            v-model="form.dianmianLatitide"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          费用信息
        </div>
        <el-form-item required label="履约保证金">
          <el-input placeholder="请输入" v-model="fee.lvyue"></el-input>
        </el-form-item>
        <el-form-item required label="运营管理费">
          <el-input placeholder="请输入" v-model="fee.yunyingManage"></el-input>
        </el-form-item>
        <el-form-item required label="系统使用费">
          <el-input placeholder="请输入" v-model="fee.systemUse"></el-input>
        </el-form-item>
        <el-form-item required label="系统维护费">
          <el-input placeholder="请输入" v-model="fee.systemGuard"></el-input>
        </el-form-item>
        <el-form-item required label="过户费">
          <el-input placeholder="请输入" v-model="fee.guohu"></el-input>
        </el-form-item>
        <el-form-item required label="代办费">
          <el-input placeholder="请输入" v-model="fee.daiban"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          备注信息
        </div>
        <el-input
          style="margin-bottom:20px"
          type="textarea"
          v-model="form.remark"
        ></el-input>
        <Manager ref="showmanager" @toFather='getManager'/>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button ref="button" @click="dialogNewsign = false">取 消</el-button>
        <el-button type="primary" @click='submitcontract'>保存</el-button>
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
          <el-input v-model="form.name" placeholder="请输入"/>
        </el-form-item>
        <el-form-item required label="客户电话">
          <el-input v-model="form.phone" placeholder="请输入客户电话"/>
        </el-form-item>
        <el-form-item required label="客户等级">
          <el-select v-model="form.level" placeholder="请选择客户等级">
            <el-option
              v-for="dict in levelOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="客户需求">
          <el-select v-model="form.customerNeeds" placeholder="请选择客户需求">
            <el-option
              v-for="dict in customerNeedsOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="客户地区">
          <Area @place-info="getPlace" :toSon="toplace"/>
        </el-form-item>
        <el-form-item required label="客户公司">
          <el-input v-model="form.companyName" placeholder="请输入公司和部门"/>
        </el-form-item>
        <el-form-item required label="店面地址">
          <el-input
            v-model="form.dianmianAddress"
            placeholder="请输入公司和部门"
          />
        </el-form-item>
        <el-form-item required label="中介经验">
          <el-select
            style="width: 100%"
            v-model="form.experience"
            placeholder="请选择中介经验"
          >
            <el-option
              v-for="dict in experienceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="客户来源">
          <el-select
            v-model="form.resource"
            placeholder="请选择客户来源"
          >
            <el-option
              v-for="dict in resourceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="备注">
          <el-input v-model="form.remark" placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="UpdataSubmit()">确 定</el-button>
        <el-button @click="dialogTransfor = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 客户转移弹框 -->
    <el-dialog title="转移" :visible.sync="dialogTransfor" width="500px">
      <el-autocomplete
        class="inline-input"
        v-model="keywords"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleTransfor">确 定</el-button>
        <el-button @click="dialogeInvalid = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--<el-dialog title="客户转移" :visible.sync="dialogTransfor" width="500px">
      <div class="searchinfo"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTransfor = false"
          >确 定</el-button
        >
        <el-button @click="dialogTransfor = false">取 消</el-button>
      </div>
    </el-dialog>-->
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
    <el-button @click='getdeptuser()'>aaa</el-button>
  </div>
</template>

<script>
import {
  listCustomer,
  getCustomer,
  delCustomer,
  addCustomer,
  updateCustomer,
  exportCustomer,
  transforCustomer,
  invalidCustomer,
  newSignContrast, transforcustomer
} from '@/api/system/customer'
import { getContractInfo, addContractManager } from '@/api/contract/contractManager'
import Follow from '@/views/components/Sosoitem/follow.vue'
import { getInfo } from '@/api/login'
import { listUser } from '@/api/system/user'

export default {
  data() {
    return {
      keywords: '',
      deptName: '',  //当前部门
      //  传给省市区
      toplace: {
        province: '',
        city: '',
        district: ''
      },
      fee: {
        lvyue: '',
        yunyingManage: '',
        systemUse: '',
        systemGuard: '',
        guohu: '',
        daiban: ''
        // jingyingManage: {},
      },
      //   客户等级字母显示
      level: '',
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
        status: '0'
      },
      //   转移信息
      transforinfo: {
        transforlist: [], //   转移获取信息
        keywords: ''   //   关键字
      },
      // 详情编辑弹框
      dialogedit: false,
      // 详情转移弹框
      dialogTransfor: false,
      //  失效弹框
      dialogeInvalid: false,
      // 新签合同弹框
      dialogNewsign: false,
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
      showGenjin: '跟进',
      //   跟进start
      genjinOptions: [], //跟进状态字典
      levelOptions: [], //客户等级字典
      experienceOptions: [], //中介经验字典
      resourceOptions: [], //客户来源字典
      customerNeedsOptions: [],  //客户需求字典
      contractTypeOptions: [], //合同类型字典
      //   跟进end
      showDianmian: false //新签合同按钮中显示店面或区域信息
    }
  },
  components: {
    Follow
  },
  mounted() {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:rgb(242, 242, 242)')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  created() {
    this.getList()

    this.getdicts()
  },
  computed: {},
  methods: {

    // 生效失效状态字典翻译
    contractTypeFormat(row, column) {
      return this.selectDictLabel(this.contractTypeOptions, row.type)
    },
    // 显示当前负责人和部门
    getdeptuser() {
      this.$nextTick().then(() => {
        this.$refs.showmanager.showdeptuser()
      })
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
        status: '0',
        inputDate: null,
        updateDate: null,
        num: null, //合同编号，手动录入
        customerName: null, //客户username
        customerId: null, //客户id
        customerPhone: null, //客户手机号
        type: null, //合同类型
        produce: null, //产品类型
        dianmianName: null, // 店面名称
        dianmianNum: null, // 店面数量
        guarantee: null, // 保证金
        operation: null,
        managerId: null, //负责人id
        manager: null, // 负责人username
        signDate: null, //签约日期
        checkDate: null, //审核日期
        beginDate: null,
        endDate: null,
        dianmianCity: null,
        dianmianDistrict: null,
        dianmianLatitude: null,
        dianmianLongitude: null,
        dianmianProvince: null
      }
      this.resetForm('form')
    },
    getList() {
      // 获取当前页客户信息
      getCustomer(this.id).then(response => {
        this.customerList = response.data
        this.getdicts()
      })
      //   获取当前页合同信息
      getContractInfo(this.id).then(response => {
        this.contractList = response.rows
      })
    },
    // 获取字典
    getdicts() {
      //   获取跟进状态字典
      this.getDicts('customer_genjin').then(response => {
        this.genjinOptions = response.data
        var a = this.genjinOptions.filter(item => {
          return item.dictValue === this.customerList.genjinStatus
        })
        this.editinfo.genjinStatus = a ? a[0].dictLabel : null
      })
      // 获取客户等级字典
      this.getDicts('customer_level').then(response => {
        this.levelOptions = response.data
        var a = this.levelOptions.filter(item => {
          return item.dictValue === this.customerList.level
        })
        this.level = a[0].dictValue
        this.editinfo.level = a ? a[0].dictLabel : null
      })
      // 获取客户需求字典
      this.getDicts('sys_user_need').then(response => {
        this.customerNeedsOptions = response.data
        var a = this.customerNeedsOptions.filter(item => {
          return item.dictValue === this.customerList.customerNeeds
        })
        this.editinfo.customerNeeds = a ? a[0].dictLabel : null
      })
      // 获取中介经验字典
      this.getDicts('experience').then(response => {
        this.experienceOptions = response.data
        var a = this.experienceOptions.filter(item => {
          return item.dictValue === this.customerList.experience
        })
        this.editinfo.experience = a ? a[0].dictLabel : null
      })
      // 获取客户来源字典
      this.getDicts('sys_customer_resource').then(response => {
        this.resourceOptions = response.data
        var a = this.resourceOptions.filter(item => {
          return item.dictValue === this.customerList.resource
        })
        this.editinfo.resource = a ? a[0].dictLabel : null
      })
      this.getDicts('contract_type').then(response => {
        this.contractTypeOptions = response.data
        var a = this.contractTypeOptions.filter(item => {
          return item.dictValue === this.customerList.resource
        })
      })
    },
    // 负责人查询
    querySearch(queryString, callback) {
      var params = {
        keywords: queryString
      }
      transforCustomer(params).then(response => {
        var restaurants = response.rows
        const list = []
        //封装要显示的数据
        for (let v of restaurants) {
          list.push({ value: v.phonenumber + ' ' + v.userName, id: v.id })
        }
        // 调用 callback 返回建议列表的数据,是一个数组类型
        callback(list)
      })
    },
    // 负责人查询
    handleSelect(item) {
      this.reset()
      this.form.userId = item.id
      this.keywords = item.value.substring(12)
      //  部门随负责人变动
      listUser({}).then(res => {
        var a = res.rows.filter(element => {
          return element.id === item.id
        })
        console.log('res', a)
        this.deptName = a[0].dept.deptName
      })
    },
    //   新签合同按钮店面或区域显示控制
    // showdianmian(i) {
    //   if (i === "0") {
    //     this.showDianmian = true;
    //   } else {
    //     this.showDianmian = false;
    //   }
    //   console.log(this.showDianmian);
    // },
    // 获取省市区
    getPlace(i, j, k) {
      this.form.province = i
      this.form.city = j
      this.form.district = k
    },
    // 省市区赋值
    toPlace() {
      this.toplace.province = this.form.province
      this.toplace.city = this.form.city
      this.toplace.district = this.form.district
    },
    // 新签合同按钮操作
    handlecontrast() {
      this.getdeptuser()
      this.reset()
      this.dialogNewsign = true
      this.form.name = this.customerList.name
      this.form.phone = this.customerList.phone
      this.form.signDate = new Date()
      this.form.beginDate = new Date()
      this.form.endDate = new Date()
    },
    // 合同确定按钮
    submitcontract() {
      addContractManager(this.form).then(res => {
        console.log(res)
      })
    },
    // 点击编辑按钮
    handleUpdate() {
      this.dialogedit = true
      this.reset()
      this.form = this.customerList
      this.toPlace()
    },
    // 编辑按钮提交
    UpdataSubmit() {
      updateCustomer(this.form)
        .then(res => {
          this.$message.success('操作成功')
          this.dialogedit = false
        })
        .catch(error => {
          this.$message.error('操作成功')
        })
    },
    // 失效按钮操作
    handleinvlid() {
      this.dialogeInvalid = true
      invalidCustomer(this.invalidinfo)
        .then(response => {
          this.$message.success('转移成功')
          this.$router.push('/customer/customer')
          this.getList()
        })
        .catch(error => {
          this.$message.error('转移失败')
        })
    },
    // 转移按钮操作
    //   转移确定按钮
    handleTransfor(row) {
      const ids = this.id
      var data = {
        ids: [ids],
        userId: this.form.userId
        // phone: this.transforphone
      }
      transforcustomer(data)
        .then(response => {
          this.$message.success('操作成功')
          this.getList()
          this.dialogTransfor = false
        })
        .catch(error => {
          this.$message.error('操作失败')
        })
    },
    // handleTransfor() {
    //   this.dialogTransfor = true;
    //   transforCustomer(this.transforinfo.keywords).then(response => {
    //     this.transforinfo.transforlist = response.rows;
    //   });
    // },
    //   写跟进按钮
    goSecond() {
      //这是操作follow子组件的方法
      this.$refs.follow.handleAdd()
    },
    // 选择负责人和部门
    getManager(value) {
      this.form.userId = value
    }
  }
}
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

.my-scroll-bar {
  height: 738px;
}
</style>
