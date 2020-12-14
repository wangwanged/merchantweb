<template>
  <span>
      <el-form-item label="经营管理费" required>
        <el-date-picker
          class='datepicker'
          v-model="feestable.date"
          type="monthrange"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-input v-model='feestable.money'></el-input>
      </el-form-item>
    <el-form-item>
        <div>
           <el-date-picker
             class='datepicker'
             type="monthrange"
             v-model="feeadd.date"
             start-placeholder="开始月份"
             end-placeholder="结束月份"
             value-format="yyyy-MM-dd"
           >
        </el-date-picker>
          <el-input  v-model="feeadd.money"></el-input>
            <i
              class="el-icon-circle-plus"
              style="font-size: 30px; margin-left: 10px"
              @click='addfee'
            ></i>
      </div>
      </el-form-item>
      <el-form-item v-for='(item,index) in feedecrease' :key='index'>
          <div>
           <el-date-picker
             class='datepicker'
             v-model="feedecrease[index].date"
             type="monthrange"
             start-placeholder="开始月份"
             end-placeholder="结束月份"
             value-format="yyyy-MM-dd"
           >
           </el-date-picker>
          <el-input v-model="feedecrease[index].money"></el-input>
              <i
                class="el-icon-remove"
                style="font-size: 30px; margin-left: 10px"
                @click="decreasefee(index)"
              ></i>
      </div>
        </el-form-item>

  </span>
</template>
<script>
export default {
  data(){
    return {
      feestable:{date:'',money:''},
      feeadd: {date:'',money:''},
      feedecrease:[{date:'',money:''}],
      detail:[]
    }
  },
  watch:{
    feestable:{
      handler(newName, oldName) {
        this.handleformat()
      },
      deep: true
    },
    feeadd:{
      handler(newName, oldName) {
        this.handleformat()
      },
      deep: true
    },
    feedecrease:{
      handler(newName, oldName) {
        this.handleformat()
      },
      deep: true
    },
    detail(){
      this.toParent()
    }
  },
  methods:{
    toParent(){
      this.$emit('@jinyingFee',this.detail)
    },
    // 添加电话号码
    addfee() {
      this.feedecrease.push({date:this.feeadd.date,money:this.feeadd.money});
    },
    // 删除电话号码
    decreasefee(i) {
      this.feedecrease.splice(i , 1);
    },
    handleformat(){
      var aa = [...this.feedecrease]
      var bb = aa.unshift(this.feeadd)
      // var aa = aa.unshift(this.feestable)
      // this.detail=cc
      console.log('this.detailthis.detail',bb)
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
