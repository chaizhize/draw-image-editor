/*
 * @Author: your name
 * @Date: 2020-12-22 14:16:59
 * @LastEditTime: 2020-12-25 11:10:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/vue.config.js
 */
const cdnDomain = "/drawImageEditor";

module.exports = {
	publicPath:
		process.env.ENV === "production" ? cdnDomain : "/drawImageEditor", //resolve('dist'),// 基本路径
	outputDir: "dist", // 打包输出文件目录
	assetsDir: "static", //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
	lintOnSave: false, //  是否使用带有浏览器内编译器的完整构建版本
	pages: {
		index: {
			entry: "examples/main.js",
			template: "public/index.html",
			filename: "index.html",
		},
	},
	// 扩展 webpack 配置，使 packages 加入编译
	chainWebpack: (config) => {
		config.module
			.rule("js")
			.include.add("/packages")
			.end()
			.use("babel")
			.loader("babel-loader");
	},
};
