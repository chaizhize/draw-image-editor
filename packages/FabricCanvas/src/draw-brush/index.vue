<!--
 * @Author: your name
 * @Date: 2020-12-11 11:28:50
 * @LastEditTime: 2020-12-21 17:58:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/components/drwaCanvas/draw-brush.vue
-->
<!-- 画笔区域 -->
<template>
	<!-- 画图工具选择区 -->
	<div class="draw-brush" ref="menus">
		<!-- 拖拽按钮 -->
		<div class="menu-item">
			<i
				class="fa  el-icon-rank"
				ref="btnMove"
				@mousedown="handleMenusMove"
			></i>
		</div>
		<offsideItem :currentGraph="currentGraph" :FabricEl="FabricEl" />
		<!-- 保存 -->
		<div class="menu-item save-btn">
			<span class="btn-txt save-txt" @click="saveCanvas">保存</span>
		</div>
		<!-- 保存 -->
		<div class="menu-item save-btn">
			<span class="btn-txt save-txt" @click="exportCanvas">导出</span>
		</div>
	</div>
</template>

<script>
	import { mutations, state } from "../store";
	import offsideItem from "./offsideItem.vue";
	import "../iconfont/iconfont.css";
	export default {
		name: "drawbrush",
		components: { offsideItem },
		data() {
			return {};
		},
		computed: {
			currentGraph() {
				return state.currentGraph;
			},
			FabricEl() {
				return state.FabricEl;
			},
		},
		watch: {},
		methods: {
			/**
			 * 处理工具栏拖拽
			 * @param e 触发的元素
			 * 1.获取工具栏元素
			 * 2.算出鼠标相对工具栏元素的位置
			 * 3.为document绑定鼠标移动事件
			 *  3.1 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
			 *  3.2 修改工具栏的left和top（即修改工具栏的位置）
			 * 4.为document绑定鼠标松开事件
			 *  4.1 清除鼠标移动事件和鼠标松开事件
			 */
			handleMenusMove(e) {
				let menuWrap = this.$refs.menus;
				let disX = e.clientX - menuWrap.offsetLeft;
				let disY = e.clientY - menuWrap.offsetTop;
				document.onmousemove = (e) => {
					let slideLeft = e.clientX - disX;
					let slideTop = e.clientY - disY;
					menuWrap.style.left = slideLeft + "px";
					menuWrap.style.top = slideTop + "px";
				};
				document.onmouseup = () => {
					document.onmousemove = null;
					document.onmouseup = null;
				};
			},
			/**
			 * 处理撤销
			 */
			chexiaoHandle() {
				this.drawImageCanvas.backShape();
			},
			//保存数据
			saveCanvas() {
				var data = this.FabricEl.toCanvasJSON();
				this.$emit("savesuccess", data);
			},
			//导出下载为本地图片
			exportCanvas() {
				const link = document.createElement("a");
				link.download = "canvas.png";
				link.href = this.FabricEl.toDataURL("image/jpeg");
				link.download = document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			},
		},
		created() {},
		mounted() {},
		beforeDestroy() {},
	};
</script>
//
<style lang="less">
	@import url("./css.less");
	//
</style>
