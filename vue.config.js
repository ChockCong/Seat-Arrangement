const path = require('path');
// const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
// const TerserPlugin = require("terser-webpack-plugin");
const ComPressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const PcPages = ['login-vue', 'index-vue', 'preview-wrap', '.ivu-'];
const smp = new SpeedMeasurePlugin();
module.exports = {
	publicPath: '',
	assetsDir: 'static',
	outputDir: 'front',
	filenameHashing: true,
	lintOnSave: true,
	productionSourceMap: false,
	css: {
		extract: true,
		loaderOptions: {
			postcss: {
				plugins: [
					autoprefixer(),
					pxtorem({
						rootValue: 28,
						propList: ['*'],
						selectorBlackList: PcPages,
						minPixelValue: 2 // 1px的转换在安卓有问题，所以小于2px不转换
					})
				]
			},
		}
	},
	// pages: {
	// 	index: {
	// 		// entry: 'src/main.js',
	// 		filename: 'index.html',
	// 		title: 'Hotel Assist System'
	// 	}
	// },
	configureWebpack: config => {
		// let module = {
        //     rules: [
        //         {
        //             test: /\.js$/,
        //             use: ['thread-loader']
        //         }
        //     ]
        // }
		let plugins = [
			new ComPressionPlugin({
				test: /\.js$|\.html$|\.css/,
				threshold: 10240,
				deleteOriginalAssets: false
			})
			// new webpack.ProvidePlugin({
			// 	_: 'lodash'
			// })
		];
		if (process.env.NODE_ENV === 'development') {
			plugins.push(
				new BundleAnalyzerPlugin(
					{
						analyzerMode: 'server',
						analyzerHost: '127.0.0.1',
						analyzerPort: 8889,
						reportFilename: 'report.html',
						defaultSizes: 'parsed',
						openAnalyzer: true,
						generateStatsFile: false,
						statsFilename: 'stats.json',
						statsOptions: null,
						logLevel: 'info'
					}
				)
			)
		}
		// config.optimization.minimizer = [
		// 	new TerserPlugin({
		// 		parallel: 4
		// 	})
		// ];
		const newconfig = {
			// module,
			plugins,
			performance: false,
			output: {
				filename: '[name].[hash].js',
				chunkFilename: '[name].[hash].js'
			}
		};
		// return smp.wrap(newconfig);
		return process.env.NODE_ENV === 'development' ? newconfig : smp.wrap(newconfig);
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
		config.resolve.alias
			.set('@', path.join(__dirname, 'src')), // key,value自行定义
			// .set('_c', resolve('src/components'))
		config
			.plugin('html')
			.tap(args => {
				args[0].title = '码雷';
				return args;
			}),
		config.optimization.runtimeChunk({
			name: 'runtime'
		}),
		config.optimization.splitChunks({
			chunks: 'all',
			maxInitialRequests: 3,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: 10,
					name: 'vendors'
				},
				iview: {
					test: /[\\/]node_modules[\\/]_?iview(.*)/,
					name: 'chunk-iview',
					priority: 20,
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
};