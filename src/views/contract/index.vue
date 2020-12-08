<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <!--部门数据-->
      <showdept @myevent = 'getDeptId' @keyup.enter.native="handleQuery"/>
<!--      <el-col :span="4" :xs="24">-->
<!--        <div class="head-container">-->
<!--          <el-input-->
<!--            v-model="deptName"-->
<!--            placeholder="请输入部门名称"-->
<!--            clearable-->
<!--            size="small"-->
<!--            prefix-icon="el-icon-search"-->
<!--            style="margin-bottom: 20px"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="head-container">-->
<!--          <el-tree-->
<!--            :data="deptOptions"-->
<!--            :props="defaultProps"-->
<!--            :expand-on-click-node="false"-->
<!--            :filter-node-method="filterNode"-->
<!--            ref="tree"-->
<!--            default-expand-all-->
<!--            @node-click="handleNodeClick"-->
<!--          />-->
<!--        </div>-->
<!--      </el-col>-->
      <el-form-item prop="num">
        <el-input
          v-model="queryParams.num"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="customerPhone">
        <el-input
          v-model="queryParams.customerPhone"
          placeholder="请输入客户手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item prop="signDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.signDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择签约日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="beginDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.beginDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择合同开始日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="endDate">
        <el-input
          v-model="queryParams.endDate"
          placeholder="请输入合同结束日期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
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
            @click="dialogTransfor=true"
            v-hasPermi="['contract:contractManager:add']"
            >转移</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="mini"
            @click="handleAdd"
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
            @click="handleAdd"
            v-hasPermi="['contract:contractManager:add']"
            >新签合同</el-button
          >
        </el-col>
        <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['contract:contractManager:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['contract:contractManager:remove']"
        >删除</el-button>
      </el-col> -->
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
          <el-button
            @click="
              $router.push({
                path: '/contract/contractItem',
                query: { id: obj.row.id }
              })
            "
            size="small"
            type="text"
            >{{ obj.row.num }}</el-button
          >
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

    <!-- 添加或修改合同对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="合同编号" prop="num">
          <el-input v-model="form.num" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="客户姓名" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户姓名" />
        </el-form-item>
        <el-form-item label="客户id" prop="customerId">
          <el-input v-model="form.customerId" placeholder="请输入客户id" />
        </el-form-item>
        <el-form-item label="客户手机号" prop="customerPhone">
          <el-input
            v-model="form.customerPhone"
            placeholder="请输入客户手机号"
          />
        </el-form-item>
        <el-form-item label="合同类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择合同类型">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约产品" prop="produce">
          <el-select v-model="form.produce" placeholder="请选择签约产品">
            <el-option
              v-for="dict in produceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店面或区域名称" prop="dianmianName">
          <el-input
            v-model="form.dianmianName"
            placeholder="请输入店面或区域名称"
          />
        </el-form-item>
        <el-form-item label="店面数量" prop="dianmianNum">
          <el-input v-model="form.dianmianNum" placeholder="请输入店面数量" />
        </el-form-item>
        <el-form-item label="保证金" prop="guarantee">
          <el-input v-model="form.guarantee" placeholder="请输入保证金" />
        </el-form-item>
        <el-form-item label="操作" prop="operation">
          <el-input v-model="form.operation" placeholder="请输入操作" />
        </el-form-item>
        <el-form-item label="负责人" prop="manager">
          <el-input v-model="form.manager" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="签约日期" prop="signDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.signDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择签约日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签约人员" prop="signUser">
          <el-input v-model="form.signUser" placeholder="请输入签约人员" />
        </el-form-item>
        <el-form-item label="合同开始日期" prop="beginDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.beginDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择合同开始日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同结束日期" prop="endDate">
          <el-input v-model="form.endDate" placeholder="请输入合同结束日期" />
        </el-form-item>
        <el-form-item label="生效失效状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择生效失效状态">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
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
      <el-dialog title="续签合同" :visible.sync="dialogRenew" width="40%">
      <el-form label-position="left"  label-width="110px">
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          客户信息
        </div>
         <el-form-item required label="选择客户">
          <el-input v-model="renewinfo.customerNum"></el-input>
        </el-form-item>
        <el-form-item required label="客户姓名">
          <el-input v-model="renewinfo.customerName"></el-input>
        </el-form-item>
        <el-form-item required label="客户电话">
          <el-input v-model="renewinfo.customerPhone"></el-input>
        </el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          签约信息
        </div>
        <el-form-item required label="合同类型">
          <el-button size="small" type="primary" plain>续签</el-button>
        </el-form-item>
        <el-form-item required label="签约产品">
          <!-- <el-select v-model="renewinfo.produce">
            <el-option
              v-for="dict in customerNeedsOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select> -->
        </el-form-item>
        <el-form-item required label="合同编号">
          <el-input placeholder="请输入" v-model="renewinfo.num"></el-input>
        </el-form-item>
        <el-form-item required label="签约日期">
          <el-date-picker
            v-model="renewinfo.signDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item required label="合同开始时间">
          <el-date-picker
            v-model="renewinfo.beginDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item required label="合同结束时间">
          <el-date-picker
            v-model="renewinfo.endDate"
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">
          店面/区域信息
        </div>
        <div>
          <el-form-item required label="店面名称">
            <el-input
              v-model="renewinfo.dianmianName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item required label="所属省">
            <el-input
              v-model="renewinfo.dianmianProvince"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item required label="所属市">
            <el-input
              v-model="renewinfo.dianmianCity"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item required label="所属区">
            <el-input
              v-model="renewinfo.dianmianDistrict"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div >
          <el-form-item required label="店面名称">
            <el-input
              v-model="renewinfo.dianmianName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item required label="所属省">
            <el-input
              v-model="renewinfo.dianmianProvince"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item required label="所属市">
            <el-input
              v-model="renewinfo.dianmianCity"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item required label="所属区">
            <el-input
              v-model="renewinfo.dianmianDistrict"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item required label="详细地址">
          <el-input
            v-model="renewinfo.dianmianAddress"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item required label="店面经度">
          <el-input
            placeholder="请输入"
            v-model="renewinfo.dianmianLongitude"
          ></el-input>
        </el-form-item>
        <el-form-item required label="店面纬度">
          <el-input
            v-model="renewinfo.dianmianLatitide"
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
          v-model="renewinfo.remark"
        ></el-input>
        <el-form-item required label="签约人员">
          <el-input
            placeholder="请输入"
            v-model="renewinfo.manager"
          ></el-input>
        </el-form-item>
        <el-form-item required label="所属部门">
          <el-input placeholder="请输入" v-model="renewinfo.fee"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRenew = false">取 消</el-button>
        <el-button type="primary" @click="submitRenew">保存</el-button>
      </span>
    </el-dialog>
    <!-- 转移弹框 -->
     <el-dialog title="转移" :visible.sync="dialogTransfor" width="500px">
        <el-autocomplete
            class="inline-input"
            v-model="transforKeywords"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
    ></el-autocomplete>
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
      // 费用信息
      fee:[],
      // 续签合同信息
      renewinfo:[],
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
      // 合同类型(0：新签:1：续签)字典
      typeOptions: [],
      // 签约产品字典
      produceOptions: [],
      // 生效失效状态字典
      statusOptions: [],
      // 合同审核状态
      checkStatusOptions: [],
      // 查询参数
      queryParams: {
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
        signDate: null,
        beginDate: null,
        endDate: null,
        status: null,
        checkStatus: null
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
    }
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
  },
  methods: {
    getDeptId(deptId) {
      this.queryParams.deptId = deptId;
      console.log("deptId:",deptId)
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
          console.log("item.fee", item.fee)
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
      return this.selectDictLabel(this.checkStatusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
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
      this.resetForm("form");
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
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加合同";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getContractManager(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合同";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateContractManager(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addContractManager(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
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
        this.dialogRenew=true
        const id = this.ids[0]
        getContractManager(id).then(res=>{
            this.renewinfo=res.data
        })
    },
    // 合同续签提交
    submitRenew(){
        const id = this.ids[0]
        const data ={
            beginDate: this.renewinfo.beginDate,
            beginDateEnd: this.renewinfo.beginDateEnd,
            beginDateStart: this.renewinfo.beginDateStart,
            checkDate: this.renewinfo.checkDate,
            checkDateEnd: this.renewinfo.checkDateEnd,
            checkDateStart: this.renewinfo.checkDateStart,
            checkStatus: this.renewinfo.checkStatus,
            createBy: this.renewinfo.createBy,
            createTime:this.renewinfo.createTime,
            customerId: this.renewinfo. customerId,
            customerName: this.renewinfo.customerName,
            customerNum: this.renewinfo.customerNum,
            customerPhone: this.renewinfo.customerPhone,
            deptId: this.renewinfo.deptId,
            dianmianAddress: this.renewinfo. dianmianAddress,
            dianmianCity: this.renewinfo.dianmianCity,
            dianmianDistrict: this.renewinfo.dianmianDistrict,
            dianmianLatitude: this.renewinfo. dianmianLatitude,
            dianmianLongitude: this.renewinfo.dianmianLongitude,
            dianmianName: this.renewinfo.dianmianName,
            dianmianNum:this.renewinfo. dianmianNum,
            dianmianProvince: this.renewinfo.dianmianProvince,
            endDate: this.renewinfo. endDate,
            endDateEnd: this.renewinfo.endDateEnd,
            endDateStart:this.renewinfo.endDateStart,
            fee:this.renewinfo.fee,
            file: this.renewinfo.file,
            guarantee: this.renewinfo.guarantee,
            id:this.renewinfo.id,
            imgs: this.renewinfo.imgs,
            keywords: this.renewinfo.keywords,
            manager: this.renewinfo.manager,
            managerId:this.renewinfo.managerId,
            num:this.renewinfo.num,
            operation: this.renewinfo.operation,
            params: this.renewinfo.params,
            pid: this.renewinfo.pid,
            produce:this.renewinfo.produce,
            remark: this.renewinfo.remark,
            rootNum: this.renewinfo.rootNum,
            searchValue: this.renewinfo.searchValue,
            signDate: this.renewinfo.signDate,
            signDateEnd: this.renewinfo.signDateEnd,
            signDateStart: this.renewinfo.signDateStart,
            signUser: this.renewinfo.signUser,
            signUserId: this.renewinfo. signUserId,
            status: this.renewinfo.status,
            terminateDate: this.renewinfo.terminateDate,
            terminateFile: this.renewinfo.terminateFile,
            type: this.renewinfo.type,
            updateBy: this.renewinfo.updateBy,
            updateTime: this.renewinfo.updateTime
        }
       contractRenew(data,id).then(res=>{
           this.$message.success("操作成功");
         this.dialogRenew=false
       }).catch(error=>{
           this.$message.error("操作失败");
       })
    },
      // 负责人查询
    querySearch(queryString, callback) {
            const keywords=this.transforKeywords
            var params={
                keywords:keywords
            }
        transforCustomer(params).then(response => {
           var restaurants = response.rows;
           console.log('eeeeeeeeeeeeeeee',restaurants)
           const list = []
             //封装要显示的数据
           for (let v of restaurants) {
            list.push({ value: v.phonenumber + " " + v.userName})
            }
                 // 调用 callback 返回建议列表的数据,是一个数组类型
            callback(list)
      });
      },
         // 负责人查询
    handleSelect(item) {
        console.log(item)
        var item = item.value
        item=item.substring(0,11);
        this.transforphone=item
        this.userInfo()
      },
    // 获取user用户信息
    userInfo() {
      listUser({}).then(response => {
          this.user=response.rows
          var a  = this.user.filter(item=>{
              if(this.transforphone===item.phonenumber){
                  return item
              }
          })
          var b = []
          for(var i = 0; i<a.length;i++){
              var c = a[i].dept
              b.push(c.deptName)
              }
          this.deptName = b[0]
      });
    },
     //   转移确定按钮
    handleTransfor() {
       var id = this.ids;
       var params = {
           ids:id,
           phone:this.transforphone
       }
       contractTransfor(params).then(response => {
           this.$message.success("操作成功");
           this. dialogTransfor = false;
           this.getList();
      }).catch(error=>{
           this.$message.error("操作失败");
      });
    },
  },
  computed:{
    // totalfee: function () {
    //   console.log(this.fee.daibanFee)
    //   return  this.fee.daibanFee + this.fee.guohuoFee + this.fee.systemUseFee + this.fee.yunyingManagerFee+ this.fee.jingyingManagerFee.total
    //     + this.fee.systemMaintenanceFee
    // }
  }
};
</script>
