<template>
  <!--部门数据-->
  <el-col :span="4" :xs="24">
    <div class="head-container">
      <el-input
        v-model="deptName"
        placeholder="请输入部门名称"
        clearable
        size="small"
        prefix-icon="el-icon-search"
        style="margin-bottom: 20px"
      />
    </div>
    <div class="head-container">
      <el-tree
        :data="deptOptions"
        :props="defaultProps"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree"
        default-expand-all
        @node-click="handleNodeClick"
      />
    </div>
  </el-col>
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
    value: {
      type: String,
      default: "",
    },
    /!* 高度 *!/
    height: {
      type: Number,
      default: null,
    },
    /!* 最小高度 *!/
    minHeight: {
      type: Number,
      default: null,
    },
  },*/
  data() {
    return {
      // 部门名称
      deptName: "",
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
      this.queryParams.deptId = data.id;
      this.getList();
    },
  },
};
</script>
