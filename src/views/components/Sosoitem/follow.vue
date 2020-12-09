<template>

  <section>
  <GeminiScrollbar
      class="my-scroll-bar">
    <div class="noinfo" v-if="genjinList.length === 0">当前没有跟进信息</div>
    <div
      v-for="item in genjinList"
      :key="item.customerId"
      class="main_content_top"
      v-else
    >
      <div class="main_content_name">
        <span class="main_content_firstname">{{ item.updateDate }}</span>
        <span class="right"
          >{{ item.customerName }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {{ item.method }}</span
        >
      </div>
      <p class="main_content_name">
        {{ item.content }}
      </p>
      <p class="main_content_name__placeholder">
<!--        <el-image-->
<!--          :src="image"-->
<!--          style="width: 120px; height: 70px;margin-right:20px"-->
<!--        ></el-image>-->
      </p>
      <div class="line_between"></div>
    </div>
    </GeminiScrollbar>
    <el-dialog title="写跟进" :visible.sync="dialogfollow" width="700px">
      <el-form>
        <el-form-item required>
          <el-input
            v-model="form.method"
            class="input"
            placeholder="请输入跟进方式"
          ></el-input>
        </el-form-item>
        <el-form-item class='textarea'>
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8 }"
            placeholder="请输入跟进内容"
            v-model="form.content"
          >
          </el-input>
          <div class="status" style="text-align:center">
            <el-button
              size="mini"
              plain
              type="info"
              v-for="(item, index) in genjinStatus"
              :key="index"
              :class="index === form.status ? 'genjinbutton' : ''"
               @click="changestatus(index)"
              >{{ item }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item>
          <UpImage1 @update="update"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitAdd">保存</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import { getGenjin, addGenjin} from "@/api/system/customer";
import * as qiniu from "qiniu-js";
import configData from "@/config/index.js";
export default {
  props: ["tofollow"],
  data() {
    return {
      dialogfollow: false, //跟进按钮弹框显示
      id: this.$route.query.id, //   当前客户数据id
      genjinList: [], //   跟进列表
      genjinStatus: [], //跟进状态字典
      form:{},  //表单数据
      image:  null,
      imgs:[],
    };
  },
  created() {
    this.getList();
    //   获取跟进状态字典
    this.getDicts("customer_genjin").then(response => {
      this.genjinStatus = response.data.map(item => {
        return item.dictLabel;
      });
    });
  },
  methods: {
    reset(){
     this.form={
       imgs: null,
        content: null,
        customerId: null,
        image:  null,
        method: null,
        status:  null,
        sysUserId:  null
     }
    },
    // 改变跟进状态
    changestatus(i) {
      this.form.status = i;
    },
     // 取消按钮
    cancel() {
      this.reset();
      this.dialogfollow = false;
    },

    update() {
      let imagesArr = []
      imagesArr = this.value.map(item => {
        return {
          is_head: item.is_head,
          image_url: item.image_url,
          image_type: item.image_type
        }
      })
      this.info.headImg = imagesArr.find(item => {
        return item.is_head == 1
      }) ? imagesArr.find(item => {
        return item.is_head == 1
      }).image_url : null;
      this.imgs = this.value ? JSON.stringify(imagesArr) : '';
      console.log(this.imgs)
    },
    // 获取跟进数据
    getList() {
      getGenjin(this.id).then(response => {
        this.genjinList = response.rows;
      });
    },
    // 添加跟进按钮
    handleAdd(){
      this.reset()
      this.dialogfollow=true
    },
    // 添加跟进按钮提交
    submitAdd() {
      // var params = {
      //   imgs: this.addInfo.imgs,
      //   content: this.addInfo.content,
      //   customerId: Number(this.$route.query.id),
      //   image: this.addInfo.image,
      //   method: this.addInfo.method,
      //   status: this.addInfo.status,
      //   sysUserId: this.tofollow.userId
      // };
      console.log('this.tofollow',this.tofollow)
      this.form.customerId=this.$route.query.id
      this.form.sysUserId=this.tofollow.userId
      addGenjin(this.form)
        .then(response => {
          this.$message.success("操作成功");
          this.dialogfollow = false;
          this.getList();
        })
        .catch(error => {
          this.$message.error("操作失败");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.textarea {
  position: relative;
  .status {
    position: absolute;
    bottom:10px;
    margin:0 auto;
    left:5px;
    right:5px;
  }
  .el-input {
    width: 100%;
  }
}
.noinfo {
  width: 100%;
  height: 750px;
  background-color: #fff;
  text-align: center;
  padding-top: 20px;
}
.genjinbutton {
  background-color: #606266;
  color: #fff;
}
.el-form{
  margin:0 20px;
  }
.el-button{
  margin:0 3px
}
.my-scroll-bar{
   height: 750px;
}
</style>
