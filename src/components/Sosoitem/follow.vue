<template>
  <section>
    <div class="main_content_top">
      <div class="main_content_name">
        <span class="main_content_firstname">123</span>
        <span class="right">王力宏 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 拜访</span>
      </div>
      <p class="main_content_name">
        跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进
        跟进内容跟进内容跟进内容跟进内容跟进内容
      </p>
      <p class="main_content_name__placeholder">
        <el-image
          :src="src"
          style="width: 100px; height: 50px;margin-right:20px"
          fit="contain"
        ></el-image>
        <el-image
          :src="src"
          style="width: 100px; height: 50px;margin-right:20px"
          fit="contain"
        ></el-image>
        <el-image :src="src" style="width: 100px; height: 50px" fit="contain"></el-image>
      </p>
      <div class="line_between"></div>
    </div>
    <el-dialog
      title="写跟进"
      :visible.sync="$store.state.sosoitem.dialogfollow"
      width="45%"
      class="el_dialog_follow"
    >
      <el-input class="input" placeholder="请输入跟进方式"></el-input>
      <textarea
        class='textarea'
        placeholder="请输入跟进内容"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <!-- <el-input  placeholder="请输入跟进内容" style="height:60px"></el-input> -->
      <el-button class="fr" type="primary">上传跟进图片</el-button>
      <div class="image" style="clear:both">
        <el-image
          style="width: 100px; height: 100px"
          :src="src"
          :fit="fit"
        ></el-image>
        <el-image
          style="width: 100px; height: 100px"
          :src="src"
          :fit="fit"
        ></el-image>
        <el-image
          style="width: 100px; height: 100px"
          :src="src"
          :fit="fit"
        ></el-image>
        <el-image
          style="width: 100px; height: 100px"
          :src="src"
          :fit="fit"
        ></el-image>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$store.state.sosoitem.dialogfollow = false">取 消</el-button>
        <el-button type="primary" @click="$store.state.sosoitem.dialogfollow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {getGenjin} from "@/api/system/customer";
export default {
  data() {
    return {
      fit:"contain",
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
  computed: {
  },
  created(){
      this.getList()
  },
  methods:{
    getList() {
      getGenjin().then(response => {
          console.log(response)
        // this.customerList = response.rows;
        // this.total = response.total;
        // this.loading = false;
        // this.$store.commit("updateAlldata", this.customerList);
      });
    },
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
    border-color: #C0C4CC;
}
  textarea:hover {
    border: 1px solid #ccc;
  }
}
</style>
