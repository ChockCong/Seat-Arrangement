const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const webpack = require('webpack');
const PcPage = ['login-vue', 'index-vue', 'preview-wrap', '.ivu-'];
module.exports = {
	publicPath: '',
	assetsDir: 'static',
	outputDir: 'front',
	filenameHashing: true,
	lintOnSave: true,
	productionSourceMap: false,
    css: {
		loaderOptions: {
			css: {
				
			},
			postcss: {
				plugins: [
					autoprefixer(),
					pxtorem({
						rootValue: 28,
                        propList: ['*'],
                        selectorBlackList: PcPage,
						minPixelValue: 2 // 1px的转换在安卓有问题，所以小于2px不转换
					})
				]
			},
		}
	},
	configureWebpack: {
		plugins: [
			// new webpack.ProvidePlugin({
			// 	_: 'lodash'
			// })
		],
		performance: false,
		output: {
			filename: '[name].[hash].js',
			chunkFilename: '[name].[hash].js'
		}
	},
	chainWebpack: config => {
		// config.module
		// 	.rule(/\.(ttf|eot|woff|woff2|svg)$/)
		// 	.use('file-loader')
		// 		.loader('file-loader')
		// 		.tap(options => {
		// 			// 修改它的选项...
		// 			// return options
		// 		}),
		config.optimization.runtimeChunk({
			name: 'runtime'
		}),
		config.optimization.splitChunks({
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name: 'vendors'
				}
			}
		});
	},
	devServer: {
		proxy: {
		  "/api": {
			target: process.env.VUE_APP_API,   // 要请求的后台地址
			ws: true,    // 启用websockets
			changeOrigin: true,    // 是否跨域
			pathRewrite: {   
			  "^/api": "/"          // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
			}
		  }
		}
	  }
}