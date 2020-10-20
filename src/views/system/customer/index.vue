<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="客户名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户电话" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入客户电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户等级" prop="level">
        <el-select v-model="queryParams.level" placeholder="请选择客户等级" clearable size="small">
          <el-option
            v-for="dict in levelOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户需求" prop="customerNeeds">
        <el-select v-model="queryParams.customerNeeds" placeholder="请选择客户需求" clearable size="small">
          <el-option
            v-for="dict in customerNeedsOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公司" prop="companyId">
        <el-select v-model="queryParams.companyId" placeholder="请选择公司" clearable size="small">
          <el-option
            v-for="dict in companyIdOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-select v-model="queryParams.province" placeholder="请选择省份" clearable size="small">
          <el-option
            v-for="dict in provinceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-select v-model="queryParams.city" placeholder="请选择城市" clearable size="small">
          <el-option
            v-for="dict in cityOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="跟进状态" prop="genjinStatus">
        <el-select v-model="queryParams.genjinStatus" placeholder="请选择跟进状态" clearable size="small">
          <el-option
            v-for="dict in genjinStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户来源" prop="resource">
        <el-select v-model="queryParams.resource" placeholder="请选择客户来源" clearable size="small">
          <el-option
            v-for="dict in resourceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="负责人" prop="sysUserId">
        <el-input
          v-model="queryParams.sysUserId"
          placeholder="请输入负责人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最新跟进时间" prop="updateTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.updateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择最新跟进时间">
        </el-date-picker>
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
          v-hasPermi="['system:customer:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:customer:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:customer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:customer:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="customerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="客户id" align="center" prop="id" />
      <el-table-column label="客户名称" align="center" prop="name" />
      <el-table-column label="客户电话" align="center" prop="phone" />
      <el-table-column label="客户等级" align="center" prop="level" :formatter="levelFormat" />
      <el-table-column label="客户需求" align="center" prop="customerNeeds" :formatter="customerNeedsFormat" />
      <el-table-column label="公司" align="center" prop="companyId" :formatter="companyIdFormat" />
      <el-table-column label="省份" align="center" prop="province" :formatter="provinceFormat" />
      <el-table-column label="城市" align="center" prop="city" :formatter="cityFormat" />
      <el-table-column label="跟进状态" align="center" prop="genjinStatus" :formatter="genjinStatusFormat" />
      <el-table-column label="客户来源" align="center" prop="resource" :formatter="resourceFormat" />
      <el-table-column label="负责人" align="center" prop="sysUserId" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最新跟进时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:customer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:customer:remove']"
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

    <!-- 添加或修改我的客户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="客户电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入客户电话" />
        </el-form-item>
        <el-form-item label="客户等级" prop="level">
          <el-select v-model="form.level" placeholder="请选择客户等级">
            <el-option
              v-for="dict in levelOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户需求" prop="customerNeeds">
          <el-select v-model="form.customerNeeds" placeholder="请选择客户需求">
            <el-option
              v-for="dict in customerNeedsOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司" prop="companyId">
          <el-select v-model="form.companyId" placeholder="请选择公司">
            <el-option
              v-for="dict in companyIdOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-select v-model="form.province" placeholder="请选择省份">
            <el-option
              v-for="dict in provinceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="form.city" placeholder="请选择城市">
            <el-option
              v-for="dict in cityOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进状态" prop="genjinStatus">
          <el-select v-model="form.genjinStatus" placeholder="请选择跟进状态">
            <el-option
              v-for="dict in genjinStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户来源" prop="resource">
          <el-select v-model="form.resource" placeholder="请选择客户来源">
            <el-option
              v-for="dict in resourceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" prop="sysUserId">
          <el-input v-model="form.sysUserId" placeholder="请输入负责人" />
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
import { listCustomer, getCustomer, delCustomer, addCustomer, updateCustomer, exportCustomer } from "@/api/system/customer";

export default {
  name: "Customer",
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
      // 我的客户表格数据
      customerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 客户等级字典
      levelOptions: [],
      // 客户需求字典
      customerNeedsOptions: [],
      // 公司字典
      companyIdOptions: [],
      // 省份字典
      provinceOptions: [],
      // 城市字典
      cityOptions: [],
      // 跟进状态字典
      genjinStatusOptions: [],
      // 客户来源字典
      resourceOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        phone: null,
        level: null,
        customerNeeds: null,
        companyId: null,
        province: null,
        city: null,
        genjinStatus: null,
        resource: null,
        sysUserId: null,
        createTime: null,
        updateTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        xiansuoId: [
          { required: true, message: "最新跟进时间不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "客户电话不能为空", trigger: "blur" }
        ],
        level: [
          { required: true, message: "客户等级不能为空", trigger: "change" }
        ],
        customerNeeds: [
          { required: true, message: "客户需求不能为空", trigger: "change" }
        ],
        companyId: [
          { required: true, message: "公司不能为空", trigger: "change" }
        ],
        province: [
          { required: true, message: "省份不能为空", trigger: "change" }
        ],
        city: [
          { required: true, message: "城市不能为空", trigger: "change" }
        ],
        genjinStatus: [
          { required: true, message: "跟进状态不能为空", trigger: "change" }
        ],
        resource: [
          { required: true, message: "客户来源不能为空", trigger: "change" }
        ],
        sysUserId: [
          { required: true, message: "负责人不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "最新跟进时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("customer_level").then(response => {
      this.levelOptions = response.data;
    });
    this.getDicts("sys_user_need").then(response => {
      this.customerNeedsOptions = response.data;
    });
    this.getDicts("sys_company").then(response => {
      this.companyIdOptions = response.data;
    });
    this.getDicts("sys_province").then(response => {
      this.provinceOptions = response.data;
    });
    this.getDicts("sys_city").then(response => {
      this.cityOptions = response.data;
    });
    this.getDicts("customer_genjin").then(response => {
      this.genjinStatusOptions = response.data;
    });
    this.getDicts("sys_customer_resource").then(response => {
      this.resourceOptions = response.data;
    });
  },
  methods: {
    /** 查询我的客户列表 */
    getList() {
      this.loading = true;
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 客户等级字典翻译
    levelFormat(row, column) {
      return this.selectDictLabel(this.levelOptions, row.level);
    },
    // 客户需求字典翻译
    customerNeedsFormat(row, column) {
      return this.selectDictLabel(this.customerNeedsOptions, row.customerNeeds);
    },
    // 公司字典翻译
    companyIdFormat(row, column) {
      return this.selectDictLabel(this.companyIdOptions, row.companyId);
    },
    // 省份字典翻译
    provinceFormat(row, column) {
      return this.selectDictLabel(this.provinceOptions, row.province);
    },
    // 城市字典翻译
    cityFormat(row, column) {
      return this.selectDictLabel(this.cityOptions, row.city);
    },
    // 跟进状态字典翻译
    genjinStatusFormat(row, column) {
      return this.selectDictLabel(this.genjinStatusOptions, row.genjinStatus);
    },
    // 客户来源字典翻译
    resourceFormat(row, column) {
      return this.selectDictLabel(this.resourceOptions, row.resource);
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
        xiansuoId: null,
        name: null,
        phone: null,
        level: null,
        customerNeeds: null,
        companyId: null,
        province: null,
        city: null,
        genjinStatus: null,
        resource: null,
        sysUserId: null,
        createTime: null,
        updateTime: null
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
      this.title = "添加我的客户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCustomer(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改我的客户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCustomer(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCustomer(this.form).then(response => {
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
      this.$confirm('是否确认删除我的客户编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCustomer(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有我的客户数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCustomer(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
