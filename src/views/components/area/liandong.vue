<template>
  <span id="liandong">
    <el-form-item style="width:30%">
      <el-select  @clear="clearpro"  clearable v-model="prov" placeholder="请选择省">
        <el-option
          v-for="(item, index) of arr"
          :key="index"
          :value="item.name"
          clearable
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="width:30%">
      <el-select @clear="clearcity" clearable  v-model="city" placeholder="请选择市">
        <el-option
          v-for="(item, index) of cityArr"
          :key="index"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="width:30%">
      <el-select clearable  v-model="district" placeholder="请选择区">
        <el-option
          v-for="(item, index) of districtArr"
          :key="index"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-form-item>
  </span>
</template>
<script>
import { arrAll } from "./cities.js";
import log from '@/views/monitor/job/log'
export default {
  data() {
    return {
      arr: arrAll,
      cityArr: [],
      districtArr: [],
      prov: null,
      city: null,
      district: null
    };
  },
  props:{
    toSon:{
      type:Object
    }},
  created() {
    this.showPlace()
  },
  watch: {
    prov: {
      // 表格数据刷新后需清空之前查看的订单详情内容
      handler: function(newVal, oldVal) {
        if(newVal==='请选择'||newVal===''||newVal===null){
          this.prov=null
          this.city=null
          this.district=null
          this.cityArr=null
          this.districtArr=null
        } else {
          this.updateCity();
          this.updateDistrict();
        }
        this.toFather()
      },
      deep: true,
    },
    city: {
      // 表格数据刷新后需清空之前查看的订单详情内容
      handler: function(newVal, oldVal) {
        if(newVal==='请选择'||newVal===''||newVal===null){
          this.city=null
          this.district=null
          this.districtArr=null
        } else {
          this.updateDistrict();
        }
        this.toFather()

      },
      deep: true
    },
    district: {
      // 表格数据刷新后需清空之前查看的订单详情内容
      handler: function(newVal, oldVal) {
        if(newVal==='请选择'||newVal===''||newVal===null) {
          this.district=null
        }
        this.toFather()
      },
      deep: true
    }
  },
  methods: {
    // 回显省市区
    showPlace(){
      this.prov=this.toSon.province
      this.city=this.toSon.city
      this.district=this.toSon.district
    },
    toFather() {
      this.$emit("place-info", this.prov, this.city, this.district);
    },
    clearpro(){
        this.prov=null
        this.city=null
        this.district=null
        this.toFather()
    },
    clearcity(){
      this.district=null
      this.toFather()
    },
    updateCity() {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name == this.prov) {
          this.cityArr = obj.sub;
          break;
        }
      }
      this.city = this.cityArr[1]? this.cityArr[1].name:null;
    },
    updateDistrict() {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      this.district = this.districtArr[1]? this.districtArr[1].name:null;
    },
    reset(){
        this.prov= null,
        this.city= null,
        this.district= null
    }
  }
};
</script>
<style lang="less" scoped>
 .el-select {
  height: 32px;
}
 .el-form-item{
  margin:0 1.5%
}
 .el-form-item__content{
   display: inline-block;
  width: 100px;
}
 .el-form-item--medium{
    display: inline-block;
}
</style>
