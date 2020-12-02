<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name">{{ xiansuoList.name }}</span>
        <el-button size="small" type="primary" plain>{{ xiansuoList.status }}</el-button>
        <el-button size="small" @click="handletocustomer" type="primary">转成客户</el-button>
      </div>
      <div class="header_bottom">
        <div class="title_name" style="font-size:20px" v-for='(item,index) in xiansuoList.phone' :key='index'>
          {{item}}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main_left">
        <div class="tab_style">
          客户信息
        </div>
        <GeminiScrollbar
      class="my-scroll-bar">
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
            <span>{{xiansuoList.experience | experienceFormat }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户来源：</span>
            <span>{{ xiansuoList.resource }}</span>
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
        <div class="main_right_top" style="overflow:hidden">
          <div class="tab_style fl">
            客户跟进
          </div>
          <el-button type="primary" class="fr" @click="goSecond"
            >写跟进</el-button
          >
        </div>
        <Follow ref="follow" :tofollow='xiansuoList'></Follow>
      </div>
    </div>
    <!-- 转成客户dialog弹出 -->
    <el-dialog title="转成客户" :visible.sync="dialogrollout" width="650px">
      <el-form :model="form" label-position="left" label-width="80px">
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="客户电话" prop="name">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="客户等级">
          <el-select
            style="width:100%"
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
            style="width:100%"
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
          <Liandong @placeInfo="getPlace"></Liandong>
        </el-form-item>
        <el-form-item label="客户公司">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="店面地址">
          <el-input v-model="form.dianmianAddress"></el-input>
        </el-form-item>
        <el-form-item label="中介经验" prop="experience">
          <el-select
            style="width:100%"
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
        <el-form-item label="负责人">
          <el-autocomplete
            style='width:100%'
            class="inline-input"
            v-model="transforKeywords"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="所属部门" prop="phone">
          <el-input disabled v-model="deptName" placeholder="请输入电话" />
        </el-form-item>
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
import Liandong from "@/components/Liandong/liandong.vue";
export default {
  data() {
    return {
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
      genjinStatus: [], //跟进状态字典
      levelOptions: [], //客户等级字典
      userneedOptions: [], //客户需求字典
      experienceOptions:[],  //中介经验字典
    //   字典end
      showGenjin: "跟进",
      form: {}
    };
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:rgb(242, 242, 242)");
  },
  components: {
    Liandong,
    Follow
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  created() {
    this.getList();
    //   获取跟进状态字典
    this.getDicts("customer_genjin").then(response => {
      this.genjinStatus = response.data;
    });
    // 获取客户等级字典
    this.getDicts("customer_level").then(response => {
      this.levelOptions = response.data;
    });
    // 获取客户需求字典
    this.getDicts("sys_user_need").then(response => {
      this.userneedOptions = response.data;
    });
    // 获取客户需求字典
    this.getDicts("experience").then(response => {
      this.experienceOptions = response.data;
    });
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
        luruName:null,
        name: null,
        num: null,
        params:null,
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
        experience:null
      };
      this.resetForm("form");
    },
    /** 查询当前客户线索列表 */
    getList() {
      getXiansuo(this.id).then(response => {
        this.xiansuoList = response.data;
        this.xiansuoList.phone=this.xiansuoList.phone.split(',')
        console.log('this.xiansuoList.phone',this.xiansuoList.phone)
      });
    },
    // 客户等级字典
    levelFormat(row, column) {
          console.log('row', row)
      return this.selectDictLabel(this.levelOptions, row.resource);
    },
     // 中介经验字典
    experienceFormat(row,column){
        console.log('row',row)
       return this.selectDictLabel(this.experienceOptions, row.status);
    },
    // 转成客户按钮
    handletocustomer() {
      this.reset();
      this.dialogrollout = true;
      this.form = this.xiansuoList;
      console.log('this.form',this.form)
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
    // 负责人查询
    handleSelect(item) {
      var item = item.value;
      item = item.substring(0, 11);
      this.transforphone = item;
      this.userInfo();
    },
    // 负责人查询
    querySearch(queryString, callback) {
      const keywords = this.transforKeywords;
      var params = {
        keywords: keywords
      };
      transforCustomer(params).then(response => {
        var restaurants = response.rows;
        console.log("eeeeeeeeeeeeeeee", restaurants);
        const list = [];
        //封装要显示的数据
        for (let v of restaurants) {
          list.push({ value: v.phonenumber + " " + v.userName });
        }
        // 调用 callback 返回建议列表的数据,是一个数组类型
        callback(list);
      });
    },
    // 获取user用户信息
    userInfo() {
      listUser({}).then(response => {
        this.user = response.rows;
        var a = this.user.filter(item => {
          if (this.transforphone === item.phonenumber) {
            return item;
          }
        });
        var b = [];
        for (var i = 0; i < a.length; i++) {
          var c = a[i].dept;
          b.push(c.deptName);
        }
        this.deptName = b[0];
      });
    },
    goSecond() {
      //这是操作follow子组件的方法
    this.$refs.follow.handleAdd()
    },
  }
};
</script>

<style lang="scss" scoped>
.el-form{
      margin:0 20px;
  }
  </style>
