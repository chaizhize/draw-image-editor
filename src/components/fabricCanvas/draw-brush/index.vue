<!--
 * @Author: your name
 * @Date: 2020-12-11 11:28:50
 * @LastEditTime: 2020-12-18 16:14:11
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
		<offsideItem />
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
	export default {
		components: { offsideItem },
		data() {
			return {};
		},
		computed: {
			currentGraph() {
				return state.currentGraph;
			},
			GraphList() {
				return state.drawGraph;
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
				var data = this.FabricEl.toJSON();
				this.$emit("savesuccess", data);
			},
			//导出下载为本地图片
			exportCanvas() {
				const link = document.createElement("a");
				link.download = "canvas.png";
				link.href = this.FabricEl.toDataURL();
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
<style lang="less">
	.draw-brush {
		width: 46px;
		position: absolute;
		top: 0px;
		right: -46px;
		z-index: 9999;
		background: #f3f2f2;
		border: 1px solid #999;
		border-radius: 5px;
		& > .menu-item {
			border-bottom: 1px solid #999;
		}
		.menu-item {
			width: 46px;
			padding: 8px 0;
			text-align: center;
			position: relative;

			&.save-btn,
			&.cancel-btn {
				border-top: 1px solid #999;
			}
			.fa {
				font-size: 26px;
				cursor: pointer;
				color: #999;
			}
			.btn-txt {
				font-size: 16px;
				font-weight: bold;
				cursor: pointer;
				&.save-txt {
					color: #1a9bff;
				}
				&.cancel-txt {
					color: #f56c6c;
				}
			}
			&.active {
				background: #ded8d8;
			}
			.item-config {
				display: none;
				flex-direction: column;
				width: 38px;
				position: absolute;
				background: #ffffff;
				border-radius: 5px;
				border: 1px solid #ddd;
				align-items: center;
				left: 48px;
				top: -95px;
				span {
					margin: 6px auto;
				}
				.size {
					border-radius: 50%;
					background: #c6c6c6;
					cursor: pointer;
					&.small {
						width: 6px;
						height: 6px;
					}
					&.normal {
						width: 9px;
						height: 9px;
					}
					&.big {
						width: 12px;
						height: 12px;
					}
					&.active,
					&:hover {
						background: #00be00;
					}
				}
				.color {
					display: block;
					width: 7px;
					height: 7px;
					border: 4px solid transparent;
					cursor: pointer;
					box-sizing: content-box;
					&.red {
						background: #ff1e10;
						border-color: #ff1e10;
					}
					&.yellow {
						background: #ffbe00;
						border-color: #ffbe00;
					}
					&.blue {
						background: #1a9bff;
						border-color: #1a9bff;
					}
					&.green {
						background: #1aad19;
						border-color: #1aad19;
					}
					&.black {
						background: #4d4d4d;
						border-color: #4d4d4d;
					}
					&:hover,
					&.active {
						background: #fff;
					}
				}
				&:before,
				&:after {
					content: " ";
					position: absolute;
					border-left: 8px solid transparent;
					border-top: 8px solid transparent;
					border-right: 8px solid #d0d0d0;
					border-bottom: 8px solid transparent;
					left: -7px;
					top: 50%;
					margin-left: -10px;
				}
				&:after {
					border-right: 8px solid #fff;
					left: -6px;
				}
				&.active {
					display: flex;
				}
			}
		}
	}
</style>
