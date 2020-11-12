<template>
  <section>
    <div v-if="genjinList.length === 0">当前没有跟进信息</div>
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
          v-for="(item, index) in addInfo.imgs"
          :key="index"
          :src="item"
          style="width: 120px; height: 70px;margin-right:20px"
          fit="contain"
        ></el-image>
      </p>
      <div class="line_between"></div>
    </div>
    <el-button @click="dialogfollow = true">aaa</el-button>
    <el-dialog title="写跟进" :visible.sync="dialogfollow" width="40%">
      <el-form>
        <el-form-item>
          <el-input
            v-model="addInfo.method"
            class="input"
            placeholder="请输入跟进方式"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 10 }"
            placeholder="请输入跟进内容"
            v-model="addInfo.content"
          >
          </el-input>
           <div class="status">
            <el-button
              size="small"
              plain
              type="info"
              v-for="(item, index) in genjinStatus"
              :key="index"
              >{{ item }}</el-button
            >
          </div>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item>
               <el-row type='flex' justify="end">
          <!-- 上传组件要求必须传action属性 不传就会报错 可以给一个空字符串 show-file-list 是否显示已上传文件列表-->
          <el-upload  :http-request="uploadImg" action="" multiple>
           <el-button size="small" type='primary'>上传素材</el-button>
           <!-- 传入一个内容 点击内容就会传出上传文件框 -->
          </el-upload>
        </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogfollow = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">保存</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import { getToken } from "@/utils/auth";
import { getGenjin, addGenjin ,uploadImg} from "@/api/system/customer";
export default {
  data() {
    return {
      dialogfollow: false, //跟进按钮弹框显示
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      //   图片数据
      imgList: {
        imgs: "",
        myHeaders: { Authorization: getToken() }
      },
      id: this.$route.query.id, //   当前客户数据id
      genjinList: [], //   跟进列表
      genjinStatus: [], //跟进状态字典
      addInfo: {
        imgs: [],
        content: null,
        customerId: Number(this.$route.query.id),
        image: "string",
        method: "1",
        status: "1",
        sysUserId: 0,
      } // 跟进数据添加
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
        // 获取跟进数据
    getList() {
      getGenjin(this.id).then(response => {
        this.genjinList = response.rows;
        console.log("getGenjin", this.genjinList);
      });
    },
    // 上传图片
    uploadImg(params){
        const data = new FormData() // 实例化一个formData对象
        data.append('imgs', params.file) // 加入文件参数
        uploadImg(data).then(res=>{
            this.addInfo.imgs=res.imgUrl[0]
            console.log(this.addInfo.imgs)
            this.$message.success('上传成功')
            // this.getList()
        }).catch(error=>{
            this.$message.error('上传失败')
        })
    },
    // 添加跟进信息
    handleAdd() {
      addGenjin(this.addInfo).then(response => {
        console.log(response);
        this.getList();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el_dialog_follow {
  position: relative;
  .status {
    text-align: center;
    position: absolute;
    bottom: 10px;
    margin-left: 9px;
  }
  .input {
    width: 250px;
  }
  textarea {
    width: 100%;
    height: 130px;
    margin: 15px 0;
    text-align: center;
    border: 1px solid#DCDFE6;
  }
  textarea:focus {
    outline: none !important;
    border-color: #c0c4cc;
  }
  textarea:hover {
    border: 1px solid #ccc;
  }
}
</style>
