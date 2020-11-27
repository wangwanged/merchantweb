<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name fl">{{ dianmianList.name }}</span>
        <el-button plain size="small" type="primary">区域加盟</el-button>
        <el-button plain size="small" type="primary">营业中</el-button>
      </div>
    </div>
    <div class="main">
      <div class="main_left">
        <div class="main_content_top">
          <div class="main_title">店铺信息</div>
          <el-button size="small" type="primary" @click="handledianmianInfo"
            >编辑</el-button
          >
          <p class="main_content_name">
            <span class="main_content_firstname">店面名称：</span>
            <span>{{ dianmianList.name }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">所属区域：</span>
            <span
              >{{ dianmianList.province }} {{ dianmianList.city }}
              {{ dianmianList.district }}</span
            >
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">详细地址：</span>
            <span>{{ dianmianList.area }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">店东姓名：</span>
            <span>{{ dianmianList.diandongName }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">店东电话：</span>
            <span>{{ dianmianList.diandongPhone }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">备注信息：</span>
            <span>{{ dianmianList.remark }}</span>
          </p>
          <div class="main_title">营业状态</div>
          <el-button size='small' type='primary' @click='dialog.dialogyingyeStatus=true'>修改营业状态</el-button>
          <p class="yingye_status">
            <span>{{ dianmianList.diandongPhone }}</span>
            <span>{{ dianmianList.diandongPhone }}</span>
            <span>闭店日期</span>
            <span>{{ dianmianList.diandongPhone }}</span>
            <span>{{ dianmianList.diandongPhone }}</span>
          </p>
          <p class="yingye_status">
            <span>2020-2-2：</span>
            <span>xxx</span>
            <span>停业日期</span>
            <span>2020-2-2</span>
            <span>闭店原因</span>
          </p>
          <div class="main_title">合同信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">对应合同：</span>
            <span>{{ dianmianList.contractNum }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">店面类型：</span>
            <span>{{ dianmianList.type }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">授权区域：</span>
            <span>{{ dianmianList.diandongPhone }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户姓名：</span>
            <span>{{ dianmianList.customer.name }}</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">负责人：</span>
            <span>{{ dianmianList.customer.username }}</span>
          </p>
          <div class="main_title">店面地图</div>
        </div>
      </div>
      <div class="main_right">
        <div class="main_right_top" style="overflow:hidden">
          <div style="overflow:hidden">
            <div class="main_title fl">验收信息(合格/需整改)</div>
            <el-link
              type="primary"
              class="fr"
              style="margin-top:10px;margin-left:300px"
              >查看验收标准</el-link
            >
            <el-button
              size="small"
              class="fr"
              type="primary"
              style="margin-top:10px;margin-left:430px"
              @click='dialog.dialogcheck=true'
              >验收</el-button
            >
          </div>
          <div class="line_between"></div>
          <div class="main_title">装修</div>
          <el-button size="small" plain type="primary">门头logo</el-button>
          <el-button size="small" plain type="primary">形象墙</el-button>
          <el-button size="small" plain type="primary">招牌底板</el-button>
          <el-button size="small" plain type="primary">店内logo</el-button>
          <el-button size="small" plain type="primary">安全隐患排查</el-button>
          <el-button size="small" plain type="primary">地面</el-button>
          <el-button size="small" plain type="primary">油漆粉刷</el-button>
          <div>
            <el-image style="width: 100px; height: 100px"></el-image>
            <el-image style="width: 100px; height: 100px"></el-image>
            <el-image style="width: 100px; height: 100px"></el-image>
          </div>
          <div class="line_between"></div>
          <div class="main_title">统一着装</div>
          <el-button size="small" plain type="primary">男士夏季</el-button>
          <el-button size="small" plain type="primary">女士夏季</el-button>
          <el-button size="small" plain type="primary">男士冬季</el-button>
          <el-button size="small" plain type="primary">女士冬季</el-button>
          <div>
            <el-image style="width: 100px; height: 100px"></el-image>
            <el-image style="width: 100px; height: 100px"></el-image>
            <el-image style="width: 100px; height: 100px"></el-image>
          </div>
          <div class="line_between"></div>
          <div class="main_title">人员</div>
          <el-button size="small" plain type="primary">店长</el-button>
          <el-button size="small" plain type="primary">店员</el-button>
          <div>
            <el-image style="width: 100px; height: 100px"></el-image>
            <el-image style="width: 100px; height: 100px"></el-image>
            <el-image style="width: 100px; height: 100px"></el-image>
          </div>
          <div class="line_between"></div>
          <div class="main_title">宣传用品</div>
          <el-button size="small" plain type="primary">名片</el-button>
          <el-button size="small" plain type="primary">人员版</el-button>
          <div>
            <el-image style="width: 100px; height: 100px"></el-image>
            <el-image style="width: 100px; height: 100px"></el-image>
            <el-image style="width: 100px; height: 100px"></el-image>
          </div>
        </div>
      </div>
    </div>
    <!-- 店铺编辑弹框 -->
    <el-dialog
      title="修改店面信息"
      width="40%"
      :visible.sync="dialog.dialogupdate"
    >
      <el-form label-width="110px">
        <div class="main_title">客户信息</div>
        <el-form-item required label="对应合同">
          <el-input v-model="form.contractNum"></el-input>
        </el-form-item>
        <el-form-item required label="店面类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item required label="店面名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item required label="所属区域">
          <el-input v-model="form.province"></el-input>
        </el-form-item>
        <el-form-item required label="详细地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item required label="店东姓名">
          <el-input v-model="form.diandongName"></el-input>
        </el-form-item>
        <el-form-item required label="店东电话">
          <el-input v-model="form.diandongPhone"></el-input>
        </el-form-item>
        <el-form-item required label="备注信息">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="dianmianInfoUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 营业状态弹框 -->
    <el-dialog title="营业状态" width="40%" :visible.sync="dialog.dialogyingyeStatus">
      <el-radio-group v-model="radio">
        <el-radio label="1">营业中</el-radio>
        <el-radio label="2">暂时停业</el-radio>
        <el-radio label="0">闭店</el-radio>
      </el-radio-group>
      <el-form-item label='开业时间'>
          <el-input placeholder="请选择开业时间"></el-input>
      </el-form-item>
      <el-form-item label='闭店/停业原因'>
          <el-input placeholder="请输入原因"></el-input>
      </el-form-item>
      <el-form-item label='闭店/停业搜时间'>
          <el-input place='请选择时间'></el-input>
      </el-form-item>
       <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="dianmianInfoUpdate">确 定</el-button>
      </span>
    </el-dialog>   
    <!-- 验收按钮 -->
    <el-dialog title="验收" width="40%" :visible.sync="dialog.dialogcheck">
       <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="dianmianInfoUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  listDianmianManager,
  getDianmianManager,
  delDianmianManager,
  addDianmianManager,
  updateDianmianManager,
  exportDianmianManager
} from "@/api/dianmian/dianmianManager";
export default {
  data() {
    return {
      id: this.$route.query.id, //当前详情页id
      dianmianList: [], //当前店面列表
      form: {},
      dialog: {
        dialogupdate: false,
        dialogyingyeStatus:false,
        dialogcheck:false
      }
    };
  },
  created() {
    this.getdianmianList();
    console.log(this.id);
  },
  methods: {
    getdianmianList() {
      getDianmianManager(this.id).then(res => {
        this.dianmianList = res.data;
      });
    },
    //   点击 店铺信息 编辑按钮操作
    handledianmianInfo() {
      this.dialog.dialogupdate = true;
      getDianmianManager(this.id).then(res => {
        this.form = res.data;
      });
    },
    // 店铺信息 编辑提交操作
    dianmianInfoUpdate() {
      updateDianmianManager(this.form)
        .then(res => {
          this.$message.success("操作成功");
          this.dialog.dialogupdate = false;
          this.getdianmianList()
        })
        .catch(error => {
          this.$message.error("操作失败");
        });
    }
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:rgb(242, 242, 242)");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  }
};
</script>

<style lang="less" scoped>
.yingye_status span {
  display: inline-block;
  margin: 0 20px;
  font-size: 14px;
}
.yingye_status span:first-child {
  margin-left: 0px;
}
.main_right_top {
  background-color: #fff;
  padding: 20px 20px;
}
</style>
