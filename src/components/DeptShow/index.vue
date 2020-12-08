<template>
  <span style="position: relative">
     <el-form-item prop="num">
      <el-input @focus="treeShow = true" @blur="setTreeFalse" v-model="deptName"
                placeholder="部门名称"
                clearable
                size="small"
                prefix-icon="el-icon-search"
                style="margin-bottom: 20px"
      />
      <div class='el-scrollbar__view el-select-dropdown__list' >
        <el-tree
          v-show="treeShow === true"
          :data="deptOptions"
          :props="defaultProps"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          ref="tree"
          default-expand-all
          @node-click="handleNodeClick"
        />
      </div>
    </el-form-item>
  </span>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { treeselect } from '@/api/system/dept'

export default {
  name: "showdept",
  /*props: {
    /!* 编辑器的内容 *!/
    deptName: {
      type: String,
      default: "",
    },
    /!* 部门树选项 *!/
    deptOptions: {
      type: Object,
      default: null,
    },
    /!* 最小高度 *!/
    defaultProps: {
      type: Object,
      default: null,
    },
  },*/

  data() {
    return {
      treeShow: "false",
      // 部门id
      deptId: null,
      // 部门名称
      deptName: null,
      // 部门树选项
      deptOptions: undefined,

      defaultProps: {
        children: "children",
        label: "label"
      },
    };
  },
  created() {
    this.getTreeselect();
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    setTreeFalse () {
      setTimeout(() => {
        this.treeShow = 'false'
      },100)
    },
    returnDeptId() {
      this.$emit('myevent',this.deptId);
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      // this.queryParams.deptId = data.id;
      this.deptId = data.id;
      this.deptName = data.label;
      this.returnDeptId();
    },
  },
};
</script>
<style lang="less" scoped>
  .el-input{
    width: 150px;
  }
  .el-tree{
    z-index:10;
    position: absolute;
    width: 150px;
  }

</style>
