<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name">{{ xiansuoList.name }}</span>
        <el-button v-if="this.dict.genjinStatusLable" size="small" type="primary" plain>{{
            this.dict.genjinStatusLable
        }}</el-button>
        <el-button size="small" @click="handletocustomer" type="primary"
          >转成客户</el-button
        >
      </div>
      <div class="header_bottom">
        <div class="title_name"
             style="font-size: 20px">{{xiansuoList.phone}}</div>
      </div>
    </div>
    <div class="main">
      <div class="main_left" >
        <div class="tab_style">客户信息</div>
        <GeminiScrollbar class="my-scroll-bar">
          <div class="main_content_top">
            <p class="main_content_name">
              <span class="main_content_firstname">地区：</span>
              <span
                >{{ xiansuoList.province }} {{ xiansuoList.city }}
                {{ xiansuoList.district }}</span
              >
            </p>
            <p class="main_content_name">
              <span class="main_content_firstname">公司：</span>
              <span>{{ xiansuoList.companyName }}</span>
            </p>
            <p class="main_content_name">
              <span class="main_content_firstname">店面地址：</span>
              <span>{{ xiansuoList.dianmianAddress }}</span>
            </p>
            <p class="main_content_name">
              <span class="main_content_firstname">中介经验：</span>
              <span>{{ this.dict.experienceLable }}</span>
            </p>
            <p class="main_content_name">
              <span class="main_content_firstname">客户来源：</span>
              <span>{{ this.dict.resourceLable }}</span>
            </p>
            <p class="main_content_name">
              <span class="main_content_firstname">备注：</span>
              <span>{{ xiansuoList.remark }}</span>
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
        </GeminiScrollbar>
      </div>
      <div class="main_right">
        <div class="main_right_top" style="overflow: hidden">
          <div class="tab_style fl">客户跟进</div>
          <el-button type="primary" class="fr" @click="goSecond"
            >写跟进</el-button
          >
        </div>
             <Follow ref="follow" :tofollow="xiansuoList"></Follow>
      </div>
    </div>
    <!-- 转成客户dialog弹出 -->
    <el-dialog title="转成客户" :visible.sync="dialogrollout" width="650px">
      <el-form :model="form" label-position="left" label-width="80px">
        <el-form-item required label="客户姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <Phone ref="myphone" @stringPhone="i=>this.form.phone=i" :toSon="this.form.phone"/>
        <el-form-item label="客户等级">
          <el-select
            style="width: 100%"
            v-model="form.level"
            placeholder="请选择客户等级"
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
            style="width: 100%"
            v-model="form.customerNeeds"
            placeholder="请选择客户需求"
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
          <Area  @place-info="getPlace" :toSon="toplace"/>
        </el-form-item>
        <el-form-item label="客户公司">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="店面地址">
          <el-input v-model="form.dianmianAddress"></el-input>
        </el-form-item>
        <el-form-item label="中介经验" prop="experience">
          <el-select
            style="width: 100%"
            v-model="form.experience"
            placeholder="请选择中介经验"
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogrollout = false">取 消</el-button>
        <el-button type="primary" @click="submitToCustomer">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getXiansuo, listXiansuo } from "@/api/system/xiansuo";
import { updateCustomer } from "@/api/system/customer";
import Follow from "@/views/components/Sosoitem/follow.vue";
import { transforcustomer, transforCustomer } from "@/api/system/customer";
import { listUser } from "@/api/system/user";
import { getInfo } from "@/api/login";
export default {
  data() {
    return {
      //  传给省市区
      toplace: {
        province: "",
        city: "",
        district: ""
      },
      //   所属部门
      deptName: "",
      // 要转移的电话号码
      transforphone: "",
      // 转移关键词
      transforKeywords: "",
      id: this.$route.query.id, // 当前id
      xiansuoList: [], // 当前线索列表
      systemuser: [], //系统信息
      dialogrollout: false, //转成客户按钮
      //   字典start
      genjinOptions: [], //跟进状态字典
      levelOptions: [], //客户等级字典
      userneedOptions: [], //客户需求字典
      experienceOptions: [], //中介经验字典
      //   字典end
      showGenjin: "跟进",
      form: {},
      filter: {
        value: "",
        label: ""
      },
      dict: {
        genjinStatusLable: null,
        levelLable: null,
        needLable: null,
        experienceLable: null,
        resourceLable: null
      }
    };
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:rgb(242, 242, 242)");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  components: {
    Follow
  },
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    // 表单重置
    reset() {
      this.form = {
        city: null,
        companyName: null,
        createBy: null,
        createTime: null,
        customerNeeds: null,
        deptId: null,
        dianmianAddress: null,
        district: null,
        experience: null,
        genjinDate: null,
        id: null,
        inputDate: null,
        keywords: null,
        level: null,
        luruName: null,
        name: null,
        num: null,
        params: null,
        phone: null,
        province: null,
        remark: null,
        resource: null,
        searchValue: null,
        status: null,
        updateBy: null,
        updateDate: null,
        updateTime: null,
        userId: null,
        username: null,
        transforphone: null,
        transforKeywords: null,
        genjinStatus: null
      };
      this.resetForm("form");
    },
    /** 查询当前客户线索列表 */
    getList() {
      getXiansuo(this.id).then(response => {
        this.xiansuoList = response.data;
        this.getdicts();
      });
    },
    getdicts() {
      //   获取跟进状态字典
      this.getDicts("customer_genjin").then(response => {
        this.genjinOptions = response.data;
        var a = this.genjinOptions.filter(item => {
          return item.dictValue === this.xiansuoList.genjinStatus;
        });
        this.dict.genjinStatusLable = a[0].dictLabel;
      });
      // 获取客户等级字典
      this.getDicts("customer_level").then(response => {
        this.levelOptions = response.data;
        var a = this.levelOptions.filter(item => {
          return item.dictValue === this.xiansuoList.level;
        });
        this.dict.levelLable = a[0].dictLabel;
      });
      // 获取客户需求字典
      this.getDicts("sys_user_need").then(response => {
        this.userneedOptions = response.data;
        var a = this.userneedOptions.filter(item => {
          return item.dictValue === this.xiansuoList.customerNeeds;
        });
        this.dict.needLable = a[0].dictLabel;
      });
      // 获取中介经验字典
      this.getDicts("experience").then(response => {
        this.experienceOptions = response.data;
        var a = this.experienceOptions.filter(item => {
          return item.dictValue === this.xiansuoList.experience;
        });
        this.dict.experienceLable = a[0].dictLabel;
      });
      // 获取客户来源字典
      this.getDicts("sys_customer_resource").then(response => {
        this.experienceOptions = response.data;
        var a = this.experienceOptions.filter(item => {
          return item.dictValue === this.xiansuoList.resource;
        });
        this.dict.resourceLable = a[0].dictLabel;
      });
    },
    // 客户等级字典
    levelFormat(row, column) {
      console.log("this.column", column);
      console.log("this.row", row);
      return this.selectDictLabel(this.levelOptions, row.resource);
    },
    // 中介经验字典
    experienceFormat(row, column) {
      return this.selectDictLabel(this.experienceOptions, row.status);
    },
    // 转成客户按钮
    handletocustomer() {
      this.reset();
      this.form = JSON.parse(JSON.stringify(this.xiansuoList));
      console.log("this.form", this.form);
      this.getdeptuser();
      this.toPlace();
      this.$nextTick(()=>{
        this.$refs.myphone.fromFatherphone()
      })
      this.dialogrollout = true;
    },
    // 转成客户提交
    submitToCustomer() {
      this.form.status = "1";
      //   this.xiansuoList.genjinDate = null;
      updateCustomer(this.form)
        .then(res => {
          window.history.back(-1);
          this.$message.success("转移成功");
          this.dialogrollout = false;
        })
        .catch(error => {
          this.$message.error("转移失败");
        });
    },
    getPlace(i, j, k) {
      this.form.province = i;
      this.form.city = j;
      this.form.district = k;
    },
    // 省市区赋值
    toPlace() {
      this.toplace.province = this.form.province;
      this.toplace.city = this.form.city;
      this.toplace.district = this.form.district;
    },
    goSecond() {
      //这是操作follow子组件的方法
      this.$refs.follow.handleAdd();
    },
    // 选择负责人和部门
    getManager(value) {
      this.form.userId = value
    },
    // 显示当前负责人和部门
    getdeptuser() {
      this.$nextTick().then(() => {
        this.$refs.showmanager.showdeptuser()
      })
    },
  }
};
</script>

<style lang="less" scoped>
.el-form {
  margin: 0 20px;
}
.my-scroll-bar{
   height:calc(100vh - 230px ) !important;
   overflow: scroll ;
   &::-webkit-scrollbar {
   	display: none;
   }
}
</style>
