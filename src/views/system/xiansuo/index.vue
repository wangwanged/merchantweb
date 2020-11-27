<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item  prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <Liandong @placeInfo="getPlace(arguments)"></Liandong>
      <el-form-item  prop="resource">
        <el-select v-model="queryParams.resource" placeholder="请选择线索来源" clearable size="small">
          <el-option
            v-for="dict in resourceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item  prop="sysUserId">
        <el-input
          v-model="queryParams.sysUserId"
          placeholder="请输入负责人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="createTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item  prop="updateTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.updateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择最新跟进时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          :disabled="single"
          @click=" handletocustomer"
          v-hasPermi="['system:xiansuo:export']"
        >转成客户</el-button>
      </el-col>
      <div class='fr'>
        <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:xiansuo:add']"
        >新增线索</el-button>
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
        >导出</el-button>
      </el-col>
      </div>   
    </el-row>
    <el-table v-loading="loading" :data="xiansuoList" @selection-change="handleSelectionChange">
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
      <el-table-column label="客户电话" align="center" prop="phone" />
      <el-table-column label="客户公司" align="center" prop="companyName" />
      <el-table-column label="客户地区" align="center">
          <template slot-scope="obj">
              {{obj.row.province}}-{{obj.row.city}}
          </template>
      </el-table-column>
       <el-table-column label="跟进状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="线索来源" align="center" prop="resource" :formatter="resourceFormat" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inputDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最新跟进时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.genjinDate, '{y}-{m}-{d}') }}</span>
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
    <!-- 添加或修改客户线索对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入客户姓名" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话" />
        </el-form-item>
        <Liandong @placeInfo="getPlace(arguments)"></Liandong>
        <el-form-item label="城市" prop="companyId">
          <el-select v-model="form.companyId" placeholder="请选择城市">
            <el-option
              v-for="dict in companyIdOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省" prop="province">
          <el-select v-model="form.province" placeholder="请选择省">
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
        <el-form-item label="负责人" prop="sysUserId">
          <el-input v-model="form.sysUserId" placeholder="请输入负责人" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 转成客户弹框 -->
    <el-dialog title="转成客户" :visible.sync="dialog.dialogtocustomer" width="500px">
       <el-form label-width="80px">
            <el-form-item label="客户姓名" prop="name">
          <el-input v-model="tocustomerInfo.name" placeholder="请输入客户姓名" />
        </el-form-item>
        <el-form-item label="客户电话" prop="phone">
          <el-input v-model="tocustomerInfo.phone" placeholder="请输入电话" />
        </el-form-item>
          <el-form-item label="客户等级" prop="name">
          <el-input v-model="tocustomerInfo.level" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="客户需求" prop="phone">
          <el-input v-model="tocustomerInfo.customerNeeds" placeholder="请输入" />
        </el-form-item>
          <el-form-item label="客户地区" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="客户公司" prop="phone">
          <el-input v-model="tocustomerInfo.companyName" placeholder="请输入" />
        </el-form-item>
          <el-form-item label="店面地址" prop="name">
          <el-input v-model="tocustomerInfo.dianmianAddress" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="中介经验" prop="phone">
          <el-input v-model="tocustomerInfo.experience" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="负责人">
            <el-autocomplete
            class="inline-input"
            v-model="transforKeywords"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
    ></el-autocomplete>
        </el-form-item>
        <el-form-item label="所属部门" prop="phone">
          <el-input disabled v-model='deptName'  placeholder="请输入电话" />
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
import { listXiansuo, getXiansuo, delXiansuo, addXiansuo, updateXiansuo, exportXiansuo, transfortoCustomer,importXiansuo} from "@/api/system/xiansuo";
import Liandong from "@/components/Liandong/liandong.vue";
import {transforCustomer} from "@/api/system/customer";
import { listUser } from "@/api/system/user";
import inputExcel from '@/views/components/importexcel'
import { arrAll } from '../../../components/Liandong/cities';
export default {
  name: "Xiansuo",
  data() {
    return {
    //   所属部门
      deptName:'',
     // 要转移的电话号码
      transforphone:'',
        // 转移关键词
      transforKeywords:'',
    //   转成客户字段
      tocustomerInfo:[],
      dialog:{
        dialogtocustomer:false,
      },
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
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 城市字典
      companyIdOptions: [],
      // 省字典
      provinceOptions: [],
      // 城市字典
      cityOptions: [],
      // 线索来源字典
      resourceOptions: [],
      //  跟进状态字典
      statusOptions:[],
      // 查询参数s
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
        updateTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "客户姓名不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" }
        ],
        companyId: [
          { required: true, message: "城市不能为空", trigger: "change" }
        ],
        province: [
          { required: true, message: "省不能为空", trigger: "change" }
        ],
        city: [
          { required: true, message: "城市不能为空", trigger: "change" }
        ],
        resource: [
          { required: true, message: "线索来源不能为空", trigger: "change" }
        ],
        sysUserId: [
          { required: true, message: "负责人不能为空", trigger: "blur" }
        ],
        isCustomer: [
          { required: true, message: "是否线索变为客户(0：否，1：是)不能为空", trigger: "blur" }
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
   components: {
    Liandong,
    'input-excel':inputExcel
  },
  created() {
    this.getList();
    this.getDicts("sys_company").then(response => {
      this.companyIdOptions = response.data;
    });
    this.getDicts("sys_province").then(response => {
      this.provinceOptions = response.data;
    });
    this.getDicts("sys_company").then(response => {
      this.cityOptions = response.data;
    });
    this.getDicts("sys_customer_resource").then(response => {
      this.resourceOptions = response.data;
    });
    this.getDicts("customer_genjin").then(response => {
      this.statusOptions = response.data
    });
  },
  methods: {
    /** 查询客户线索列表 */
    getList() {
      this.loading = true;
      listXiansuo(this.queryParams).then(response => {
        this.xiansuoList = response.rows;
        console.log(this.xiansuoList)
        this.total = response.total;
        this.loading = false;
      });
    },
    getPlace(i) {
      this.queryParams.province = i[0];
      this.queryParams.city = i[1];
      this.queryParams.district = i[2];
      this.form.province = i[0];
      this.form.city = i[1];
      this.form.district = i[2];
    },
    // 城市字典翻译
    companyIdFormat(row, column) {
      return this.selectDictLabel(this.companyIdOptions, row.companyId);
    },
    // 省字典翻译
    provinceFormat(row, column) {
      return this.selectDictLabel(this.provinceOptions, row.province);
    },
    // 城市字典翻译
    cityFormat(row, column) {
      return this.selectDictLabel(this.cityOptions, row.city);
    },
    // 线索来源字典翻译
    resourceFormat(row, column) {
      return this.selectDictLabel(this.resourceOptions, row.resource);
    },
    // 跟进状态字典
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
        name: null,
        phone: null,
        companyId: null,
        province: null,
        city: null,
        resource: null,
        sysUserId: null,
        isCustomer: null,
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
      this.title = "添加客户线索";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateXiansuo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addXiansuo(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有客户线索数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportXiansuo(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    },
    // 转成客户按钮
    handletocustomer(){
        this.dialog.dialogtocustomer=true
        var aaa =this.xiansuoList.filter(item=>{
           return item.id===this.ids[0]
        })
        this.tocustomerInfo = aaa[0]
        this.userInfo()
    },
    // 转成客户提交
    submitTocustomer(){   
        var params ={
            ids:this.ids,
            name:this.tocustomerInfo.name,
            phone: this.tocustomerInfo.phone,
            level: this.tocustomerInfo.level,
            resource: this.tocustomerInfo.resource,
            city: this.tocustomerInfo.city,
            companyName: this.tocustomerInfo.companyName,
            customerNeeds:this.tocustomerInfo.customerNeeds,
            dianmianAddress: this.tocustomerInfo.dianmianAddress,
            district: this.tocustomerInfo.district,
            province: this.tocustomerInfo.level,
            status: this.tocustomerInfo.level,
            experience:this.tocustomerInfo.experience,
            username:this.tocustomerInfo.username,
        }
        transfortoCustomer(params).then(res=>{
             
        })
    },
    // 负责人查询
    handleSelect(item) {
        console.log(item)
        var item = item.value
        item=item.substring(0,11);
        this.transforphone=item
        this. userInfo()
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
    // 导入数据
    getMyExcelData(data){
        console.log('import',data)
        var data = data
        importXiansuo(data).then(res=>{
           console.log(res)
        })
      }
  }
};
</script>
