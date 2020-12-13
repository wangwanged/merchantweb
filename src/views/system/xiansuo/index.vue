<template>
  <div class="app-container">
    <el-form
      class="search"
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item>
        <showdept @myevent = 'getDeptId' @keyup.enter.native="handleQuery"/>
           <!--<el-select
          v-model="queryParams.resource"
          placeholder="线索来源"
          clearable
          size="small"
        >
          <el-option-group label='负责人'>
               <el-option
            v-for="dict in resourceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
          </el-option-group>
           <el-option-group label='部门'>
               <el-option
            v-for="dict in resourceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
          </el-option-group>
        </el-select>-->
      </el-form-item>
      <el-form-item>
        <Area class='liandong' @place-info="getPlace" :toSon="toplace"></Area>
      </el-form-item>
       <el-form-item prop="inputDate">
        <el-date-picker
          class='datepicker'
          value-format="yyyy-MM-dd"
          placeholder="录入时间"
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
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="resource">
        <el-select
          v-model="queryParams.resource"
          placeholder="线索来源"
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          :disabled="single"
          @click="handletocustomer"
          v-hasPermi="['system:xiansuo:export']"
          >转成客户</el-button
        >
      </el-col>
      <div class="fr">
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['system:xiansuo:add']"
            >新增线索</el-button
          >
        </el-col>
        <!-- 导入线索 -->
        <el-col :span="1.5">
<!--          <input-excel @getResult="getMyExcelData"></input-excel>-->
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="mini"
            @click="handleExport"
            v-hasPermi="['system:xiansuo:export']"
            >导出</el-button
          >
        </el-col>
      </div>
    </el-row>
    <el-table
      v-loading="loading"
      :data="xiansuoList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="公司" align="center" prop="deptName"/>
      <el-table-column label="客户姓名" align="center" prop="name">
        <template slot-scope="obj">
          <span
          style="color: #1890FF;cursor: pointer;"
            @click="
              $router.push({
                path: '/xiansuo/xiansuoitem',
                query: { id: obj.row.id }
              })
            "
          >{{ obj.row.name }}

          </span>
        </template>
      </el-table-column>
      <el-table-column label="客户电话" align="center" prop="phone">
        <template slot-scope="obj">
          {{obj.row.phone.split(",")[0]}}
        </template>
      </el-table-column>
      <el-table-column label="客户公司" align="center" prop="companyName" />
      <el-table-column label="客户地区" align="center">
        <template slot-scope="obj">
          {{ obj.row.province }}-{{ obj.row.city }}
        </template>
      </el-table-column>
      <el-table-column
        label="跟进状态"
        align="center"
        prop="genjinStatus"
        :formatter="statusFormat"
      />
      <el-table-column
        label="线索来源"
        align="center"
        prop="resource"
        :formatter="resourceFormat"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inputDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最新跟进时间"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.genjinDate, "{y}-{m}-{d}") }}</span>
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
    <!-- 添加或修改客户线索对话框 -->
    <el-dialog
      title="新增线索"
      :visible.sync="dialog.dialogaddxiansuo"
      width="650px"
      append-to-body
      genjinStatus
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入客户姓名" />
        </el-form-item>
        <Phone ref="myphone" @stringPhone="i=>this.form.phone=i" :toSon="this.form.phone"/>
        <el-form-item label="客户地区">
           <Area @place-info="getPlace" :toSon="toplace"/>
        </el-form-item>
        <el-form-item label="客户公司" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司和部门" />
        </el-form-item>
        <el-form-item label="店面地址" prop="resource">
          <el-input
            v-model="form.dianmianAddress"
            placeholder="请输入店面地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="中介经验" prop="experience">
          <el-select v-model="form.experience" placeholder="请选择线索来源">
            <el-option
              v-for="dict in experienceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线索来源" prop="resource">
          <el-select v-model="form.resource" placeholder="请选择线索来源">
            <el-option
              v-for="dict in resourceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <Manager ref="showmanager" @toFather='getManager'/>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 转成客户弹框 -->
    <el-dialog
      title="转成客户"
      :visible.sync="dialog.dialogtocustomer"
      width="650px"
      :close-on-click-modal='false'
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入客户姓名" />
        </el-form-item>
        <Phone ref="myphone" @stringPhone="i=>this.form.phone=i" :toSon="this.form.phone"/>
          <el-form-item label="客户等级">
          <el-select
            style="width:100%"
            v-model="form.level"
            placeholder="请选择线索来源"
          >
            <el-option
              v-for="dict in levelOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户需求">
          <el-select
            style="width:100%"
            v-model="form.customerNeeds"
            placeholder="请选择线索来源"
          >
            <el-option
              v-for="dict in userneedOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户地区">
          <Area class='liandong' @place-info="getPlace" :toSon="toplace"/>
        </el-form-item>
        <el-form-item label="客户公司">
          <el-input v-model="form.companyName" placeholder="请输入公司" />
        </el-form-item>
        <el-form-item label="店面地址">
          <el-input
            v-model="form.dianmianAddress"
            placeholder="请输入店面地址"
          />
        </el-form-item>
        <el-form-item label="中介经验">
          <el-select
            style="width:100%"
            v-model="form.experience"
            placeholder="请选择线索来源"
          >
            <el-option
              v-for="dict in experienceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <Manager ref="showmanager" @toFather='getManager'/>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTocustomer">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  listXiansuo,
  getXiansuo,
  delXiansuo,
  addXiansuo,
  updateXiansuo,
  exportXiansuo,
  transfortoCustomer,
  importXiansuo
} from "@/api/system/xiansuo";
import {
  listCustomer,
  addCustomer,
  transforCustomer
} from "@/api/system/customer";
import { listUser } from "@/api/system/user";
import { getInfo } from "@/api/login";
import Showdept from '@/components/DeptShow/index'
export default {
  name: "Xiansuo",
  data() {
    return {
      phoneadd: '',
      phonedecrease:[],
      keywords:'',
      //  传给省市区
      toplace: {
        province: "",
        city: "",
        district: ""
      },
      // 客户电话
      customerPhone: [],
      //   所属部门
      deptName: "",
      //   转成客户字段
      tocustomerInfo: [],
      dialog: {
        dialogtocustomer: false,
        dialogaddxiansuo: false
      },
      inputDate:null,
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
      // 客户线索表格数据
      xiansuoList: [],
      // 新增线索信息
      addXiansuoinfo: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 线索来源字典
      resourceOptions: [],
      //  跟进状态字典
      statusOptions: [],
      //   中介经验字典
      experienceOptions: [],
      // 客户需求字典
      userneedOptions: [],
      // 客户等级字典
      levelOptions: [],
    //   // 查询参数
      queryParams: {
        deptId: null,
        pageNum: 1,
        pageSize: 10,
        name: null,
        phone: null,
        companyId: null,
        province: null,
        city: null,
        resource: null,
        sysUserId: null,
        createTime: null,
        updateTime: null,
        status: null,
        genjinStatus: null,
        userId:null,
      },
      // 表单参数
      form: {},
      rules: {
        name: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "您的手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/, // 正则表达式
            message: "您的手机号格式不正确",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components:{
    Showdept,
  },
  props:[],
  computed:{
    user(){
      console.log("this.$store.state.user.userinfo", this.$store.state.user.userinfo)
      return this.$store.state.user.userinfo
    }
  },
  created() {
    this.getList();
    // 客户来源字典
    this.getDicts("sys_xiansuo_resource").then(response => {
      this.resourceOptions = response.data;
    });
    // 中介经验字典
    this.getDicts("experience").then(response => {
      this.experienceOptions = response.data;
    });
    // 客户需求字典
    this.getDicts("sys_user_need").then(response => {
      this.userneedOptions = response.data;
    });
    // 客户等级字典
    this.getDicts("customer_level").then(response => {
      this.levelOptions = response.data;
    });
    // 中介经验字典
    this.getDicts("customer_genjin").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    getDeptId(deptId) {
      this.queryParams.deptId = deptId;
      console.log("deptId:",deptId)
    },
    // 表单重置
    reset() {
      this.form = {
        city: null,
        companyName: null,
        createBy: null,
        createTime: null,
        customerNeeds: null,
        deptId: null,
        deptName:null,
        dianmianAddress: null,
        district: null,
        experience: null,
        genjinDate:null,
        genjinStatus:null,
        id:null,
        inputDate: null,
        isAsc: null,
        keywords: null,
        level:null,
        luruName:null,
        name: null,
        num:null,
        orderBy: null,
        orderByColumn:null,
        pageNum: null,
        pageSize: null,
        params: null,
        phone: null,
        province:null,
        remark: null,
        resource: null,
        searchValue: null,
        status: null,
        updateBy: null,
        updateDate: null,
        updateTime:null,
        userId:null,
        username: null,
      };
      // this.resetForm("form");
    },
    /** 查询客户线索列表 */
    getList() {
      this.loading = true;
      listXiansuo(this.queryParams).then(response => {
        this.xiansuoList = response.rows;
        console.log('this.xiansuoList',this.xiansuoList)
        this.total = response.total;
        this.loading = false;
      });
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
      console.log('this.form.managerId',this.form.managerId)
      console.log('this.form.deptId',this.form.deptId)
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
    // 线索来源字典翻译
    resourceFormat(row, column) {
      return this.selectDictLabel(this.resourceOptions, row.resource);
    },
    // 跟进状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.genjinStatus);
    },
    // 中介经验字典翻译
    experienceFormat(row, column) {
      return this.selectDictLabel(this.experienceOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.dialog.dialogaddxiansuo = false;
      this.reset();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
        (this.queryParams.inputDateStart = this.inputDate?this.inputDate[0]:null),
        (this.queryParams.inputDateEnd = this.inputDate?this.inputDate[1]:null);
      this.getList();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    // /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      console.log('this.formthis.form',this.form)
      this.getdeptuser();
      this.getManager()
      this.dialog.dialogaddxiansuo = true;
    },
    /** 新增提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.status = "0";
          addCustomer(this.form)
            .then(response => {
              this.$message.success("新增成功");
              this.dialog.dialogaddxiansuo = false;
              this.getList();
            })
            .catch(error => {
              this.$message.error("新增失败");
            });
        }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有客户线索数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportXiansuo(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        });
    },
    // 转成客户按钮
    handletocustomer() {
      this.getdeptuser()
      this.dialog.dialogtocustomer = true;
      this.reset();
      var aaa = this.xiansuoList.filter(item => {
        return item.id === this.ids[0];
      });
      this.form = JSON.parse(JSON.stringify(aaa[0]));
      this.form.deptId = this.user.deptId
      this.$nextTick(()=>{
        this.$refs.myphone.fromFatherphone()
      })
      this.form.ids =  this.ids
      this.toPlace();
    },
    // 转成客户提交
    submitTocustomer() {
      this.$refs["form"].validate(valid => {
          transfortoCustomer(this.form)
          .then(res => {
            this.$message.success("操作成功");
            this.dialog.dialogtocustomer = false;
            this.getList();
          })
          .catch(error => {
            this.$message.error("操作失败");
          });
      });
    },
    // 导入数据
    getMyExcelData(data) {
      var data = data;
      importXiansuo(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
//.search .liandong{
//    /deep/ .el-input__inner{
//        width:115px;
//        height: 32px;
//    }
//}
</style>
