/*
 * @Author: your name
 * @Date: 2020-12-11 23:24:41
 * @LastEditTime: 2020-12-25 15:21:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/src/components/drawCanvas/draw-brush/config.js
 */
const size = ["small", "normal", "big"];
const color = ["red", "yellow", "blue", "green", "black"];
const offsideItem = [
	//矩形
	{
		name: "square",
		title: "矩形",
		icon: "icon-square-line",
		size,
		color,
		show: true,
	},
	//圆形
	{
		name: "circle", //圆形
		title: "圆形",
		icon: "icon-big-circle",
		size,
		color,
		show: true,
	},
	//画笔
	{
		name: "brush",
		title: "画笔",
		icon: "icon-huabi",
		size,
		color,
		show: true,
	},
	//直线
	{
		name: "line",
		title: "直线",
		icon: "icon-wujiantouzhixian",
		size,
		color,
		show: true,
	},
	// 箭头
	{
		name: "arrow", //箭头
		title: "箭头",
		icon: "icon-wujiantouzhixian",
		size,
		color,
		show: true,
	},
	//波浪线
	{
		name: "wave", //波浪
		title: "波浪",
		icon: "icon-huitu",
		size,
		color,
		show: true,
	},
	//文字
	{
		name: "text",
		title: "文字",
		icon: "icon-wenzi",
		size,
		color,
		show: true,
	},
	// bomb
	{
		name: "bomb",
		title: "bomb",
		icon: "icon-wenzi",
		size,
		color,
		show: true,
	},
	//括号
	{
		name: "bracket",
		title: "括号",
		icon: "icon-wenzi",
		size,
		color,
		show: true,
	},
	//透明线
	{
		name: "lucencyLine",
		title: "透明线",
		icon: "icon-wenzi",
		size,
		color,
		show: true,
	},
	//橡皮擦
	{
		name: "rubber",
		title: "橡皮擦",
		icon: "icon-wenzi",
		show: false,
	},
];
export default offsideItem;
