<!--
 * @Author: your name
 * @Date: 2020-12-11 20:47:56
 * @LastEditTime: 2020-12-17 19:04:47
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
			:class="{ active: currentGraph.name === item.name }"
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
				:class="{ active: currentGraph.name === item.name }"
			>
				<span
					v-for="size in item.size"
					:key="size"
					class="size"
					:class="{
						active: currentGraph.size === size,
						[size]: size,
					}"
					@click="handleSetGraph('size', size)"
				></span>
				<span
					v-for="color in item.color"
					:key="color"
					class="color"
					:class="{
						active: currentGraph.color === color,
						[color]: color,
					}"
					@click="handleSetGraph('color', color)"
				></span>
			</div>
		</div>
	</div>
</template>

<script>
	import offsideItem from "./config";
	import { mutations, state } from "../store";
	export default {
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
		},
		methods: {
			handleSetGraph(type, value) {
				mutations.SET_CURRENT_GRAPH(type, value);
			},
		},
	};
</script>
<style scoped></style>
