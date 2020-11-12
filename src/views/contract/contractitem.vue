<template>
   <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name fl">aaa</span>
        <span class="title_name fl">aaa</span>
        <el-button size="small" type="primary">审核</el-button>
        <el-button size="small" type="primary"
          >续签</el-button
        >
        <el-button size="small" >编辑</el-button>
        <el-button size="small" >转移</el-button>
        <el-button size="small" >解约</el-button>
        <el-button size="small" >失效</el-button>
      </div>
      <div class="header_bottom">
        <el-button size="small">单店加盟</el-button>
        <el-button size="small" style='margin-right:15px'>待审核</el-button>
        <span style='font-size:13px'>负责人：某某某</span>
      </div>
    </div>
   <el-tabs  type="card">
    <el-tab-pane label="合同信息" name="first"> 
    <div class="main">
      <div class="main_left" style='width:100%'>
        <div class="main_content_top">
        <div class="main_title">客户信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">客户姓名：</span>
            <span>{{contractList.customerName}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户电话：</span>
            <span>{{contractList.customerPhone}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">合同类型：</span>
            <el-button size='small'>{{contractList.type}}</el-button>
          </p>
          <div class="main_title">合同信息</div>
          <el-table  style="width: 100%">
            <el-table-column  label="关联合同" width="120">
            </el-table-column>
            <el-table-column  label="合同类型" width="120">
            </el-table-column>
            <el-table-column
              label="店面、区域名称"
              width="120"
            >
            </el-table-column>
            <el-table-column  label="签约日期" width="120">
            </el-table-column>
            <el-table-column  label="合同开始日期" width="120">
            </el-table-column>
            <el-table-column  label="合同结束日期" width="120">
            </el-table-column>
            <el-table-column  label="负责人"> </el-table-column>
          </el-table>

          <div class="main_title">店面/区域信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">店面名称：</span>
            <span>{{contractList.dianmianName}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">所属区域：</span>
            <span>{{contractList.dianmianProvince}} {{contractList.dianmianCity}} {{contractList.dianmianDistrict}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">详细地址：</span>
            <span>{{contractList.dianmianAddress}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">地址坐标：</span>
            <span>{{contractList.dianmianLatitude}}    {{contractList.dianmianLongitude}}</span>
          </p>
          <div class="main_title">财务信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">加盟费：</span>
            <span>xxx</span>
          </p>
           <p class="main_content_name">
            <span class="main_content_firstname">运营管理费：</span>
            <span>xxx</span>
          </p>
           <p class="main_content_name">
            <span class="main_content_firstname">系统使用费：</span>
            <span>xxx</span>
          </p>
           <p class="main_content_name">
            <span class="main_content_firstname">系统维护费：</span>
            <span>xxx</span>
          </p>
           <p class="main_content_name">
            <span class="main_content_firstname">办件费：</span>
            <span>xxx</span>
          </p>
           <p class="main_content_name">
            <span class="main_content_firstname">履约保证见：</span>
            <span>xxx</span>
          </p>
           <p class="main_content_name">
            <span class="main_content_firstname">经营管理费：</span>
            <span>xxx</span>
          </p>
          <div class="main_title">备注信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">备注信息：</span>
            <span>{{contractList.remark}}</span>
          </p>
          <div class="main_title">系统信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">备注信息：</span>
            <span>xxx</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">负责人：</span>
            <span>{{contractList.manager}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">创建时间：</span>
            <span>{{contractList.signDate}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">审核时间：</span>
            <span>xxx</span>
          </p>
        </div>
      </div>
    </div></el-tab-pane>
    <el-tab-pane label="费用信息" name="second">费用信息</el-tab-pane>
    <el-tab-pane label="合同附件" name="third">合同附件</el-tab-pane>
    <el-tab-pane label="开店信息" name="fourth" ><el-button @click='getRelatedcontract'>sss</el-button></el-tab-pane>
  </el-tabs>
   
  </div>
</template>

<script>
import { listContractManager, getContractManager, delContractManager, addContractManager, updateContractManager, exportContractManager ,relatedContract} from "@/api/contract/contractManager";
export default {
   data(){
       return {
         id: this.$route.query.id,  //当前详情页id
         contractList:[],   //当前合同列表
         rootNum:null   //合同根编号
       }
   },
   created(){
      this.getList()
      this.getRelatedcontract()
   },
   methods:{
    //   获取合同列表
    getList(){
      getContractManager(this.id).then(response => {
         this.contractList=response.data
         this.rootNum=response.data.rootNum
      });
    },
    // 获取关联合同
    getRelatedcontract(){
        console.log(this.rootNum)
        // relatedContract(this.rootNum).then(res=>{
           
        // })
    }
   },
}
</script>

<style lang='less' scoped>
.el-tabs--top{
    width: 50%;
}
.el-tabs__nav{
    width: 50%;
}
</style>