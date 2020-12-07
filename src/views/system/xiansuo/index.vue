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
           <el-select
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
        </el-select>
        <!-- <el-autocomplete
          class="inline-input"
          v-model="keywords"
          :fetch-suggestions="querySearch"
          placeholder="请选择负责人"
          :trigger-on-focus="false"
          @select="handleSelect"
          clearable
        ></el-autocomplete> -->
        <!-- <el-input
          v-model="queryParams.name"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        /> -->
      </el-form-item>
      <el-form-item>
          <Liandong class='liandong' @placeInfo="getPlace" :toSon="toplace"></Liandong>
      </el-form-item>
      <!-- <el-form-item prop="sysUserId">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入负责人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          <input-excel @getResult="getMyExcelData"></input-excel>
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
      <el-table-column label="客户姓名" align="center" prop="name">
        <template slot-scope="obj">
          <el-button
            @click="
              $router.push({
                path: '/xiansuo/xiansuoitem',
                query: { id: obj.row.id }
              })
            "
            size="small"
            type="text"
            >{{ obj.row.name }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="客户电话" align="center" prop="phone[0]" />
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
        <el-form-item label="客户电话" prop="phone">
          <el-input
            style="width:90%"
            v-model="customerPhone[0]"
            placeholder="请输入客户电话"
          />
          <i
            class="el-icon-circle-plus"
            style="font-size:30px;margin-left:10px;"
            @click="addPhone()"
          ></i>
        </el-form-item>
        <el-form-item>
          <div v-for="(item, index) in customerPhone" :key="index">
            <el-input
              style="width:90%"
              v-model="customerPhone[index + 1]"
              placeholder="请输入客户电话"
            />
            <i
              class="el-icon-remove"
              style="font-size:30px;margin-left:10px;"
              @click="decreasePhone(index)"
            ></i>
          </div>
        </el-form-item>
        <el-form-item label="客户地区">
          <Liandong @placeInfo="getPlace"></Liandong>
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
        <el-form-item label="负责人">
          <el-autocomplete
            style="width:100%"
            class="inline-input"
            v-model="keywords"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="所属部门" prop="dept">
          <el-input disabled v-model="deptName" placeholder="请输入所属部门" />
        </el-form-item>
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
        <el-form-item label="客户电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话" />
        </el-form-item>
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
          <Liandong @placeInfo="getPlace" :toSon="toplace"></Liandong>
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
        <el-form-item label="负责人">
          <el-autocomplete
            style="width:100%"
            class="inline-input"
            v-model="keywords"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="所属部门" prop="dept">
          <el-input disabled v-model="deptName" placeholder="请输入所属部门" />
        </el-form-item>
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
import Liandong from "@/components/Liandong/liandong.vue";
import {
  listCustomer,
  addCustomer,
  transforCustomer
} from "@/api/system/customer";
import { listUser } from "@/api/system/user";
import inputExcel from "@/views/components/importexcel";
import { arrAll } from "../../../components/Liandong/cities";
import { getInfo } from "@/api/login";
export default {
  name: "Xiansuo",
  data() {
    return {
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
  components: {
    Liandong,
    "input-excel": inputExcel
  },
  created() {
    this.getList();
    // 客户来源字典
    this.getDicts("sys_customer_resource").then(response => {
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
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        phone: null,
        companyId: null,
        province: null,
        city: null,
        resource: null,
        sysUserId: null,
        isCustomer: null,
        createTime: null,
        updateTime: null,
        username: null,
        companyName: null,
        remark: null,
        ids: null,
        level: null,
        customerNeeds: null,
        dianmianAddress: null,
        status: null,
        experience: null,
        genjinStatus: null,
      };
      this.resetForm("form");
    },
    /** 查询客户线索列表 */
    getList() {
      this.loading = true;
      listXiansuo(this.queryParams).then(response => {
        this.xiansuoList = response.rows;
        this.xiansuoList.forEach(item => {
          item.phone = item.phone.split(",");
        });
        this.total = response.total;
        this.loading = false;
      });
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
        (this.queryParams.inputDateStart = this.inputDate ? this.inputDate[0] : null ),
        (this.queryParams.inputDateEnd = this.inputDate ? this.inputDate[1] : null);
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
      this.getdeptuser();
      this.dialog.dialogaddxiansuo = true;
    },
    /** 新增提交按钮 */
    submitForm() {
      this.handlePhone();
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

      //   this.$refs["form"].validate(valid => {
      //     if (valid) {
      //       if (this.form.id != null) {
      //         updateXiansuo(this.form).then(response => {
      //           this.msgSuccess("修改成功");
      //           this.open = false;
      //           this.getList();
      //         });
      //       } else {
      //         addXiansuo(this.form).then(response => {
      //           this.msgSuccess("新增成功");
      //           this.open = false;
      //           this.getList();
      //         });
      //       }
      //     }
      //   });
    },
     // 直接显示当前负责人和部门
    getdeptuser() {
      getInfo().then(res => {
        this.form.username = res.user.userName;
        this.keywords = res.user.userName;
        this.deptName = res.user.dept.deptName;
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
      this.reset();
      var aaa = this.xiansuoList.filter(item => {
        return item.id === this.ids[0];
      });
      this.form = aaa[0];
      this.getdeptuser();
      this.toPlace();
    //   this.handlePhone();
      this.form.phone=this.form.phone.toString()
      this.dialog.dialogtocustomer = true;
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
      this.queryParams.userId=item.id
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
    // 添加电话号码
    addPhone() {
      this.customerPhone.push("");
    },
    // 删除电话号码
    decreasePhone(i) {
      this.customerPhone.splice(i + 1, 1);
      console.log("this.customerPhone", this.customerPhone);
    },
    // 处理电话号码格式
    handlePhone() {
      this.form.phone = this.customerPhone.toString();
    },
    // 导入数据
    getMyExcelData(data) {
      console.log("import", data);
      var data = data;
      importXiansuo(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.search .el-input {
  width: 150px;
}
.search .el-select {
  width: 150px;
}
.search .el-autocomplete{
    width: 150px;
    /deep/  .el-input__inner{
      height: 32px;
    }
}
.search .datepicker{
    margin-top:2px;
    height: 32px;
    width: 250px;
    /deep/.el-date-editor--daterange .el-input__inner{
        width: 150px;
    }
}
.liandong{
    /deep/ .el-input__inner{
        width:105px;
        height: 32px;
    }
}

</style>
