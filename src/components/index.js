/*
 * @Author: your name
 * @Date: 2020-12-17 14:20:27
 * @LastEditTime: 2020-12-18 16:20:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/src/components/fabricCanvas/index.js
 */
import fabricCanvas from "./fabricCanvas/index.vue";
fabricCanvas.install = (Vue) => Vue.component(fabricCanvas.name, fabricCanvas);

// 注意这里的判断，很重要
if (typeof window !== "undefined" && window.Vue) {
	window.Vue.use(fabricCanvas);
}

// 导出组件库
export default fabricCanvas;