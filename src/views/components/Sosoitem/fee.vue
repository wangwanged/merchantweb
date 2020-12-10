<template>
  <span>
      <el-form-item label="经营管理费" required>
        <el-date-picker
          class='datepicker'
          v-model="phonestable"
          type="monthrange"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-input v-model='phonestable'></el-input>
      </el-form-item>
      <el-form-item>
          <div v-for='(item,index) in phonedecrease' :key='index'>
           <el-date-picker
             class='datepicker'
             v-model="phonedecrease[index]"
             type="monthrange"
             start-placeholder="开始月份"
             end-placeholder="结束月份"
             value-format="yyyy-MM-dd"
           >
           </el-date-picker>
          <el-input v-model="phonestable"></el-input>
              <i
                class="el-icon-remove"
                style="font-size: 30px; margin-left: 10px"
                @click="decreasePhone(index)"
              ></i>
      </div>
        </el-form-item>
      <el-form-item>
        <div>
           <el-date-picker
             class='datepicker'
             v-model="phonestable"
             type="monthrange"
             start-placeholder="开始月份"
             end-placeholder="结束月份"
             value-format="yyyy-MM-dd"
           >
        </el-date-picker>
          <el-input v-model="phonestable"></el-input>
            <i
              class="el-icon-circle-plus"
              style="font-size: 30px; margin-left: 10px"
              @click='addPhone'
            ></i>
      </div>
      </el-form-item>
  </span>
</template>
<script>
export default {
  data(){
    return {
      phonestable:'',
      phoneadd: '',
      phonedecrease:[''],
    }
  },
  methods:{
    // 添加电话号码
    addPhone() {
      this.phonedecrease.push('');
    },
    // 删除电话号码
    decreasePhone(i) {
      this.phonedecrease.splice(i , 1);
    },
  }
}
</script>
<style lang="less" scoped>
.datepicker{
  width: 45%;
  margin-right: 5%;
}
.el-input{
  width: 40%;
}
</style>
