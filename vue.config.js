const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const PcPahe = ['login-vue', 'index-vue', 'preview-wrap', '.ivu-'];
// console.log(process.env.NODE_ENV);
module.exports = {
	publicPath: '',
	assetsDir: 'static',
	outputDir: 'front',
	filenameHashing: true,
	lintOnSave: true,
	productionSourceMap: true,
    css: {
		loaderOptions: {
			postcss: {
				plugins: [
					autoprefixer(),
					pxtorem({
						rootValue: 28,
                        propList: ['*'],
                        selectorBlackList: PcPahe,
						minPixelValue: 2 // 1px的转换在安卓有问题，所以小于2px不转换
					})
				]
			}
		}
	},
	configureWebpack: config => {},
	chainWebpack: config => {}
}