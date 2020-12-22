/*
 * @Author: your name
 * @Date: 2020-12-21 11:43:38
 * @LastEditTime: 2020-12-21 14:09:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/packages/FabricCanvas/index.js
 */
import Vue from "vue";
Vue.prototype.$bus = new Vue();
// 导入组件，组件必须声明 name
import FabricCanvas from "./src";
// 为组件提供 install 安装方法，供按需引入
FabricCanvas.install = function(Vue) {
	Vue.component(FabricCanvas.name, FabricCanvas);
};
// 导出组件
export default FabricCanvas;
