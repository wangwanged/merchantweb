
<template>
  <div>
    <!-- 添加或修改客户线索对话框 -->
    <el-dialog
      title="新增线索"
      :visible.sync="xiansuo.dialogAddXiansuo"
      width="650px"
      append-to-body
      genjinStatus
    >
<!--      <el-form-->
<!--        ref="form"-->
<!--        :rules="rules"-->
<!--        :model="form"-->
<!--        label-width="80px"-->
<!--        label-position="left"-->
<!--      >-->
<!--        <el-form-item label="客户姓名" prop="name">-->
<!--          <el-input v-model="form.name" placeholder="请输入客户姓名" />-->
<!--        </el-form-item>-->
<!--&lt;!&ndash;        <el-form-item label="客户电话" >&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input&ndash;&gt;-->
<!--&lt;!&ndash;            style="width: 90%"&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="phoneadd"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="请输入客户电话"&ndash;&gt;-->
<!--&lt;!&ndash;          />&ndash;&gt;-->
<!--&lt;!&ndash;          <i&ndash;&gt;-->
<!--&lt;!&ndash;            class="el-icon-circle-plus"&ndash;&gt;-->
<!--&lt;!&ndash;            style="font-size: 30px; margin-left: 10px"&ndash;&gt;-->
<!--&lt;!&ndash;            @click="addPhone"&ndash;&gt;-->
<!--&lt;!&ndash;          ></i>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <div v-for="(item, index) in phonedecrease" :key="index">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input&ndash;&gt;-->
<!--&lt;!&ndash;              style="width: 90%"&ndash;&gt;-->
<!--&lt;!&ndash;              v-model="phonedecrease[index]"&ndash;&gt;-->
<!--&lt;!&ndash;              placeholder="请输入客户电话"&ndash;&gt;-->
<!--&lt;!&ndash;            />&ndash;&gt;-->
<!--&lt;!&ndash;            <i&ndash;&gt;-->
<!--&lt;!&ndash;              class="el-icon-remove"&ndash;&gt;-->
<!--&lt;!&ndash;              style="font-size: 30px; margin-left: 10px"&ndash;&gt;-->
<!--&lt;!&ndash;              @click="decreasePhone(index)"&ndash;&gt;-->
<!--&lt;!&ndash;            ></i>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--        <el-form-item label="客户地区">-->
<!--          <Area @place-info="getPlace" :toSon="toplace"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户公司" prop="companyName">-->
<!--          <el-input v-model="form.companyName" placeholder="请输入公司和部门" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="店面地址" prop="resource">-->
<!--          <el-input-->
<!--            v-model="form.dianmianAddress"-->
<!--            placeholder="请输入店面地址"-->
<!--          ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="中介经验" prop="experience">-->
<!--          <el-select v-model="form.experience" placeholder="请选择线索来源">-->
<!--            <el-option-->
<!--              v-for="dict in experienceOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="线索来源" prop="resource">-->
<!--          <el-select v-model="form.resource" placeholder="请选择线索来源">-->
<!--            <el-option-->
<!--              v-for="dict in resourceOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户备注" prop="remark">-->
<!--          <el-input v-model="form.remark" placeholder="请输入备注" />-->
<!--        </el-form-item>-->
<!--&lt;!&ndash;        <el-form-item label="负责人">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-autocomplete&ndash;&gt;-->
<!--&lt;!&ndash;            style="width:100%"&ndash;&gt;-->
<!--&lt;!&ndash;            class="inline-input"&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="keywords"&ndash;&gt;-->
<!--&lt;!&ndash;            :fetch-suggestions="querySearch"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="请输入内容"&ndash;&gt;-->
<!--&lt;!&ndash;            :trigger-on-focus="false"&ndash;&gt;-->
<!--&lt;!&ndash;            @select="handleSelect"&ndash;&gt;-->
<!--&lt;!&ndash;          ></el-autocomplete>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="所属部门" prop="dept">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input disabled v-model="deptName" placeholder="请输入所属部门" />&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
<!--      </div>-->
    </el-dialog>
    <!-- 转成客户弹框 -->
<!--    <el-dialog-->
<!--      title="转成客户"-->
<!--      :visible.sync="dialog.dialogtocustomer"-->
<!--      width="650px"-->
<!--      :close-on-click-modal='false'-->
<!--    >-->
<!--      <el-form-->
<!--        ref="form"-->
<!--        :rules="rules"-->
<!--        :model="form"-->
<!--        label-width="80px"-->
<!--        label-position="left"-->
<!--      >-->
<!--        <el-form-item label="客户姓名" prop="name">-->
<!--          <el-input v-model="form.name" placeholder="请输入客户姓名" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户电话" prop="phone">-->
<!--          <el-input v-model="form.phone" placeholder="请输入电话" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户等级">-->
<!--          <el-select-->
<!--            style="width:100%"-->
<!--            v-model="form.level"-->
<!--            placeholder="请选择线索来源"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="dict in levelOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户需求">-->
<!--          <el-select-->
<!--            style="width:100%"-->
<!--            v-model="form.customerNeeds"-->
<!--            placeholder="请选择线索来源"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="dict in userneedOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户地区">-->
<!--          <Area class='liandong' @place-info="getPlace" :toSon="toplace"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户公司">-->
<!--          <el-input v-model="form.companyName" placeholder="请输入公司" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="店面地址">-->
<!--          <el-input-->
<!--            v-model="form.dianmianAddress"-->
<!--            placeholder="请输入店面地址"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="中介经验">-->
<!--          <el-select-->
<!--            style="width:100%"-->
<!--            v-model="form.experience"-->
<!--            placeholder="请选择线索来源"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="dict in experienceOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="负责人">-->
<!--          <el-autocomplete-->
<!--            style="width:100%"-->
<!--            class="inline-input"-->
<!--            v-model="keywords"-->
<!--            :fetch-suggestions="querySearch"-->
<!--            placeholder="请输入内容"-->
<!--            :trigger-on-focus="false"-->
<!--            @select="handleSelect"-->
<!--          ></el-autocomplete>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="所属部门" prop="dept">-->
<!--          <el-input disabled v-model="deptName" placeholder="请输入所属部门" />-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="submitTocustomer">确 定</el-button>-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>
<script>
import { addCustomer } from '@/api/system/customer'
import { listXiansuo } from '@/api/system/xiansuo'

export default {
  data(){
    return {
      //  传给省市区
      toplace: {
        province: "",
        city: "",
        district: ""
      },
      phoneadd: '',
      phonedecrease:[],
      form:{},
      rules: {
        name: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "您的手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/, // 正则表达式
            message: "您的手机号格式不正确",
            trigger: "blur"
          }
        ]
      }
    }
  },
   computed:{
     xiansuo(){
       return  this.$store.state.Soso.xiansuo
     }
   },
  watch:{
    // xiansuo(){
    //   console.log('11111111111',this.xiansuo)
    // }
    xiansuo(i){
      console.log(i.dialogAddXiansuo)
    }
  },
   created() {
     console.log('aaaaaaaaaaaaaaaaa',this.$store.state.Soso.xiansuo.xiansuoList)
   },
  methods:{
     /** 查询客户线索列表 */
     getList() {
       this.loading = true;
       listXiansuo(this.queryParams).then(response => {
         this.xiansuoList = response.rows;
         this.xiansuoList.forEach(item => {
           item.phone = item.phone.split(",");
         });
         this.total = response.total;
         this.loading = false;
       });
     },
      reset(){
        this.form = {
          name: null,
          phone: null,
          companyId: null,
          province: null,
          city: null,
          resource: null,
          sysUserId: null,
          isCustomer: null,
          createTime: null,
          updateTime: null,
          username: null,
          companyName: null,
          remark: null,
          ids: null,
          level: null,
          customerNeeds: null,
          dianmianAddress: null,
          status: null,
          experience: null,
          genjinStatus: null,
        };
      },
     // /** 新增按钮操作 */
     // handleAdd() {
     //   this.reset();
     //   this.getdeptuser();
     //   this.dialog.dialogaddxiansuo = true;
     // },
     /** 新增提交按钮 */
     submitForm() {
       this.handlePhone();
       this.$refs["form"].validate(valid => {
         if (valid) {
           this.form.status = "0";
           addCustomer(this.form)
             .then(response => {
               this.$message.success("新增成功");
               this.dialog.dialogaddxiansuo = false;
               this.getList();
             })
             .catch(error => {
               this.$message.error("新增失败");
             });
         }
       });
     },
     // 添加电话号码
     addPhone() {
       this.phonedecrease.push('');
     },
     // 删除电话号码
     decreasePhone(i) {
       this.phonedecrease.splice(i , 1);
       console.log('phonedecrease',this.phonedecrease)
     },
     // 处理电话号码格式
     handlePhone() {
       this.form.phone=this.phoneadd+","+this.phonedecrease.toString()
       console.log('this.form.phone',this.form.phone)
     },
     // 省市区赋值
     toPlace() {
       this.toplace.province = this.form.province;
       this.toplace.city = this.form.city;
       this.toplace.district = this.form.district;
     },
     //   获取省市区的地址
     getPlace(i, j, k) {
       this.form.province = i;
       this.form.city = j;
       this.form.district = k;
       this.queryParams.province = i;
       this.queryParams.city = j;
       this.queryParams.district = k;
     },
   }
}
</script>

<style>

</style>
