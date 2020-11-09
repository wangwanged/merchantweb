<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name fl">{{customerList.name}}</span>
        <div class="circle fl">A</div>
        <el-dropdown >
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
        </el-dropdown>
        <el-button
          size="small"
          type="primary"
          @click="$store.state.sosoitem.dialogNewsign = true"
          >新签合同</el-button
        >
        <el-button size="small">编辑</el-button>
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
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="关联合同" width="120">
            </el-table-column>
            <el-table-column prop="name" label="合同类型" width="120">
            </el-table-column>
            <el-table-column prop="name" label="店面、区域名称" width="120">
            </el-table-column>
            <el-table-column prop="name" label="签约日期" width="120">
            </el-table-column>
            <el-table-column prop="name" label="合同开始日期" width="120">
            </el-table-column>
            <el-table-column prop="name" label="合同结束日期" width="120">
            </el-table-column>
            <el-table-column prop="name" label="负责人"> </el-table-column>
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
            @click="$store.state.sosoitem.dialogfollow = true"
            >写跟进</el-button
          >
        </div>
        <Follow></Follow>
      </div>
    </div>
  </div>
</template>

<script>
import Follow from "@/views/components/Sosoitem/follow";
import {
  listCustomer,
  getCustomer,
  delCustomer,
  addCustomer,
  updateCustomer,
  exportCustomer
} from "@/api/system/customer";
export default {
  data() {
    return {
        // 当前详情页id
      id: this.$route.query.id,
      // 总条数
      total: 0,
      // 我的客户表格数据
      customerList: [],      
    //   跟进状态
      genjinStatus:[],
    //   显示的跟进状态
      showGenjin: "跟进",   
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
    Follow
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
    //   当前页全部数据
    getList() {
      getCustomer(this.id).then(response => {
        this.customerList = response.data;
        console.log(this.customerList)
      });
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
