const state = {
    // 客户弹窗
  customer:{
      // 写跟进按钮
   dialogfollow:false,
    //  详情新签合同按钮
   dialogNewsign:false,
   // 详情编辑按钮
   dialogedit:false,
   // 详情转移按钮
   dialogTransfor:false,
   //  失效按钮
   dialogeInvalid:false,
 }
    
   
   
}

const mutations = {
   updateAlldata(state,payload){
      state.customerList=payload
   }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}