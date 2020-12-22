/*
 * @Author: your name
 * @Date: 2020-12-11 15:22:52
 * @LastEditTime: 2020-12-22 14:07:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/examples/main.js
 */
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
import fabricCanvas from "../packages";
Vue.use(fabricCanvas);

new Vue({
	render: (h) => h(App),
}).$mount("#app");
