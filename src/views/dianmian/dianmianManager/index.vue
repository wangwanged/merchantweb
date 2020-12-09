<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item prop="diandongId">
        <el-input
          v-model="queryParams.diandongId"
          placeholder="请输入店东id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item prop="diandongName">
        <el-input
          v-model="queryParams.diandongName"
          placeholder="请输入店东姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item  prop="diandongPhone">
        <el-input
          v-model="queryParams.diandongPhone"
          placeholder="请输入店东电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入所属公司id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入门店名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择门店状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="province">
        <el-input
          v-model="queryParams.province"
          placeholder="请输入所属省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入所属市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="district">
        <el-input
          v-model="queryParams.district"
          placeholder="请输入所属区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入店面详细地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="checkResult">
        <el-select v-model="queryParams.checkResult" placeholder="请选择验收结果" clearable size="small">
          <el-option
            v-for="dict in checkResultOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="openDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.openDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开店日期">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item prop="contractnum">
        <el-input
          v-model="queryParams.contractnum"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择店面类型" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="area">
        <el-input
          v-model="queryParams.area"
          placeholder="请输入授权区域"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dianmian:dianmianManager:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['dianmian:dianmianManager:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['dianmian:dianmianManager:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dianmian:dianmianManager:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dianmianManagerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="公司" align="center" prop="customer.companyName"/>
      <el-table-column label="店面名称" align="center" prop="name">
          <template slot-scope="obj">
          <el-button
            @click="
              $router.push({
                path: '/dianmian/dianmianItem',
                query: { id: obj.row.id }
              })
            "
            size="small"
            type="text"
            >{{ obj.row.name }}</el-button
          >
          </template>
      </el-table-column>
      <el-table-column label="店面状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="所属地区" align="center" prop="province">{{dianmianManagerList.province}}  {{dianmianManagerList.city}}</el-table-column>
      <el-table-column label="店面地址" align="center" prop="address" />
      <el-table-column label="验收结果" align="center" prop="checkResult" :formatter="checkResultFormat" />
      <el-table-column label="开业日期" align="center" prop="openDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.openDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对应合同" align="center" prop="contractNum" width="180">
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
            >{{ obj.row.contractNum }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="店面类型" align="center" prop="type" :formatter="typeFormat" />
      <el-table-column label="授权区域" align="center" prop="area" />
      <el-table-column label="客户姓名" align="center" prop="diandongName" />
      <el-table-column label="负责人" align="center" prop="customer.username" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['dianmian:dianmianManager:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dianmian:dianmianManager:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改店面管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="店东id" prop="diandongId">
          <el-input v-model="form.diandongId" placeholder="请输入店东id" />
        </el-form-item>
        <el-form-item label="店东姓名" prop="diandongName">
          <el-input v-model="form.diandongName" placeholder="请输入店东姓名" />
        </el-form-item>
        <el-form-item label="店东电话" prop="diandongPhone">
          <el-input v-model="form.diandongPhone" placeholder="请输入店东电话" />
        </el-form-item>
        <el-form-item label="管理人id" prop="sysUserId">
          <el-input v-model="form.sysUserId" placeholder="请输入管理人id" />
        </el-form-item>
        <el-form-item label="所属公司id" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入所属公司id" />
        </el-form-item>
        <el-form-item label="门店名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入门店名称" />
        </el-form-item>
        <el-form-item label="门店状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择门店状态">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属省" prop="province">
          <el-input v-model="form.province" placeholder="请输入所属省" />
        </el-form-item>
        <el-form-item label="所属市" prop="city">
          <el-input v-model="form.city" placeholder="请输入所属市" />
        </el-form-item>
        <el-form-item label="所属区" prop="district">
          <el-input v-model="form.district" placeholder="请输入所属区" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="店面详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入店面详细地址" />
        </el-form-item>
        <el-form-item label="验收结果" prop="checkResult">
          <el-select v-model="form.checkResult" placeholder="请选择验收结果">
            <el-option
              v-for="dict in checkResultOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开店日期" prop="openDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.openDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开店日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractnum">
          <el-input v-model="form.contractnum" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="店面类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择店面类型">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权区域" prop="area">
          <el-input v-model="form.area" placeholder="请输入授权区域" />
        </el-form-item>
        <el-form-item label="闭店/停业时间" prop="closeDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.closeDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择闭店/停业时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="闭店原因" prop="closeReason">
          <el-input v-model="form.closeReason" placeholder="请输入闭店原因" />
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
import { listDianmianManager, getDianmianManager, delDianmianManager, addDianmianManager, updateDianmianManager, exportDianmianManager } from "@/api/dianmian/dianmianManager";

export default {
  name: "DianmianManager",
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
      // 店面管理表格数据
      dianmianManagerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 门店状态字典
      statusOptions: [],
      // 验收结果字典
      checkResultOptions: [],
      // 店面类型字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        diandongId: null,
        diandongName: null,
        diandongPhone: null,
        companyId: null,
        name: null,
        status: null,
        province: null,
        city: null,
        district: null,
        address: null,
        checkResult: null,
        openDate: null,
        contractnum: null,
        type: null,
        area: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        diandongName: [
          { required: true, message: "店东姓名不能为空", trigger: "blur" }
        ],
        diandongPhone: [
          { required: true, message: "店东电话不能为空", trigger: "blur" }
        ],
        sysUserId: [
          { required: true, message: "管理人id不能为空", trigger: "blur" }
        ],
        companyId: [
          { required: true, message: "所属公司id不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "门店名称不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "门店状态不能为空", trigger: "change" }
        ],
        province: [
          { required: true, message: "所属省不能为空", trigger: "blur" }
        ],
        city: [
          { required: true, message: "所属市不能为空", trigger: "blur" }
        ],
        district: [
          { required: true, message: "所属区不能为空", trigger: "blur" }
        ],
        longitude: [
          { required: true, message: "经度不能为空", trigger: "blur" }
        ],
        latitude: [
          { required: true, message: "纬度不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "店面详细地址不能为空", trigger: "blur" }
        ],
        checkResult: [
          { required: true, message: "验收结果不能为空", trigger: "change" }
        ],
        openDate: [
          { required: true, message: "开店日期不能为空", trigger: "blur" }
        ],
        contractnum: [
          { required: true, message: "合同编号不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "店面类型不能为空", trigger: "change" }
        ],
        area: [
          { required: true, message: "授权区域不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注信息不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("dianmian_status").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("dianmian_checkout").then(response => {
      this.checkResultOptions = response.data;
    });
    this.getDicts("sys_user_need").then(response => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /** 查询店面管理列表 */
    getList() {
      this.loading = true;
      listDianmianManager(this.queryParams).then(response => {
        this.dianmianManagerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 门店状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 验收结果字典翻译
    checkResultFormat(row, column) {
      return this.selectDictLabel(this.checkResultOptions, row.checkResult);
    },
    // 店面类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
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
        diandongId: null,
        diandongName: null,
        diandongPhone: null,
        sysUserId: null,
        companyId: null,
        name: null,
        status: null,
        province: null,
        city: null,
        district: null,
        longitude: null,
        latitude: null,
        address: null,
        checkResult: null,
        openDate: null,
        contractnum: null,
        type: null,
        area: null,
        closeDate: null,
        closeDays: null,
        closeReason: null,
        checkInfo: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
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
      this.title = "添加店面管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDianmianManager(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改店面管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDianmianManager(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDianmianManager(this.form).then(response => {
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
      this.$confirm('是否确认删除店面管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDianmianManager(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有店面管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportDianmianManager(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
