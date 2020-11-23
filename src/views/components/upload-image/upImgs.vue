<template>
    <div class="upImg_box">
        <template v-if="value.length >0 || !onlyShow">
            <div  v-for="(item,index) in value" :key="index" >
                <div class="show_img_box" v-if="item.name_type==curname">
                    <div class="showImg">
                    <img :src="item.image_url" alt="图片">
                    
                    <div class="mask" >
                        <Icon v-if="onlyShow" type="ios-eye-outline" color="red" size="24" @click.native="handleView(item.image_url)"></Icon>
                        <Icon v-if="!onlyShow && item.is_head!=1 " type="md-trash" @click.native="delImg(index)" size="24" color="red"></Icon>
                        
                    </div>
                    <!-- <span class="left_face" @click="setType(index)">重设类别</span> -->
                    <span v-if="item.is_head!=1 && show" class="face" @click="swfm(index)">设为封面</span>
                    <span v-if="item.is_head==1 && show" class="face" @click="qxfm(index)">封面</span>
                    </div>               
                    </div>
                    <div>				
                </div>
                <div v-if="item.name_type!=curname" class="noshow_img_box" ></div>
                <Input class="img_describe" v-model="item.name" v-if="imgName"></Input>             
            </div>
        </template>
        <div v-else class="show_img_box">
            <div class="showImg">
                <img src="./img/noimg.jpg" alt="图片">
            </div>
        </div>
        <div v-show="!onlyShow" class="up_btn" :id="'up_btn' + curPageId"></div>
        <input type="file" ref="inputFile" accept="image/*" multiple class="inputFile" :id="curPageId">
        <Modal title="图片展示" v-model="visible">
            <img :src="showImg" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    import * as qiniu from 'qiniu-js';
    import config from '@/config/index.js';
    import {
        rejects
    } from 'assert';
    import { getToken } from '@/utils/auth'
    export default {
        props: {
            value: {
                type: Array,
                default: function () {
                    return [];
                },
            },
            imgName: {
                type: Boolean,
                default: false,
            },
            onlyShow: {
                type: Boolean,
                default: false,
            },
            todo:{
                type: String,
                default: '',
            },
            show:{
              type: Boolean,
              default: false,
            },
            curname:{
              type: String,
             },
            imgType:{
              type: String,
             }
        },
        data() {
            return {
                filePicker: ['jpg', 'jpeg', 'png'], // 上传图片的类型。
                header: {},
                showImg: '',
                visible: false,
                curPageId: '',
                imgUrl: '',
                baseUrl: config.imgBaseUrl,
                modalShow:false,
                setTypeName:"",
                setId:0,
                typeList:[
                    {
                        name:"客厅",
                        value:"客厅",
                    },
                    {
                       name:"卧室",
                       value:"卧室",
                    },
                    {
                       name:"厨房",
                       value:"厨房",
                    },
                    {
                       name:"卫生间",
                       value:"卫生间",
                    },
                    {
                       name:"阳台",
                       value:"阳台",
                    },
                    {
                       name:"户型图",
                       value:"户型图",
                    },
                    {
                       name:"其他",
                       value:"其他",
                    }
                ],
            }
        },
        created() {
            this.curPageId = this._uid;
            this.header.CITY = localStorage.getItem('cityName');
            this.header.ACCESS_TOKEN = sessionStorage.getItem('token');
        },
        mounted() {
            this.getToken();
            const self = this;
            const input = document.getElementById(this.curPageId);
            document.getElementById('up_btn' + this.curPageId).addEventListener('click', function () {
                input.click();
            }, false);
            // 图片需要关联到58，而58的要求是 图片不超过10M 尺寸不小于600 * 600; 
            input.addEventListener('change', function () {
                Array.from(input.files).forEach(item => {
					//console.log(item)
                    self.upImg(item);
                })
            }, false);
        },
        methods: {    
            getToken() {
                // this.$get("system/picture/getToken").then(res => {
                //     if (res) {
                //         this.token = res.data;    
                //     }
                // })
                getToken().then(res => {
                    console.log(res)
                    if (res) {
                        this.token = res.data;    
                    }
                })
            },
            checkImg(file) {
                const Max_size = 10 * 1024 * 1024;
                return new Promise((resolve, rejects) => {
                    if (file.size > Max_size) {
                        rejects(`您上传的图片${file.name}尺寸超过10M,请修改后再次上传`);
                    }
                    // this.checkWidthAndLength(file).then(() => {
                    //     resolve();
                    // }).catch(error => {
                    //     rejects(`请确保您上传图片的宽最小为600px,高最小为600px`);
                    // })

                })
            },
            swfm(index){
             // console.log(index,this.curname);
              this.value[index].is_head=1;
               //更新存储到后台
                 this.$emit('update');
            },
            qxfm(index){
               // console.log(index,this.curname);
                 this.value[index].is_head=0;
                 //更新存储到后台
                 this.$emit('update');
            },
            checkWidthAndLength(file) {
                const Max_width = 600;
                const Max_height = 600;
                return new Promise((resolve, rejects) => {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        //加载图片获取图片真实宽度和高度
                        var image = new Image();
                        image.onload = function () {
                            var width = image.width;
                            var height = image.height;
                            const isAllow = width >= Max_width && height >= Max_height;
                            if(isAllow){
                                resolve()
                            }else{
                                rejects();
                            }
                        };
                        image.src = data;

                    };
                    reader.readAsDataURL(file);
                })

            },
            //图片上传成功
            upImgSuccess(url, file, uid) {
                //console.log(url,this.baseUrl)
                //push时的格式确定
                let item={
                  is_head:0,
                  image_url:this.baseUrl+url,
                  name_type:this.curname,
                  image_type:this.imgType
                }
                this.value.push(item);
                
                //更新存储到后台
               // this.todo="上传";
                this.$emit('update');
                
            },
          
            upImg(file) {
                //   
                // 上传图片。
                const d = new Date();
                var time = d.getTime() + parseInt(Math.random() * 1000);
                var observable;
                if (this.token) {
					//console.log(this.token)
                    observable = qiniu.upload(file, time, this.token ,)
                    //console.log(observable);
                } else {
                    this.$Message.error("上传失败!")
                    return;
                }
                var self = this;
                var observer = {
                    next(res) {
                    },
                    error(err) {
                        //console.log(err);
                        self.$Message.error("长传失败")
                    },
                    complete(res) { //+"?"+"imageView2/0/format/jpg/interlace/1/q/75|imageslim"
                        //console.log(res);
                        self.imgUrl = res.key;
                        self.upImgSuccess(self.imgUrl, file, time);
                    }
                }
                 
                var subscription = observable.subscribe(observer) // 上传开始
            },
            // 删除图片
            delImg(index) {
                this.value.splice(index, 1);
                 //更新存储到后台
                 this.$emit('update');
            },
            // 重设类别 打开弹框
            setType(id){
                this.setId=id;
                this.modalShow=true;
            },
            // 重设类别 发送ajax请求
            modalOk(){
              this.value[this.setId].name_type=this.setTypeName;
                 //更新存储到后台
                 this.$emit('update');
            },
            handleView(url) {
                this.showImg = url;
                this.visible = true;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .up_btn {
        border: 1px solid #ccc;
        width: 160px;
        height: 110px;
        border-radius: 4px;
        cursor: pointer;
        background-image: url('img/upImg.png');
        background-position: center;
        background-repeat: no-repeat;
    }

    .show_img_box {
        width: 160px;
        display: inline-block;
        >.showImg {
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
            .left_face{
                position:absolute;
				//bottom:0px;
				right:0px;
				color:#fff;
            }
			.face {
				position:absolute;
				bottom:3px;
				right:4px;
				color:#fff;
			}
        }

        >.img_describe {
            margin-top: 8px;
        }
    }

    .img_describe /deep/ .ivu-input {
        text-align: center;
    }

    .upImg_box {
        display: flex;
        align-items: flex-start;
        min-height: 150px;
        flex-wrap: wrap;
        >div {
            margin: 10px .5em 0;
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
        background-color: rgba(50, 50, 50, .3);
        line-height: 110px;
        text-align: center;
    }

    .inputFile {
        opacity: 0;
    }
    .noshow_img_box{
         width: 0px;
        display: none;

    }
</style>