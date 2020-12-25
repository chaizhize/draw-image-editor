/*
 * @Author: your name
 * @Date: 2020-12-25 10:56:01
 * @LastEditTime: 2020-12-25 11:09:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/examples/router/index.js
 */
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const routes = [
	{
		path: "/",
		component: () => import("../view/drawImageEditor.vue"),
	},
];
const router = new Router({
	routes,
	mode: "history",
	base: "/drawImageEditor",
	scrollBehavior: () => ({ y: 0 }),
});

export default router;
