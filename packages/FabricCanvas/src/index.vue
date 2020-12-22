<!--  -->
<template>
	<div
		class="fabricCanvas"
		:style="{ width: (FabricEl && FabricEl.getWidth()) + 'px' }"
	>
		<drawFabric
			v-if="FabricEl"
			@savesuccess="(data) => $emit('savesuccess', data)"
		/>
		<canvas :id="id"></canvas>
	</div>
</template>

<script>
	import { fabric } from "fabric";
	import drawFabric from "./draw-brush/index.vue";
	import { toDecimal2, checkDataType } from "jsmethodutils";
	import "./tools/drawBracket";
	import "./tools/drawWave";
	import "./tools/drawArrow";
	import "./tools/drawBomb";
	import { mutations, state } from "./store";
	export default {
		name: "FabricCanvas",
		components: { drawFabric },
		props: {
			currentType: {
				type: Object,
				default() {
					return { name: "arrow", color: "red", size: "normal" };
				},
			},
		},
		data() {
			return {
				drawingObject: null, //当前绘制对象
				mouseFrom: {},
				mouseTo: {},
				doDrawing: false,
				moveCount: 1,
				textbox: null,
				isSelect: false,
				bolangLine: null,
				kuohaoLine: null,
				FabricEl: null,
				defaultWidth: 500,
				defaultHeight: 500,
				canvasBg: "",
				canvasData: "",
				maxWidth: 1000,
				id: "fabricCanvas",
				// currentGraph: { name: "arrow", color: "red", size: "normal" }, // 当前选中的工具
			};
		},
		computed: {
			currentGraph() {
				return state.currentGraph;
			},
			/**
			 * 获取大小
			 */
			drawWidth() {
				switch (this.currentGraph.size) {
					case "small":
						return 2;
					case "normal":
						return 3;
					case "big":
						return 5;
					default:
						return size;
				}
			},
			/**
			 * 获取颜色
			 */
			drawStroke() {
				switch (this.currentGraph.color) {
					case "red":
						return "#ff1e10";
					case "yellow":
						return "#ffbe00";
					case "blue":
						return "#1a9bff";
					case "green":
						return "#1aad19";
					case "black":
						return "#4d4d4d";
				}
			},
		},
		watch: {
			currentGraph: {
				handler(newVal, oldVal) {
					if (this.currentGraph.type === "name") {
						this.handleFabric();
					}
				},
				deep: true,
			},
			currentType: {
				handler(newType) {
					const {
						name = "arrow",
						color = "red",
						size = "normal",
					} = newType;
					mutations.SET_CURRENT_GRAPH({ name, color, size });
				},
				deep: true,
				immediate: true,
			},
		},
		created() {},
		mounted() {
			this.init();
			// this.$bus.$on("forceUpdate", ({ type, value }) => {
			// 	this.currentGraph[type] = value;
			// 	if (type === "name") {
			// 		this.handleFabric();
			// 	}
			// });
		},
		methods: {
			init() {
				const _this = this;
				function Fun(opt) {
					return _this.InitFabricCanvas(opt);
				}
				this.$emit("initFabricCanvas", Fun);
			},
			changeProtopype() {
				this.FabricEl.toCanvasJSON = this.toCanvasJSON;
				this.FabricEl.refreshImageCanvas = this.refreshImageCanvas;
			},
			toCanvasJSON() {
				let json = this.FabricEl.toJSON();
				json["width"] = this.FabricEl.getWidth();
				json["height"] = this.FabricEl.getHeight();
				return json;
			},
			//初始化canvas
			InitFabricCanvas({
				bg = "rgba(0,0,0,0.1)",
				canvasData = "",
				maxWidth = 1000,
			} = {}) {
				//初始化canvas
				this.FabricEl = new fabric.Canvas(this.id, {
					backgroundColor: bg,
					isDrawingMode:
						this.currentGraph.name === "brush" ? true : false, //可以自由绘制
					skipTargetFind: true, //整个画板元素不能被选中
					selectable: true, //控件不能被选择，不会被操作
					selection: true, //画板显示选中
				});
				this.changeProtopype();
				this.canvasData = canvasData;
				this.maxWidth = maxWidth;
				this.canvasBg = bg;
				mutations.FABRIC_EL(this.FabricEl);
				//初始化设置画笔颜色/宽度
				this.FabricEl.freeDrawingBrush.color = this.drawStroke;
				this.FabricEl.freeDrawingBrush.width = this.drawWidth;
				this.setImageCanvas();
				//初始化事件
				this.initOnEvent();
				return this.FabricEl;
			},
			//重新渲染
			refreshImageCanvas({
				bg = this.canvasBg,
				canvasData = this.canvasData,
				maxWidth = 1000,
			} = {}) {
				this.FabricEl.clear();
				this.canvasData = canvasData;
				this.maxWidth = maxWidth;
				this.canvasBg = bg;
				this.FabricEl.backgroundColor = this.canvasBg;
				this.setImageCanvas();
			},
			setImageCanvas() {
				if (checkDataType(this.canvasData, "String")) {
					/**
							初次加载数据，把当前URL插入到Image中，
								1.获取到图片的宽高，赋值给canvas
								2.把 new fabric.Image 返回的图像当作背景图，赋给canvas（为解决鼠标悬浮图片，出现可移动point问题）
								3.设置canvas最大宽度为1000，宽高同比列
						 */
					if (this.canvasData) {
						var image = new Image();
						image.setAttribute("crossOrigin", "anonymous");
						image.src = this.canvasData;
						image.onload = () => {
							// 设置宽高
							const { imgWidth, imgHeight } = this.setCanvasWH(
								image
							);
							let fabricImage = new fabric.Image(image, {
								crossOrigin: "anonymous",
							});
							this.FabricEl.setBackgroundImage(
								fabricImage,
								this.FabricEl.renderAll.bind(this.FabricEl),
								{
									originX: "left",
									originY: "top",
									crossOrigin: "anonymous",
									scaleX: imgWidth / image.width,
									scaleY: imgHeight / image.height,
								}
							);
						};
					} else {
						this.setCanvasWH({
							width: this.defaultWidth,
							height: this.defaultHeight,
						});
					}
				} else {
					// 加载渲染数据
					//渲染已有数据的canvas宽高
					const data = Object.keys(this.canvasData).length
						? this.canvasData
						: "";
					this.FabricEl.loadFromJSON(data);
					this.setCanvasWH(data);
				}
			},
			// 设置canvas的宽高
			setCanvasWH(image) {
				const {
					width = this.defaultWidth,
					height = this.defaultHeight,
				} = image;
				const canvasMaxWidth = this.maxWidth; // canvas最大宽度
				let imgWidth = width >= canvasMaxWidth ? canvasMaxWidth : width;
				let imgHeight = height;
				let scaleX = toDecimal2(canvasMaxWidth / width);
				if (scaleX < 1) {
					imgWidth = width * scaleX;
					imgHeight = height * scaleX;
				}
				this.maxWidth = imgWidth;
				this.FabricEl.setWidth(imgWidth);
				this.FabricEl.setHeight(imgHeight);
				return {
					imgWidth,
					imgHeight,
				};
			},
			initOnEvent() {
				this.FabricEl.on("mouse:down", (e) => this.onmousedown(e));
				this.FabricEl.on("mouse:move", (e) => this.onmousemove(e));
				this.FabricEl.on("mouse:up", (e) => this.onmouseup(e));
			},
			onmousedown(opt) {
				this.mouseFrom.x = opt.e.offsetX;
				this.mouseFrom.y = opt.e.offsetY;
				this.doDrawing = true;
				this.FabricEl.skipTargetFind = false; //画板元素不能被选中
				this.FabricEl.selection = false; //画板不显示选中
				this.isSelect = this.FabricEl.getActiveObject();
				if (this.isSelect || this.currentGraph.name == "rubber") {
					this.onremove(opt);
					return;
				}
				if (this.currentGraph.name === "wave") {
					this.drawWaveLine(opt.e);
				} else if (this.currentGraph.name === "text") {
					this.drawing();
					return;
				}
			},
			drawWaveLine(e) {
				const pointer = this.FabricEl.getPointer();
				const points = [pointer.x, pointer.y, pointer.x, pointer.y];
				this.bolangLine = new fabric.WaveLine(points, {
					stroke: this.drawStroke,
					strokeWidth: this.drawWidth,
				});
				this.FabricEl.add(this.bolangLine);
			},
			onmousemove(opt) {
				if (
					this.currentGraph.name == "rubber" ||
					this.isSelect ||
					this.currentGraph.name === "text"
				) {
					return;
				}
				if (this.moveCount % 2 && !this.doDrawing) {
					//减少绘制频率
					return;
				}
				if (this.currentGraph.name === "wave") {
					var pointer = this.FabricEl.getPointer(opt.e);
					this.bolangLine.set({
						x2: pointer.x,
						y2: pointer.y,
					});
					this.FabricEl.renderAll();
				}
				this.mouseTo.x = opt.e.offsetX;
				this.mouseTo.y = opt.e.offsetY;
				this.moveCount++;
				this.drawing();
			},
			onmouseup(opt) {
				if (this.isSelect) {
					return;
				}
				this.mouseTo.x = opt.e.offsetX;
				this.mouseTo.y = opt.e.offsetY;
				this.moveCount = 1;
				this.drawingObject = null;
				this.doDrawing = false;
				// this.FabricEl.selection = true;
				if (this.currentGraph.name === "wave") {
					this.bolangLine.setCoords();
					this.FabricEl.requestRenderAll();
				}
			},
			onremove(e) {
				if (this.currentGraph.name == "rubber") {
					this.FabricEl.remove(e.target);
					this.FabricEl.discardActiveObject(); //清楚选中框
				}
			},
			handleFabric() {
				this.FabricEl.isDrawingMode = false;
				if (this.textbox) {
					//退出文本编辑状态
					this.textbox.exitEditing();
					this.textbox = null;
				}
				if (this.currentGraph.name === "brush") {
					this.FabricEl.isDrawingMode = true;
				} else if (this.currentGraph.name == "rubber") {
					this.FabricEl.selection = true;
					this.FabricEl.skipTargetFind = false;
					this.FabricEl.selectable = true;
				} else {
					// this.FabricEl.isDrawingMode = false;
					this.FabricEl.skipTargetFind = false; //画板元素不能被选中
					this.FabricEl.selection = false; //画板不显示选中
				}
			},
			drawing() {
				if (this.drawingObject) {
					this.FabricEl.remove(this.drawingObject);
				}
				let canvasObject = null;
				switch (this.currentGraph.name) {
					case "square": //矩形
						canvasObject = new fabric.Rect({
							left: this.mouseFrom.x,
							top: this.mouseFrom.y,
							width: this.mouseTo.x - this.mouseFrom.x,
							height: this.mouseTo.y - this.mouseFrom.y,
							stroke: this.drawStroke,
							fill: "rgba(255, 255, 255, 0)",
							strokeWidth: this.drawWidth,
						});
						break;
					case "line": //直线
						canvasObject = new fabric.Line(
							[
								this.mouseFrom.x,
								this.mouseFrom.y,
								this.mouseTo.x,
								this.mouseTo.y,
							],
							{
								stroke: this.drawStroke,
								strokeWidth: this.drawWidth,
							}
						);
						break;
					case "lucencyLine": //透明线
						canvasObject = new fabric.Line(
							[
								this.mouseFrom.x,
								this.mouseFrom.y,
								this.mouseTo.x,
								this.mouseTo.y,
							],
							{
								stroke: this.getRgbaColor(), // this.drawStroke,
								strokeWidth: this.drawWidth * 10, // this.drawWidth,
							}
						);
						break;
					case "circle": //椭圆
						let left = this.mouseFrom.x,
							top = this.mouseFrom.y;
						canvasObject = new fabric.Ellipse({
							left: left,
							top: top,
							stroke: this.drawStroke,
							fill: "rgba(255, 255, 255, 0)",
							originX: "left",
							originY: "top",
							rx: Math.abs(left - this.mouseTo.x),
							ry: Math.abs(top - this.mouseTo.y),
							strokeWidth: this.drawWidth,
						});
						break;
					case "bomb":
						canvasObject = new fabric.DrawBomb(
							[
								this.mouseFrom.x,
								this.mouseFrom.y,
								this.mouseTo.x,
								this.mouseTo.y,
							],
							{
								stroke: this.drawStroke,
								strokeWidth: this.drawWidth,
							}
						);
						break;
					case "text":
						const sizes = {
							"1": 14,
							"3": 16,
							"5": 18,
						};
						let fontSize = sizes["" + this.drawWidth] || 16;
						this.textbox = new fabric.Textbox("", {
							left: this.mouseFrom.x - 20,
							top: this.mouseFrom.y - 10,
							width: 150,
							fontSize: fontSize,
							borderColor: "#2c2c2c",
							fill: this.drawStroke,
						});
						this.FabricEl.add(this.textbox);
						this.textbox.enterEditing();
						this.textbox.hiddenTextarea.focus();
						break;
					case "bracket":
						canvasObject = new fabric.BracketLine(
							[
								this.mouseFrom.x,
								this.mouseFrom.y,
								this.mouseTo.x,
								this.mouseTo.y,
							],
							{
								strokeWidth: this.drawWidth,
								stroke: this.drawStroke,
								radius: this.drawWidth * 4,
							}
						);
						break;
					case "arrow":
						canvasObject = new fabric.ArrowLine(
							[
								this.mouseFrom.x,
								this.mouseFrom.y,
								this.mouseTo.x,
								this.mouseTo.y,
							],
							{
								strokeWidth: this.drawWidth,
								stroke: this.drawStroke,
								radius: this.drawWidth * 4,
							}
						);
						break;
				}
				if (canvasObject) {
					this.FabricEl.add(canvasObject);
					this.drawingObject = canvasObject;
				}
			},
			getRgbaColor() {
				var sColor = this.drawStroke.toLowerCase();
				const opacity = 0.2;
				if (sColor) {
					if (sColor.length === 4) {
						var sColorNew = "#";
						for (var i = 1; i < 4; i += 1) {
							sColorNew += sColor
								.slice(i, i + 1)
								.concat(sColor.slice(i, i + 1));
						}
						sColor = sColorNew;
					}
					//处理六位的颜色值
					var sColorChange = [];
					for (var i = 1; i < 7; i += 2) {
						sColorChange.push(
							parseInt("0x" + sColor.slice(i, i + 2))
						);
					}
					return (
						"rgba(" + sColorChange.join(",") + "," + opacity + ")"
					);
				} else {
					return sColor;
				}
			},
			canvasDestroy() {
				if (this.FabricEl) {
					this.FabricEl.off("mouse:down");
					this.FabricEl.off("mouse:move");
					this.FabricEl.off("mouse:up");
				}
			},
		},
		beforeDestroy() {
			this.canvasDestroy();
		},
	};
</script>
<style lang="less">
	.fabricCanvas {
		// width: auto;
		max-width: 1000px;
		position: relative;
	}
</style>
