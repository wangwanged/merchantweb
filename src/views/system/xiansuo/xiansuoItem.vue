<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name">郭富城</span>
        <el-dropdown @command="changeGenjin">
          <el-button type="primary">{{ showGenjin }}</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in genjinStatus"
              :key="index"
              :command="item"
              >{{ item }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
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
            <span>A(重要客户)</span>
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
          <p class="main_content_name">
            <span class="main_content_firstname">中介经验：</span>
            <span>创业小白</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户来源：</span>
            <span>机器人</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">备注：</span>
            <span
              >备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息</span
            >
          </p>
          <div class="line_between"></div>
          <div class="main_title">系统信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">客户等级：</span>
            <span>A(重要客户)</span>
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
    <!-- 转成客户dialog弹出 -->
    <el-dialog title="转成客户" :visible.sync="dialogrollout" width="50%">
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
        <el-button @click="$store.state.sosoitem.dialogfollow = false">取 消</el-button>
        <el-button type="primary" @click="$store.state.sosoitem.dialogfollow = false"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Follow from "@/views/components/Sosoitem/follow.vue";
export default {
  data() {
    return {
      dialogrollout: false,
      genjinStatus: [],
      showGenjin: "跟进",
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
  created() {
    //   获取跟进状态字典
    this.getDicts("customer_genjin").then(response => {
      // console.log(response)
      this.genjinStatus = response.data.map(item => {
        return item.dictValue;
      });
    });
  },
  computed: {},
  methods: {
    changeGenjin(i) {
      this.showGenjin = i;
    }
  },
  components: {
    Follow
  }
};
</script>

<style lang="scss" scoped></style>
