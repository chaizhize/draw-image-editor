<!--
 * @Author: your name
 * @Date: 2020-12-11 15:22:52
 * @LastEditTime: 2020-12-18 16:22:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/src/App.vue
-->

<template>
	<div id="app">
		<button @click="handleToggle">切换</button>

		<fabricCanvas
			@savesuccess="savesuccess"
			@initFabricCanvas="initFabricCanvas"
		/>
		<div ref="canvasDom" class="canvasDom"></div>
	</div>
</template>

<script>
	import fabricCanvas from "./components/fabricCanvas/index";
	export default {
		name: "App",
		components: {
			fabricCanvas,
		},
		data() {
			return {
				canvasArr: [
					"https://img.zhugexuetang.com/B4C3778D-6461-D1FD-8DF5-91B0FF705F53.jpg",
					{},
				],
				url: "",
				index: 1,
				maxWidth: 1000,
				FabricEl: null,
			};
		},
		methods: {
			initFabricCanvas(InitFabricCanvas) {
				const opt = {
					canvasData: "", // 渲染数据
					maxWidth: 1000, //最大宽度,
				};
				this.FabricEl = new InitFabricCanvas(opt);
				console.log("this.FabricEl", this.FabricEl);
			},
			handleToggle() {
				this.index = this.index === 0 ? 1 : 0;
				this.url = this.canvasArr[this.index];
				var result = this.FabricEl.toJSON();
				console.log(result);
				this.FabricEl.refreshImageCanvas({ canvasData: this.url });
			},
			savesuccess(file) {
				console.log(JSON.stringify(file));
			},
		},
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	.canvasDom {
		width: 802px;
		height: 1143px;
	}
</style>
