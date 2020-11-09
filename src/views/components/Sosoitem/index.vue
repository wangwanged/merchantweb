<template>
  <section>
    <div class="main_content_top">
      <div class="main_content_name">
        <span class="main_content_firstname">{{ genjinList.genjinDate }}</span>
        <span class="right"
          >{{ genjinList.customerName }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          拜访</span
        >
      </div>
      <p class="main_content_name">
        {{ genjinList.content }}
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
      :visible.sync="$store.state.sosoitem.dialogfollow"
      width="45%"
      class="el_dialog_follow"
    >
      <el-input class="input" placeholder="请输入跟进方式"></el-input>
      <textarea
        class="textarea"
        placeholder="请输入跟进内容"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <!-- <el-input  placeholder="请输入跟进内容" style="height:60px"></el-input> -->
      <!-- <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type='picture'
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-button class="fr" type="primary">上传跟进图片</el-button>
        </el-upload> -->
      <el-upload
        multiple
        action="#"
        list-type="picture-card"
        :before-upload="myHandleUpload"
        :auto-upload="false"
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
        <el-button @click="$store.state.sosoitem.dialogfollow = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { getGenjin, addGenjin } from '@/api/system/customer'
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      //   当前数据id
      id: this.$route.query.id,
      //   当前页全部数据
      genjinList: [],
      // 写跟进添加数据
      addInfo: {
        content: 'string',
        customerId: 0,
        customerName: 'string',
        genjinDate: '2020-11-05T08:16:05.542Z',
        image: 'string',
        method: 'string',
        status: 'string',
        sysUserId: 0,
        updateDate: '2020-11-05T08:16:05.542Z'
      },
      //   一会删除数据
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ]
    }
  },
  computed: {},
  created () {
    this.getList()
  },
  methods: {
    myHandleUpload (file) {
        console.log(file,'1111111111111')
    },
    handleRemove (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },
    //   获取跟进数据
    getList () {
      getGenjin(this.id).then(response => {
        this.genjinList = response.rows
        this.genjinList = this.genjinList[0]
      })
    },
    // 写跟进确定按钮操作
    handleAdd () {
      addGenjin(this.addInfo).then(response => {
        console.log(response)
      })
    }
  }
}
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
