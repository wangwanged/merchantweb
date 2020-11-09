<template>
  <section>
    <div v-if='genjinList.length===0'>当前没有跟进信息</div>
    <div v-for='item in genjinList' :key='item.customerId' class="main_content_top" v-else>
      <div class="main_content_name">
        <span class="main_content_firstname">{{item.updateDate}}</span>
        <span class="right"
          >{{item.customerName}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {{item.method}}</span
        >
      </div>
      <p class="main_content_name">
        {{item.content}}
      </p>
      <p class="main_content_name__placeholder">
        <el-image
          v-for="(item, index) in 3"
          :key="index"
          src="#"
          style="width: 120px; height: 70px;margin-right:20px"
          fit="contain"
        ></el-image>
      </p>
      <div class="line_between"></div>
    </div>
    <el-dialog
      title="写跟进"
      :visible.sync="this.$store.state.sosoitem.customer.dialogfollow"
      width="45%"
      class="el_dialog_follow"
    >
      <el-input v-model='addInfo.method' class="input" placeholder="请输入跟进方式"></el-input>
      <textarea
        v-model='addInfo.content'
        class="textarea"
        placeholder="请输入跟进内容"
      ></textarea>
      <el-upload
        ref='upload'
        multiple
        list-type="picture-card"
        action=" http://192.168.53.237:8888/system/genjin/genjinImg"
        :on-success="handleAvatarSuccess"
        :auto-upload="false"
        name='imgs'
        :headers='imgList.myHeaders'
        :http-request="uploadFile"
         :on-change="handleChange"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="this.$store.state.sosoitem.customer.dialogfollow = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getGenjin, addGenjin } from "@/api/system/customer";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      //   图片数据
      imgList: {
          imgs:'',
          myHeaders:{Authorization: getToken()},
      },
      //   当前客户数据id
      id: this.$route.query.id,
      //   跟进全部数据
      genjinList: [],
      // 写跟进添加数据
      addInfo: {
        imgs: [],
        content: null,
        customerId: this.$route.query.id,
        customerName: "string",
        genjinDate: "2020-11-05T08:16:05.542Z",
        image: "string",
        method: null,
        status: "1",
        sysUserId: 0,
        updateDate: "2020-11-05T08:16:05.542Z"
      },
      //   一会删除数据
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
    this.getList();
  },
  methods: {
    handleAvatarSuccess(res, file) {
        console.log('aaa',file)
        console.log(res.imgUrl)
      },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    //   获取跟进数据
    getList() {
      getGenjin(this.id).then(response => {
        this.genjinList = response.rows;
        console.log(this.genjinList)
      });
    },
    uploadFile(file){
        
      },
      handleChange(res, file){
          console.log('aaa',res,file)
        let param = new FormData();
        this.addInfo.imgs.push(res.url)
        console.log()
      },
    // 添加跟进信息
    handleAdd() {
          this.$refs.upload.submit();
          
    //   this.imgList.addInfo.forEach(file => {
    //     param.append("files", file.raw); //此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上
    //     param.append("fileNames", file.name);
    //   });
      addGenjin(this.addInfo).then(response => {
        console.log(response);
        this.getList()
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el_dialog_follow {
  padding: 50px;
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
