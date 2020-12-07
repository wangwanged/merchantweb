<template>
  <div>
     <avue-form class='area' v-model="form" :option="option" :emitPath='false'>
        <template slot="cascader3Type" slot-scope="{node,data}">
            <span>{{ (data || {}).label }}</span>
            <span v-if="!node.isLeaf"> ({{((data || {}).children || []).length }}) </span>
        </template>
    </avue-form>
  </div>
  <!-- <div>
    <el-cascader
    v-model="form"
    :options="option"
    :props="{ expandTrigger: 'hover' }"
   >
    </el-cascader>
  </div> -->
</template>
<script>
import {getProvince,getCity,getDistrict} from '@/api/system/customer'
export default {
   data() {
      return {
        form:{
          "cascader4": ["110000", "110100", "110101"]
        },
        option: {
          column: [ {
            prop: 'cascader4',
            type: "cascader",
            props: {
              label: 'name',
              value: 'code'
            },
            placeholder:'请输入省市区',
            lazy: true,
            lazyLoad(node, resolve) {
              let stop_level = 2;
              let level = node.level;
              let data = node.data || {}
              let code = data.code;
              let list = [];
              let callback = () => {
                resolve((list || []).map(ele => {
                  return Object.assign(ele, {
                    leaf: level >= stop_level
                  })
                }));
              }
              if (level == 0) {
                getProvince().then(res => {
                  list = res.data;
                  callback()
                })
              }
              if (level == 1) {
                getCity(code).then(res => {
                  list = res.data;
                  callback()
                })
              } else if (level == 2) {
                getDistrict(code).then(res => {
                  list = res.data;
                  callback()
                })
              }
            }
          }]
      }
    }
  }
}
</script>

<style lang='less' scoped>
</style>