<!--
 * @Author: your name
 * @Date: 2020-12-11 20:47:56
 * @LastEditTime: 2020-12-19 00:09:58
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
			:class="{ menuActive: currentGraph.name === item.name }"
		>
			<!-- <i
				class="fa iconfont"
				:class="item.icon"
				@click="currentGraph.name = item.name"
			></i> -->
			<i
				class="fa"
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
	</div>
</template>

<script>
	import { mutations, state } from "../store";
	import offsideItem from "./config";
	export default {
		name: "offsideItem",
		components: {},
		// props: ["handleFabric"],
		data() {
			return {
				offsideItem,
			};
		},
		computed: {
			currentGraph() {
				return state.currentGraph;
			},
		},
		methods: {
			handleSetGraph(type, value) {
				mutations.SET_CURRENT_GRAPH(type, value, this.$forceUpdate);
				this.$forceUpdate();
				this.$bus.$emit("forceUpdate");
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
