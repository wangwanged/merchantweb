<template>
  <span>
    <el-form-item style="width:30%">
      <el-select  clearable v-model="prov" placeholder="请选择省">
        <el-option
          v-for="(item, index) of arr"
          :key="index"
          :value="item.name"
          clearable
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="width:30%">
      <el-select clearable  v-model="city" placeholder="请选择市">
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
export default {
  data() {
    return {
      arr: arrAll,
      cityArr: [],
      districtArr: [],
      prov: "",
      city: "",
      district: ""
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
        this.updateCity();
        this.updateDistrict();
      },
      deep: true
    },
    city: {
      // 表格数据刷新后需清空之前查看的订单详情内容
      handler: function(newVal, oldVal) {
        this.updateDistrict();
      },
      deep: true
    },
    district: {
      // 表格数据刷新后需清空之前查看的订单详情内容
      handler: function(newVal, oldVal)  {
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
      this.$emit("placeInfo", this.prov, this.city, this.district);
    },
    updateCity() {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name == this.prov) {
          this.cityArr = obj.sub;
          break;
        }
      }
      this.city = this.cityArr[1].name;
    },
    updateDistrict() {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      if (
        this.districtArr &&
        this.districtArr.length > 0 &&
        this.districtArr[1].name
      ) {
        this.district = this.districtArr[1].name;
      } else {
        this.district = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  height: 32px;
}
.el-form-item{
  margin:0 1.5%
}
.el-form-item__content{
   display: inline-block;
}
.el-form-item--medium{
    display: inline-block;
}
</style>
