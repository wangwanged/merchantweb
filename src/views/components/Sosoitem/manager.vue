<template>
  <div>
    <el-form-item label="负责人">
      <el-autocomplete
        style="width: 100%"
        class="inline-input"
        v-model="keywords"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item label="所属部门">
      <el-input disabled v-model="deptName" placeholder="请输入电话"/>
    </el-form-item>
  </div>
</template>

<script>
import { transforcustomer, transforCustomer } from '@/api/system/customer'
import { listUser } from '@/api/system/user'
import { getInfo } from '@/api/login'

export default {
  data() {
    return {
      keywords: '',
      username: '',
      deptName: '',
      transforphone: '',
      userId: '',
      deptId:''
    }
  },
  created() {
    this.showdeptuser()
  },
  mounted() {
    setTimeout(this.toParent(),50)
  },
  watch: {
    userId(newval, oldval) {
      this.toParent()
    },
    deptId(newval, oldval) {
      this.toParent()
    }
  },
  methods: {
    toParent() {
      console.log("this.userId, this.deptId, this.username", this.userId, this.deptId, this.username)
      this.$emit('toFather', this.userId,this.deptId,this.username)
    },
    // 负责人查询
    querySearch(queryString, callback) {
      var params = {
        keywords: queryString
      }
      transforCustomer(params).then(response => {
        var restaurants = response.rows
        const list = []
        //封装要显示的数据
        for (let v of restaurants) {
          list.push({ value: v.phonenumber + ' ' + v.userName, id: v.id,deptId: v.deptId,username:v.userName })
        }
        // 调用 callback 返回建议列表的数据,是一个数组类型
        callback(list)
      })
    },
    // 显示当前负责人和部门
    showdeptuser() {
      getInfo().then(res => {
        this.keywords = res.user.userName
        this.deptName = res.user.dept.deptName
        this.userId = res.user.id
        this.deptId = res.user.deptId
        this.username = res.user.userName
      })
    },
    // 负责人查询
    handleSelect(item) {
      //   this.queryParams.userId=item.id
      this.userId = item.id
      this.deptId = item.deptId
      this.username = item.username
      this.keywords = item.value.substring(12)
      //  部门随负责人变动
      listUser({}).then(res => {
        var a = res.rows.filter(element => {
          return element.id === item.id
        })
        console.log('res', a)
        this.deptName = a[0].dept.deptName
      })
    }
  }
}
</script>

<style>

</style>
