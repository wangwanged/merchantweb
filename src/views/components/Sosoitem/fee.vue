<template>
  <span>
      <el-form-item label="经营管理费" required>
        <el-date-picker
          class='datepicker'
          v-model="feestable.key"
          type="monthrange"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-input v-model='feestable.value'></el-input>
      </el-form-item>
      <el-form-item v-for='(item,index) in feedecrease' :key='index'>
          <div>
           <el-date-picker
             class='datepicker'
             v-model="feedecrease[index]"
             type="monthrange"
             start-placeholder="开始月份"
             end-placeholder="结束月份"
             value-format="yyyy-MM-dd"
           >
           </el-date-picker>
          <el-input v-model="feestable"></el-input>
              <i
                class="el-icon-remove"
                style="font-size: 30px; margin-left: 10px"
                @click="decreasefee(index)"
              ></i>
      </div>
        </el-form-item>
      <el-form-item>
        <div>
           <el-date-picker
             class='datepicker'
             v-model="feestable"
             type="monthrange"
             start-placeholder="开始月份"
             end-placeholder="结束月份"
             value-format="yyyy-MM-dd"
           >
        </el-date-picker>
          <el-input v-model="feestable"></el-input>
            <i
              class="el-icon-circle-plus"
              style="font-size: 30px; margin-left: 10px"
              @click='addfee'
            ></i>
      </div>
      </el-form-item>
  </span>
</template>
<script>
export default {
  data(){
    return {
      feestable:'',
      feeadd: '',
      feedecrease:[''],
    }
  },
  watch:{
    feestable(){
      console.log(this.feestable)
    }
  },
  methods:{
    // 添加电话号码
    addfee() {
      this.feedecrease.push('');
    },
    // 删除电话号码
    decreasefee(i) {
      this.feedecrease.splice(i , 1);
    },
    handleformat(){

    }
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
