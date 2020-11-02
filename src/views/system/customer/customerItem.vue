<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name fl">郭富城</span>
        <div class="circle fl">A</div>
        <el-dropdown @command="changeGenjin">
          <el-button size="small" type="primary"
            >{{ showGenjin }}<i class="el-icon-arrow-down el-icon--right"></i
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
            <span class="main_content_firstname">客户等级：</span>
            <span>{{customerList.level}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户需求：</span>
            <span>区域加盟</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">地区：</span>
            <span>河北省 石家庄 长安区</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">公司：</span>
            <span>正大房产</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">店面地址：</span>
            <span>昌黎镇鼓楼东街90号</span>
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
        <Follow></Follow>
      </div>
    </div>
  </div>
</template>

<script>
import Follow from "@/components/Sosoitem/follow";
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
      // 总条数
      total: 0,
      // 我的客户表格数据
      customerList: [],
      genjinStatus: [],
      showGenjin: "跟进",
    //   客户当前id
      id: this.$route.query.id,
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
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
    this.getList()
    //   获取跟进状态字典
    this.getDicts("customer_genjin").then(response => {
      // console.log(response)
      this.genjinStatus = response.data.map(item => {
        return item.dictValue;
      });
    });
  },
  methods: {
    //   跳转后的数据
    getList() {
         this.customerList=this.$store.state.sosoitem.customerList
         this.customerList=this.customerList.filter((item)=>{
             return   item.id===this.id
         })[0]
     }
  },
  computed:{
     
  }
}
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
