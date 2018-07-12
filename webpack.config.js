const path = require("path");
//引入node中的path模块
const webpack = require("webpack");
//引入webpack
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入html-webpack-plugin插件,作用是添加模板到编译完成后的dist的文件里面
const CleanWebpackPlugin = require("clean-webpack-plugin");
//引入clean-webpack-plugin插件，作用是清除dist文件及下的内容，
//因为每次编译完成后都会有一个dist文件夹存放静态文件，
//所以需要清除上次的dist文件
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
//引入extract-text-webpack-plugin插件，作用是把css文件单独存为一个文件，
//如果不用插件，css会以style标签的方式插入html中


const config = {
	mode: 'development',
	entry: {
	// 入口文件
		index: './src/index/index.js',
		// index 页面入口
		about: './src/about/about.js'
		// about 页面入口
	},
	output: {
	// 出口文件
		filename: './[name]/[name]-[hash:8].js',
		// 出口文件存放位置，[name]代表块级文件流的名字，
		// 如入口文件中的a,b，最终会[name]的值就会变成a,b。
		// 目的是为了让每个页面在其单独的文件夹内
		path: path.resolve(__dirname, 'dist')
		// 新建dist文件夹存放的位置，__dirname表示当前环境下的绝对路径
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
    		jQuery: 'jquery',
    		'window.jQuery': 'jquery',
    		'window.$': 'jquery',
		}),
		new ExtractTextWebpackPlugin({
		// 分割css插件
			filename: "[name]/[name]-[hash:6].css",
			// 指定编译后的目录
			allChunks: true
			// 把分割的块分别打包
		}),
		new HtmlWebpackPlugin({
			title: "主页面",
			// html标题
			filename: "./index.html",
			// 文件目录名
			template: "./src/index/index.html",
			// 文件模板目录
			hash: true,
			// 是否添加 hash 值
			chunks: ["jquery","index"]
			// 模板需要引用的js块，vendors是定义的公共块，
			// index是引用的自己编写的块
		}),
		new HtmlWebpackPlugin({
          title:'关于页面',
          filename:'./about.html',
          template:'./src/about/about.html',
          hash:true,
          chunks:['about'],
      	}),
		new CleanWebpackPlugin(['dist'])
	],
	module: {
		rules: [
			{
				test:/\.css$/,
				use:ExtractTextWebpackPlugin.extract({
					use:['css-loader']
				})
			},//带css的css编译
          	{
          		test:/\.scss$/,
          		use:ExtractTextWebpackPlugin.extract({
          			fallback:"style-loader",
          			use:['css-loader','sass-loader']
          		})
          	},//带scss的css编译
          	{
          		test:/\.(woff|woff2|eot|ttf|otf)$/,
          		use:[{
          			loader:'url-loader',
          			options: {
          				// outputPath: 'static'
									name: 'fonts/[name]-[hash:6].[ext]'
          			}
          		}]
          	},//图片和字体加载
          	{
          		test: /\.(svg|jpg|jpeg|gif|png)$/,
          		use: [{
          			loader:"url-loader",
          			options:{
          				// mimetype:"image/png",
          				limit: 1024,
									name: "assets/[name]-[hash:8].[ext]"
          			}
          		}]
          	},//如果有png格式的图片，超过4M直接转化为base64格式
          	{
          		test: /\.html$/,
          		use: {
          			loader:'html-loader',
          			options: {           //打包html文件
                      minimize: false, //是否打包为最小值
                      removeComments: false,//是否移除注释
                      collapseWhitespace: false,//是否合并空格
                  	}
              	}
            }
		]
	}
}

module.exports = config
