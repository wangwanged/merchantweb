const state = {
    // 线索
  xiansuo:{
     dialogTransfor:false,   //转至客户弹框
     dialogAddXiansuo:false,  //新增线索弹框
     dialogExport:false,  //线索导出弹框
     xiansuoList:[],  //index页线索list
 }
}
const mutations = {
   allXiansuoData(state,payload){
      state.xiansuo.xiansuoList=payload.xiansuoList
   }
}
const actions = {

}

export default {
  state,
  mutations,
  actions
}
