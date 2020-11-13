<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item  prop="num">
        <el-input
          v-model="queryParams.num"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="customerPhone">
        <el-input
          v-model="queryParams.customerPhone"
          placeholder="请输入客户手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择合同类型" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="produce">
        <el-select v-model="queryParams.produce" placeholder="请选择签约产品" clearable size="small">
          <el-option
            v-for="dict in produceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item  prop="operation">
        <el-input
          v-model="queryParams.operation"
          placeholder="请输入操作"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="signDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.signDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择签约日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item  prop="beginDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.beginDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择合同开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item  prop="endDate">
        <el-input
          v-model="queryParams.endDate"
          placeholder="请输入合同结束日期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择生效失效状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['contract:contractManager:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['contract:contractManager:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['contract:contractManager:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['contract:contractManager:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="contractManagerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="合同编号" align="center" prop="num">
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
      <el-table-column label="合同类型" align="center" prop="type" :formatter="typeFormat" />
      <el-table-column label="客户姓名" align="center" prop="customerName" />  
      <el-table-column label="签约产品" align="center" prop="produce" :formatter="produceFormat" />
      <el-table-column label="店面/区域名称" align="center" prop="dianmianName" />
      <el-table-column label="店面数量" align="center" prop="dianmianNum" />
      <el-table-column label="履约保证金" align="center" prop="guarantee" />
      <el-table-column label="费用信息" align="center" prop="fee" />
      <el-table-column label="负责人" align="center" prop="manager" />
      <el-table-column label="签约日期" align="center" prop="signDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同开始日期" align="center" prop="beginDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同结束日期" align="center" prop="endDate" />
      <el-table-column label="合同状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
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
          <el-input v-model="form.customerPhone" placeholder="请输入客户手机号" />
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
          <el-input v-model="form.dianmianName" placeholder="请输入店面或区域名称" />
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
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.signDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择签约日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签约人员" prop="signUser">
          <el-input v-model="form.signUser" placeholder="请输入签约人员" />
        </el-form-item>
        <el-form-item label="合同开始日期" prop="beginDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.beginDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择合同开始日期">
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
  </div>
</template>

<script>
import { listContractManager, getContractManager, delContractManager, addContractManager, updateContractManager, exportContractManager } from "@/api/contract/contractManager";

export default {
  name: "ContractManager",
  data() {
    return {
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
      // 查询参数
      queryParams: {
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
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        num: [
          { required: true, message: "合同编号不能为空", trigger: "blur" }
        ],
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
          { required: true, message: "合同类型(0：新签:1：续签)不能为空", trigger: "change" }
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
  created() {
    this.getList();
    this.getDicts("contract_type").then(response => {
      this.typeOptions = response.data;
    });
    this.getDicts("sys_user_need").then(response => {
      this.produceOptions = response.data;
    });
    this.getDicts("contract_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询合同列表 */
    getList() {
      this.loading = true;
      listContractManager(this.queryParams).then(response => {
        this.contractManagerList = response.rows;
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
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
      const id = row.id || this.ids
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
        }).then(function() {
          return delContractManager(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有合同数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportContractManager(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
