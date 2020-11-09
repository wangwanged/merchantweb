<template>
   <section>
       <!-- 新签合同弹框 -->
    <el-dialog title="转成客户" :visible.sync="dialogNewsign" width="50%">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="客户姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客户等级">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户需求">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户地区">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客户公司">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="店面地址">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="中介经验">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一"></el-option>
            <el-option label="区域二"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogfollow = false">取 消</el-button>
        <el-button type="primary" @click="dialogfollow = false"
          >保存</el-button
        >
      </span>
    </el-dialog>
   </section>
</template>

<script>
export default {
   data(){
       return {
       }
   },
   computed:{
   }
}
</script>

<style>

</style>