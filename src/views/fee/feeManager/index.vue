<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="费用编号" prop="num">
        <el-input
          v-model="queryParams.num"
          placeholder="请输入费用编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同编号" prop="constractNum">
        <el-input
          v-model="queryParams.constractNum"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="费用类型" prop="type">
        <el-input
          v-model="queryParams.type"
          placeholder="请输入费用类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款方式" prop="payMethod">
        <el-input
          v-model="queryParams.payMethod"
          placeholder="请输入付款方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款人" prop="payer">
        <el-input
          v-model="queryParams.payer"
          placeholder="请输入付款人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款人" prop="reciever">
        <el-input
          v-model="queryParams.reciever"
          placeholder="请输入收款人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="费用状态" prop="checkStatus">
        <el-select v-model="queryParams.checkStatus" placeholder="请选择费用状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="收款时间" prop="shoukuanDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.shoukuanDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择收款时间">
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
          v-hasPermi="['fee:feeManager:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['fee:feeManager:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['fee:feeManager:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['fee:feeManager:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="feeManagerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="合同费用表id" align="center" prop="id" />
      <el-table-column label="费用编号" align="center" prop="num" />
      <el-table-column label="合同编号" align="center" prop="constractNum" />
      <el-table-column label="费用类型" align="center" prop="type" />
      <el-table-column label="付款方式" align="center" prop="payMethod" />
      <el-table-column label="付款人" align="center" prop="payer" />
      <el-table-column label="收款人" align="center" prop="reciever" />
      <el-table-column label="费用状态" align="center" prop="checkStatus" />
      <el-table-column label="收款时间" align="center" prop="shoukuanDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.shoukuanDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['fee:feeManager:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['fee:feeManager:remove']"
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

    <!-- 添加或修改费用管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="费用编号" prop="num">
          <el-input v-model="form.num" placeholder="请输入费用编号" />
        </el-form-item>
        <el-form-item label="合同编号" prop="constractNum">
          <el-input v-model="form.constractNum" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="费用类型" prop="type">
          <el-input v-model="form.type" placeholder="请输入费用类型" />
        </el-form-item>
        <el-form-item label="付款方式" prop="payMethod">
          <el-input v-model="form.payMethod" placeholder="请输入付款方式" />
        </el-form-item>
        <el-form-item label="付款人" prop="payer">
          <el-input v-model="form.payer" placeholder="请输入付款人" />
        </el-form-item>
        <el-form-item label="收款人" prop="reciever">
          <el-input v-model="form.reciever" placeholder="请输入收款人" />
        </el-form-item>
        <el-form-item label="费用状态">
          <el-radio-group v-model="form.checkStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收款时间" prop="shoukuanDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.shoukuanDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择收款时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
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
import { listFeeManager, getFeeManager, delFeeManager, addFeeManager, updateFeeManager, exportFeeManager } from "@/api/fee/feeManager";

export default {
  name: "FeeManager",
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
      // 费用管理表格数据
      feeManagerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        num: null,
        constractNum: null,
        type: null,
        payMethod: null,
        payer: null,
        reciever: null,
        checkStatus: null,
        shoukuanDate: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        num: [
          { required: true, message: "费用编号不能为空", trigger: "blur" }
        ],
        constractNum: [
          { required: true, message: "合同编号不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "费用类型不能为空", trigger: "blur" }
        ],
        payMethod: [
          { required: true, message: "付款方式不能为空", trigger: "blur" }
        ],
        payer: [
          { required: true, message: "付款人不能为空", trigger: "blur" }
        ],
        reciever: [
          { required: true, message: "收款人不能为空", trigger: "blur" }
        ],
        checkStatus: [
          { required: true, message: "费用状态不能为空", trigger: "blur" }
        ],
        shoukuanDate: [
          { required: true, message: "收款时间不能为空", trigger: "blur" }
        ],
        updateDate: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询费用管理列表 */
    getList() {
      this.loading = true;
      listFeeManager(this.queryParams).then(response => {
        this.feeManagerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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
        constractNum: null,
        type: null,
        payMethod: null,
        payer: null,
        reciever: null,
        checkStatus: "0",
        shoukuanDate: null,
        updateDate: null
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
      this.title = "添加费用管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFeeManager(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改费用管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFeeManager(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFeeManager(this.form).then(response => {
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
      this.$confirm('是否确认删除费用管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFeeManager(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有费用管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFeeManager(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
