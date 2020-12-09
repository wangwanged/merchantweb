<template>
  <div>
    <el-cascader :options="arr" clearable></el-cascader>
  </div>
</template>

<script>
import { arrAll } from "./cities.js";
export default {
  data(){
    return {
      arr: arrAll,
    }
  }
}
</script>

<style>

</style>
