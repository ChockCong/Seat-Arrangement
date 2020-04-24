const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const PcPahe = ['login-vue', 'index-vue', 'preview-wrap', '.ivu-'];
module.exports = {
	publicPath: '',
	// assetsDir: '',
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
    }
}