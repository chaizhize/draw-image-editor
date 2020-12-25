<!--
 * @Author: your name
 * @Date: 2020-12-11 15:22:52
 * @LastEditTime: 2020-12-25 15:11:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/src/App.vue
-->

<template>
	<div class="drawImageEditor">
		<button @click="handleToggle">切换图片</button>
		<fabricCanvas
			:currentType="currentType"
			@initFabricCanvas="init"
			@savesuccess="savesuccess"
		/>
	</div>
</template>

<script>
	export default {
		name: "drawImageEditor",
		data() {
			return {
				canvasArr: [
					require("../assets/SampleImage.png"),
					require("../assets/work1.jpg"),
					require("../assets/work2.jpg"),
				],
				canvasArrJson: [],
				url: "",
				index: 0,
				maxWidth: 1000,
				FabricEl: null,
				currentType: {
					name: "arrow",
					color: "red",
					size: "normal",
				},
			};
		},
		created() {},
		watch: {
			canvasArr: {
				handler() {
					this.canvasArrJson = new Array(this.canvasArr.length).fill(
						""
					);
					console.log("this.canvasArrJson", this.canvasArrJson);
				},
				immediate: true,
				deep: true,
			},
		},
		methods: {
			init(InitFabric) {
				var data = (this.url = this.canvasArr[0]);
				const opt = {
					canvasData: data, // 渲染数据
				};
				this.FabricEl = new InitFabric(opt);
				console.log("this.FabricEl", this.FabricEl);
			},
			handleToggle() {
				var result = this.FabricEl.toCanvasJSON();
				this.canvasArrJson[this.index] = result;
				this.index =
					this.index >= this.canvasArr.length - 1
						? 0
						: this.index + 1;
				this.url =
					this.canvasArrJson[this.index] ||
					this.canvasArr[this.index];
				this.FabricEl.refreshImageCanvas({ canvasData: this.url });
				console.log("this.canvasArrJson", this.canvasArrJson);
			},
			savesuccess(file) {
				this.canvasArrJson[this.index] = file;
				console.log("currentImageJson", JSON.stringify(file));
				console.log("allImageJson", JSON.stringify(this.canvasArrJson));
				alert(`当前画布图像JSON：${JSON.stringify(file)}`);
				alert(
					`全部画布图像JSON：${JSON.stringify(this.canvasArrJson)}`
				);
			},
		},
	};
</script>
<style lang="less">
	.drawImageEditor {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		button {
			margin-bottom: 50px;
			padding: 10px 20px;
		}
	}
</style>
