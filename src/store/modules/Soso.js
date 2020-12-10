const state = {
    // 线索
  xiansuo:{
     dialogTransfor:false,
     dialogAddXiansuo:false,
     dialogExport:false
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
