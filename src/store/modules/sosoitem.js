const state = {
    // 写跟进按钮
   dialogfollow:false,
   dialogNewsign:false,
   customerList:[]
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