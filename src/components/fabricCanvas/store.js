/*
 * @Author: your name
 * @Date: 2020-12-11 16:14:55
 * @LastEditTime: 2020-12-19 00:09:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/src/components/drawCanvas/store.js
 */
import Vue from "vue";
const graph = [
	"square", //矩形
	"circle", //圆形
	"brush", //画笔
	"line", //直线
	"arrow", // 箭头
	"wave", //波浪线
	"text", //文字
	"bomb", // bomb
	"lucencyLine", //透明线
	"bracket", //括号
];
const initGraph = function() {
	return graph.reduce((prev, item) => {
		prev[item] = {
			color: "red",
			size: "normal",
		};
		return prev;
	}, {});
};

export let state = Vue.observable({
	FabricEl: null, // canvas元素
	currentGraph: { name: "arrow", color: "red", size: "normal" }, // 当前选中的工具
	drawGraph: initGraph,
});
export let mutations = {
	FABRIC_EL(payload) {
		state.FabricEl = payload;
	},
	SET_CURRENT_GRAPH(type, value) {
		state.currentGraph[type] = value;
	},
};
