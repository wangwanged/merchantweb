<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司和部门"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="inputDate">
        <el-date-picker
          value-format="yyyy-MM-dd"
          placeholder="请选择时间范围"
          v-model="inputDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="resource">
        <el-select
          v-model="queryParams.resource"
          placeholder="请选择客户来源"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in resourceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item prop="level">
        <el-select
          v-model="queryParams.level"
          placeholder="请选择客户等级"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in levelOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="customerNeeds">
        <el-select
          v-model="queryParams.customerNeeds"
          placeholder="请选择客户需求"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in customerNeedsOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入客户电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <Liandong @placeInfo="getPlace(arguments)"></Liandong> -->
      <Area/>
      <el-form-item prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入负责人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item>
        <div class="timesearch">
          <span>最新跟进</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button
            v-for="(item, index) in customerGenjinnum"
            :key="index"
            type="text"
            @click="getTimeRange(index)"
            >超过{{ item }}天未跟进</el-button
          >
        </div>
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
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:customer:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:customer:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:customer:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="customerList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="客户名称" align="center">
        <template slot-scope="obj">
          <el-button
            @click="
              $router.push({
                path: '/customer/customeritem',
                query: { id: obj.row.id }
              })
            "
            size="small"
            type="text"
            >{{ obj.row.name }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="客户电话" align="center" prop="phone" />
      <el-table-column
        label="客户等级"
        align="center"
        prop="level"
        :formatter="levelFormat"
      />
      <el-table-column
        label="客户需求"
        align="center"
        prop="customerNeeds"
        :formatter="customerNeedsFormat"
      />
      <el-table-column label="公司和部门" align="center" prop="companyName" />
      <el-table-column label="客户地区" align="center">
        <template slot-scope="scope">
          {{ scope.row.province }}-{{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column
        label="客户来源"
        align="center"
        prop="resource"
        :formatter="resourceFormat"
      />
      <el-table-column label="负责人姓名" align="center" prop="username" />
      <el-table-column label="录入人" align="center" prop="luruName" />
      <el-table-column label="中介经验" align="center" prop="experience" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="inputDate"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inputDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:customer:edit']"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:customer:remove']"
            >删除</el-button
          >
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

    <!-- 添加或编辑我的客户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
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
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户需求" prop="customerNeeds">
          <el-select v-model="form.customerNeeds" placeholder="请选择客户需求">
            <el-option
              v-for="dict in customerNeedsOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户地区" prop="dianmianAddress">
          <!-- <Liandong @placeInfo="getPlace(arguments)"></Liandong> -->
          <Area/>
        </el-form-item>
        <el-form-item label="客户公司" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司和部门" />
        </el-form-item>
        <el-form-item label="中介经验" prop="experience">
          <el-input v-model="form.experience" placeholder="请输入中介经验" />
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
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <!-- <el-form-item label="负责人" prop="username">
          <template slot-scope="scope">
            <el-input v-model='scope.row.username'></el-input>
        </template>
        </el-form-item> -->
        <el-form-item label="负责人" prop="username">
          <el-select
            filterable
            v-model="form.username"
            placeholder="选择人员"
            clearable
            size="small"
          >
            <el-option
              v-for="(item, index) in user"
              :key="index"
              :label="item.userName"
              :value="item.userName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input placeholder="人员部门">{{}}</el-input>
          <!-- <el-input v-model="user.dept.deptName[form.userName]" placeholder="人员部门" disabled /> -->
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
import {
  listCustomer,
  getCustomer,
  delCustomer,
  addCustomer,
  updateCustomer,
  exportCustomer
} from "@/api/system/customer";
import { listUser } from "@/api/system/user";
import Liandong from "@/components/Liandong/liandong.vue";
import {area} from '@/components/Liandong/liandong.vue'
import Area from '@/views/components/area'
export default {
  name: "Customer",
  components: {
    Liandong,
    Area
  },
  data() {
    return {
      // 用户信息
      user:[],
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
      // 客户来源字典
      resourceOptions: [],
      //   筛选时间字典
      customerGenjinOptions: [],
      //   筛选时间index
      customerGenjinnum: [],
      //   选定时间
      inputDate: [],
      // 查询参数
      queryParams: {
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
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "您的手机号不能为空" },
          {
            pattern: /^1[3-9]\d{9}$/, // 正则表达式
            message: "您的手机号格式不正确"
          }
        ]
      }
    };
  },
  created() {
    this.userInfo()
    this.getList();
    this.getDicts("customer_level").then(response => {
      this.levelOptions = response.data;
    });
    this.getDicts("sys_user_need").then(response => {
      this.customerNeedsOptions = response.data;
    });
    this.getDicts("sys_customer_resource").then(response => {
      this.resourceOptions = response.data;
    });
    this.getDicts("genjin_days").then(response => {
      this.customerGenjinOptions = response.data;
      var num = this.customerGenjinOptions.map(item => {
        var a = Number(item.dictValue);
        return a;
      });
      var num = num.map(item => {
        return Number(item);
      });
      this.customerGenjinnum = num;
    });
  },
  methods: {
    //   getUserId(i){
    //      console.log(i)
    //   },
    // 获取user用户信息
    userInfo() {
      listUser({}).then(response => {
          this.user=response.rows
        //   console.log(this.user)
        //   var a  = this.user.filter(item=>{
        //       console.log(item.userName)
        //       if(this.form.username===item.userName){
        //           return item
        //       }
        //   })
        //   console.log(a)
      });
    },
    // 根据天数筛选颜色
    // filterColor({row}){
    //    if(row.id===1){

    //    }
    // },
    //   15,30,60时间段数据获取
    getTimeRange(i) {
      this.queryParams.pageNum = 1;
      (this.queryParams.inputDateStart = this.getBeforeDate(
        -this.customerGenjinnum[i + 1]
      )),
        (this.queryParams.inputDateEnd = this.getBeforeDate(
          -this.customerGenjinnum[i]
        )),
        this.getList();
    },
    // 日期格式
    getBeforeDate(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
      return y + "-" + m + "-" + d;
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
    /** 查询我的客户列表 */
    getList() {
      this.loading = true;
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.$store.commit("updateAlldata", this.customerList);
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
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      (this.queryParams.inputDateStart = this.inputDate[0]),
        (this.queryParams.inputDateEnd = this.inputDate[1]);
      this.getList();
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
      this.title = "添加我的客户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
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
      this.$confirm(
        '是否确认删除我的客户编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delCustomer(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有我的客户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportCustomer(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        });
    }
  }
};
</script>
