<template>
  <div class="upImg_box">
    <div v-for="(item,index) in value" :key="item.id" class="show_img_box">
      <div class="showImg">
        <img :src="baseUrl + item.url" alt="图片" />
        <div class="mask">
<!--          <Icon v-if="onlyShow" type="ios-eye-outline" color="red" size="24" @click.native="handleView(baseUrl + item.url)"></Icon>-->
<!--          <Icon v-else type="md-trash" @click.native="delImg(index)" size="24" color="red"></Icon>-->
          <i v-if="onlyShow" class="el-icon-circle-plus-outline" color="red" size="24" @click.native="handleView(baseUrl + item.url)"></i>
          <i v-else class="el-icon-remove-outline"  @click.native="delImg(index)" size="24" color="red"></i>
        </div>
      </div>
      <Input class="img_describe" v-model="item.name" v-if="imgName" />
    </div>
    <div v-show="!onlyShow" class="up_btn" :id="'up_btn' + curPageId"></div>
    <input type="file" ref="inputFile" accept="image/*" multiple class="inputFile" :id="curPageId" />
<!--    <Modal title="图片展示" v-model="visible">-->
<!--      <img :src="showImg" style="width: 100%" />-->
<!--    </Modal>-->
    <el-dialog title="图片展示" :visible.sync="visible">
      <img :src="showImg" style="width: 100%" />-->
    </el-dialog>
  </div>
</template>
<script>
import * as qiniu from "qiniu-js";
import { imgBaseUrl } from "@/config.js";
import {getToken} from '@/utils/auth.js'
import { rejects } from "assert";
export default {
  props: {
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    type: {
      type: String,
      required: true
    },
    imgName: {
      type: Boolean,
      default: false
    },
    onlyShow: {
      type: Boolean,
      default: false
    },

    strictMode: {
      type: Boolean,
      default: true
    } // 用于58平台的发布。
  },
  data() {
    return {
      appendData: {
        type: this.type
      }, // 上传图片额外的参数。
      filePicker: ["jpg", "jpeg", "png"], // 上传图片的类型。
      header: {},
      showImg: "",
      visible: false,
      curPageId: "",
      imgUrl: "",
      baseUrl: imgBaseUrl
    };
  },
  created() {
    this.curPageId = this._uid;
    this.header.CITY = localStorage.getItem("cityName");
    this.header.ACCESS_TOKEN = sessionStorage.getItem("token");
  },
  mounted() {
    this.getToken();
    const self = this;
    const input = document.getElementById(this.curPageId);
    document.getElementById("up_btn" + this.curPageId).addEventListener(
      "click",
      function() {
        input.click();
      },
      false
    );
    // 图片需要关联到58，而58的要求是 图片不超过10M 尺寸不小于600 * 600;
    input.addEventListener(
      "change",
      function() {
        Array.from(input.files).forEach(item => {
          if (self.strictMode) {
            self.checkImg(item)
              .then(() => {
                self.upImg(item);
              })
              .catch(error => {
                self.$Message.error(error);
              });
          } else {
            self.upImg(item);
          }
        });
      },
      false
    );
  },
  methods: {
    getToken() {
      // this.$get("picture/image/getToken").then(res => {
      //   if (res) {
      //     this.token = res.msg;
      //   }
      // });
    },
    checkImg(file) {
      const Max_size = 10 * 1024 * 1024;
      return new Promise((resolve, rejects) => {
        if (file.size > Max_size) {
          rejects(
            `您上传的图片${file.name}尺寸超过10M,请修改后再次上传`
          );
        }
        this.checkWidthAndLength(file)
          .then(() => {
            resolve();
          })
          .catch(error => {
            rejects(
              `请确保您上传图片的宽最小为600px,高最小为600px`
            );
          });
      });
    },
    checkWidthAndLength(file) {
      const Max_width = 600;
      const Max_height = 600;
      return new Promise((resolve, rejects) => {
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          //加载图片获取图片真实宽度和高度
          var image = new Image();
          image.onload = function() {
            var width = image.width;
            var height = image.height;
            const isAllow =
              width >= Max_width && height >= Max_height;
            if (isAllow) {
              resolve();
            } else {
              rejects();
            }
          };
          image.src = data;
        };
        reader.readAsDataURL(file);
      });
    },
    //图片上传成功
    upImgSuccess(url, file, uid) {
      this.value.push({
        url: url,
        name: file.name,
        id: file.uid
      });
    },
    upImg(file) {
      //
      // 上传图片。
      const d = new Date();
      var time = d.getTime() + parseInt(Math.random() * 1000);
      var observable;
      if (this.token) {
        observable = qiniu.upload(file, time, this.token);
      } else {
        this.$Message.error("上传失败!");
        return;
      }
      var self = this;
      var observer = {
        next(res) {},
        error(err) {
          self.$Message.error("上传失败");
        },
        complete(res) {
          //+"?"+"imageView2/0/format/jpg/interlace/1/q/75|imageslim"
          self.imgUrl = res.key;
          self.upImgSuccess(self.imgUrl, file, time);
        }
      };
      var subscription = observable.subscribe(observer); // 上传开始
    },
    // 删除图片
    delImg(index) {
      this.value.splice(index, 1);
    },
    handleView(url) {
      this.showImg = url;
      this.visible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.up_btn {
  border: 1px solid #ccc;
  width: 160px;
  height: 110px;
  border-radius: 4px;
  cursor: pointer;
  background-image: url("img/upImg.png");
  background-position: center;
  background-repeat: no-repeat;
}

.show_img_box {
  width: 160px;
  display: inline-block;

  > .showImg {
    height: 110px;
    border-radius: 4px;
    border: 1px solid #ccc;
    position: relative;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover .mask {
      display: block;
    }
  }

  > .img_describe {
    margin-top: 8px;
  }
}

.img_describe /deep/ .ivu-input {
  text-align: center;
}

.upImg_box {
  display: flex;
  align-items: flex-start;
  min-height: 400px;
  flex-wrap: wrap;

  > div {
    margin: 10px 0.5em 0;
  }
}

.upImg_box /deep/ .ivu-upload {
  display: inline-block;
}

.mask {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(50, 50, 50, 0.3);
  line-height: 110px;
  text-align: center;
}

.inputFile {
  opacity: 0;
}
</style>
