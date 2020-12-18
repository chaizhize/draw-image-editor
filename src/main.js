import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
// import fabricCanvas from "../dist/fabricCanvas.min.js";
// Vue.use(fabricCanvas);
// console.log("fabricCanvas", fabricCanvas);
new Vue({
	render: (h) => h(App),
}).$mount("#app");
