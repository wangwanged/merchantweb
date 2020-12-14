<template>
  <div>
    <el-form-item label="客户电话" prop="phoneadd">
      <el-input
        style="width: 90%"
        v-model="phoneadd"
        placeholder="请输入客户电话"
      />
      <i
        class="el-icon-circle-plus"
        style="font-size: 30px; margin-left: 10px"
        @click="addPhone"
      ></i>
      <el-form-item  v-for="(item, index) in phonedecrease" :key="index" :prop="'phonedecrease.'+ index" :rules="{required: true, message: '电话不能为空', trigger: 'blur'}">
        <div >
          <el-input
            style="width: 90%"
            v-model="phonedecrease[index]"
            placeholder="请输入客户电话"
          />
          <i
            class="el-icon-remove"
            style="font-size: 30px; margin-left: 10px"
            @click="decreasePhone(index)"
          ></i>
        </div>
      </el-form-item>
    </el-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phoneadd: '',
      phonedecrease:[],
      stringPhone:'',
    // rules: {
    //   phoneadd: [
    //     { required: true, message: "您的手机号不能为空", trigger: "blur" },
    //     {
    //       pattern: /^1[3-9]\d{9}$/, // 正则表达式
    //       message: "您的手机号格式不正确",
    //       trigger: "blur"
    //     }
    //   ]
    // }
    }
  },
  props:{
    toSon:String
  },
  watch:{
    phoneadd(){
      this.handlePhone()
    },
    phonedecrease(){
      this.handlePhone()
    },
    stringPhone(){
      this.toFather()
    }
  },
  methods: {
    // 添加电话号码
    addPhone() {
      this.phonedecrease.push('')
    },
    // 删除电话号码
    decreasePhone(i) {
      console.log(i)
      this.phonedecrease.splice(i , 1);
    },
    // 处理电话号码格式
    handlePhone() {
      let phoneString = this.phonedecrease.toString();
      if (phoneString === '') {
        this.stringPhone = this.phoneadd + phoneString
      }else{
        this.stringPhone = this.phoneadd +','+ phoneString
      }
      console.log('this.stringPhone',this.stringPhone)
    },
    toFather(){
      this.$emit('stringPhone',this.stringPhone)
    },
    // 父传子信息 处理
    fromFatherphone(){
      var a = this.toSon.split(',')
      this.phoneadd = a.slice(0,1).toString()
      this.phonedecrease=a.slice(1)
      console.log(this.phonedecrease,'this.phonedecrease')
    },
    // 当前页内容清空
    reset(){
        this.phoneadd=null
        this.phonedecrease=null
        this.stringPhone=null
    }
  },
};
</script>

<style lang='less' scoped>

</style>
