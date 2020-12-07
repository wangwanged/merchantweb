import Area from "@/views/components/area/liandong.vue";
const Global = {
    install: function(Vue) {
        // 注册并获取组件，然后在main.js中引用，在Vue.use()就可以了
        Vue.component('Area', Area)
    }
}
export default Global