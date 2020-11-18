<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name">{{xiansuoList.name}}</span>
          <el-button type="primary">{{xiansuoList.status  }}</el-button>
        <el-button @click="dialogrollout = true">转成客户</el-button>
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
            <span>{{xiansuoList.level}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户需求：</span>
            <span>{{xiansuoList.customerNeeds}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">地区：</span>
            <span>{{xiansuoList.province}} {{xiansuoList.city}} {{xiansuoList.district}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">公司：</span>
            <span>{{xiansuoList.companyName}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">店面地址：</span>
            <span>{{xiansuoList.dianmianAddress}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">中介经验：</span>
            <span>{{xiansuoList.experience}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户来源：</span>
            <span>{{xiansuoList.resource}}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">备注：</span>
            <span
              >{{xiansuoList.remark}}</span
            >
          </p>
          <div class="line_between"></div>
          <div class="main_title">系统信息</div>
         <p class="main_content_name">
            <span class="main_content_firstname">录入人：</span>
            <span>{{ xiansuoList.luruName }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">负责人：</span>
            <span>{{ xiansuoList.username }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">录入时间：</span>
            <span>{{ xiansuoList.inputDate }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">最新跟进：</span>
            <span>{{ xiansuoList.genjinDate }}</span>
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
    <!-- 转成客户dialog弹出 -->
    <el-dialog title="转成客户" :visible.sync="dialogrollout" width="50%">
      <el-form  label-position="left" label-width="80px">
        <el-form-item label="客户姓名">
          <el-input v-model='xiansuoList.name'></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input v-model='xiansuoList.phone'></el-input>
        </el-form-item>
        <el-form-item label="客户等级">
          <el-select v-model='xiansuoList.level' placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户需求">
          <el-select v-model='xiansuoList.customerNeeds' placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="客户地区">
          <el-input v-model='xiansuoList.district'></el-input>
        </el-form-item>
        <el-form-item label="客户公司">
          <el-input v-model='xiansuoList.companyName'></el-input>
        </el-form-item>
        <el-form-item label="店面地址">
          <el-input v-model='xiansuoList.dianmianAddress'></el-input>
        </el-form-item>
        <el-form-item label="中介经验">
          <el-select v-model='xiansuoList.experience' placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model='xiansuoList.username' placeholder="请选择活动区域">
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
        <el-button @click="dialogrollout = false">取 消</el-button>
        <el-button type="primary" @click="transforToCustomer()"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getXiansuo,listXiansuo} from "@/api/system/xiansuo";
import { updateCustomer} from "@/api/system/customer";
import Follow from "@/views/components/Sosoitem/follow.vue";
export default {
  data() {
    return {   
      id: this.$route.query.id,  // 当前id
      xiansuoList:[],  // 当前线索列表
      systemuser:[],   //系统信息
      dialogrollout: false,  //转成客户按钮
      genjinStatus: [],
      showGenjin: "跟进",
    };
  },
    mounted() {
   document.querySelector('body').setAttribute('style', 'background-color:rgb(242, 242, 242)')
  },
  beforeDestroy() {
   document.querySelector('body').removeAttribute('style')
  },
  created() {
    this.getList()
    //   获取跟进状态字典
    this.getDicts("customer_genjin").then(response => {
      this.genjinStatus = response.data.map(item => {
        return item.dictValue;
      });
    });
  },
  computed: {},
  methods: {
     /** 查询当前客户线索列表 */
    getList() {
      getXiansuo(this.id).then(response => {
        this.xiansuoList = response.data;
        console.log('getXiansuo', this.xiansuoList)
      });
    },
    // 转成客户
    transforToCustomer(){
        this.xiansuoList.status='1'
        this.xiansuoList.genjinDate=null
        updateCustomer(this.xiansuoList).then(res=>{
            //  window.location.href = 'http://localhost/xiansuo/xiansuo';
            window.history.back(-1);
             this.$message.success('转移成功')
             this.dialogrollout=false
        }).catch(error=>{
            this.$message.error('转移失败')
        })
    }
  },
  components: {
    Follow
  }
};
</script>

<style lang="scss" scoped></style>
