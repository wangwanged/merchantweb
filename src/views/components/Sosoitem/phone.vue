<template>
  <div>
       <el-form-item label="客户电话" prop="phone">
          <el-input
            style="width:90%"
            v-model="phone[0]"
            placeholder="请输入客户电话"
          />
          <i
            class="el-icon-circle-plus"
            style="font-size:30px;margin-left:10px;"
            @click="addPhone()"
          ></i>
        </el-form-item>
        <el-form-item>
          <div v-for="(item, index) in phone" :key="index">
            <el-input
              style="width:90%"
              v-model="phone[index + 1]"
              placeholder="请输入客户电话"
            />
            <i
              class="el-icon-remove"
              style="font-size:30px;margin-left:10px;"
              @click="decreasePhone(index)"
            ></i>
          </div>
        </el-form-item>
  </div>
</template>

<script>
export default {
  data(){
      return{
        phone:[]
      }
  },
   methods:{
           // 添加电话号码
    addPhone() {
      this.phone.push("");
    },
    // 删除电话号码
    decreasePhone(i) {
      this.phone.splice(i + 1, 1);
      console.log("this.phone", this.phone);
    },
    // 处理电话号码格式
    handlePhone() {
      this.form.phone = this.phone.toString();
    }
    }
  

</script>

<style>

</style>