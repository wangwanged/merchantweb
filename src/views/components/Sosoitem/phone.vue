<template>
  <div>
    <el-form-item label="客户电话" >
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
    </el-form-item>
    <el-form-item>
      <div v-for="(item, index) in phonedecrease" :key="index">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneadd: '',
      phonedecrease:[]
    };
  },
  watch:{
    // phoneadd(value){
    //   console.log('phoneadd',value)
    // },
    // phonedecrease(value){
    //   console.log('phonedecrease',value)
    // }
  },
  methods: {
    // 添加电话号码
    addPhone() {
      this.phonedecrease.push('');
    },
    // 删除电话号码
    decreasePhone(i) {
      this.phonedecrease.splice(i , 1);
    },
    // 处理电话号码格式
    handlePhone() {
      this.stringPhone=this.phonedecrease.toString()
      console.log('this.phonedecrease',this.phonedecrease)
    },
    toFather(){
      this.$emit('phone',this.phoneadd)
    },
  },
};
</script>

<style lang='less' scoped>

</style>
