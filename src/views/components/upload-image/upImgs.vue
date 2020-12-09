<template>
  <div class="upload-info">
    <div>
      <el-upload
        class="upload-pic"
        :action="domain"
        :data="QiniuData"
        :on-remove="handleRemove"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :before-remove="beforeRemove"
        :before-upload="beforeAvatarUpload"
        :limit="3"
        multiple
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">选择图片</el-button>
      </el-upload>
      <div>
        <img class="pic-box" :src="uploadPicUrl" v-if="uploadPicUrl">
      </div>
    </div>
    <div>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
      <el-button type="info" plain >取消</el-button>
    </div>
  </div>
</template>

<script>
import $axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      QiniuData: {
        key: "", //图片名字处理
        token: "" ,//七牛云token
        data:{}
      },
      domain: "http://upload.qiniup.com", // 七牛云的上传地址（华东区）
      qiniuaddr: "http://image.********.cn", // 七牛云的图片外链地址 七牛云空间的外链地址
      uploadPicUrl: "", //提交到后台图片地址
      fileList: []
    };
  },
  mounted() {
    this.getQiniuToken();
  },
  methods: {
    handleRemove(file, fileList) {
      this.uploadPicUrl = "";
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 张图片，如需更换，请删除上一张图片在重新选择！`
      );
    },
    beforeAvatarUpload(file) {   //图片上传之前的方法
      // const isPNG = file.type === "image/png";
      // const isJPEG = file.type === "image/jpeg";
      // const isJPG = file.type === "image/jpg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isPNG && !isJPEG && !isJPG) {
      //   this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
      //   return false;
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      //   return false;
      // }
      this.QiniuData.data = file;
      this.QiniuData.key = `${file.name}`;
      console.log(this.QiniuData.key)
    },
    uploadSuccess(response, file, fileList) {  //图片上传成功的方法
      console.log(fileList);
      console.log(response);
      console.log(file);
      this.uploadPicUrl = `${this.qiniuaddr}/${response.key}`;
    },
    uploadError(err, file, fileList) {    //图片上传失败时调用
      this.$message({
        message: "上传出错，请重试！",
        type: "error",
        center: true
      });
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //提交数据到后台
    handleSubmit() {

    },
    //请求后台拿七牛云token
    async getQiniuToken() {  //token
      let uploadtoken = await $axios("http://192.168.53.237:8889/image/getToken", {
        method: "get",
      });
      console.log('uploadtoken',uploadtoken);
      this.QiniuData.token= uploadtoken.data.msg
    },
  }
};
</script>
