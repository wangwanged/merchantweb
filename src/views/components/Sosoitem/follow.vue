<template>
  <section>
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
        <el-image
          :src="image"
          style="width: 120px; height: 70px;margin-right:20px"
        ></el-image>
      </p>
      <div class="line_between"></div>
    </div>
    <el-dialog title="写跟进" :visible.sync="handleAdd" width="700px">
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
        <!-- 图片上传 -->
        <UpImg
          :value="value"
          :show="true"
          @update="update"
          :imgType="imgType"
        ></UpImg>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogfollow = false">取 消</el-button>
        <el-button type="primary" @click="handleAd">保存</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import UpImg from "@/views/components/upload-image/upImgs.vue";
import { getGenjin, addGenjin, uploadImg } from "@/api/system/customer";
import { UploadImgs } from "@/views/components/upload-image/index.vue";
export default {
  components: {
    UpImg
  },
  props: ["tofollow"],
  data() {
    return {
      value: [],
      imgType: "1",
      initData: [],
      dialogfollow: false, //跟进按钮弹框显示
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      //   图片数据
      imgList: [],
      id: this.$route.query.id, //   当前客户数据id
      genjinList: [], //   跟进列表
      genjinStatus: [], //跟进状态字典
      form:{}  //表单数据
    };
  },
  created() {
    this.getList();
    //   获取跟进状态字典
    this.getDicts("customer_genjin").then(response => {
      this.genjinStatus = response.data.map(item => {
        return item.dictValue;
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
      this.addInfo.status = i;
    },
    update() {
      console.log(this.value);
      let imagesArr = [];
      imagesArr = this.value.map(item => {
        return {
          is_head: item.is_head,
          image_url: item.image_url,
          image_type: item.image_type
        };
      });
      this.info.headImg = imagesArr.find(item => {
        return item.is_head == 1;
      })
        ? imagesArr.find(item => {
            return item.is_head == 1;
          }).image_url
        : null;
      this.info.images = this.value ? JSON.stringify(imagesArr) : "";
    },
    getValue() {
      this.$refs.uploadEle.getValue();
    },
    // 获取跟进数据
    getList() {
      getGenjin(this.id).then(response => {
        this.genjinList = response.rows;
        console.log("getGenjin", this.genjinList);
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
  height: 100px;
  background-color: #fff;
  text-align: center;
  padding-top: 20px;
}
.genjinbutton {
    // #606266
  background-color: pink;
  color: #fff;
}
.el-form{
  margin:0 20px;
  }
.el-button{
  margin:0 3px
}
</style>
