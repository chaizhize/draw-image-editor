/*
 * @Author: your name
 * @Date: 2020-12-11 15:22:52
 * @LastEditTime: 2020-12-25 16:27:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/examples/main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
Vue.config.productionTip = false;
import FabricCanvas from "../packages";
Vue.use(FabricCanvas);

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
