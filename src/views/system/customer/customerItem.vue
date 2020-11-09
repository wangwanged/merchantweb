<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name fl">{{customerList.name}}</span>
        <div class="circle fl">A</div>
        <!-- <el-dropdown >
          <el-button size="small" type="primary"
            >{{ customerList.status }}<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in genjinStatus"
              :key="index"
              :command="item"
              >{{ item }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown> -->
        <el-button 
          size="small"
          type="primary">{{ customerList.status }}</el-button>
        <el-button
          size="small"
          type="primary"
          @click="dialogNewsign = true"
          >新签合同</el-button
        >
        <el-button size="small" @click="handleUpdate(id)">编辑</el-button>
        <el-button size="small">转移</el-button>
        <el-button size="small">失效</el-button>
      </div>
      <div class="header_bottom">
        <el-button size="small">单店加盟</el-button>
        <el-button size="small">待审核</el-button>
        <span>负责人:xxx</span>
      </div>
    </div>

    <div class="main">
      <div class="main_left">
        <div class="tab_style">
          客户信息
        </div>
        <div class="main_content_top">
          <p class="main_content_name">
            <span class="main_content_firstname">客户等级：</span>
            <span>{{customerList.level}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户需求：</span>
            <span>{{customerList.customerNeeds}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">地区：</span>
            <span>{{customerList.province}} {{customerList.city}} {{customerList.district}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">公司：</span>
            <span>{{customerList.companyName}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">店面地址：</span>
            <span>{{customerList.dianmianAddress}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">中介经验：</span>
            <span>{{customerList.experience}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户来源：</span>
            <span>{{customerList.resource}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">备注：</span>
            <span
              >{{customerList.remark}}</span
            >
          </p>
          <div class="line_between"></div>
          <div class="main_title">合同信息</div>
          <el-table :data="contractList" style="width: 100%">
            <el-table-column prop="num" label="关联合同" width="120">
            </el-table-column>
            <el-table-column prop="type" label="合同类型" width="120">
            </el-table-column>
            <el-table-column prop="dianmianName" label="店面、区域名称" width="120">
            </el-table-column>
            <el-table-column prop="signDate" label="签约日期" width="120">
            </el-table-column>
            <el-table-column prop="beginDate" label="合同开始日期" width="120">
            </el-table-column>
            <el-table-column prop="endDate" label="合同结束日期" width="120">
            </el-table-column>
            <el-table-column prop="manager" label="负责人"> </el-table-column>
          </el-table>
          <div class="main_title">系统信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">录入人：</span>
            <span>{{customerList.luruName}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">负责人：</span>
            <span>{{customerList.username}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">录入时间：</span>
            <span>{{customerList.inputDate}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">最新跟进：</span>
            <span>{{customerList.genjinDate}}</span>
          </p>
        </div>
      </div>
      <div class="main_right">
        <div class="main_right_top" style="overflow:hidden">
          <div class="tab_style fl">
            客户跟进
          </div>
          <el-button
            type="primary"
            class="fr"
            @click="$store.state.sosoitem.customer.dialogfollow = true"
            >写跟进</el-button
          >
        </div>
        <Follow></Follow>
      </div>
    </div>
    <!-- 新签合同弹框 -->
     <el-dialog title="转成客户" :visible.sync="dialogNewsign" width="50%">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="客户姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客户等级">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户需求">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户地区">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客户公司">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="店面地址">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="中介经验">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogfollow = false">取 消</el-button>
        <el-button type="primary" @click="dialogfollow = false"
          >保存</el-button
        >
      </span>
    </el-dialog>
     <!-- 编辑我的客户 -->
     <el-dialog :title="title" :visible.sync="dialogedit" width="500px" append-to-body>
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
          <Liandong @placeInfo="getPlace(arguments)"></Liandong>
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
        <el-button type="primary" @click="dialogedit=false">确 定</el-button>
        <el-button @click="dialogedit=false">取 消</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import Liandong from "@/components/Liandong/liandong.vue";
import Follow from "@/views/components/Sosoitem/follow";
import {
  listCustomer,
  getCustomer,
  delCustomer,
  addCustomer,
  updateCustomer,
  exportCustomer
} from "@/api/system/customer";
import {
  getContractInfo
} from "@/api/contract/contractManager"
export default {
  data() {
    return {
      //  详情新签合同弹框
      dialogNewsign:false,
      // 详情编辑弹框
      dialogedit:false,
      // 详情转移弹框
      dialogTransfor:false,
       //  失效弹框
      dialogeInvalid:false,
        // 新签合同弹框 
      dialogNewsign:false,
        // 当前详情页id
      id: this.$route.query.id,
      // 总条数
      total: 0,
      // 我的客户表格数据
      customerList: [], 
     //   当前客户合同信息
     contractList:[],   
     //   跟进状态
      genjinStatus:[],
     //   显示的跟进状态
      showGenjin: "跟进",  
      form: {}, 
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ]
    };
  },
  components: {
    Follow,
    Liandong
  },
  created() {
    this.getList();
    //   获取跟进状态字典
    this.getDicts("customer_genjin").then(response => {
      this.genjinStatus = response.data.map(item => {
        return item.dictValue;
      });
    });
    this.getDicts("customer_level").then(response => {
        var a = response.data.filter(item=>{
            if(item.dictValue===this.customerList.level){
                return item;
            }
            this.customerList.level=a[0].dictLabel;
        })
    });
    this.getDicts("sys_user_need").then(response => {
       var a = response.data.filter(item=>{
            if(item.dictValue===this.customerList.resource){
                return item
            }
        })
        console.log(a)
        this.customerList.resource=a[0].dictLabel
    });
     this.getDicts("sys_customer_resource").then(response => {
      var a = response.data.filter(item=>{
            if(item.dictValue===this.customerList.customerNeeds){
                return item
            }
        })
        this.customerList.customerNeeds=a[0].dictLabel
    });
  },
  methods: {
     //   获取省市区的地址
    getPlace(i) {
      this.queryParams.province = i[0];
      this.queryParams.city = i[1];
      this.queryParams.district = i[2];
      this.form.province = i[0];
      this.form.city = i[1];
      this.form.district = i[2];
    },
     /** 修改按钮操作 */
    handleUpdate(id) {
      getCustomer(id).then(response => {
        this.form = response.data;
        this.dialogedit = true;
        this.title = "修改我的客户";
      });
    },
    getList() {
        // 获取当前页客户信息
      getCustomer(this.id).then(response => {
        this.customerList = response.data;
        console.log(this.customerList)
      });
    //   获取当前页合同信息
      getContractInfo(this.id).then(response=>{  
          this.contractList=response.rows
          console.log('111111111111111111',this.contractList)
        })
    },
  },
};
</script>

<style lang="scss" scoped>
.circle {
  width: 34px;
  height: 34px;
  background-color: #1890ff;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 34px;
  font-size: 12px;
}
</style>
