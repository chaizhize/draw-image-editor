<!--
 * @Author: your name
 * @Date: 2020-12-11 20:47:56
 * @LastEditTime: 2020-12-25 16:28:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/src/components/drawCanvas/draw-brush/offsideItem.vue
-->
<!--  -->
<template>
	<div class="offsideItem">
		<div
			class="menu-item"
			v-for="item in offsideItem"
			:key="item.name"
			:title="item.name"
			:class="{
				menuActive: currentGraph.name === item.name,
			}"
		>
			<!-- <i
				class="fa iconfont"
				:class="item.icon"
				@click="currentGraph.name = item.name"
			></i> -->
			<i
				class="font"
				style="font-size:12px"
				@click="handleSetGraph('name', item.name)"
				>{{ item.title }}</i
			>
			<!-- 大小选项 -->
			<div
				v-if="item.show"
				class="item-config"
				:class="{ configActive: currentGraph.name === item.name }"
			>
				<span
					v-for="size in item.size"
					:key="size"
					class="size"
					:class="{
						sizeActive: currentGraph.size === size,
						[size]: size,
					}"
					@click="handleSetGraph('size', size)"
				></span>
				<span
					v-for="color in item.color"
					:key="color"
					class="color"
					:class="{
						colorActive: currentGraph.color === color,
						[color]: color,
					}"
					@click="handleSetGraph('color', color)"
				></span>
			</div>
		</div>
		<div class="menu-item" title="撤销">
			<i class="font" style="font-size:12px" @click="handleRepeal()"
				>撤销</i
			>
		</div>
	</div>
</template>

<script>
	import { mutations, state } from "../store";
	import offsideItem from "./config";
	export default {
		name: "offsideItem",
		components: {},
		data() {
			return {
				offsideItem,
			};
		},
		computed: {
			currentGraph() {
				return state.currentGraph;
			},
			FabricEl() {
				return state.FabricEl;
			},
		},
		methods: {
			handleSetGraph(type, value) {
				mutations.SET_CURRENT_GRAPH(type, value);
			},
			handleRepeal() {
				console.log(this.FabricEl._objects, "sssss");
				if (this.FabricEl._objects.length > 0) {
					this.FabricEl._objects.pop();
					this.FabricEl.renderAll();
				}
			},
		},
	};
</script>
<style lang="less">
	.offsideItem {
		.menuActive {
			background: #ded8d8 !important;
		}
		.sizeActive {
			background: #00be00 !important;
		}
		.size:hover {
			background: #00be00 !important;
		}
		.colorActive {
			background: #fff !important;
		}
		.color:hover {
			background: #fff !important;
		}
		.configActive {
			display: flex !important;
		}
	}
</style>
