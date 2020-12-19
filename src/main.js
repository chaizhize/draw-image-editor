import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
import "./components/index";
import fabricCanvas from "../dist/fabricCanvas.min.js";
Vue.use(fabricCanvas);
new Vue({
	render: (h) => h(App),
}).$mount("#app");
