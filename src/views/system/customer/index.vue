<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      class='search'
    >
      <el-form-item>
          <Liandong class='liandong' @placeInfo="getPlace" :toSon="toplace"></Liandong>
      </el-form-item>
      <el-form-item prop="inputDate">
        <el-date-picker
          class='datepicker'
          value-format="yyyy-MM-dd"
          placeholder="录入时间筛选"
          v-model="inputDate"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
       <el-form-item prop="resource">
        <el-select
          v-model="queryParams.genjinStatus"
          placeholder="跟进状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in genjinstatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="resource">
        <el-select
          v-model="queryParams.resource"
          placeholder="客户来源"
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
      <el-form-item prop="level">
        <el-select
          v-model="queryParams.level"
          placeholder="客户等级"
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
          placeholder="客户需求"
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
      <!-- <Liandong @placeInfo="getPlace(arguments)"></Liandong> -->
      <!-- <Area /> -->
      <el-form-item prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="负责人姓名"
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
      <div class="timesearch" style="margin-bottom:20px">
        <span style="display:inline-block;margin-right:15px;font-size:14px"
          >最新跟进</span
        >
        <el-button
          v-for="(item, index) in customerGenjinnum"
          :key="index"
          type="text"
          @click="getTimeRange(index)"
          >超过{{ item }}天未跟进</el-button
        >
      </div>
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
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:customer:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          :disabled="multiple"
          @click="dialogTransfor = true"
          v-hasPermi="['system:customer:remove']"
          >转移</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          :disabled="multiple"
          @click="dialogeInvalid = true"
          v-hasPermi="['system:customer:remove']"
          >失效</el-button
        >
      </el-col>
      <!-- <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar> -->
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
      <el-table-column label="中介经验" align="center" prop="experience" :formatter="experienceFormat" />
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
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或编辑我的客户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="客户电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入客户电话" />
        </el-form-item>
        <el-form-item label="客户等级">
          <el-select v-model="form.level" placeholder="请选择客户等级">
            <el-option
              v-for="dict in levelOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户需求">
          <el-select v-model="form.customerNeeds" placeholder="请选择客户需求">
            <el-option
              v-for="dict in customerNeedsOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户地区">
          <Liandong @placeInfo="getPlace" :toSon="toplace"></Liandong>
        </el-form-item>
        <el-form-item label="客户公司">
          <el-input v-model="form.companyName" placeholder="请输入公司和部门" />
        </el-form-item>
        <el-form-item label="中介经验">
          <!-- <el-input v-model="form.experience" placeholder="请输入中介经验" /> -->
           <el-select v-model="form.experience" placeholder="请选择客户来源">
            <el-option
              v-for="dict in experienceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户来源">
          <el-select v-model="form.resource" placeholder="请选择客户来源">
            <el-option
              v-for="dict in resourceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <!-- <el-form-item label="负责人" prop="username">
          <template slot-scope="scope">
            <el-input v-model='scope.row.username'></el-input>
        </template>
        </el-form-item> -->
        <el-form-item label="负责人">
          <el-autocomplete
            class="inline-input"
            v-model="keywords"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input disabled v-model="deptName" placeholder="所属部门" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 失效弹框 -->
    <el-dialog title="失效" :visible.sync="dialogeInvalid" width="500px">
      <tr>
        <td><i class="el-icon-message-solid" style="font-size:70px"></i></td>
        <td>
          <strong>是否确定把所选客户失效？</strong>
          <p>
            客户失效后，此客户将转移至线索池，原负责人不能再维护跟进和更新此客户数据。
          </p>
        </td>
      </tr>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleinvlid">确 定</el-button>
        <el-button @click="dialogeInvalid = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 转移弹框 -->
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
  invalidCustomer,
  transforCustomer,
  transforcustomer
} from "@/api/system/customer";
import { listUser } from "@/api/system/user";
import Liandong from "@/components/Liandong/liandong.vue";
import { area } from "@/components/Liandong/liandong.vue";
import Area from "@/views/components/area";
import { getInfo } from "@/api/login";
export default {
  name: "Customer",
  components: {
    Liandong,
    Area
  },
  data() {
    return {
      keywords:"",
      //  传给省市区
      toplace: {
        province: "",
        city: "",
        district: ""
      },
      userId:null,
      //   所属部门
      deptName: "",
      // 转移弹框
      dialogTransfor: false,
      // 失效弹框
      dialogeInvalid: false,
      // 用户信息
      user: [],
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
      //   跟进天数字典
      customerGenjinOptions: [],
    //   跟进状态字典
       genjinstatusOptions:[],
    //    中介经验字典
     experienceOptions:[],
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
    this.userInfo();
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
     this.getDicts("customer_genjin").then(response => {
      this.genjinstatusOptions = response.data;
    });
    // 中介经验
     this.getDicts("experience").then(response => {
      this.experienceOptions = response.data;
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
      console.log(this.customerGenjinnum)
    });
  },
  methods: {
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
        username: null,
        luruId: null,
        luruName: null,
        experience: null,
        remark: null,
        status: null,
        inputDate: null,
        updateDate: null,
        experience: null,
        userId: null,
      };
      this.resetForm("form");
    },
    /** 查询我的客户列表 */
    getList() {
      this.loading = true;
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows;
        this.total = response.total;
        this.loading = false;
        // this.$store.commit("updateAlldata", this.customerList);
      });
    },
    //   转移确定按钮
    handleTransfor(row) {
      const ids = row.id || this.ids;
      var data = {
        ids: ids,
        userId: this.form.userId
        // phone: this.transforphone
      };
      transforcustomer(data)
        .then(response => {
          this.$message.success("操作成功");
          this.getList();
          this.dialogTransfor = false;
        })
        .catch(error => {
          this.$message.error("操作失败");
        });
    },
    //   失效按钮
    handleinvlid(row) {
      const ids = row.id || this.ids;
      const status = "0";
      const params = {
        ids: ids,
        status: status
      };
      invalidCustomer(params)
        .then(response => {
          this.$message.success("操作成功");
          this.$router.push("/customer/customer");
          this.getList();
          this.dialogeInvalid = false;
        })
        .catch(error => {
          this.$message.error("操作失败");
        });
    },
    //   getUserId(i){
    //      console.log(i)
    //   },
    // 获取user用户信息
    userInfo() {
      listUser({}).then(response => {
        this.user = response.rows;
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
    //   (this.queryParams.inputDateStart = this.getBeforeDate(
    //     -this.customerGenjinnum[i + 1]
    //   )),
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
    // 省市区赋值
    toPlace() {
      this.toplace.province = this.form.province;
      this.toplace.city = this.form.city;
      this.toplace.district = this.form.district;
    },
    //   获取省市区的地址
    getPlace(i, j, k) {
      this.form.province = i;
      this.form.city = j;
      this.form.district = k;
       this.queryParams.province = i;
      this.queryParams.city = j;
      this.queryParams.district = k;
    },
      // 直接显示当前负责人和部门
    getdeptuser() {
      getInfo().then(res => {
        this.form.username = res.user.userName;
        this.keywords = res.user.userName;
        this.deptName = res.user.dept.deptName;
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
    // 中介经验字典翻译
    experienceFormat(row, column) {
      return this.selectDictLabel(this.experienceOptions, row.resource);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
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
      this.getdeptuser();
    },
    /** 新增提交按钮 */
    submitForm() {
        this.form.status = "1";
      this.$refs["form"].validate(valid => {
        addCustomer(this.form).then(response => {
          this.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
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
    },
    // 负责人查询
    querySearch(queryString, callback) {
      var params = {
          keywords:queryString
      }
      transforCustomer(params).then(response => {
        var restaurants = response.rows;
        const list = [];
        //封装要显示的数据
        for (let v of restaurants) {
          list.push({ value: v.phonenumber + " " + v.userName, id: v.id});
        }
        // 调用 callback 返回建议列表的数据,是一个数组类型
        callback(list);
      });
    },
    // 负责人查询
    handleSelect(item) {     
      this.reset()
      this.form.userId=item.id
      this.keywords=item.value.substring(12)
    //  部门随负责人变动
     listUser({}).then(res=>{
        var a =res.rows.filter(element => {
             return element.id===item.id
         });
         console.log('res',a)
         this.deptName=a[0].dept.deptName
     })
    },
  }
};
</script>
<style lang="less" scoped>
// /deep/ .el-input--suffix{
//    width: 140px;
// };
// /deep/ .el-range-editor--medium{
//     width: 230px;
//     height: 32px;
//     padding:0px;
// };
// /deep/ .avue-form__menu{
//     display:none
// }
.search .el-input {
  width: 150px;
}
.search .el-select {
  width: 150px;
}
// .search .el-autocomplete{
//     width: 150px;
//     /deep/  .el-input__inner{
//       height: 32px;
//     }
// }
.search .datepicker{
    margin-top:2px;
    height: 32px;
    width: 250px;
    /deep/.el-date-editor--daterange .el-input__inner{
        width: 150px;
    }
}
.search .el-date-picker{
    height: 32px;
    width: 150px;
}
.liandong{
    /deep/ .el-input__inner{
        width:105px;
        height: 32px;
    }
}
</style>
