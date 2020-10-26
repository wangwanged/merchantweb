<template>
  <div class="container">
    <div class="header">
      <div class="header_top">
        <span class="title_name">郭富城</span>
        <span class="title_name">紫晶悦城加盟店/元氏区域</span>
        <el-button size="small">审核</el-button>
        <el-button size="small">续签</el-button>
        <el-button size="small">编辑</el-button>
        <el-button size="small">转移</el-button>
        <el-button size="small">解约</el-button>
        <el-button size="small">失效</el-button>
      </div>
      <div class="header_bottom">
        <el-button size="small">单店加盟</el-button>
        <el-button size="small">待审核</el-button>
        <span>负责人:xxx</span>
      </div>
    </div>

    <div class="main">
      <div class="main_left">
        <div class="tab_style">
          客户信息
        </div>
        <div class="main_content_top">
          <p class="main_content_name">
            <span class="main_content_firstname">客户等级：</span>
            <span>A(重要客户)</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户需求：</span>
            <span>区域加盟</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">地区：</span>
            <span>河北省 石家庄 长安区</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">公司：</span>
            <span>正大房产</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">店面地址：</span>
            <span>昌黎镇鼓楼东街90号</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">中介经验：</span>
            <span>创业小白</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户来源：</span>
            <span>机器人</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">备注：</span>
            <span
              >备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息</span
            >
          </p>
          <div class="line_between"></div>
          <div class="main_title">合同信息</div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="关联合同" width="120">
            </el-table-column>
            <el-table-column prop="name" label="合同类型" width="120">
            </el-table-column>
            <el-table-column prop="name" label="店面、区域名称" width="120">
            </el-table-column>
            <el-table-column prop="name" label="签约日期" width="120">
            </el-table-column>
            <el-table-column prop="name" label="合同开始日期" width="120">
            </el-table-column>
            <el-table-column prop="name" label="合同结束日期" width="120">
            </el-table-column>
            <el-table-column prop="name" label="负责人"> </el-table-column>
          </el-table>
          <div class="main_title">系统信息</div>
          <p class="main_content_name">
            <span class="main_content_firstname">客户等级：</span>
            <span>A(重要客户)</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">客户需求：</span>
            <span>区域加盟</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">地区：</span>
            <span>河北省 石家庄 长安区</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">公司：</span>
            <span>正大房产</span>
          </p>
          <p class="main_content_name">
            <span class="main_content_firstname">店面地址：</span>
            <span>昌黎镇鼓楼东街90号</span>
          </p>
        </div>
      </div>
      <div class="main_right">
        <div class="tab_style">
          客户跟进
        </div>
        <div class="main_content_top">
            <div class="main_content_name">
              <span class='main_content_firstname'>123</span> <span style="float:right">王力宏 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;拜访</span
              >
            </div>
            <p class="main_content_name">
              跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进
              跟进内容跟进内容跟进内容跟进内容跟进内容
            </p>
            <p class="main_content_name__placeholder">
              <el-image
                :src="src"
                style="width: 200px; height: 150px;margin-right:20px"
                fit="contain"
              ></el-image>
              <el-image
                :src="src"
                style="width: 200px; height: 150px;margin-right:20px"
                fit="contain"
              ></el-image>
              <el-image
                :src="src"
                style="width: 200px; height: 150px"
              ></el-image>
            </p>
            <div class='line_between'></div>
        </div>
         <div class="main_content_top">
            <div class="main_content_name">
              123 <span style="float:right">王力宏&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;拜访</span>
            </div>
            <p class="main_content_name">
              跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进
              跟进内容跟进内容跟进内容跟进内容跟进内容
            </p>
            <p class="main_content_name__placeholder">
              <el-image
                :src="src"
                style="width: 200px; height: 150px;margin-right:20px"
                fit="contain"
              ></el-image>
              <el-image
                :src="src"
                style="width: 200px; height: 150px;margin-right:20px"
                fit="contain"
              ></el-image>
              <el-image
                :src="src"
                style="width: 200px; height: 150px"
                fit="contain"
              ></el-image>
            </p>
            <div class='line_between'></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ]
    };
  }
};
</script>

<style>
.ccc {
  width: 40%;
}
.bbb el-input {
  width: 300px;
  border: none;
}
</style>
