import Area from "@/views/components/area/liandong.vue";
import Manager from "@/views/components/Sosoitem/manager.vue";
import Phone from "@/views/components/Sosoitem/phone.vue";
import UpImage from "@/views/components/upload-image/upImgs";
import UpImage1 from "@/views/components/upload-image/upImgs1";
import Fee from "@/views/components/Sosoitem/fee.vue";

export default (Vue)=>{
   Vue.component('Area', Area)
   Vue.component('Manager', Manager)
   Vue.component('UpImage', UpImage)
   Vue.component('UpImage1', UpImage1)
   Vue.component('Phone', Phone)
   Vue.component('Fee', Fee)
}
