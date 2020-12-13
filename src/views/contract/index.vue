<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      class="search"
    >
      <!--部门数据-->
      <showdept @myevent = 'getDeptId' @keyup.enter.native="handleQuery"/>
      <el-form-item prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="请选择合同类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="produce">
        <el-select
          v-model="queryParams.produce"
          placeholder="请选择签约产品"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in produceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="checkStatus">
        <el-select
          v-model="queryParams.checkStatus"
          placeholder="审核状态"
          clearablea
          size="small"
        >
          <el-option
            v-for="dict in checkStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="operation">
        <el-input
          v-model="queryParams.keywords"
          placeholder="模糊搜索"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="checkStatus">
        <el-select
          v-model="typeTimeValue"
          placeholder="时间类型"
          clearablea
          size="small"
        >
            <el-option
              v-for="dict in typeTimeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
        </el-select>
      </el-form-item>
      <el-form-item prop="signDate">
        <el-date-picker
          class='datepicker'
          value-format="yyyy-MM-dd"
          placeholder="录入时间"
          v-model="TimeValue"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择生效失效状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <div class="fl">
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="mini"
            @click="dialogCheck=true"
            :disabled="single"
            v-hasPermi="['contract:contractManager:add']"
            >审核</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="mini"
            @click='handleRenew'
             :disabled="single"
            v-hasPermi="['contract:contractManager:add']"
            >续签</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="mini"
            :disabled="multiple"
            @click="opendialogTransfor"
            v-hasPermi="['contract:contractManager:add']"
            >转移</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="mini"
            @click="handleRenew"
            v-hasPermi="['contract:contractManager:add']"
            >解约</el-button
          >
        </el-col>
      </div>
      <div class="fr">
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="mini"
            @click="handleExport"
            v-hasPermi="['contract:contractManager:export']"
            >导出</el-button
          >
        </el-col>
      </div>

      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="contractManagerList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="公司" align="center" prop="deptName" />
      <el-table-column label="合同编号" align="center" prop="num" width="180">
        <template slot-scope="obj">
          <span
            @click="
              $router.push({
                path: '/contract/contractItem',
                query: { id: obj.row.id },
              })
            "
            style="color: #1890FF;cursor: pointer;"
          >{{ obj.row.num }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="合同类型"
        align="center"
        prop="type"
        :formatter="typeFormat"
      />
      <el-table-column label="客户姓名" align="center" prop="customerName" />
      <el-table-column
        label="签约产品"
        align="center"
        prop="produce"
        :formatter="produceFormat"
      />
      <el-table-column
        label="店面/区域名称"
        align="center"
        prop="dianmianName"
      />
      <el-table-column label="店面数量" align="center" prop="dianmianNum" />
      <el-table-column label="履约保证金" align="center" prop="guarantee" />
      <el-table-column label="费用信息" align="center" prop="fee" />
      <el-table-column label="负责人" align="center" prop="manager" />
      <el-table-column
        label="签约日期"
        align="center"
        prop="signDate"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="合同开始日期"
        align="center"
        prop="beginDate"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同结束日期" align="center" prop="endDate" width="100"/>
      <el-table-column
        label="合同状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
      />
      <el-table-column
        label="审核状态"
        align="center"
        prop="checkStatus"
        :formatter="checkStatusFormat"
      />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['contract:contractManager:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['contract:contractManager:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 审核弹框 -->
    <el-dialog title="合同审核" :visible.sync="dialogCheck" width="500px">
        <tr>
        <td><i class="el-icon-message-solid" style="font-size:70px"></i></td>
        <td>
          <strong>确认要审核合同吗？</strong>
          <p>
           合同审核后将无法进行编辑、转移、失效操作！
          </p>
        </td>
      </tr>
      <el-date-picker
        value-format="yyyy-MM-dd"
        v-model="checkDate"
        type="date"
        placeholder="选择日期">
    </el-date-picker>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCheck">确 定</el-button>
        <el-button @click="dialogCheck = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 续签弹框 -->
      <el-dialog title="续签合同" :visible.sync="dialogRenew" width="700px">
      <el-form label-position="left"  label-width="110px">
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          客户信息
        </div>
         <el-form-item required label="选择客户">
          <el-input v-model="form.customerNum"></el-input>
        </el-form-item>
        <Phone ref="myphone" @stringPhone="i=>this.form.customerPhone=i" :toSon="this.form.customerPhone"/>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          签约信息
        </div>
        <el-form-item required label="合同类型">
          <el-button size="small" type="primary" plain>续签</el-button>
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
        <div style="font-size:20px;font-weight:700;margin-bottom:20px" v-if="form.produce==='0'">
          店面信息
        </div>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px" v-else>
          区域信息
        </div>
          <el-form-item required label="店面名称" v-if="form.produce==='0'">
            <el-input
              v-model="form.dianmianName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item required label="区域名称" v-else>
            <el-input
              v-model="form.dianmianName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        <el-form-item required label="所属区域">
          <Area class='liandong' @place-info="getPlace" :toSon="toplace"></Area>
        </el-form-item>
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
            v-model="form.dianmianLatitude"
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
        <Fee/>
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
        <el-button @click="dialogRenew = false">取 消</el-button>
        <el-button type="primary" @click="submitRenew">保存</el-button>
      </span>
    </el-dialog>
    <!-- 转移弹框 -->
     <el-dialog title="转移" :visible.sync="dialogTransfor" width="500px">
       <el-form>
         <Manager ref="showmanager" @toFather='getManager'/>
       </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click='handleTransfor'>确 定</el-button>
        <el-button @click="dialogTransfor = false">取 消</el-button>
      </div>
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
  contractCheck,
  contractRenew,
  contractTransfor,
} from "@/api/contract/contractManager";
import {
  transforCustomer,
} from "@/api/system/customer";
import { listUser } from "@/api/system/user";
import { treeselect } from '@/api/system/dept';
import showdept from '@/components/DeptShow/index';
export default {
  name: "ContractManager",
  components: {
    showdept
  },
  data() {
    return {
      fee: {
        lvyueFee: '',
        jingyingManagerFee: {
          total: '3000',
          detail:[{"2020.11.01-2020.12.01": 1000},{"2020.12.01-2021.01.01": 2000}]
        },
        yunyingManagerFee: '',
        systemUseFee: '',
        systemMaintenanceFee: '',
        daibanFee: '',
        guohuoFee: ''
      },
      //  传给省市区
      toplace: {
        province: "",
        city: "",
        district: ""
      },
      transferManagerId: null,
      // 时间字段
      TimeValue:null,
      // 时间类型
      typeTimeValue:null,
      // 部门id
      deptId: null,
      // 部门名称
      deptName: "",
      // 部门树选项
      deptOptions: undefined,

      defaultProps: {
        children: "children",
        label: "label"
      },
    //   关键词
      transforKeywords:'',
    //   转移电话号码
      transforphone:"",
        // 转移弹框
      dialogTransfor:false,
      // 续签合同
      dialogRenew:false,
      // 审核日期
      checkDate:'',
      // 审核弹框
      dialogCheck: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 合同表格数据
      contractManagerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 合同类型字典
      typeOptions: [],
      // 签约产品字典
      produceOptions: [],
      // 生效失效状态字典
      statusOptions: [],
      // 合同审核状态字典
      checkStatusOptions: [],
      // 时间类型字典
      typeTimeOptions:[],
      // 客户需求字典
      customerNeedsOptions:[],
      // 查询参数
      queryParams: {
        // to back时间的值
        signDateStart: null,
        signDateEnd: null,
        checkDateStart: null,
        checkDateEnd: null,
        beginDateStart: null,
        beginDateEnd: null,
        endDateStart: null,
        endDateEnd: null,
        deptId: null,
        keywords: null,
        pageNum: 1,
        pageSize: 10,
        num: null,
        customerName: null,
        customerPhone: null,
        type: null,
        produce: null,
        operation: null,
        // signDate: null,
        // beginDate: null,
        // endDate: null,
        TimeValue:null,
        status: null,
        checkStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        num: [{ required: true, message: "合同编号不能为空", trigger: "blur" }],
        customerName: [
          { required: true, message: "客户姓名不能为空", trigger: "blur" }
        ],
        customerId: [
          { required: true, message: "客户id不能为空", trigger: "blur" }
        ],
        customerPhone: [
          { required: true, message: "客户手机号不能为空", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "合同类型(0：新签:1：续签)不能为空",
            trigger: "change"
          }
        ],
        produce: [
          { required: true, message: "签约产品不能为空", trigger: "change" }
        ],
        dianmianName: [
          { required: true, message: "店面或区域名称不能为空", trigger: "blur" }
        ],
        dianmianNum: [
          { required: true, message: "店面数量不能为空", trigger: "blur" }
        ],
        guarantee: [
          { required: true, message: "保证金不能为空", trigger: "blur" }
        ],
        operation: [
          { required: true, message: "操作不能为空", trigger: "blur" }
        ],
        manager: [
          { required: true, message: "负责人不能为空", trigger: "blur" }
        ],
        signDate: [
          { required: true, message: "签约日期不能为空", trigger: "blur" }
        ],
        signUser: [
          { required: true, message: "签约人员不能为空", trigger: "blur" }
        ],
        beginDate: [
          { required: true, message: "合同开始日期不能为空", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "合同结束日期不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "生效失效状态不能为空", trigger: "change" }
        ],
        remark: [
          { required: true, message: "备注信息不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
    TimeValue(){
      this.resetQuaramDate()
      // Object.keys(this.queryParams).forEach(key=>{this.queryParams[key]=''})
      if(this.typeTimeValue==='0'){
        this.queryParams.signDateStart = this.TimeValue ? this.TimeValue[0] : null
        this.queryParams.signDateEnd = this.TimeValue ? this.TimeValue[1] : null
      }else if(this.typeTimeValue ==='3'){
        this.queryParams.checkDateStart = this.TimeValue ? this.TimeValue[0] : null
        this.queryParams.checkDateEnd = this.TimeValue ? this.TimeValue[1] : null
      }else if(this.typeTimeValue ==='1'){
        this.queryParams.beginDateStart = this.TimeValue ? this.TimeValue[0] : null
        this.queryParams.beginDateEnd = this.TimeValue ? this.TimeValue[1] : null
      }else{
        this.queryParams.endDateStart = this.TimeValue ? this.TimeValue[0] : null
        this.queryParams.endDateEnd = this.TimeValue ? this.TimeValue[1] : null
      }
      console.log(this.TimeValue)
    },
    typeTimeValue(){
      // Object.keys(this.queryParams).forEach(key=>{this.queryParams[key]=''})
      this.resetQuaramDate()
      if(this.typeTimeValue==='0'){
        this.queryParams.signDateStart = this.TimeValue ? this.TimeValue[0] : null
        this.queryParams.signDateEnd = this.TimeValue ? this.TimeValue[1] : null
      }else if(this.typeTimeValue ==='3'){
        this.queryParams.checkDateStart = this.TimeValue ? this.TimeValue[0] : null
        this.queryParams.checkDateEnd = this.TimeValue ? this.TimeValue[1] : null
      }else if(this.typeTimeValue ==='1'){
        this.queryParams.beginDateStart = this.TimeValue ? this.TimeValue[0] : null
        this.queryParams.beginDateEnd = this.TimeValue ? this.TimeValue[1] : null
      }else{
        this.queryParams.endDateStart = this.TimeValue ? this.TimeValue[0] : null
        this.queryParams.endDateEnd = this.TimeValue ? this.TimeValue[1] : null
      }
    },
  },
  created() {
    this.getList();
    // 获取部门树
    this.getTreeselect();
    this.getDicts("contract_type").then(response => {
      this.typeOptions = response.data;
    });
    this.getDicts("sys_user_need").then(response => {
      this.produceOptions = response.data;
    });
    this.getDicts("contract_status").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("check_status").then(response => {
      this.checkStatusOptions = response.data;
    });
    this.getDicts("sys_type_time").then(response => {
      this.typeTimeOptions = response.data;
    });
    this.getDicts("sys_user_need").then(response => {
      this.customerNeedsOptions = response.data;
    });
  },
  methods: {
    getDeptId(deptId) {
      this.queryParams.deptId = deptId;
    },
    /** 查询合同列表 */
    getList() {
      this.loading = true;
      listContractManager(this.queryParams).then(response => {
        this.contractManagerList = response.rows;

        this.contractManagerList.forEach((item)=>{
          item.fee = JSON.parse(item.fee)
          item.fee = Number.parseInt(item.fee.daibanFee) + Number.parseInt(item.fee.guohuoFee) + Number.parseInt(item.fee.systemUseFee) + Number.parseInt(item.fee.yunyingManagerFee)
            + Number.parseInt(item.fee.systemMaintenanceFee) + Number.parseInt(item.fee.jingyingManagerFee.total)
        })
        this.total = response.total;
        this.loading = false;
      });
    },
    // 合同类型(0：新签:1：续签)字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    // 签约产品字典翻译
    produceFormat(row, column) {
      return this.selectDictLabel(this.produceOptions, row.produce);
    },
    // 生效失效状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 审核状态字典翻译
    checkStatusFormat(row, column) {
      return this.selectDictLabel(this.checkStatusOptions, row.checkStatus);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
      beginDate: null,
      checkDate: null,
      checkStatus: null,
      createBy: null,
      createTime: null,
      customerId: null,
      customerName: null,
      customerNum:null,
      customerPhone: null,
      deptId:null,
      deptName: null,
      dianmianAddress: null,
      dianmianCity:null,
      dianmianDistrict: null,
      dianmianLatitude: null,
      dianmianLongitude: null,
      dianmianName: null,
      dianmianNum: null,
      dianmianProvince: null,
      endDate: null,
      file: null,
      guarantee: null,
      id: null,
      imgs: null,
      isAsc:null,
      keywords: null,
      manager: null,
      managerId: null,
      num: null,
      operation: null,
      orderBy: null,
      orderByColumn: null,
      pageNum: null,
      pageSize: null,
      params:null,
      pid: null,
      produce:null,
      remark: null,
      rootNum: null,
      searchValue: null,
      signDate: null,
      signUser: null,
      signUserId: null,
      status:null,
      terminateDate: null,
      terminateFile: null,
      type: null,
      updateBy: null,
      updateTime: null,
      fee:{}
      };
    },
    resetQuaramDate() {
        this.queryParams.signDateStart= null,
        this.queryParams.signDateEnd= null,
        this.queryParams.checkDateStart= null,
        this.queryParams.checkDateEnd= null,
        this.queryParams.beginDateStart= null,
        this.queryParams.beginDateEnd= null,
        this.queryParams.endDateStart= null,
        this.queryParams.endDateEnd= null
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除合同编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delContractManager(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有合同数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportContractManager(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        });
    },
    // 合同审核
    handleCheck() {
      var data = {
          signDate:this.checkDate,
          id:this.ids[0],
      }
      contractCheck(data).then(res=>{
        this.$message.success("操作成功");
         this.dialogCheck=false
      }).catch(error=>{
          this.$message.error("操作失败");
      })
    },
    // 合同续签按钮
    handleRenew(){
        this.reset()
        this.dialogRenew=true
        var aaa = this.contractManagerList.filter(item => {
          return item.id === this.ids[0];
        });
      this.form = JSON.parse(JSON.stringify(aaa[0]))
        this.getdeptuser()
        this.$nextTick(()=>{
          this.$refs.myphone.fromFatherphone()
        })
      this.getPlace()
        this.toPlace()
    },
    // 合同续签提交
    submitRenew(){

        const id = this.ids[0]
        contractRenew(this.form,id).then(res=>{
           this.$message.success("操作成功");
         this.dialogRenew=false
       }).catch(error=>{
           this.$message.error("操作失败");
       })
    },
    // 打开转移弹框
    opendialogTransfor(){
      this.dialogTransfor=true
      this.reset()
      this.getdeptuser()
    },
     //   转移确定按钮
    handleTransfor() {
       var ids = this.ids;
       var params = {
           ids: ids,
           managerId: this.form.managerId
       }
       contractTransfor(params).then(response => {
           this.$message.success("操作成功");
           this. dialogTransfor = false;
           this.getList();
      }).catch(error=>{
           this.$message.error("操作失败");
      });
    },
    // 省市区赋值
    toPlace() {
      this.toplace.province = this.form.province
      this.toplace.city = this.form.city
      this.toplace.district = this.form.district
    },
    //   获取省市区的地址
    getPlace(i, j, k) {
      this.form.province = i
      this.form.city = j
      this.form.district = k
      this.queryParams.province = i
      this.queryParams.city = j
      this.queryParams.district = k
    },
    // 显示当前负责人和部门
    getdeptuser() {
      this.$nextTick().then(() => {
        this.$refs.showmanager.showdeptuser()
      })
    },
    // 选择负责人和部门
    getManager(value,deptId) {
      this.form.managerId = value
      this.form.deptId = deptId
    },
  }
};
computed:{
}
</script>
