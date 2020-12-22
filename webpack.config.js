/*
 * @Author: your name
 * @Date: 2020-12-17 18:29:43
 * @LastEditTime: 2020-12-21 11:08:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /drawcanvaseditor/webpack.config.js
 */
const Webpack = require("webpack");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
	entry: "./src/components/index.js", // 入口文件
	output: {
		// 修改输出文件到 dist 下
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/dist/",
		filename: "fabricCanvas.min.js", // 生成的文件名
		library: "fabricCanvas", // 指定的就是你使用require时的模块名
		libraryTarget: "umd", // 会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
		umdNamedDefine: true, // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{ test: /\.vue$/, use: ["vue-loader"] },
			{
				test: /\.(woff2?|svg|ttf|otf|eot)(\?.*)?$/i,
				use: ["url-loader?limit=6144&name=font/[name].[hash:5].[ext]"],
			},
			{ test: /\.(jpg|png|jpeg|gif)$/, use: ["url-loader"] },
		],
	},
	plugins: [new VueLoaderPlugin()],
	//webpack配置
	// "main": "dist/fabricCanvas.min.js",
	//
};
